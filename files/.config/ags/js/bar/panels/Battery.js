import { prettyTime } from "../../lib/utils.js";
import { Widget, Battery } from "../../lib/imports.js";

export default () =>
  Widget.Box({
    // @ts-ignore
    class_name: Battery.bind("percent").transform((p) => {
      if (p < 25) return "indicator-icon battery battery-low";
      if (p < 100) return "indicator-icon battery battery-medium";
      return "indicator-icon battery battery-full";
    }),
    visible: Battery.bind("available"),
    tooltip_text: Battery.bind("time_remaining").transform(prettyTime),
    children: [
      Widget.Stack({
        transition: "slide_up_down",
        items: [
          [
            "discharging",
            Widget.Label({
              label: "󰁹",
            }),
          ],
          [
            "charging",
            Widget.Label({
              label: "󰂄",
            }),
          ],
        ],
        setup: (self) =>
          self.hook(Battery, () => {
            self.shown = Battery.charging ? "charging" : "discharging";
          }),
      }),
      Widget.Label({
        label: Battery.bind("percent").transform((p) => `${Math.floor(p)}`),
      }),
    ],
  });
