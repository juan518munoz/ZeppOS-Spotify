const deviceInfo = hmSetting.getDeviceInfo();
const {
  width: DEVICE_WIDTH,
  height: DEVICE_HEIGHT,
  screenShape,
  deviceName,
} = deviceInfo;

const controlsStart = DEVICE_HEIGHT;
const queueStart = DEVICE_HEIGHT * 2;

const DEVICES_BUTTON = {
  band7: {
    x: 0,
    y: (DEVICE_HEIGHT * 1) / 4,
    w: DEVICE_WIDTH,
    h: DEVICE_HEIGHT / 2,
    radius: 12,
    normal_color: 0x1fdf64,
    press_color: 0x1fdf64,
    //w: -1,
    //h: -1,
    //normal_src: 'button_normal.png',
    //press_src: 'button_press.png',
    text: "devices",
    click_func: () => {
      hmApp.gotoPage({ url: "pages/devices/devices.page" });
    },
  },
  gts4mini: {
    x: 0,
    y: (DEVICE_HEIGHT * 1) / 4,
    w: DEVICE_WIDTH,
    h: DEVICE_HEIGHT / 2,
    radius: 12,
    normal_color: 0x1fdf64,
    press_color: 0x1fdf64,
    //w: -1,
    //h: -1,
    //normal_src: 'button_normal.png',
    //press_src: 'button_press.png',
    text: "devices",
    click_func: () => {
      hmApp.gotoPage({ url: "pages/devices/devices.page" });
    },
  },
  gts3: {
    x: 0,
    y: (DEVICE_HEIGHT * 1) / 4,
    w: DEVICE_WIDTH,
    h: DEVICE_HEIGHT / 2,
    radius: 12,
    normal_color: 0x1fdf64,
    press_color: 0x1fdf64,
    //w: -1,
    //h: -1,
    //normal_src: 'button_normal.png',
    //press_src: 'button_press.png',
    text: "devices",
    click_func: () => {
      hmApp.gotoPage({ url: "pages/devices/devices.page" });
    },
  },
  gtr3: {
    x: 0,
    y: (DEVICE_HEIGHT * 1) / 4,
    w: DEVICE_WIDTH,
    h: DEVICE_HEIGHT / 2,
    radius: 12,
    normal_color: 0x1fdf64,
    press_color: 0x1fdf64,
    //w: -1,
    //h: -1,
    //normal_src: 'button_normal.png',
    //press_src: 'button_press.png',
    text: "devices",
    click_func: () => {
      hmApp.gotoPage({ url: "pages/devices/devices.page" });
    },
  },
  gts4: {
    x: 0,
    y: (DEVICE_HEIGHT * 1) / 4,
    w: DEVICE_WIDTH,
    h: DEVICE_HEIGHT / 2,
    radius: 12,
    normal_color: 0x1fdf64,
    press_color: 0x1fdf64,
    //w: -1,
    //h: -1,
    //normal_src: 'button_normal.png',
    //press_src: 'button_press.png',
    text: "devices",
    click_func: () => {
      hmApp.gotoPage({ url: "pages/devices/devices.page" });
    },
  },
};

