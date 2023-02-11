import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../../utils/config/device";
//import { getStyles } from "./devices.style";

//const styles = getStyles(hmSetting.getDeviceInfo().deviceName);
const { messageBuilder } = getApp()._options.globalData;
const vibrate = hmSensor.createSensor(hmSensor.id.VIBRATE);

Page({
  onInit(params) {},
  build() {
    hmUI.updateStatusBarTitle("devices");
  },
  onDestroy() {
    vibrate && vibrate.stop();
    hmUI.setStatusBarVisible(true);
  },
});
