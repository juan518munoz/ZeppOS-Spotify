const deviceInfo = hmSetting.getDeviceInfo();
const {
  width: DEVICE_WIDTH,
  height: DEVICE_HEIGHT,
  screenShape,
  deviceName,
} = deviceInfo;

const SONG = {
  band7: {
    x: 0,
    y: px(DEVICE_HEIGHT * 0.12),
    w: px(DEVICE_WIDTH),
    h: px(50),
    color: 0xffffff,
    text_size: px(36),
    align_h: hmUI.align.CENTER_H,
    align_v: hmUI.align.CENTER_V,
    text_style: hmUI.text_style.NONE,
    text: "",
  },
  gts4mini: {
    x: 0,
    y: px(DEVICE_HEIGHT * 0.12),
    w: px(DEVICE_WIDTH),
    h: px(50),
    color: 0xffffff,
    text_size: px(36),
    align_h: hmUI.align.CENTER_H,
    align_v: hmUI.align.CENTER_V,
    text_style: hmUI.text_style.NONE,
    text: "",
  },
  gts3: {
    x: 0,
    y: px(DEVICE_HEIGHT * 0.12),
    w: px(DEVICE_WIDTH),
    h: px(60),
    color: 0xffffff,
    text_size: px(48),
    align_h: hmUI.align.CENTER_H,
    align_v: hmUI.align.CENTER_V,
    text_style: hmUI.text_style.NONE,
    text: "",
  },
  gtr3: {
    x: px(24),
    y: px(DEVICE_HEIGHT * 0.12),
    w: px(DEVICE_WIDTH - 24),
    h: px(60),
    color: 0xffffff,
    text_size: px(48),
    align_h: hmUI.align.CENTER_H,
    align_v: hmUI.align.CENTER_V,
    text_style: hmUI.text_style.NONE,
    text: "",
  },
};

const ARTIST = {
  band7: {
    x: 0,
    y: px(DEVICE_HEIGHT * 0.24),
    w: px(DEVICE_WIDTH),
    h: px(30),
    color: 0xb3b3b3,
    text_size: px(24),
    align_h: hmUI.align.CENTER_H,
    align_v: hmUI.align.CENTER_V,
    text_style: hmUI.text_style.NONE,
    text: "",
  },
  gts4mini: {
    x: 0,
    y: px(DEVICE_HEIGHT * 0.24),
    w: px(DEVICE_WIDTH),
    h: px(30),
    color: 0xb3b3b3,
    text_size: px(24),
    align_h: hmUI.align.CENTER_H,
    align_v: hmUI.align.CENTER_V,
    text_style: hmUI.text_style.NONE,
    text: "",
  },
  gts3: {
    x: 0,
    y: px(DEVICE_HEIGHT * 0.24),
    w: px(DEVICE_WIDTH),
    h: px(40),
    color: 0xb3b3b3,
    text_size: px(32),
    align_h: hmUI.align.CENTER_H,
    align_v: hmUI.align.CENTER_V,
    text_style: hmUI.text_style.NONE,
    text: "",
  },
  gtr3: {
    x: 0,
    y: px(DEVICE_HEIGHT * 0.24),
    w: px(DEVICE_WIDTH),
    h: px(40),
    color: 0xb3b3b3,
    text_size: px(32),
    align_h: hmUI.align.CENTER_H,
    align_v: hmUI.align.CENTER_V,
    text_style: hmUI.text_style.NONE,
    text: "",
  },
};

const PLAY_BUTTON = {
  band7: {
    x: px(DEVICE_WIDTH / 2 - 24),
    y: px(DEVICE_HEIGHT * 0.55),
  },
  gts4mini: {
    x: px(DEVICE_WIDTH / 2 - 43),
    y: px(DEVICE_HEIGHT * 0.5),
  },
  gts3: {
    x: px(DEVICE_WIDTH / 2 - 47),
    y: px(DEVICE_HEIGHT * 0.5),
  },
  gtr3: {
    x: px(DEVICE_WIDTH / 2 - 47),
    y: px(DEVICE_HEIGHT * 0.5),
  },
};