const SONG = {
  band7: {
    x: 0,
    y: px(controlsStart + DEVICE_HEIGHT * 0.12),
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
    y: px(controlsStart + DEVICE_HEIGHT * 0.12),
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
    y: px(controlsStart + DEVICE_HEIGHT * 0.12),
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
    y: px(controlsStart + DEVICE_HEIGHT * 0.12),
    w: px(DEVICE_WIDTH - 24),
    h: px(60),
    color: 0xffffff,
    text_size: px(48),
    align_h: hmUI.align.CENTER_H,
    align_v: hmUI.align.CENTER_V,
    text_style: hmUI.text_style.NONE,
    text: "",
  },
  gts4: {
    x: 0,
    y: px(controlsStart + DEVICE_HEIGHT * 0.12),
    w: px(DEVICE_WIDTH),
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
    y: px(controlsStart + DEVICE_HEIGHT * 0.24),
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
    y: px(controlsStart + DEVICE_HEIGHT * 0.24),
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
    y: px(controlsStart + DEVICE_HEIGHT * 0.24),
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
    y: px(controlsStart + DEVICE_HEIGHT * 0.24),
    w: px(DEVICE_WIDTH),
    h: px(40),
    color: 0xb3b3b3,
    text_size: px(32),
    align_h: hmUI.align.CENTER_H,
    align_v: hmUI.align.CENTER_V,
    text_style: hmUI.text_style.NONE,
    text: "",
  },
  gts4: {
    x: 0,
    y: px(controlsStart + DEVICE_HEIGHT * 0.24),
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
    x: px(DEVICE_WIDTH / 2) - px(24),
    y: px(controlsStart + DEVICE_HEIGHT * 0.55),
  },
  gts4mini: {
    x: px(DEVICE_WIDTH / 2 - 43),
    y: px(controlsStart + DEVICE_HEIGHT * 0.42),
  },
  gts3: {
    x: px(DEVICE_WIDTH / 2 - 47),
    y: px(controlsStart + DEVICE_HEIGHT * 0.45),
  },
  gtr3: {
    x: px(DEVICE_WIDTH / 2 - 47),
    y: px(controlsStart + DEVICE_HEIGHT * 0.5),
  },
  gts4: {
    x: px(DEVICE_WIDTH / 2 - 47),
    y: px(controlsStart + DEVICE_HEIGHT * 0.45),
  },
};

const NEXT_BUTTON = {
  band7: {
    x: px(DEVICE_WIDTH * 0.95 - 48),
    y: px(controlsStart + DEVICE_HEIGHT * 0.55),
    src: "next.png",
  },
  gts4mini: {
    x: px(DEVICE_WIDTH * 0.95 - 49),
    y: px(controlsStart + DEVICE_HEIGHT * 0.47),
    src: "next.png",
  },
  gts3: {
    x: px(DEVICE_WIDTH * 0.95 - 73),
    y: px(controlsStart + DEVICE_HEIGHT * 0.45 + 12),
    src: "next.png",
  },
  gtr3: {
    x: px(DEVICE_WIDTH * 0.95 - 73),
    y: px(controlsStart + DEVICE_HEIGHT * 0.5 + 12),
    src: "next.png",
  },
  gts4: {
    x: px(DEVICE_WIDTH * 0.95 - 73),
    y: px(controlsStart + DEVICE_HEIGHT * 0.45 + 12),
    src: "next.png",
  },
};

const PREV_BUTTON = {
  band7: {
    x: px(DEVICE_WIDTH * 0.05),
    y: px(controlsStart + DEVICE_HEIGHT * 0.55),
    src: "previous.png",
  },
  gts4mini: {
    x: px(DEVICE_WIDTH * 0.05),
    y: px(controlsStart + DEVICE_HEIGHT * 0.47),
    src: "previous.png",
  },
  gts3: {
    x: px(DEVICE_WIDTH * 0.05),
    y: px(controlsStart + DEVICE_HEIGHT * 0.45 + 12),
    src: "previous.png",
  },
  gtr3: {
    x: px(DEVICE_WIDTH * 0.05),
    y: px(controlsStart + DEVICE_HEIGHT * 0.5 + 12),
    src: "previous.png",
  },
  gts4: {
    x: px(DEVICE_WIDTH * 0.05),
    y: px(controlsStart + DEVICE_HEIGHT * 0.45 + 12),
    src: "previous.png",
  },
};

const PROGRESS_BAR_BKG = {
  band7: {
    x: px(8),
    y: px(controlsStart + DEVICE_HEIGHT * 0.4),
    w: px(DEVICE_WIDTH - 8),
    h: px(4),
    radius: px(2),
    color: 0x5e5e5e,
  },
  gts4mini: {
    x: px(8),
    y: px(controlsStart + DEVICE_HEIGHT * 0.35),
    w: px(DEVICE_WIDTH) - px(16),
    h: px(8),
    radius: px(4),
    color: 0x5e5e5e,
  },
  gts3: {
    x: px(8),
    y: px(controlsStart + DEVICE_HEIGHT * 0.38),
    w: px(DEVICE_WIDTH - 16),
    h: px(8),
    radius: px(4),
    color: 0x5e5e5e,
  },
  gtr3: {
    x: px(8),
    y: px(controlsStart + DEVICE_HEIGHT * 0.4),
    w: px(DEVICE_WIDTH - 16),
    h: px(8),
    radius: px(4),
    color: 0x5e5e5e,
  },
  gts4: {
    x: px(8),
    y: px(controlsStart + DEVICE_HEIGHT * 0.38),
    w: px(DEVICE_WIDTH - 16),
    h: px(8),
    radius: px(4),
    color: 0x5e5e5e,
  },
};

