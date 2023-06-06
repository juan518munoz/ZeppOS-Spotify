import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../../utils/config/device";
import { getStyles } from "./library.style";

const styles = getStyles(hmSetting.getDeviceInfo().deviceName);
const { messageBuilder } = getApp()._options.globalData;

Page({
  state: {},
  build() {
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
        playLists.push({ name : "", id : "" })

        playLists.forEach((playList, i) => {
          const { name = "", id = "" } = playList;
          
          const widget = hmUI.createWidget(hmUI.widget.BUTTON, {
            y: px(DEVICE_HEIGHT * 0.36 + 80 * i),
            text: name,
            ...styles.TITLEBUTTON,
            click_func: () => {
              hmApp.gotoPage({
                url: "pages/playlist/playlist.page",
                param: JSON.stringify({
                  name: name,
                  playlistId: id,
                }),
              });
            },
          });
        });
      });
  },
});
