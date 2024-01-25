import { Widget, Utils, Notifications } from "../lib/imports.js";
import Notification from "./panels/Notification.js";

const Popups = (parent) => {
  const map = new Map();

  const onDismissed = (_, id, force = false) => {
    if (!id || !map.has(id)) return;

    if (map.get(id).isHovered() && !force) return;

    if (map.size - 1 === 0) parent.reveal_child = false;

    Utils.timeout(200, () => {
      map.get(id)?.destroy();
      map.delete(id);
    });
  };

  const onNotified = (box, id) => {
    if (!id || Notifications.dnd) return;

    const n = Notifications.getNotification(id);
    if (!n) return;

    map.delete(id);
    map.set(id, Notification(n));
    box.children = Array.from(map.values()).reverse();
    Utils.timeout(10, () => {
      parent.reveal_child = true;
    });
  };

  return Widget.Box({ vertical: true })
    .hook(Notifications, onNotified, "notified")
    .hook(Notifications, onDismissed, "dismissed")
    .hook(Notifications, (box, id) => onDismissed(box, id, true), "closed");
};

const PopupList = () =>
  Widget.Box({
    class_name: "popup-list",
    css: "padding: 1px",
    children: [
      Widget.Revealer({
        transition: "slide_down",
        setup: (self) => (self.child = Popups(self)),
      }),
    ],
  });

export default () =>
  Widget.Window({
    name: "notifications",
    class_name: "notifications",
    anchor: ["top", "right"],
    child: PopupList(),
  });
