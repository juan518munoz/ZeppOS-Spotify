import {
  DEFAULT_COLOR,
  DEFAULT_COLOR_TRANSPARENT,
} from "../utils/config/constants";
import { DEVICE_WIDTH } from "../utils/config/device";

const logger = DeviceRuntimeCore.HmLogger.getLogger("fetch_api");
const { messageBuilder } = getApp()._options.globalData;

Page({
  state: {},
  build() {
    const dataList = [
      { name: "a", age: 12, like: 2 },
      { name: "b", age: 13, like: 3 },
      { name: "c", age: 13, like: 4 },
    ];

    function scrollListItemClick(list, index) {
      console.log("scrollListItemClick index=" + index);
    }

    hmUI.createWidget(hmUI.widget.SCROLL_LIST, {
      x: 0,
      y: 0,
      h: DEVICE_HEIGHT,
      w: DEVICE_WIDTH,
      item_space: 10,
      item_config: [
        {
          type_id: 1,
          item_bg_color: 0xef5350,
          item_bg_radius: 10,
          text_view: [
            {
              x: 0,
              y: 0,
              w: 100,
              h: 100,
              key: "name",
              color: 0xffffff,
              text_size: 20,
            },
          ],
          text_view_count: 1,
          item_height: 130,
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
