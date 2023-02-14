const deviceInfo = hmSetting.getDeviceInfo();
const {
  width: DEVICE_WIDTH,
  height: DEVICE_HEIGHT,
  screenShape,
  deviceName,
} = deviceInfo;

const PLAY_BUTTON = {
  band7: {
    x: DEVICE_WIDTH / 2 - px(32),
    y: px(DEVICE_HEIGHT * 0.15),
    src: `playlistPlay.png`,
  },
  gts4mini: {
    x: DEVICE_WIDTH / 2 - px(43),
    y: px(DEVICE_HEIGHT * 0.15),
    src: `playlistPlay.png`,
  },
  gts3: {
    x: DEVICE_WIDTH / 2 - px(47),
    y: px(DEVICE_HEIGHT * 0.15),
    src: `playlistPlay.png`,
  },
  gtr3: {
    x: DEVICE_WIDTH / 2 - px(47),
    y: px(DEVICE_HEIGHT * 0.15),
    src: `playlistPlay.png`,
  },
  gts4: {
    x: DEVICE_WIDTH / 2 - px(47),
    y: px(DEVICE_HEIGHT * 0.15),
    src: `playlistPlay.png`,
  },
};

const PLAYLIST_TITLE = {
  band7: {
    x: 0,
    y: px(DEVICE_HEIGHT * 0.35),
    w: px(DEVICE_WIDTH),
    h: px(48),
    color: 0x1fdf64,
    text_size: px(32),
    align_h: hmUI.align.CENTER_H,
    align_v: hmUI.align.CENTER_V,
    text_style: hmUI.text_style.NONE,
  },
  gts4mini: {
    x: 0,
    y: px(DEVICE_HEIGHT * 0.37),
    w: px(DEVICE_WIDTH),
    h: px(48),
    color: 0x1fdf64,
    text_size: px(38),
    align_h: hmUI.align.CENTER_H,
    align_v: hmUI.align.CENTER_V,
    text_style: hmUI.text_style.NONE,
  },
  gts3: {
    x: 0,
    y: px(DEVICE_HEIGHT * 0.37),
    w: px(DEVICE_WIDTH),
    h: px(50),
    color: 0x1fdf64,
    text_size: px(40),
    align_h: hmUI.align.CENTER_H,
    align_v: hmUI.align.CENTER_V,
    text_style: hmUI.text_style.NONE,
  },
  gtr3: {
    x: 0,
    y: px(DEVICE_HEIGHT * 0.37),
    w: px(DEVICE_WIDTH),
    h: px(50),
    color: 0x1fdf64,
    text_size: px(40),
    align_h: hmUI.align.CENTER_H,
    align_v: hmUI.align.CENTER_V,
    text_style: hmUI.text_style.NONE,
  },
  gts4: {
    x: 0,
    y: px(DEVICE_HEIGHT * 0.37),
    w: px(DEVICE_WIDTH),
    h: px(50),
    color: 0x1fdf64,
    text_size: px(40),
    align_h: hmUI.align.CENTER_H,
    align_v: hmUI.align.CENTER_V,
    text_style: hmUI.text_style.NONE,
  },
};

const SONG = {
  band7: {
    x: 0,
    //y: px(DEVICE_HEIGHT * 0.5 + 40 * i),
    w: px(DEVICE_WIDTH),
    h: px(28),
    color: 0xffffff,
    text_size: px(24),
    align_h: hmUI.align.LEFT,
    align_v: hmUI.align.CENTER_V,
    text_style: hmUI.text_style.ELLIPSIS,
  },
  gts4mini: {
    x: 0,
    //y: px(DEVICE_HEIGHT * 0.5 + 40 * i),
    w: px(DEVICE_WIDTH),
    h: px(32),
    color: 0xffffff,
    text_size: px(30),
    align_h: hmUI.align.LEFT,
    align_v: hmUI.align.CENTER_V,
    text_style: hmUI.text_style.ELLIPSIS,
  },
  gts3: {
    x: 0,
    //y: px(DEVICE_HEIGHT * 0.5 + 40 * i),
    w: px(DEVICE_WIDTH),
    h: px(32),
    color: 0xffffff,
    text_size: px(30),
    align_h: hmUI.align.LEFT,
    align_v: hmUI.align.CENTER_V,
    text_style: hmUI.text_style.ELLIPSIS,
  },
  gtr3: {
    x: 0,
    //y: px(DEVICE_HEIGHT * 0.5 + 40 * i),
    w: px(DEVICE_WIDTH),
    h: px(32),
    color: 0xffffff,
    text_size: px(30),
    align_h: hmUI.align.LEFT,
    align_v: hmUI.align.CENTER_V,
    text_style: hmUI.text_style.ELLIPSIS,
  },
  gts4: {
    x: 0,
    //y: px(DEVICE_HEIGHT * 0.5 + 40 * i),
    w: px(DEVICE_WIDTH),
    h: px(32),
    color: 0xffffff,
    text_size: px(30),
    align_h: hmUI.align.LEFT,
    align_v: hmUI.align.CENTER_V,
    text_style: hmUI.text_style.ELLIPSIS,
  },
};

