import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../../utils/config/device";
import { getStyles } from "./index.style";

const styles = getStyles(hmSetting.getDeviceInfo().deviceName);
const vibrate = hmSensor.createSensor(hmSensor.id.VIBRATE);
const logger = DeviceRuntimeCore.HmLogger.getLogger("spotify-for-zepp");
const { messageBuilder } = getApp()._options.globalData;
const QUEUE_LENGHT = 15;

// Empty initializations - used for references
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
let curQueue = []; // references strings
let queueList = []; // references widgets

Page({
  state: {},
  build() {
    hmUI.updateStatusBarTitle("player");
    this.refresh(this.player);
    hmApp.setScreenKeep(true);
    //hmSetting.setBrightScreen(180); might be causing issues
    const isVertical = true;
    hmUI.setScrollView(false, DEVICE_HEIGHT, 4, isVertical);

    song = hmUI.createWidget(hmUI.widget.TEXT, {
      ...styles.SONG,
    });

    artist = hmUI.createWidget(hmUI.widget.TEXT, {
      ...styles.ARTIST,
    });

    playBtn = hmUI.createWidget(hmUI.widget.IMG, {
      ...styles.PLAY_BUTTON,
    });
    playBtn.addEventListener(hmUI.event.CLICK_DOWN, () => {
      vibrate.stop();
      vibrate.scene = 23;
      playState == "play" ? this.player("pause") : this.player("play");
      vibrate.start();
    });

    const nextBtn = hmUI.createWidget(hmUI.widget.IMG, {
      ...styles.NEXT_BUTTON,
    });
    nextBtn.addEventListener(hmUI.event.CLICK_DOWN, () => {
      vibrate.stop();
      vibrate.scene = 23;
      this.player("next");
      vibrate.start();
    });

    const previousBtn = hmUI.createWidget(hmUI.widget.IMG, {
      ...styles.PREV_BUTTON,
    });
    previousBtn.addEventListener(hmUI.event.CLICK_DOWN, () => {
      vibrate.stop();
      vibrate.scene = 23;
      this.player("previous");
      vibrate.start();
    });

    hmUI.createWidget(hmUI.widget.FILL_RECT, {
      ...styles.PROGRESS_BAR_BKG,
    });
    progressBar = hmUI.createWidget(hmUI.widget.FILL_RECT, {
      ...styles.PROGRESS_BAR,
    });

    likeBtn = hmUI.createWidget(hmUI.widget.IMG, {
      ...styles.LIKE_BUTTON,
    });
    likeBtn.addEventListener(hmUI.event.CLICK_DOWN, () => {
      vibrate.stop();
      vibrate.scene = 23;
      likeState == "notLiked" ? this.tracks("liked") : this.tracks("notLiked");
      vibrate.start();
    });

    shuffleBtn = hmUI.createWidget(hmUI.widget.IMG, {
      ...styles.SHUFFLE_BUTTON,
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
        y: px(DEVICE_HEIGHT + 70 * (i + 1)),
        ...styles.QUEUED_SONG,
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
          hmApp.gotoPage({ url: "pages/library/library.page" });
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
        if (method == "") {
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
          isShuffled
            ? (shuffleState = "shuffle")
            : (shuffleState = "noShuffle");

          progressBar.setProperty(hmUI.prop.MORE, {
            w: px(DEVICE_WIDTH * progress - 8),
          });

          curSongId = songId;

          if (queue.length != 0) curQueue = queue;
        }
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
          const name = curQueue[i] ? curQueue[i] : "";
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
    hmSetting.setBrightScreenCancel();
  },
});
