void loadWifiConfigFromEEPROM() {
  EEPROM.begin(512);
  EEPROM.get(0, ssid);
  EEPROM.get(0 + sizeof(ssid), password);
  EEPROM.end();
}

void saveWifiConfigToEEPROM() {
  EEPROM.begin(512);
  EEPROM.put(0, ssid);
  EEPROM.put(0 + sizeof(ssid), password);
  EEPROM.commit();
  EEPROM.end();
}

//void clearWifiConfig() {
//  EEPROM.begin(512);
//  // write a 0 to all 512 bytes of the EEPROM
//  for (int i = 0; i < 512; i++) { EEPROM.write(i, 0); }
//  EEPROM.end();
//}
