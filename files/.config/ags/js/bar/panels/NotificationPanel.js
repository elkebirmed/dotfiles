import { Notifications, Utils, Widget } from "../../lib/imports.js";

let open = false;

export default () =>
  Widget.EventBox({
    class_name: "notification-indicator",
    setup: (self) =>
      self.hook(
        Notifications,
        () =>
          (self.visible =
            Notifications.notifications.length > 0 || Notifications.dnd)
      ),
    on_hover: () => {
      if (open) return;
      revealer.reveal_child = true;
      Utils.timeout(300, () => (open = true));
    },
    on_hover_lost: () => {
      if (!open) return;
      revealer.reveal_child = false;
      open = false;
    },
    child: Widget.Box({
      children: [
        Widget.Label({
          class_name: "notification-indicator",
          // @ts-ignore
          label: Notifications.bind("dnd").transform((dnd) =>
            dnd ? "" : ""
          ),
        }),
        revealer,
      ],
    }),
  });

const revealer = Widget.Revealer({
  transition: "slide_left",
  transition_duration: 300,
  setup: (self) =>
    self.hook(Notifications, () => {
      let title = "";
      const summary = Notifications.notifications[0]?.summary;
      if (title === summary) return;

      title = summary;
      self.reveal_child = true;
      Utils.timeout(3000, () => {
        self.reveal_child = false;
      });
    }),
  child: Widget.Label({
    truncate: "end",
    max_width_chars: 40,
    label: Notifications.bind("notifications").transform(
      (n) => n.reverse()[0]?.summary || ""
    ),
  }),
});

const c = () =>
  Widget.Revealer({
    reveal_child: Notifications.bind("notifications").transform(
      (n) => n.length > 0
    ),
    child: Widget.EventBox({
      class_name: "notification-indicator",
      child: Widget.Box({
        setup: (self) =>
          self.hook(Notifications, (stack) => {
            print(Notifications.notifications.length);

            Notifications.notifications.forEach((n) => {
              print(n.summary);
            });
          }),
        children: [
          Widget.Label({ class_name: "notification-icon", label: "" }),
          Widget.Label({
            class_name: "notification-count",
            label: Notifications.bind("notifications").transform((n) =>
              n.length.toString()
            ),
          }),
        ],
      }),
    }),
  });
