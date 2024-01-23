import { Widget } from "../lib/imports.js";

import Logo from "./panels/Logo.js";
import Power from "./panels/Power.js";
import Clock from "./panels/Clock.js";
import Title from "./panels/Title.js";
import Tray from "./panels/Tray.js";
import Workspaces from "./panels/Workspaces.js";
import Indicator from "./panels/Indicator.js";
import NotificationPanel from "./panels/NotificationPanel.js";

const Start = () =>
  Widget.Box({
    spacing: 10,
    children: [Logo(), Title()],
    class_name: "start",
  });

const Center = () =>
  Widget.Box({ class_name: "center", children: [Workspaces()] });

const End = () =>
  Widget.Box({
    spacing: 6,
    children: [NotificationPanel(), Tray(), Indicator(), Clock(), Power()],
    class_name: "end",
    hpack: "end",
  });

export default () =>
  Widget.Window({
    margins: [5, 5, 0, 5],
    name: "bar",
    class_name: "bar",
    exclusivity: "exclusive",
    anchor: ["top", "left", "right"],
    child: Widget.CenterBox({
      class_name: "panel",
      start_widget: Start(),
      center_widget: Center(),
      end_widget: End(),
    }),
  });
