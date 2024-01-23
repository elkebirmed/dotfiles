import { Widget } from "../../lib/imports.js";

export default () =>
  Widget.Button({
    class_name: "power",
    child: Widget.Label({
      label: "⏻",
    }),
  });
