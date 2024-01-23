import { Bluetooth, Widget } from "../../lib/imports.js";
import BatteryPanel from "./Battery.js";
import Brightness from "./Brightness.js";
import KeyboardLayout from "./KeyboardLayout.js";
import Volume from "./Volume.js";
// import NetworkIndicator from "./NetworkIndicator.js";
// import BluetoothIndicator from "./BluetoothIndicator.js";

export default () =>
  Widget.Button({
    class_name: "indicator",
    child: Widget.Box({
      spacing: 5,
      children: [
        KeyboardLayout(),
        // BluetoothIndicator(),
        // NetworkIndicator(),
        Volume(),
        Brightness(),
        BatteryPanel(),
      ],
    }),
  });
