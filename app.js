import "./shared/device-polyfill";
import { MessageBuilder } from "./shared/message";
import { PlayerControl } from "./shared/player";

const appId = 1017560;
const messageBuilder = new MessageBuilder({ appId });
const playerControl = new PlayerControl(messageBuilder);

App({
  globalData: {
    messageBuilder: messageBuilder,
    playerControl: playerControl,
  },
  onCreate(options) {
    console.log("app on create invoke");
    messageBuilder.connect();
    playerControl.connect();
  },

  onDestroy(options) {
    console.log("app on destroy invoke");
    messageBuilder.disConnect();
  },
});
