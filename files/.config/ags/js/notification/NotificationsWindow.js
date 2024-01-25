import { Widget, Notifications } from "../lib/imports.js";
import PopupWindow from "../misc/PopupWindow.js";
import Notification from "./panels/Notification.js";

const Body = () =>
  Widget.Scrollable({
    hscroll: "never",
    vscroll: "always",
    class_name: "notifications-body",
    child: Widget.Box({
      class_name: "notifications-list",
      vertical: true,
      spacing: 14,
      // @ts-ignore
      children: Notifications.bind("notifications").transform((n) =>
        n.map((n) => Notification(n, false))
      ),
    }),
  });

const Header = () =>
  Widget.Box({
    class_name: "notifications-header",
    children: [
      Widget.Label({
        class_name: "notifications-title",
        label: "Notifications",
        xalign: 0,
        hexpand: true,
      }),
      Widget.Button({
        class_name: "clear-button",
        label: "Clear",
        on_clicked: () => Notifications.clear(),
      }),
      Widget.Button({
        class_name: "dnd-button",
        // @ts-ignore
        label: Notifications.bind("dnd").transform((dnd) => (dnd ? "" : "")),
        on_clicked: () => (Notifications.dnd = !Notifications.dnd),
      }),
    ],
  });

const NotificationsWindow = () => {
  return Widget.Box({
    class_name: "notifications",
    vertical: true,
    halign: 0,
    hpack: "start",
    children: [Header(), Body()],
  });
};

export default () =>
  PopupWindow({
    name: "notifications-window",
    transition: "slide_down",
    child: NotificationsWindow(),
    anchor: ["top", "right"],
  });
