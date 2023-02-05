const deviceInfo = hmSetting.getDeviceInfo();
const {
  width: DEVICE_WIDTH,
  height: DEVICE_HEIGHT,
  screenShape,
  deviceName,
} = deviceInfo;

export const getStyles = (deviceName) => {
  if (deviceName == "Amazfit Band 7")
    return {
      PLAY_BUTTON: PLAY_BUTTON.band7,
      NEXT_BUTTON: NEXT_BUTTON.band7,
      PREV_BUTTON: PREV_BUTTON.band7,
      PROGRESS_BAR_BKG: PROGRESS_BAR_BKG,
      PROGRESS_BAR: PROGRESS_BAR,
      LIKE_BUTTON: LIKE_BUTTON.band7,
      SHUFFLE_BUTTON: SHUFFLE_BUTTON.band7,
      QUEUED_SONG: QUEUED_SONG.band7,
    };
};
