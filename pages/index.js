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
let playState = "pause";

let isPlayingWidget = "";

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

    isPlayingWidget = hmUI.createWidget(hmUI.widget.TEXT, {
      x: 0,
      y: px(120),
      w: px(DEVICE_WIDTH),
      h: px(30),
      color: 0xb3b3b3,
      text_size: px(24),
      align_h: hmUI.align.CENTER_H,
      align_v: hmUI.align.CENTER_V,
      text_style: hmUI.text_style.NONE,
      text: "",
    });

    const playBtn = hmUI.createWidget(hmUI.widget.IMG, {
      x: DEVICE_WIDTH / 2 - px(24),
      y: px(200),
      src: `${playState}.png`,
    });
    playBtn.addEventListener(hmUI.event.CLICK_DOWN, (info) => {
      playBtn.setProperty(hmUI.prop.MORE, { src: `${playState}.png` });
      if (playState === "play") {
        playState = "pause";
      } else playState = "play";
      this.player(playState);
    });

    const nextBtn = hmUI.createWidget(hmUI.widget.IMG, {
      x: DEVICE_WIDTH / 2 + px(48),
      y: px(200),
      src: "next.png",
    });
    nextBtn.addEventListener(hmUI.event.CLICK_DOWN, (info) => {
      this.player("next");
    });

    const previousBtn = hmUI.createWidget(hmUI.widget.IMG, {
      x: DEVICE_WIDTH / 2 - px(48) - px(48),
      y: px(200),
      src: "previous.png",
    });
    previousBtn.addEventListener(hmUI.event.CLICK_DOWN, (info) => {
      this.player("previous");
    });

    this.player();
  },
  player(method = "") {
    messageBuilder
      .request({
        method: method,
      })
      .then((data) => {
        const {
          songName = "No content playing",
          artistNames = "check if any device is streaming",
          isPlaying = false,
        } = data;

        song.setProperty(hmUI.prop.MORE, {
          text: songName,
        });

        artist.setProperty(hmUI.prop.MORE, {
          text: artistNames,
        });

        if (isPlaying) {
          // doesn't work?
          playBtn.setProperty(hmUI.prop.MORE, { src: "play.png" });
        } else {
          playBtn.setProperty(hmUI.prop.MORE, { src: "pause.png" });
        }
      });
  },
});