const NEXT_BUTTON = {
  band7: {
    x: px(DEVICE_WIDTH * 0.95 - 48),
    y: px(DEVICE_HEIGHT * 0.55),
    src: "next.png",
  },
  gts4mini: {
    x: px(DEVICE_WIDTH * 0.95 - 49),
    y: px(DEVICE_HEIGHT * 0.55),
    src: "next.png",
  },
  gts3: {
    x: px(DEVICE_WIDTH * 0.95 - 73),
    y: px(DEVICE_HEIGHT * 0.5 + 12),
    src: "next.png",
  },
  gtr3: {
    x: px(DEVICE_WIDTH * 0.95 - 73),
    y: px(DEVICE_HEIGHT * 0.5 + 12),
    src: "next.png",
  },
};

const PREV_BUTTON = {
  band7: {
    x: px(DEVICE_WIDTH * 0.05),
    y: px(DEVICE_HEIGHT * 0.55),
    src: "previous.png",
  },
  gts4mini: {
    x: px(DEVICE_WIDTH * 0.05),
    y: px(DEVICE_HEIGHT * 0.55),
    src: "previous.png",
  },
  gts3: {
    x: px(DEVICE_WIDTH * 0.05),
    y: px(DEVICE_HEIGHT * 0.5 + 12),
    src: "previous.png",
  },
  gtr3: {
    x: px(DEVICE_WIDTH * 0.05),
    y: px(DEVICE_HEIGHT * 0.5 + 12),
    src: "previous.png",
  },
};

const PROGRESS_BAR_BKG = {
  band7: {
    x: px(8),
    y: px(DEVICE_HEIGHT * 0.4),
    w: px(DEVICE_WIDTH - 8),
    h: px(4),
    radius: px(2),
    color: 0x5e5e5e,
  },
  gts4mini: {
    x: px(8),
    y: px(DEVICE_HEIGHT * 0.4),
    w: px(DEVICE_WIDTH - 8),
    h: px(8),
    radius: px(4),
    color: 0x5e5e5e,
  },
  gts3: {
    x: px(8),
    y: px(DEVICE_HEIGHT * 0.4),
    w: px(DEVICE_WIDTH - 16),
    h: px(8),
    radius: px(4),
    color: 0x5e5e5e,
  },
  gtr3: {
    x: px(8),
    y: px(DEVICE_HEIGHT * 0.4),
    w: px(DEVICE_WIDTH - 16),
    h: px(8),
    radius: px(4),
    color: 0x5e5e5e,
  },
};

const PROGRESS_BAR = {
  band7: {
    x: px(8),
    y: px(DEVICE_HEIGHT * 0.4),
    w: px(0),
    h: px(4),
    radius: px(2),
    color: 0x1db954,
  },
  gts4mini: {
    x: px(8),
    y: px(DEVICE_HEIGHT * 0.4),
    w: px(0),
    h: px(8),
    radius: px(4),
    color: 0x1db954,
  },
  gts3: {
    x: px(8),
    y: px(DEVICE_HEIGHT * 0.4),
    w: px(0),
    h: px(8),
    radius: px(4),
    color: 0x1db954,
  },
  gtr3: {
    x: px(8),
    y: px(DEVICE_HEIGHT * 0.4),
    w: px(0),
    h: px(8),
    radius: px(4),
    color: 0x1db954,
  },
};

const LIKE_BUTTON = {
  band7: {
    x: DEVICE_WIDTH / 2 - px(68),
    y: DEVICE_HEIGHT - px(78),
  },
  gts4mini: {
    x: DEVICE_WIDTH / 2 - px(68),
    y: DEVICE_HEIGHT - px(78),
  },
  gts3: {
    x: DEVICE_WIDTH / 2 - px(68),
    y: DEVICE_HEIGHT - px(78),
  },
  gtr3: {
    x: DEVICE_WIDTH / 2 - px(68),
    y: DEVICE_HEIGHT - px(78),
  },
};

