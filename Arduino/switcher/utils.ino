IPAddress generatePrivateIpAddress() {
  byte highOrderHost = random(1, 255);
  byte lowerOrderHost = random(1, 255);
  return IPAddress(172, 18, highOrderHost, lowerOrderHost);
}

String macAddressString() {
  byte mac[6];
  WiFi.macAddress(mac);
  String macString = "";
  for (int i = 0; i < 6; i++) {
    macString += String(mac[i],HEX);
  }
  return macString;
}

/** Is this an IP? */
boolean isIp(String str) {
  for (size_t i = 0; i < str.length(); i++) {
    int c = str.charAt(i);
    if (c != '.' && (c < '0' || c > '9')) {
      return false;
    }
  }
  return true;
}

/** IP to String? */
String toStringIp(IPAddress ip) {
  String res = "";
  if (ip[0] != 0) {
    for (int i = 0; i < 3; i++) {
      res += String((ip >> (8 * i)) & 0xFF) + ".";
    }
    res += String(((ip >> 8 * 3)) & 0xFF);
  }
  return res;
}
