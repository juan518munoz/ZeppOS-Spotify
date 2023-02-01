import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../utils/config/device";

const logger = DeviceRuntimeCore.HmLogger.getLogger("fetch_api");
const { messageBuilder } = getApp()._options.globalData;

// Empty initializations
let song;
let artist;
let playBtn;
let playState = "";
let likeBtn;
let likeState = "";
let curSongId = "";

Page({
  state: {},
  build() {
    hmSetting.setBrightScreen(15);
    this.refresh(this.player);

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

    playBtn = hmUI.createWidget(hmUI.widget.IMG, {
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

    hmUI.createWidget(hmUI.widget.FILL_RECT, {
      x: px(8),
      y: DEVICE_HEIGHT / 2 - px(24),
      w: DEVICE_WIDTH - px(8),
      h: px(4),
      radius: px(2),
      color: 0x5e5e5e,
    });
    progressBar = hmUI.createWidget(hmUI.widget.FILL_RECT, {
      x: px(8),
      y: DEVICE_HEIGHT / 2 - px(24),
      w: 0,
      h: px(4),
      radius: px(2),
      color: 0x1db954,
    });

    likeBtn = hmUI.createWidget(hmUI.widget.IMG, {
      x: DEVICE_WIDTH / 2 - px(68),
      y: DEVICE_HEIGHT - px(78),
      src: `${likeState}.png`,
    });
    likeBtn.addEventListener(hmUI.event.CLICK_DOWN, (info) => {
      if (likeState === "notLiked") {
        likeState = "liked";
      } else likeState = "notLiked";
      this.tracks(likeState);
      likeBtn.setProperty(hmUI.prop.MORE, { src: `${likeState}.png` });
    });
  },
  player(method = "") {
    messageBuilder
      .request({
        func: "player",
        method: method,
      })
      .then((data) => {
        const {
          songName = "No content playing",
          artistNames = "check if any device is streaming",
          isPlaying = false,
          isLiked = false,
          progress = 0,
          songId = "",
        } = data;

        song.setProperty(hmUI.prop.MORE, {
          text: songName,
        });

        artist.setProperty(hmUI.prop.MORE, {
          text: artistNames,
        });

        if (isPlaying) {
          playState = "play";
          playBtn.setProperty(hmUI.prop.MORE, { src: "pause.png" });
        } else {
          playState = "pause";
          playBtn.setProperty(hmUI.prop.MORE, { src: "play.png" });
        }

        if (isLiked) {
          likeState = "liked";
          likeBtn.setProperty(hmUI.prop.MORE, { src: "liked.png" });
        } else {
          likeState = "notLiked";
          likeBtn.setProperty(hmUI.prop.MORE, { src: "notLiked.png" });
        }

        progressBar.setProperty(hmUI.prop.MORE, {
          w: DEVICE_WIDTH * progress - px(8),
        });

        curSongId = songId;
      });
  },
  tracks(method = "") {
    messageBuilder
      .request({
        func: "tracks",
        method: method,
        curSongId: curSongId,
      })
      .then((data) => {});
  },

  refresh(playerFun) {
    timer.createTimer(
      100,
      3000,
      function () {
        logger.log("timer callback");
        playerFun();
      },
      { hour: 0, minute: 15, second: 30 }
    );
  },
});
