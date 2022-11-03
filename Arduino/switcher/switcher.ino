#include <list>
#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <ESP8266mDNS.h>
#include <ESP8266WebServer.h>
#include <DNSServer.h>
#include <EEPROM.h>
#include <Servo.h>

#define TRIGGER_SWITCH_PIN 4
#define WIFI_CONNECTED_LED_PIN 16
#define SERVO_WRITE_LED_PIN 5
#define SERVO_PIN 13
#define SOFT_AP_PASSWORD "switcher"

const char* wl_status_t_strs[] = {
  "WL_NO_SHIELD",
  "WL_IDLE_STATUS",
  "WL_NO_SSID_AVAIL",
  "WL_SCAN_COMPLETED",
  "WL_CONNECTED",
  "WL_CONNECT_FAILED",
  "WL_CONNECTION_LOST",
  "WL_WRONG_PASSWORD",
  "WL_DISCONNECTED",
};

// DNS server
const byte DNS_PORT = 53;
DNSServer dnsServer;
ESP8266WebServer server(80);

IPAddress apIP;
IPAddress netMask(255, 255, 255, 0);

char ssid[33] = "";
char password[65] = "";
char myhostname[22] = "";

// Try connect to WLAN
bool tryToConnect;
// Last time tried to connect to WLAN
unsigned long lastConnectTry = 0;
// Current WLAN status
wl_status_t wlanStatus = WL_IDLE_STATUS;

Servo servo;

bool servoMoving;
bool lastTriggerSwitch;

void setup() {
  delay(1000);
  Serial.begin(115200);
  Serial.println();
  Serial.println(F("\nESP8266 WiFi DNS Server - Switcher"));

  // Setup pin mode
  pinMode(TRIGGER_SWITCH_PIN, INPUT);
  pinMode(WIFI_CONNECTED_LED_PIN, OUTPUT);
  pinMode(SERVO_WRITE_LED_PIN, OUTPUT);

  // Initialize servo
  servo.attach(SERVO_PIN);
  servo.write(0);

  // Setup wifi
  apIP = generatePrivateIpAddress();
  sprintf(myhostname, "switcher-%s", macAddressString().c_str());
  WiFi.softAPConfig(apIP, apIP, netMask);
  WiFi.softAP(myhostname, SOFT_AP_PASSWORD); // Use hostname as softAP ssid.
  delay(500); // Without delay I've seen the IP address blank.
  Serial.print(F("AP IP address: "));
  Serial.println(WiFi.softAPIP());

  // Setup the DNS server redirecting all the domains to the apIP.
  dnsServer.setErrorReplyCode(DNSReplyCode::NoError);
  dnsServer.start(DNS_PORT, "*", apIP);

  // Setup server
  server.on("/", handleRoot);
  server.on("/wificonfigsave", handleWifiConfigSave);
  server.on("/switch", HTTP_POST, handleSwitchPost);
  server.on("/fwlink", handleRoot); // Microsoft captive portal.
  server.on("/generate_204", handleRoot); // Android captive portal.
  server.onNotFound(handleNotFound);
  server.begin();
  Serial.println(F("HTTP server started."));

  loadWifiConfigFromEEPROM();
  if (ssid[0] == (char)255) {
    // Initialize EEPROM
    Serial.println("clear EEPROM");
    clearWifiConfigInEEPROM();
    ssid[0] = '\0';
  }
  Serial.printf(PSTR("ssid[0]: %d ssid_strlen: %d \n"), ssid[0], strlen(ssid));

  tryToConnect = strlen(ssid) > 0;
}

void loop() {
  bool triggerSwitch = (digitalRead(TRIGGER_SWITCH_PIN) == LOW);
  if (triggerSwitch && !lastTriggerSwitch) {
    delay(20);
    toggleServoPosition();
  }
  lastTriggerSwitch = triggerSwitch;

  if (tryToConnect) {
    tryToConnect = false;
    Serial.println(F("Connecting as WiFi client..."));
    WiFi.disconnect();
    WiFi.begin(ssid, password);

    int connectionResult = WiFi.waitForConnectResult();
    Serial.printf(PSTR("WiFi connection result: %s \n"), wl_status_t_strs[connectionResult]);

    // millis: Returns the number of milliseconds passed since the Arduino board began running the current program. This number will overflow (go back to zero), after approximately 50 days.
    lastConnectTry = millis();
  }

  wl_status_t status = WiFi.status();
  if (status == WL_IDLE_STATUS && millis() > (lastConnectTry + 60000)) {
    // If WLAN disconnected 60 seconds and idle try to connect.
    tryToConnect = true;
  }

  // WLAN status changed
  if (status != wlanStatus) {
    Serial.printf(PSTR("WLAN Status: %s \n"), wl_status_t_strs[status]);
    wlanStatus = status;

    if (status == WL_CONNECTED) {
      Serial.println(F("Wifi connected."));
      Serial.println(WiFi.SSID());
      Serial.println(WiFi.localIP());

      if (!MDNS.begin(myhostname)) {
        Serial.println(F("Error setting up MDNS responder!"));
      } else {
        Serial.println(F("mDNS responder started."));
        // Add service to MDNS-SD.
        MDNS.addService("http", "tcp", 80);
      }

      digitalWrite(WIFI_CONNECTED_LED_PIN, HIGH);

    } else if (status == WL_NO_SSID_AVAIL) {
      WiFi.disconnect();
      digitalWrite(WIFI_CONNECTED_LED_PIN, LOW);
    }
  }
  if (status == WL_CONNECTED) {
    MDNS.update();
  }

  dnsServer.processNextRequest();
  server.handleClient();
}
