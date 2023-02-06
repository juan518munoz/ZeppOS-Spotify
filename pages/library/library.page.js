import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../../utils/config/device";
import { getStyles } from "./library.style";

const styles = getStyles(hmSetting.getDeviceInfo().deviceName);
const { messageBuilder } = getApp()._options.globalData;

Page({
  state: {},
  build() {
    const isVertical = true;
    hmUI.setScrollView(true, DEVICE_HEIGHT, 2, isVertical);
    hmUI.updateStatusBarTitle("Library");

    hmUI.createWidget(hmUI.widget.TEXT, {
      ...styles.LIBRARY_HEADER,
      text: "Playlists",
    });

    this.getAllPlaylists();
  },
  getAllPlaylists() {
    messageBuilder
      .request({
        func: "getAllPlaylists",
      })
      .then((data) => {
        const { playLists = [] } = data;

        playLists.forEach((playList, i) => {
          const { name = "", id = "" } = playList;
          const widget = hmUI.createWidget(hmUI.widget.TEXT, {
            y: px(DEVICE_HEIGHT * 0.36 + 60 * i),
            text: name,
            ...styles.TITLE,
          });

          const img = hmUI.createWidget(hmUI.widget.IMG, {
            x: DEVICE_WIDTH - 36,
            y: px(DEVICE_HEIGHT * 0.36 + 60 * i),
            src: "arrow.png",
          });
          img.addEventListener(hmUI.event.CLICK_DOWN, () => {
            hmApp.gotoPage({
              url: "pages/playlist/playlist.page",
              param: JSON.stringify({
                name: name,
                playlistId: id,
              }),
            });
          });
        });
      });
  },
});
