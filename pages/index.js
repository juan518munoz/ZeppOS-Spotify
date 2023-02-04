import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../utils/config/device";

const vibrate = hmSensor.createSensor(hmSensor.id.VIBRATE);
const logger = DeviceRuntimeCore.HmLogger.getLogger("fetch_api");
const { messageBuilder } = getApp()._options.globalData;

const QUEUE_LENGHT = 15;

// Empty initializations
let song;
let artist;
let playBtn;
let playState = "";
let progressBar;
let likeBtn;
let likeState = "";
let curSongId = "";
let shuffleBtn;
let shuffleState = "";
let curQueue = []; // references objects { name, id }
let queueList = []; // references widgets

Page({
  state: {},
  build() {
    hmUI.updateStatusBarTitle("Spotify");
    this.refresh(this.player);
    hmApp.setScreenKeep(true);
    hmSetting.setBrightScreen(2000);
    const isVertical = true;
    hmUI.setScrollView(false, DEVICE_HEIGHT, 4, isVertical);

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
    playBtn.addEventListener(hmUI.event.CLICK_DOWN, () => {
      vibrate.stop();
      vibrate.scene = 23;
      playState == "play" ? this.player("pause") : this.player("play");
      vibrate.start();
    });

    const nextBtn = hmUI.createWidget(hmUI.widget.IMG, {
      x: DEVICE_WIDTH / 2 + px(48),
      y: px(200),
      src: "next.png",
    });
    nextBtn.addEventListener(hmUI.event.CLICK_DOWN, () => {
      vibrate.stop();
      vibrate.scene = 23;
      this.player("next");
      vibrate.start();
    });

    const previousBtn = hmUI.createWidget(hmUI.widget.IMG, {
      x: DEVICE_WIDTH / 2 - px(48) - px(48),
      y: px(200),
      src: "previous.png",
    });
    previousBtn.addEventListener(hmUI.event.CLICK_DOWN, () => {
      vibrate.stop();
      vibrate.scene = 23;
      this.player("previous");
      vibrate.start();
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
    likeBtn.addEventListener(hmUI.event.CLICK_DOWN, () => {
      vibrate.stop();
      vibrate.scene = 23;
      likeState == "notLiked" ? this.tracks("liked") : this.tracks("notLiked");
      vibrate.start();
    });

    shuffleBtn = hmUI.createWidget(hmUI.widget.IMG, {
      x: DEVICE_WIDTH / 2 + px(20),
      y: DEVICE_HEIGHT - px(74),
      src: `${shuffleState}.png`,
    });
    shuffleBtn.addEventListener(hmUI.event.CLICK_DOWN, () => {
      vibrate.stop();
      vibrate.scene = 23;
      shuffleState == "shuffle"
        ? this.player("shuffle", "state=false")
        : this.player("shuffle", "state=true");
      vibrate.start();
    });

    // Queue
    for (let i = 0; i <= QUEUE_LENGHT; i++) {
      let queuedSong = hmUI.createWidget(hmUI.widget.TEXT, {
        x: 0,
        y: px(DEVICE_HEIGHT + 70 * (i + 1)),
        w: px(DEVICE_WIDTH),
        h: px(30),
        color: 0xffffff,
        text_size: px(24),
        align_h: hmUI.align.LEFT,
        align_v: hmUI.align.CENTER_V,
        text_style: hmUI.text_style.ELLIPSIS,
        text: "",
      });
      queuedSong.addEventListener(hmUI.event.CLICK_DOWN, () => {
        // unreliable
        //for (let j = 0; j <= i; j++) this.player("next");
      });
      queueList.push(queuedSong);
    }

    hmApp.registerGestureEvent((event) => {
      switch (event) {
        case hmApp.gesture.LEFT:
          hmApp.gotoPage({ url: "pages/playlists", param: "..." });
          break;
        default:
          break;
      }
    });
  },
  player(method = "", args = "") {
    messageBuilder
      .request({
        func: "player",
        args: args,
        method: method,
      })
      .then((data) => {
        const {
          songName = "No content playing",
          artistNames = "check if any device is streaming",
          isPlaying = false,
          isLiked = false,
          isShuffled = false,
          progress = 0,
          songId = "",
          queue = [],
        } = data;

        song.setProperty(hmUI.prop.MORE, {
          text: songName,
        });

        artist.setProperty(hmUI.prop.MORE, {
          text: artistNames,
        });

        isPlaying ? (playState = "play") : (playState = "pause");
        playBtn.setProperty(hmUI.prop.MORE, { src: `${playState}.png` });
        isLiked ? (likeState = "liked") : (likeState = "notLiked");
        isShuffled ? (shuffleState = "shuffle") : (shuffleState = "noShuffle");

        progressBar.setProperty(hmUI.prop.MORE, {
          w: DEVICE_WIDTH * progress - px(8),
        });

        curSongId = songId;

        if (queue.length != 0) curQueue = queue;
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
      0,
      1500,
      function () {
        logger.log("timer callback");
        playerFun();
      },
      { hour: 0, minute: 15, second: 30 }
    );

    // longer refresh
    timer.createTimer(
      0,
      6000,
      function () {
        for (let i = 0; i <= QUEUE_LENGHT; i++) {
          const name = curQueue[i];
          queueList[i].setProperty(hmUI.prop.MORE, {
            text: `${i + 1}. ${name}`,
          });
        }
      },
      { hour: 0, minute: 15, second: 30 }
    );

    // shorter refresh
    timer.createTimer(0, 150, () => {
      playBtn.setProperty(hmUI.prop.MORE, { src: `${playState}.png` });
      likeBtn.setProperty(hmUI.prop.MORE, { src: `${likeState}.png` });
      shuffleBtn.setProperty(hmUI.prop.MORE, { src: `${shuffleState}.png` });
    });
  },
  onDestroy() {
    vibrate && vibrate.stop();
  },
});
