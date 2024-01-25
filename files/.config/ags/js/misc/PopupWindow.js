import AgsWindow from "resource:///com/github/Aylur/ags/widgets/window.js";
import { Widget, App } from "../lib/imports.js";

const GObject = imports.gi.GObject;

const keyGrabber = Widget.Window({
  name: "key-grabber",
  popup: true,
  anchor: ["top", "left", "right", "bottom"],
  css: "background-color: transparent;",
  visible: false,
  exclusivity: "ignore",
  focusable: true,
  layer: "top",
  attribute: { list: [] },
  setup: (self) =>
    self.on("notify::visible", ({ visible }) => {
      if (!visible)
        self.attribute.list.forEach((name) => App.closeWindow(name));
    }),
  child: Widget.EventBox({ vexpand: true }).on("button-press-event", () => {
    App.closeWindow("key-grabber");
    keyGrabber.attribute.list.forEach((name) => App.closeWindow(name));
  }),
});

// add before any PopupWindow is instantiated
App.addWindow(keyGrabber);

export class PopupWindow extends AgsWindow {
  static {
    GObject.registerClass(this);
  }

  constructor({ name, child, transition = "none", visible = false, ...rest }) {
    super({
      ...rest,
      name,
      popup: true,
      focusable: true,
      layer: "overlay",
      class_names: ["popup-window", name],
    });

    child.toggleClassName("window-content");
    this.revealer = Widget.Revealer({
      // @ts-ignore
      transition,
      child,
      transition_duration: 200,
      setup: (self) =>
        self.hook(App, (_, wname, visible) => {
          if (wname === name) this.revealer.reveal_child = visible;
        }),
    });

    this.child = Widget.Box({
      css: "padding: 1px;",
      child: this.revealer,
    });

    this.show_all();
    this.visible = visible;

    // @ts-ignore
    keyGrabber.bind("visible", this, "visible");
    keyGrabber.attribute.list.push(name);
  }

  set transition(dir) {
    this.revealer.transition = dir;
  }
  get transition() {
    return this.revealer.transition;
  }
}

/** @param {import('types/widgets/window').WindowProps & {
 *      name: string
 *      child: import('types/widgets/box').default
 *      transition?: import('types/widgets/revealer').RevealerProps['transition']
 *  }} config
 */
// @ts-ignore
export default (config) => new PopupWindow(config);
