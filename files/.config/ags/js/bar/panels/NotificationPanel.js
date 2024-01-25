import { App, Notifications, Widget } from "../../lib/imports.js";

let open = false;

export default () =>
  Widget.Button({
    on_clicked: () => App.toggleWindow("notifications-window"),
    class_name: "notification-button",
    child: Widget.Box({
      children: [
        Widget.Label({
          class_name: "notification-icon",
          // @ts-ignore
          label: Notifications.bind("dnd").transform((dnd) =>
            dnd ? "" : ""
          ),
        }),
        Widget.Label({
          class_name: "notification-count",
          label: Notifications.bind("notifications").transform((n) =>
            n.length.toString()
          ),
          visible:
            Notifications.bind("notifications").transform(
              (n) => n.length > 0
            ) && Notifications.bind("dnd").transform((dnd) => !dnd),
        }),
      ],
    }),
  });
