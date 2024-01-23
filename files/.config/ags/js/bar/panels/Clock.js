import { Widget } from "../../lib/imports.js";

const GLib = imports.gi.GLib;

export default () =>
  Widget.Button({
    vpack: "center",
    class_name: "clock",
    setup: (self) =>
      self.poll(1000, () => {
        self.tooltip_text =
          GLib.DateTime.new_now_local().format("%A, %d-%m-%Y");
      }),
    child: Widget.Label({
      label: GLib.DateTime.new_now_local().format("%H:%M"),
      setup: (self) =>
        self.poll(1000, () => {
          self.label = GLib.DateTime.new_now_local().format("%H:%M");
        }),
    }),
  });
