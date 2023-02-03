import "./shared/device-polyfill";
import { MessageBuilder } from "./shared/message";
import LocalStorage from "./utils/storage";

const appId = 27280;
const messageBuilder = new MessageBuilder({ appId });
const fileName = "test.txt";

App({
  globalData: {
    messageBuilder: messageBuilder,
  },
  onCreate(options) {
    console.log("app on create invoke");
    messageBuilder.connect();
  },

  onDestroy(options) {
    console.log("app on destroy invoke");
    messageBuilder.disConnect();
  },
});
