import {
  DEFAULT_COLOR,
  DEFAULT_COLOR_TRANSPARENT,
} from "../utils/config/constants";
import { DEVICE_WIDTH } from "../utils/config/device";

const logger = DeviceRuntimeCore.HmLogger.getLogger("fetch_api");
const { messageBuilder } = getApp()._options.globalData;

// Empty initializations
let song;
let artist;

Page({
  state: {},
  build() {
    song = hmUI.createWidget(hmUI.widget.TEXT, {
      x: 0,
      y: px(30),
      w: px(DEVICE_WIDTH),
      h: px(50),
      color: 0xffffff,
      text_size: px(36),
      align_h: hmUI.align.CENTER_H,
      align_v: hmUI.align.CENTER_V,
      text_style: hmUI.text_style.NONE,
      text: "",
    });

    artist = hmUI.createWidget(hmUI.widget.TEXT, {
      x: 0,
      y: px(80),
      w: px(DEVICE_WIDTH),
      h: px(30),
      color: 0xb3b3b3,
      text_size: px(24),
      align_h: hmUI.align.CENTER_H,
      align_v: hmUI.align.CENTER_V,
      text_style: hmUI.text_style.NONE,
      text: "",
    });

    hmUI.createWidget(hmUI.widget.BUTTON, {
      x: 0,
      y: px(180),
      w: px(DEVICE_WIDTH),
      h: px(30),
      text_size: px(18),
      radius: px(12),
      normal_color: 0x1db954,
      press_color: 0x3a9b5c,
      text: "Next",
      click_func: () => {
        console.log("click button");
        this.player("next");
      },
    });
    hmUI.createWidget(hmUI.widget.BUTTON, {
      x: 0,
      y: px(220),
      w: px(DEVICE_WIDTH),
      h: px(50),
      text_size: px(24),
      radius: px(12),
      normal_color: 0x1db954,
      press_color: 0x3a9b5c,
      text: "Play",
      click_func: () => {
        logger.log("click button");
        this.player("play");
      },
    });

    hmUI.createWidget(hmUI.widget.BUTTON, {
      x: 0,
      y: px(280),
      w: px(DEVICE_WIDTH),
      h: px(50),
      text_size: px(24),
      radius: px(12),
      normal_color: 0x1db954,
      press_color: 0x3a9b5c,
      text: "Pause",
      click_func: () => {
        logger.log("click button");
        this.player("pause");
      },
    });
  },
  player(method) {
    messageBuilder
      .request({
        method: method,
      })
      .then((data) => {
        logger.log(JSON.stringify(data));
        const {
          songName = "failed to retrieve song name",
          artistNames = "failed to retrieve artist name(s)",
        } = data;

        song.setProperty(hmUI.prop.MORE, {
          text: songName,
        });

        artist.setProperty(hmUI.prop.MORE, {
          text: artistNames,
        });
      });
  },
});
