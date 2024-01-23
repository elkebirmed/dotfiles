import { Utils, Widget } from "../../lib/imports.js";

export default () =>
  Widget.Button({
    on_clicked: () => Utils.exec("rofi -show drun &"),
    class_name: "logo",
    child: Widget.Label({
      label: "󰣇",
    }),
  });
