import { Widget, Audio } from "../../lib/imports.js";

export default () =>
  Widget.Stack({
    class_name: "indicator-icon volume",
    transition: "slide_up_down",
    items: [
      [
        "true",
        Widget.Label({
          class_name: "icon-material",
        }).hook(
          Audio,
          (self) => {
            if (!Audio.speaker) return;

            const vol = Math.floor(Audio.speaker.volume * 100);

            self.tooltip_text = `Volume: ${vol}%`;

            if (vol == 0) {
              self.label = "󰸈";
            } else if (vol <= 33) {
              self.label = "";
            } else if (vol <= 66) {
              self.label = "";
            } else if (vol > 100) {
              self.label = "󰝝";
            } else {
              self.label = "";
            }
          },
          "speaker-changed"
        ),
      ],
      ["false", Widget.Label({ label: "󰸈" })],
    ],
    setup: (self) =>
      self.hook(Audio, (stack) => {
        stack.shown = String(!Audio.speaker?.stream.is_muted);
      }),
  });
