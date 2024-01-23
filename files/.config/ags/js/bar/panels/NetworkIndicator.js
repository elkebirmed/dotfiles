import { Widget, Network } from "../../lib/imports.js";

export default () =>
  Widget.Stack({
    class_name: "indicator-icon network",
    transition: "slide_up_down",
    tooltip_text: Network.bind("primary").transform((p) => {
      if (p == "wifi" && Network.wifi.ssid) {
        return `${Network.wifi.ssid}: ${Network.wifi.internet} : ${Network.wifi.strength}%`;
      }
      return "Unknown";
    }),
    has_tooltip: Network.bind("primary").transform((p) =>
      Boolean(p == "wifi" && Network.wifi.ssid)
    ),
    items: [
      ["fallback", SimpleNetworkIndicator()],
      ["wifi", NetworkWifiIndicator()],
      ["wired", NetworkWiredIndicator()],
    ],
    setup: (self) =>
      self.hook(Network, (stack) => {
        if (!Network.primary) {
          stack.shown = "wifi";
          return;
        }
        const primary = Network.primary || "fallback";
        if (primary == "wifi" || primary == "wired") stack.shown = primary;
        else stack.shown = "fallback";
      }),
  });

const NetworkWiredIndicator = () =>
  Widget.Stack({
    transition: "slide_up_down",
    items: [
      ["fallback", SimpleNetworkIndicator()],
      [
        "unknown",
        Widget.Label({
          label: "󱚵",
        }),
      ],
      [
        "disconnected",
        Widget.Label({
          label: "󰖪",
        }),
      ],
      ["connected", Widget.Label({ label: "󰖩" })],
      [
        "connecting",
        Widget.Label({
          label: "󱛆",
        }),
      ],
    ],
    setup: (self) =>
      self.hook(Network, (stack) => {
        if (!Network.wired) return;

        const { internet } = Network.wired;
        if (internet === "connected" || internet === "connecting")
          stack.shown = internet;
        else if (Network.connectivity !== "full") stack.shown = "disconnected";
        else stack.shown = "fallback";
      }),
  });

const SimpleNetworkIndicator = () =>
  Widget.Icon({
    setup: (self) =>
      self.hook(Network, (self) => {
        const icon = Network[Network.primary || "wifi"]?.icon_name;
        self.icon = icon || "";
        self.visible = icon.length > 0;
      }),
  });

const NetworkWifiIndicator = () =>
  Widget.Stack({
    transition: "slide_up_down",
    items: [
      [
        "disabled",
        Widget.Label({
          label: "󰤮",
        }),
      ],
      [
        "disconnected",
        Widget.Label({
          label: "󰤭",
        }),
      ],
      [
        "connecting",
        Widget.Label({
          label: "󱚻",
        }),
      ],
      [
        "0",
        Widget.Label({
          label: "󰤯",
        }),
      ],
      [
        "1",
        Widget.Label({
          label: "󰤟",
        }),
      ],
      [
        "2",
        Widget.Label({
          label: "󰤢",
        }),
      ],
      [
        "3",
        Widget.Label({
          label: "󰤥",
        }),
      ],
      [
        "4",
        Widget.Label({
          label: "󰤨",
        }),
      ],
    ],
    setup: (self) =>
      self.hook(Network, (stack) => {
        if (!Network.wifi) {
          return;
        }
        if (Network.wifi.internet == "connected") {
          stack.shown = String(Math.ceil(Network.wifi.strength / 25));
        } else if (
          Network.wifi.internet == "disconnected" ||
          Network.wifi.internet == "connecting"
        ) {
          stack.shown = Network.wifi.internet;
        }
      }),
  });