const PROGRESS_BAR = {
  band7: {
    x: px(8),
    y: px(controlsStart + DEVICE_HEIGHT * 0.4),
    w: px(0),
    h: px(4),
    radius: px(2),
    color: 0x1db954,
  },
  gts4mini: {
    x: px(8),
    y: px(controlsStart + DEVICE_HEIGHT * 0.35),
    w: px(0), // doesnt work
    h: px(8),
    radius: px(4),
    color: 0x1db954,
  },
  gts3: {
    x: px(8),
    y: px(controlsStart + DEVICE_HEIGHT * 0.38),
    w: px(0),
    h: px(8),
    radius: px(4),
    color: 0x1db954,
  },
  gtr3: {
    x: px(8),
    y: px(controlsStart + DEVICE_HEIGHT * 0.4),
    w: px(0),
    h: px(8),
    radius: px(4),
    color: 0x1db954,
  },
  gts4: {
    x: px(8),
    y: px(controlsStart + DEVICE_HEIGHT * 0.38),
    w: px(0),
    h: px(8),
    radius: px(4),
    color: 0x1db954,
  },
};

const LIKE_BUTTON = {
  band7: {
    x: DEVICE_WIDTH / 2 - px(68),
    y: controlsStart + DEVICE_HEIGHT,
  },
  gts4mini: {
    x: DEVICE_WIDTH / 2 - px(68) - px(30),
    y: controlsStart + DEVICE_HEIGHT - px(78) - px(28),
  },
  gts3: {
    x: DEVICE_WIDTH / 2 - px(68) - px(30),
    y: controlsStart + DEVICE_HEIGHT - px(78) - px(44),
  },
  gtr3: {
    x: DEVICE_WIDTH / 2 - px(68) - px(38),
    y: controlsStart + DEVICE_HEIGHT - px(78) - px(20),
  },
  gts4: {
    x: DEVICE_WIDTH / 2 - px(68) - px(40),
    y: controlsStart + DEVICE_HEIGHT - px(78) - px(40),
  },
};

const SHUFFLE_BUTTON = {
  band7: {
    x: DEVICE_WIDTH / 2 + px(20),
    y: controlsStart + DEVICE_HEIGHT + px(4),
  },
  gts4mini: {
    x: DEVICE_WIDTH / 2 + px(20) + px(30),
    y: controlsStart + DEVICE_HEIGHT - px(74) - px(28),
  },
  gts3: {
    x: DEVICE_WIDTH / 2 + px(20) + px(30),
    y: controlsStart + DEVICE_HEIGHT - px(74) - px(44),
  },
  gtr3: {
    x: DEVICE_WIDTH / 2 + px(20) + px(38),
    y: controlsStart + DEVICE_HEIGHT - px(74) - px(20),
  },
  gts4: {
    x: DEVICE_WIDTH / 2 + px(20) + px(40),
    y: controlsStart + DEVICE_HEIGHT - px(74) - px(40),
  },
};

