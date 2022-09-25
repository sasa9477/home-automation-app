struct FlashChipConfig {
  uint32_t chipId;
  uint32_t realSize;
  uint32_t ideSize;
  const char* ideMode;
  uint32_t ideSpeed;
  uint8_t cpuFreqMHz;
  uint8_t bootVersion;
  const char* bootMode;
  const char* sdkVersion;
  String coreVersion;
  String fullVersion;
  const char* configValid;
};

struct FlashChipConfig loadFlashChipConfig() {
  uint32_t realSize = ESP.getFlashChipRealSize();
  uint32_t ideSize = ESP.getFlashChipSize();
  FlashMode_t ideMode = ESP.getFlashChipMode();
  uint8_t bootMode = ESP.getBootMode();

  return FlashChipConfig{
    ESP.getFlashChipId(),
    realSize,
    ideSize,
    (ideMode == FM_QIO ? "QIO"
    : ideMode == FM_QOUT ? "QOUT"
    : ideMode == FM_DIO  ? "DIO"
    : ideMode == FM_DOUT ? "DOUT"
    : "UNKNOWN"),
    ESP.getFlashChipSpeed(),
    ESP.getCpuFreqMHz(),
    ESP.getBootVersion(),
    (bootMode == 0 ? "SYS_BOOT_ENHANCE_MODE" : "SYS_BOOT_NORMAL_MODE"),
    ESP.getSdkVersion(),
    ESP.getCoreVersion(),
    ESP.getFullVersion(),
    (ideSize == realSize ? "OK" : "NG")
  };
}