const SHUFFLE_BUTTON = {
  band7: {
    x: DEVICE_WIDTH / 2 + px(20),
    y: DEVICE_HEIGHT - px(74),
  },
  gts4mini: {
    x: DEVICE_WIDTH / 2 + px(20),
    y: DEVICE_HEIGHT - px(74),
  },
  gts3: {
    x: DEVICE_WIDTH / 2 + px(20),
    y: DEVICE_HEIGHT - px(74),
  },
  gtr3: {
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
  gts4mini: {
    x: 0,
    //y: px(DEVICE_HEIGHT + 70 * (i + 1)),
    w: px(DEVICE_WIDTH),
    h: px(32),
    color: 0xffffff,
    text_size: px(30),
    align_h: hmUI.align.LEFT,
    align_v: hmUI.align.CENTER_V,
    text_style: hmUI.text_style.ELLIPSIS,
    text: "",
  },
  gts3: {
    x: 0,
    //y: px(DEVICE_HEIGHT + 70 * (i + 1)),
    w: px(DEVICE_WIDTH),
    h: px(48),
    color: 0xffffff,
    text_size: px(36),
    align_h: hmUI.align.LEFT,
    align_v: hmUI.align.CENTER_V,
    text_style: hmUI.text_style.ELLIPSIS,
    text: "",
  },
  gtr3: {
    x: 0,
    //y: px(DEVICE_HEIGHT + 70 * (i + 1)),
    w: px(DEVICE_WIDTH),
    h: px(48),
    color: 0xffffff,
    text_size: px(36),
    align_h: hmUI.align.LEFT,
    align_v: hmUI.align.CENTER_V,
    text_style: hmUI.text_style.ELLIPSIS,
    text: "",
  },
};

export const getStyles = (deviceName) => {
  if (deviceName == "Amazfit Band 7")
    return {
      SONG: SONG.band7,
      ARTIST: ARTIST.band7,
      PLAY_BUTTON: PLAY_BUTTON.band7,
      NEXT_BUTTON: NEXT_BUTTON.band7,
      PREV_BUTTON: PREV_BUTTON.band7,
      PROGRESS_BAR_BKG: PROGRESS_BAR_BKG.band7,
      PROGRESS_BAR: PROGRESS_BAR.band7,
      LIKE_BUTTON: LIKE_BUTTON.band7,
      SHUFFLE_BUTTON: SHUFFLE_BUTTON.band7,
      QUEUED_SONG: QUEUED_SONG.band7,
    };
  else if (deviceName == "GTS 4 mini")
    return {
      SONG: SONG.gts4mini,
      ARTIST: ARTIST.gts4mini,
      PLAY_BUTTON: PLAY_BUTTON.gts4mini,
      NEXT_BUTTON: NEXT_BUTTON.gts4mini,
      PREV_BUTTON: PREV_BUTTON.gts4mini,
      PROGRESS_BAR_BKG: PROGRESS_BAR_BKG.gts4mini,
      PROGRESS_BAR: PROGRESS_BAR.gts4mini,
      LIKE_BUTTON: LIKE_BUTTON.gts4mini,
      SHUFFLE_BUTTON: SHUFFLE_BUTTON.gts4mini,
      QUEUED_SONG: QUEUED_SONG.gts4mini,
    };
  else if (deviceName == "GTS 3")
    return {
      SONG: SONG.gts3,
      ARTIST: ARTIST.gts3,
      PLAY_BUTTON: PLAY_BUTTON.gts3,
      NEXT_BUTTON: NEXT_BUTTON.gts3,
      PREV_BUTTON: PREV_BUTTON.gts3,
      PROGRESS_BAR_BKG: PROGRESS_BAR_BKG.gts3,
      PROGRESS_BAR: PROGRESS_BAR.gts3,
      LIKE_BUTTON: LIKE_BUTTON.gts3,
      SHUFFLE_BUTTON: SHUFFLE_BUTTON.gts3,
      QUEUED_SONG: QUEUED_SONG.gts3,
    };
  return {
    // gtr 3
    SONG: SONG.gtr3,
    ARTIST: ARTIST.gtr3,
    PLAY_BUTTON: PLAY_BUTTON.gtr3,
    NEXT_BUTTON: NEXT_BUTTON.gtr3,
    PREV_BUTTON: PREV_BUTTON.gtr3,
    PROGRESS_BAR_BKG: PROGRESS_BAR_BKG.gtr3,
    PROGRESS_BAR: PROGRESS_BAR.gtr3,
    LIKE_BUTTON: LIKE_BUTTON.gtr3,
    SHUFFLE_BUTTON: SHUFFLE_BUTTON.gtr3,
    QUEUED_SONG: QUEUED_SONG.gtr3,
  };
};