const SPOTIFY_ICON = {
  band7: {
    x: DEVICE_WIDTH / 2 - px(24),
    y: controlsStart + DEVICE_HEIGHT - px(78),
    src: "player_icon.png",
  },
  gts4mini: {
    x: DEVICE_WIDTH / 2 - px(24),
    y: controlsStart + DEVICE_HEIGHT - px(24) - px(46),
    src: "player_icon.png",
  },
  gts3: {
    x: DEVICE_WIDTH / 2 - px(24),
    y: controlsStart + DEVICE_HEIGHT - px(24) - px(40),
    src: "player_icon.png",
  },
  gtr3: {
    x: DEVICE_WIDTH / 2 - px(24),
    y: controlsStart + DEVICE_HEIGHT - px(24) - px(28),
    src: "player_icon.png",
  },
  gts4: {
    x: DEVICE_WIDTH / 2 - px(24),
    y: controlsStart + DEVICE_HEIGHT - px(24) - px(42),
    src: "player_icon.png",
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
  gts4: {
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
      DEVICES_BUTTON: DEVICES_BUTTON.band7,
      SONG: SONG.band7,
      ARTIST: ARTIST.band7,
      PLAY_BUTTON: PLAY_BUTTON.band7,
      NEXT_BUTTON: NEXT_BUTTON.band7,
      PREV_BUTTON: PREV_BUTTON.band7,
      PROGRESS_BAR_BKG: PROGRESS_BAR_BKG.band7,
      PROGRESS_BAR: PROGRESS_BAR.band7,
      LIKE_BUTTON: LIKE_BUTTON.band7,
      SHUFFLE_BUTTON: SHUFFLE_BUTTON.band7,
      SPOTIFY_ICON: SPOTIFY_ICON.band7,
      QUEUED_SONG: QUEUED_SONG.band7,
    };
  else if (deviceName == "GTS 4 mini")
    return {
      DEVICES_BUTTON: DEVICES_BUTTON.gts4mini,
      SONG: SONG.gts4mini,
      ARTIST: ARTIST.gts4mini,
      PLAY_BUTTON: PLAY_BUTTON.gts4mini,
      NEXT_BUTTON: NEXT_BUTTON.gts4mini,
      PREV_BUTTON: PREV_BUTTON.gts4mini,
      PROGRESS_BAR_BKG: PROGRESS_BAR_BKG.gts4mini,
      PROGRESS_BAR: PROGRESS_BAR.gts4mini,
      LIKE_BUTTON: LIKE_BUTTON.gts4mini,
      SHUFFLE_BUTTON: SHUFFLE_BUTTON.gts4mini,
      SPOTIFY_ICON: SPOTIFY_ICON.gts4mini,
      QUEUED_SONG: QUEUED_SONG.gts4mini,
    };
  else if (deviceName == "GTS 3")
    return {
      DEVICES_BUTTON: DEVICES_BUTTON.gts3,
      SONG: SONG.gts3,
      ARTIST: ARTIST.gts3,
      PLAY_BUTTON: PLAY_BUTTON.gts3,
      NEXT_BUTTON: NEXT_BUTTON.gts3,
      PREV_BUTTON: PREV_BUTTON.gts3,
      PROGRESS_BAR_BKG: PROGRESS_BAR_BKG.gts3,
      PROGRESS_BAR: PROGRESS_BAR.gts3,
      LIKE_BUTTON: LIKE_BUTTON.gts3,
      SHUFFLE_BUTTON: SHUFFLE_BUTTON.gts3,
      SPOTIFY_ICON: SPOTIFY_ICON.gts3,
      QUEUED_SONG: QUEUED_SONG.gts3,
    };
  else if (deviceName == "GTS 4")
    return {
      DEVICES_BUTTON: DEVICES_BUTTON.gts4,
      SONG: SONG.gts4,
      ARTIST: ARTIST.gts4,
      PLAY_BUTTON: PLAY_BUTTON.gts4,
      NEXT_BUTTON: NEXT_BUTTON.gts4,
      PREV_BUTTON: PREV_BUTTON.gts4,
      PROGRESS_BAR_BKG: PROGRESS_BAR_BKG.gts4,
      PROGRESS_BAR: PROGRESS_BAR.gts4,
      LIKE_BUTTON: LIKE_BUTTON.gts4,
      SHUFFLE_BUTTON: SHUFFLE_BUTTON.gts4,
      SPOTIFY_ICON: SPOTIFY_ICON.gts4,
      QUEUED_SONG: QUEUED_SONG.gts4,
    };
  return {
    // gtr 3
    DEVICES_BUTTON: DEVICES_BUTTON.gtr3,
    SONG: SONG.gtr3,
    ARTIST: ARTIST.gtr3,
    PLAY_BUTTON: PLAY_BUTTON.gtr3,
    NEXT_BUTTON: NEXT_BUTTON.gtr3,
    PREV_BUTTON: PREV_BUTTON.gtr3,
    PROGRESS_BAR_BKG: PROGRESS_BAR_BKG.gtr3,
    PROGRESS_BAR: PROGRESS_BAR.gtr3,
    LIKE_BUTTON: LIKE_BUTTON.gtr3,
    SHUFFLE_BUTTON: SHUFFLE_BUTTON.gtr3,
    SPOTIFY_ICON: SPOTIFY_ICON.gtr3,
    QUEUED_SONG: QUEUED_SONG.gtr3,
  };
};
