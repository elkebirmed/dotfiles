import { range } from "../../lib/utils.js";
import { Widget, Hyprland, Utils } from "../../lib/imports.js";

const dispatch = (ws) => Hyprland.sendMessage(`dispatch workspace ${ws}`);

export default () =>
  Widget.EventBox({
    on_scroll_up: () =>
      Utils.exec("bash -c '~/.config/ags/scripts/workspaces.sh change up'"),
    on_scroll_down: () =>
      Utils.exec("bash -c '~/.config/ags/scripts/workspaces.sh change down'"),
    child: Workspaces(),
  });

const Workspaces = () =>
  Widget.Box({
    class_name: "workspaces",
    children: range(10).map((i) =>
      Widget.Button({
        class_name: "workspace",
        attribute: i,
        on_clicked: () => dispatch(i),
      }).bind("label", Hyprland.active.workspace, "id", (id) =>
        id == i ? "" : ""
      )
    ),
    setup: (self) =>
      self.hook(Hyprland, (box) =>
        box.children.forEach((btn) => {
          btn.visible = Hyprland.workspaces.some(
            // @ts-ignore
            (ws) => ws.id === btn.attribute
          );
        })
      ),
  });
