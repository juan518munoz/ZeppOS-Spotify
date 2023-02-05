const deviceInfo = hmSetting.getDeviceInfo();
const {
  width: DEVICE_WIDTH,
  height: DEVICE_HEIGHT,
  screenShape,
  deviceName,
} = deviceInfo;

const PLAY_BUTTON = {
  band7: {
    x: px(DEVICE_WIDTH / 2 - 24),
    y: px(DEVICE_HEIGHT * 0.55),
  },
};

const NEXT_BUTTON = {
  band7: {
    x: px(DEVICE_WIDTH * 0.95 - 48),
    y: px(DEVICE_HEIGHT * 0.55),
    src: "next.png",
  },
};

const PREV_BUTTON = {
  band7: {
    x: px(DEVICE_WIDTH * 0.05),
    y: px(DEVICE_HEIGHT * 0.55),
    src: "previous.png",
  },
};

const PROGRESS_BAR_BKG = {
  x: px(8),
  y: px(DEVICE_HEIGHT * 0.4),
  w: px(DEVICE_WIDTH - 8),
  h: px(4),
  radius: px(2),
  color: 0x5e5e5e,
};

const PROGRESS_BAR = {
  x: px(8),
  y: px(DEVICE_HEIGHT * 0.4),
  w: px(0),
  h: px(4),
  radius: px(2),
  color: 0x1db954,
};

const LIKE_BUTTON = {
  band7: {
    x: DEVICE_WIDTH / 2 - px(68),
    y: DEVICE_HEIGHT - px(78),
  },
};

const SHUFFLE_BUTTON = {
  band7: {
    x: DEVICE_WIDTH / 2 + px(20),
    y: DEVICE_HEIGHT - px(74),
  },
};

const QUEUED_SONG = {
  band7: {
    x: 0,
    //y: px(DEVICE_HEIGHT + 70 * (i + 1)),
    w: px(DEVICE_WIDTH),
    h: px(30),
    color: 0xffffff,
    text_size: px(24),
    align_h: hmUI.align.LEFT,
    align_v: hmUI.align.CENTER_V,
    text_style: hmUI.text_style.ELLIPSIS,
    text: "",
  },
};

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
