const deviceInfo = hmSetting.getDeviceInfo();
const {
  width: DEVICE_WIDTH,
  height: DEVICE_HEIGHT,
  screenShape,
  deviceName,
} = deviceInfo;

const LIBRARY_HEADER = {
  band7: {
    x: 0,
    y: px(DEVICE_HEIGHT * 0.15),
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
    y: px(DEVICE_HEIGHT * 0.15),
    w: px(DEVICE_WIDTH),
    h: px(48),
    color: 0x1fdf64,
    text_size: px(32),
    align_h: hmUI.align.CENTER_H,
    align_v: hmUI.align.CENTER_V,
    text_style: hmUI.text_style.NONE,
  },
  gts3: {
    x: 0,
    y: px(DEVICE_HEIGHT * 0.15),
    w: px(DEVICE_WIDTH),
    h: px(52),
    color: 0x1fdf64,
    text_size: px(42),
    align_h: hmUI.align.CENTER_H,
    align_v: hmUI.align.CENTER_V,
    text_style: hmUI.text_style.NONE,
  },
  gtr3: {
    x: 0,
    y: px(DEVICE_HEIGHT * 0.15),
    w: px(DEVICE_WIDTH),
    h: px(52),
    color: 0x1fdf64,
    text_size: px(42),
    align_h: hmUI.align.CENTER_H,
    align_v: hmUI.align.CENTER_V,
    text_style: hmUI.text_style.NONE,
  },
  gts4: {
    x: 0,
    y: px(DEVICE_HEIGHT * 0.15),
    w: px(DEVICE_WIDTH),
    h: px(52),
    color: 0x1fdf64,
    text_size: px(42),
    align_h: hmUI.align.CENTER_H,
    align_v: hmUI.align.CENTER_V,
    text_style: hmUI.text_style.NONE,
  },
};

const TITLE = {
  band7: {
    x: 0,
    //y: px(DEVICE_HEIGHT * 0.35 + 60 * i),
    w: px(DEVICE_WIDTH),
    h: px(36),
    color: 0xffffff,
    text_size: px(24),
    align_h: hmUI.align.LEFT,
    align_v: hmUI.align.CENTER_V,
    text_style: hmUI.text_style.ELLIPSIS,
    //text: name,
  },
  gts4mini: {
    x: 0,
    //y: px(DEVICE_HEIGHT * 0.35 + 60 * i),
    w: px(DEVICE_WIDTH),
    h: px(42),
    color: 0xffffff,
    text_size: px(30),
    align_h: hmUI.align.LEFT,
    align_v: hmUI.align.CENTER_V,
    text_style: hmUI.text_style.ELLIPSIS,
    //text: name,
  },
  gts3: {
    x: 0,
    //y: px(DEVICE_HEIGHT * 0.35 + 60 * i),
    w: px(DEVICE_WIDTH),
    h: px(48),
    color: 0xffffff,
    text_size: px(36),
    align_h: hmUI.align.LEFT,
    align_v: hmUI.align.CENTER_V,
    text_style: hmUI.text_style.ELLIPSIS,
    //text: name,
  },
  gtr3: {
    x: 0,
    //y: px(DEVICE_HEIGHT * 0.35 + 60 * i),
    w: px(DEVICE_WIDTH),
    h: px(48),
    color: 0xffffff,
    text_size: px(36),
    align_h: hmUI.align.LEFT,
    align_v: hmUI.align.CENTER_V,
    text_style: hmUI.text_style.ELLIPSIS,
    //text: name,
  },
  gts4: {
    x: 0,
    //y: px(DEVICE_HEIGHT * 0.35 + 60 * i),
    w: px(DEVICE_WIDTH),
    h: px(48),
    color: 0xffffff,
    text_size: px(36),
    align_h: hmUI.align.LEFT,
    align_v: hmUI.align.CENTER_V,
    text_style: hmUI.text_style.ELLIPSIS,
    //text: name,
  },
};

export const getStyles = (deviceName) => {
  if (deviceName == "Amazfit Band 7")
    return {
      LIBRARY_HEADER: LIBRARY_HEADER.band7,
      TITLE: TITLE.band7,
    };
  else if (deviceName == "GTS 4 mini")
    return {
      LIBRARY_HEADER: LIBRARY_HEADER.gts4mini,
      TITLE: TITLE.gts4mini,
    };
  else if (deviceName == "GTS 3")
    return {
      LIBRARY_HEADER: LIBRARY_HEADER.gts3,
      TITLE: TITLE.gts3,
    };
  else if (deviceName == "GTS 4")
    return {
      LIBRARY_HEADER: LIBRARY_HEADER.gts4,
      TITLE: TITLE.gts4,
    };
  // default - gtr3
  return {
    LIBRARY_HEADER: LIBRARY_HEADER.gtr3,
    TITLE: TITLE.gtr3,
  };
};
