import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../utils/config/device";
const { messageBuilder } = getApp()._options.globalData;

Page({
  state: {},
  build() {
    const isVertical = true;
    hmUI.setScrollView(true, DEVICE_HEIGHT, 2, isVertical);
    hmUI.updateStatusBarTitle("Playlists");
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
            x: 0,
            y: px(DEVICE_HEIGHT * 0.35 + 60 * i),
            w: px(DEVICE_WIDTH),
            h: px(36),
            color: 0xffffff,
            text_size: px(24),
            align_h: hmUI.align.LEFT,
            align_v: hmUI.align.CENTER_V,
            text_style: hmUI.text_style.ELLIPSIS,
            text: name,
          });

          widget.addEventListener(hmUI.event.CLICK_DOWN, () => {
            hmApp.gotoPage({
              url: "pages/playlist",
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
