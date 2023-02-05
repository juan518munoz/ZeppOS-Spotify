import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../../utils/config/device";

const { messageBuilder } = getApp()._options.globalData;
const vibrate = hmSensor.createSensor(hmSensor.id.VIBRATE);

Page({
  state: {
    name: "",
    playlistId: "",
    songList: [],
  },
  onInit(params) {
    const paramsObj = JSON.parse(params);
    const { name = "", playlistId = "" } = paramsObj;
    (this.state.name = name), (this.state.playlistId = playlistId);
    hmUI.setStatusBarVisible(false);
  },
  build() {
    hmUI.updateStatusBarTitle(this.state.name);
    const isVertical = true;
    hmUI.setScrollView(true, DEVICE_HEIGHT, 12, isVertical);

    const playBtn = hmUI.createWidget(hmUI.widget.IMG, {
      x: DEVICE_WIDTH / 2 - px(32),
      y: px(DEVICE_HEIGHT * 0.15),
      src: `playlistPlay.png`,
    });
    playBtn.addEventListener(hmUI.event.CLICK_DOWN, () => {
      vibrate.stop();
      vibrate.scene = 23;
      this.startPlaylist();
      vibrate.start();
    });

    hmUI.createWidget(hmUI.widget.TEXT, {
      x: 0,
      y: px(DEVICE_HEIGHT * 0.35),
      w: px(DEVICE_WIDTH),
      h: px(48),
      color: 0x1fdf64,
      text_size: px(32),
      align_h: hmUI.align.CENTER_H,
      align_v: hmUI.align.CENTER_V,
      text_style: hmUI.text_style.NONE,
      text: this.state.name,
    });

    this.getPlaylistsInfo();
  },
  getPlaylistsInfo() {
    messageBuilder
      .request({
        func: "playlistInfo",
        playlistId: this.state.playlistId,
      })
      .then((data) => {
        const { songList = [] } = data;

        songList.forEach((song, i) => {
          hmUI.createWidget(hmUI.widget.TEXT, {
            x: 0,
            y: px(DEVICE_HEIGHT * 0.5 + 40 * i),
            w: px(DEVICE_WIDTH),
            h: px(24),
            color: 0xffffff,
            text_size: px(20),
            align_h: hmUI.align.LEFT,
            align_v: hmUI.align.CENTER_V,
            text_style: hmUI.text_style.ELLIPSIS,
            text: song,
          });
        });
      });
  },
  startPlaylist() {
    messageBuilder
      .request({
        func: "startPlaylist",
        playlistId: this.state.playlistId,
      })
      .then((data) => {
        console.log(data);
      });
  },
  onDestroy() {
    vibrate && vibrate.stop();
    hmUI.setStatusBarVisible(true);
  },
});
