import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../../utils/config/device";
import { getStyles } from "./playlist.style";

const styles = getStyles(hmSetting.getDeviceInfo().deviceName);
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
    //const isVertical = true;
    //hmUI.setScrollView(true, DEVICE_HEIGHT, 12, isVertical);

    const playBtn = hmUI.createWidget(hmUI.widget.IMG, {
      ...styles.PLAY_BUTTON,
    });
    playBtn.addEventListener(hmUI.event.CLICK_DOWN, () => {
      vibrate.stop();
      vibrate.scene = 23;
      this.startPlaylist();
      vibrate.start();
    });

    hmUI.createWidget(hmUI.widget.TEXT, {
      ...styles.PLAYLIST_TITLE,
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
        songList.push({ name : "", artistNames : "" })

        songList.forEach((track, i) => {
          const { name = "", artistNames = "" } = track;
          
          hmUI.createWidget(hmUI.widget.TEXT, {
            ...styles.SONG,
            y: px(DEVICE_HEIGHT * 0.53 + 55 * i),
            text: name,
          });

          hmUI.createWidget(hmUI.widget.TEXT, {
            ...styles.ARTIST,
            y: px(DEVICE_HEIGHT * 0.6 + 55 * i),
            text: artistNames,
          });
        });
      });
  },
  startPlaylist() {
    messageBuilder
      .request({
        func: "startPlaylist",
        playlistId: `spotify:playlist:${this.state.playlistId}`,
        offset: 0,
      })
      .then((data) => {
        //console.log(data);
      });
  },
  onDestroy() {
    vibrate && vibrate.stop();
    hmUI.setStatusBarVisible(true);
  },
});
