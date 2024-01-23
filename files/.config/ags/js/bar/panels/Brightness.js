import { Widget } from "../../lib/imports.js";
import Brightness from "../../services/Brightness.js";

export default () =>
  Widget.Button({
    class_name: "indicator-icon brightness",
    child: Widget.Label({
      // @ts-ignore
      label: Brightness.bind("screen_value").transform((p) => {
        if (p < 0.1) return "";
        if (p < 0.25) return "";
        else if (p < 0.5) return "";
        else if (p < 0.75) return "";
        else return "";
      }),
      tooltip_text: Brightness.bind("screen_value").transform(
        (p) => `Brightness: ${Math.floor(p * 100)}%`
      ),
    }),
  });