const ARTIST = {
  band7: {
    x: 0,
    //y: px(DEVICE_HEIGHT * 0.55 + 40 * i),
    w: px(DEVICE_WIDTH),
    h: px(20),
    color: 0xb3b3b3,
    text_size: px(16),
    align_h: hmUI.align.LEFT,
    align_v: hmUI.align.CENTER_V,
    text_style: hmUI.text_style.ELLIPSIS,
  },
  gts4mini: {
    x: 0,
    //y: px(DEVICE_HEIGHT * 0.55 + 40 * i),
    w: px(DEVICE_WIDTH),
    h: px(24),
    color: 0xb3b3b3,
    text_size: px(20),
    align_h: hmUI.align.LEFT,
    align_v: hmUI.align.CENTER_V,
    text_style: hmUI.text_style.ELLIPSIS,
  },
  gts3: {
    x: 0,
    //y: px(DEVICE_HEIGHT * 0.55 + 40 * i),
    w: px(DEVICE_WIDTH),
    h: px(24),
    color: 0xb3b3b3,
    text_size: px(20),
    align_h: hmUI.align.LEFT,
    align_v: hmUI.align.CENTER_V,
    text_style: hmUI.text_style.ELLIPSIS,
  },
  gtr3: {
    x: 0,
    //y: px(DEVICE_HEIGHT * 0.55 + 40 * i),
    w: px(DEVICE_WIDTH),
    h: px(24),
    color: 0xb3b3b3,
    text_size: px(20),
    align_h: hmUI.align.LEFT,
    align_v: hmUI.align.CENTER_V,
    text_style: hmUI.text_style.ELLIPSIS,
  },
  gts4: {
    x: 0,
    //y: px(DEVICE_HEIGHT * 0.55 + 40 * i),
    w: px(DEVICE_WIDTH),
    h: px(24),
    color: 0xb3b3b3,
    text_size: px(20),
    align_h: hmUI.align.LEFT,
    align_v: hmUI.align.CENTER_V,
    text_style: hmUI.text_style.ELLIPSIS,
  },
};

export const getStyles = (deviceName) => {
  if (deviceName == "Amazfit Band 7")
    return {
      PLAY_BUTTON: PLAY_BUTTON.band7,
      PLAYLIST_TITLE: PLAYLIST_TITLE.band7,
      SONG: SONG.band7,
      ARTIST: ARTIST.band7,
    };
  else if (deviceName == "GTS 4 mini")
    return {
      PLAY_BUTTON: PLAY_BUTTON.gts4mini,
      PLAYLIST_TITLE: PLAYLIST_TITLE.gts4mini,
      SONG: SONG.gts4mini,
      ARTIST: ARTIST.gts4mini,
    };
  else if (deviceName == "GTS 3")
    return {
      PLAY_BUTTON: PLAY_BUTTON.gts3,
      PLAYLIST_TITLE: PLAYLIST_TITLE.gts3,
      SONG: SONG.gts3,
      ARTIST: ARTIST.gts3,
    };
  else if (deviceName == "GTS 4")
    return {
      PLAY_BUTTON: PLAY_BUTTON.gts4,
      PLAYLIST_TITLE: PLAYLIST_TITLE.gts4,
      SONG: SONG.gts4,
      ARTIST: ARTIST.gts4,
    };
  return {
    // gtr 3
    PLAY_BUTTON: PLAY_BUTTON.gtr3,
    PLAYLIST_TITLE: PLAYLIST_TITLE.gtr3,
    SONG: SONG.gtr3,
    ARTIST: ARTIST.gtr3,
  };
};
