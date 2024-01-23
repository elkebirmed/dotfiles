import { Widget, Bluetooth } from "../../lib/imports.js";

export default () =>
  Widget.Stack({
    class_name: "indicator-icon bluetooth",
    transition: "slide_up_down",
    items: [
      [
        "true",
        Widget.Label({
          label: "󰂯",
        }),
      ],
      [
        "false",
        Widget.Label({
          label: "󰂲",
        }),
      ],
    ],
    setup: (self) =>
      self.hook(Bluetooth, (stack) => {
        stack.shown = String(Bluetooth.enabled);
      }),
  });
