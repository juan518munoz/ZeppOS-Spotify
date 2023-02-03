import {
  DEFAULT_COLOR,
  DEFAULT_COLOR_TRANSPARENT,
} from "../utils/config/constants";
import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../utils/config/device";

const logger = DeviceRuntimeCore.HmLogger.getLogger("fetch_api");
const { messageBuilder } = getApp()._options.globalData;

Page({
  state: {},
  build() {
    hmUI.updateStatusBarTitle("Playlists");
    const dataList = [
      { name: "Musica", age: 12, like: 2 },
      { name: "PunchiPunchi", age: 13, like: 3 },
      { name: "NACIONAL Y POPULAR", age: 13, like: 4 },
      { name: "Tirate Un Tiro", age: 13, like: 4 },
      { name: "POCO NACIONAL POCO POPULAR", age: 13, like: 4 },
      { name: "Alternativa", age: 13, like: 4 },
      { name: "Soundtrack - Instrumental", age: 13, like: 4 },
      { name: "RBT", age: 13, like: 4 },
      { name: "Disco", age: 13, like: 4 },
      { name: "?", age: 13, like: 4 },
    ];

    function scrollListItemClick(list, index) {
      console.log("scrollListItemClick index=" + index);
    }

    hmUI.createWidget(hmUI.widget.SCROLL_LIST, {
      x: 0,
      y: px(40),
      h: DEVICE_HEIGHT - px(40),
      w: DEVICE_WIDTH,
      item_space: 10,
      item_config: [
        {
          type_id: 1,
          item_bg_color: 0x1e1e1e,
          item_bg_radius: 10,
          text_view: [
            {
              x: px(8),
              y: px(10),
              w: DEVICE_WIDTH - px(16),
              h: px(28),
              key: "name",
              color: 0xffffff,
              text_size: px(20),
            },
          ],
          text_view_count: 1,
          item_height: px(48),
        },
      ],
      item_config_count: 1,
      data_array: dataList,
      data_count: dataList.length,
      item_click_func: scrollListItemClick,
      data_type_config: [
        {
          start: 0,
          end: 1,
          type_id: 1,
        },
      ],
      data_type_config_count: 1,
    });
  },
  playlists(method = "") {
    messageBuilder
      .request({
        method: method,
      })
      .then((data) => {
        console.log(data);
      });
  },
});
