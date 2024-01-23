import { Widget, Utils, Hyprland } from "../../lib/imports.js";

import { isLanguageMatch } from "../../lib/utils.js";

const languages = [
  {
    layout: "us",
    name: "English (US)",
    flag: "𝑢𝑠",
  },
  {
    layout: "ara",
    name: "العربية",
    flag: "󱌨",
  },
  {
    layout: "fr",
    name: "French",
    flag: "𝑓𝑟",
  },
  {
    layout: "undef",
    name: "Undefined",
    flag: "?",
  },
];

export default () => {
  var initLangs = [];
  var languageStackArray = [];
  var currentKeyboard;

  const updateCurrentKeyboards = () => {
    currentKeyboard = JSON.parse(
      Utils.exec("hyprctl -j devices")
    ).keyboards.find(
      (device) => device.name === "at-translated-set-2-keyboard"
    );

    if (currentKeyboard) {
      initLangs = currentKeyboard.layout.split(",").map((lang) => lang.trim());
    }

    languageStackArray = Array.from({ length: initLangs.length }, (_, i) => {
      const lang = languages.find((lang) => lang.layout == initLangs[i]);
      if (!lang) return [initLangs[i], Widget.Label({ label: initLangs[i] })];
      return [
        lang.layout,
        Widget.Label({ label: lang.flag, tooltip_text: lang.name }),
      ];
    });
  };

  updateCurrentKeyboards();

  const widgetContent = Widget.Stack({
    class_name: "indicator-icon keyboard",
    transition: "slide_up_down",
    items: [...languageStackArray, ["undef", Widget.Label({ label: "?" })]],
    setup: (self) =>
      self.hook(
        Hyprland,
        (stack, kbName, layoutName) => {
          if (!kbName) {
            return;
          }
          var lang = languages.find((lang) => layoutName.includes(lang.name));
          if (lang) {
            widgetContent.shown = lang.layout;
          } else {
            // Attempt to support langs not listed
            lang = languageStackArray.find((lang) =>
              isLanguageMatch(lang[0], layoutName)
            );
            if (!lang) stack.shown = "undef";
            else stack.shown = lang[0];
          }
        },
        "keyboard-layout"
      ),
  });

  return widgetContent;
};
