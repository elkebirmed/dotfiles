import { init } from "./js/lib/setup.js";
import TopBar from "./js/bar/TopBar.js";
import ColorPicker from "./js/services/ColorPicker.js";
import Notifications from "./js/notification/Notifications.js";
import NotificationsWindow from "./js/notification/NotificationsWindow.js";

globalThis.ColorPicker = ColorPicker;

const windows = () => [TopBar(), Notifications(), NotificationsWindow()];

export default {
  onConfigParsed: init,
  windows: windows(),
  maxStreamVolume: 1.3,
  cacheNotificationActions: false,
};
