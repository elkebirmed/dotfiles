const resource = (file) => `resource:///com/github/Aylur/ags/${file}.js`;
const require = async (file) => (await import(resource(file))).default;
const service = async (file) => await require(`service/${file}`);

/** @type {import("resource:///com/github/Aylur/ags/app.js").App} */
export const App = await require("app");

/** @type {import("resource:///com/github/Aylur/ags/widget.js").Widget} */
export const Widget = await require("widget");

/** @type {import("resource:///com/github/Aylur/ags/service.js").default} */
export const Service = await require("service");

/** @type {import("resource:///com/github/Aylur/ags/variable.js").Variable} */
export const Variable = await require("variable");

/** @type {import("resource:///com/github/Aylur/ags/utils.js").default} */
export const Utils = await import(resource("utils"));

/** @type {import("resource:///com/github/Aylur/ags/service/applications.js").default} */
export const Applications = await service("applications");

/** @type {import("resource:///com/github/Aylur/ags/service/audio.js").default} */
export const Audio = await service("audio");

/** @type {import("resource:///com/github/Aylur/ags/service/battery.js").default} */
export const Battery = await service("battery");

/** @type {import("resource:///com/github/Aylur/ags/service/bluetooth.js").default} */
export const Bluetooth = await service("bluetooth");

/** @type {import("resource:///com/github/Aylur/ags/service/hyprland.js").default} */
export const Hyprland = await service("hyprland");

/** @type {import("resource:///com/github/Aylur/ags/service/mpris.js").default} */
export const Mpris = await service("mpris");

/** @type {import("resource:///com/github/Aylur/ags/service/network.js").default} */
export const Network = await service("network");

/** @type {import("resource:///com/github/Aylur/ags/service/notifications.js").default} */
export const Notifications = await service("notifications");

/** @type {import("resource:///com/github/Aylur/ags/service/systemtray.js").default} */
export const SystemTray = await service("systemtray");

// globalThis["App"] = App;
// globalThis['Widget'] = Widget;
// globalThis['Service'] = Service;
// globalThis['Variable'] = Variable;
// globalThis["Utils"] = Utils;
// globalThis['Applications'] = Applications;
globalThis["Audio"] = Audio;
// globalThis['Battery'] = Battery;
// globalThis['Bluetooth'] = Bluetooth;
// globalThis['Hyprland'] = Hyprland;
// globalThis["Mpris"] = Mpris;
// globalThis['Network'] = Network;
// globalThis["Notifications"] = Notifications;
// globalThis['SystemTray'] = SystemTray;

const { exec } = Utils;
export const SCREEN_WIDTH = Number(
  exec(
    `bash -c "xrandr --current | grep '*' | uniq | awk '{print $1}' | cut -d 'x' -f1 | head -1" | awk '{print $1}'`
  )
);
export const SCREEN_HEIGHT = Number(
  exec(
    `bash -c "xrandr --current | grep '*' | uniq | awk '{print $1}' | cut -d 'x' -f2 | head -1" | awk '{print $1}'`
  )
);
