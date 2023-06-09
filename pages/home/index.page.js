import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../../utils/config/device";
import { getStyles } from "./index.style";

const { playerControl } = getApp()._options.globalData;
const styles = getStyles(hmSetting.getDeviceInfo().deviceName);
const vibrate = hmSensor.createSensor(hmSensor.id.VIBRATE);
const logger = DeviceRuntimeCore.HmLogger.getLogger("spotify-for-zepp");
const QUEUE_LENGHT = 15;

// Empty initializations - used for references
let song;
let artist;
let playBtn;
let progressBar;
let likeBtn;
let shuffleBtn;
let queueList = []; // references widgets

Page({
  state: {},
  build() {
    hmUI.updateStatusBarTitle("player");
    hmApp.setLayerY(-DEVICE_HEIGHT);
    this.refresh();
    hmApp.setScreenKeep(true);
    const isVertical = true;
    hmUI.setScrollView(false, DEVICE_HEIGHT, 4, isVertical);

    devices = hmUI.createWidget(hmUI.widget.BUTTON, {
      ...styles.DEVICES_BUTTON,
    });

    song = hmUI.createWidget(hmUI.widget.TEXT, {
      ...styles.SONG,
    });

    artist = hmUI.createWidget(hmUI.widget.TEXT, {
      ...styles.ARTIST,
    });

    playBtn = hmUI.createWidget(hmUI.widget.IMG, {
      ...styles.PLAY_BUTTON,
      src: `play.png`,
    });
    playBtn.addEventListener(hmUI.event.CLICK_DOWN, () => {
      vibrate.stop();
      vibrate.scene = 23;
      playerControl.play();
      vibrate.start();
    });

    const nextBtn = hmUI.createWidget(hmUI.widget.IMG, {
      ...styles.NEXT_BUTTON,
    });
    nextBtn.addEventListener(hmUI.event.CLICK_DOWN, () => {
      vibrate.stop();
      vibrate.scene = 23;
      playerControl.next();
      vibrate.start();
    });

    const previousBtn = hmUI.createWidget(hmUI.widget.IMG, {
      ...styles.PREV_BUTTON,
    });
    previousBtn.addEventListener(hmUI.event.CLICK_DOWN, () => {
      vibrate.stop();
      vibrate.scene = 23;
      playerControl.previous();
      vibrate.start();
    });

    hmUI.createWidget(hmUI.widget.FILL_RECT, {
      ...styles.PROGRESS_BAR_BKG,
    });
    progressBar = hmUI.createWidget(hmUI.widget.FILL_RECT, {
      ...styles.PROGRESS_BAR,
      w: px(0),
    });

    spotifyIcon = hmUI.createWidget(hmUI.widget.IMG, {
      ...styles.SPOTIFY_ICON,
    });

    likeBtn = hmUI.createWidget(hmUI.widget.IMG, {
      ...styles.LIKE_BUTTON,
    });
    likeBtn.addEventListener(hmUI.event.CLICK_DOWN, () => {
      vibrate.stop();
      vibrate.scene = 23;
      playerControl.toggleLike();
      vibrate.start();
    });

    shuffleBtn = hmUI.createWidget(hmUI.widget.IMG, {
      ...styles.SHUFFLE_BUTTON,
    });
    shuffleBtn.addEventListener(hmUI.event.CLICK_DOWN, () => {
      vibrate.stop();
      vibrate.scene = 23;
      playerControl.toggleShuffle();
      vibrate.start();
    });

    // Queue
    for (let i = 0; i <= QUEUE_LENGHT; i++) {
      const queuedSong = hmUI.createWidget(hmUI.widget.BUTTON, {
        y: px(DEVICE_HEIGHT * 2 + 70 * (i + 1)),
        ...styles.TITLEBUTTON,
        click_func: () => {
          playerControl.playOffset({"uri": playerControl.queue[i].uri});
        },
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
  refresh() {
    // Refresh UI
    timer.createTimer(0, 150, () => {
      song.setProperty(hmUI.prop.MORE, {
        text: playerControl.song,
      });

      artist.setProperty(hmUI.prop.MORE, {
        text: playerControl.artist,
      });
      playBtn.setProperty(hmUI.prop.MORE, {
        src: `${playerControl.playState}.png`,
      });
      likeBtn.setProperty(hmUI.prop.MORE, {
        src: `${playerControl.likeState}.png`,
      });
      shuffleBtn.setProperty(hmUI.prop.MORE, {
        src: `${playerControl.shuffleState}.png`,
      });

      progressBar.setProperty(hmUI.prop.MORE, {
        ...styles.PROGRESS_BAR,
        w: px(DEVICE_WIDTH * playerControl.progress - 8),
      });
 
      const queue = playerControl.queue;
      if(queue.length > 0){
        for (let i = 0; i <= QUEUE_LENGHT; i++) {
          const {name, uri} = queue[i];
  
          if(i == QUEUE_LENGHT){
            break;
          }
   
          queueList[i].setProperty(hmUI.prop.TEXT, {
            text: `${i + 1}. ${name}`
          });
        }
      }
    });
  },
  onDestroy() {
    vibrate && vibrate.stop();
  },
});
