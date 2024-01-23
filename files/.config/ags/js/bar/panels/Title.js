import classIcon from "../../lib/classIcon.js";
import { Widget, Hyprland } from "../../lib/imports.js";

export default () =>
  Widget.Box({
    class_name: "title",
    spacing: 8,
    visible: Hyprland.active.client
      .bind("title")
      .transform((t) => t.length > 0),
    children: [
      Widget.Icon({
        class_name: "title-icon",
        icon: Hyprland.active
          .bind("client")
          .transform((c) => classIcon(c.class, c.title)),
        visible: Hyprland.active
          .bind("client")
          .transform((c) => classIcon(c.class, c.title) !== ""),
      }),
      Widget.Label({
        class_name: "label",
        truncate: "end",
        max_width_chars: 45,
        label: Hyprland.active.client.bind("title"),
        tooltip_text: Hyprland.active.client.bind("title"),
      }),
    ],
  });
