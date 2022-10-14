struct wifi_info_t {
  String ssid;
  int32_t rssi;
};

void setServerNoCacheHeader() {
  server.sendHeader("Cache-Control", "no-cache, no-store, must-revalidate");
  server.sendHeader("Pragma", "no-cache");
  server.sendHeader("Expires", "-1");
}

/** Redirect to captive portal if we got a request for another domain. Return true in that case so the page handler do not try to handle the request again. */
boolean captivePortal() {
  if (!isIp(server.hostHeader()) && server.hostHeader() != (String(myhostname) + ".local")) {
    Serial.println("Request redirected to captive portal");
    server.sendHeader("Location", String("http://") + toStringIp(server.client().localIP()), true);
    server.send(302, "text/plain", "");
    server.client().stop(); // Stop is needed because we sent no content length
    return true;
  }
  return false;
}

void handleRoot() {
  // If captive portal redirect instead of displaying the page.
  if (captivePortal()) {
    return;
  }

  String html;
  html += F(
    "<!DOCTYPE html><html lang='en'><head>"
    "<meta charset='UTF-8'>"
    "<meta name='viewport' content='width=device-width, initial-scale=1.0'>"
    "<meta name='robots' content='noindex, nofollow, noarchive'/>"
    "<meta httpEquiv='content-language' content='ja'/>"
    "<title>Switcher</title>"
    "<style>thead { text-align: left; }</style>"
    "</head><body>"
    "<h1>Switcher</h1>"
    );

  html += F("<h3>SoftAP Config</h3>");
  html += String(F("<div>SSID : ")) + String(myhostname) + F("</div><div>IP Address : ") + toStringIp(WiFi.softAPIP()) + F("</div>");
  String hosturl = String(F("http://")) + String(myhostname) + F(".local");
  html += String(F("<div>Host URL: <a href='")) + hosturl + F("'>") + hosturl + F("</a></div>");

  html += F("<h3>WLAN Config</h3>");
  html += String(F("<div>SSID : ")) + String(ssid) + F("</div><div>IP Address : ") + toStringIp(WiFi.localIP()) + F("</div>");

  html += F("<h3>WLAN list (refresh list any missing)</h3>");
  int numNetwork = WiFi.scanNetworks();
  if (numNetwork == 0) {
    html += F("<div>No WLAN found</div>");
  } else {
    html += F("<table><thead><tr><th>SSID</th><th>RSSI</th></tr></thead><tbody>");
    std::list<wifi_info_t> wifiInfoLists;
    for (int8_t i = 0; i < numNetwork; i++) {
      wifiInfoLists.push_back({  WiFi.SSID(i), WiFi.RSSI(i) });
    }
    wifiInfoLists.sort([](const wifi_info_t& a, const wifi_info_t& b){ return a.rssi > b.rssi; });
    for (wifi_info_t wifiInfo : wifiInfoLists) {
      html += String(F("<tr><td>")) + wifiInfo.ssid + F("</td><td>") + wifiInfo.rssi + F("dBm</td></tr>");
    }
    html += F("</tbody></table>");
  }

  html += F(
    "<h3>Enter WLAN config</h3>"
    "<form method='POST' action='wificonfigsave' autocomplete='off'>"
    "<input type='text' name='ssid' placeholder='ssid'/><br/>"
    "<input type='text' name='pass' placeholder='password'/><br/>"
    "<input type='submit'/>"
    );

  html += String(F("</body>"));

  setServerNoCacheHeader();
  server.send(200, "text/html", html);
}

void handleWifiConfigSave() {
  server.arg("ssid").toCharArray(ssid, sizeof(ssid) - 1);
  server.arg("pass").toCharArray(password, sizeof(password) - 1);
  setServerNoCacheHeader();
  server.sendHeader("Location", "/", true);
  server.send(302, "text/plain", "");
  server.client().stop(); // Stop is needed because we sent no content length

  saveWifiConfigToEEPROM();
  tryToConnect = strlen(ssid) > 0;
}

void handleSwitchPost() {
  toggleServoPosition();

  String body = String(F("servo angle changed. current angle: ")) + servo.read();
  setServerNoCacheHeader();
  server.send(200, "text/plain", body);
}


void handleNotFound() {
  if (captivePortal()) { // If caprive portal redirect instead of displaying the error page.
    return;
  }
  String message = F("File Not Found\n\n");
  message += String(F("URI: ")) + server.uri();
  message += String(F("\nMethod: ")) + (server.method() == HTTP_GET) ? "GET" : "POST";
  message += String(F("\nArguments: ")) + server.args();
  message += F("\n");

  for (uint8_t i = 0; i < server.args(); i++) {
    message += String(F(" ")) + server.argName(i) + F(": ") + server.arg(i) + F("\n");
  }
  setServerNoCacheHeader();
  server.send(404, "text/plain", message);
}
