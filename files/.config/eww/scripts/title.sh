#!/usr/bin/env bash

arg=$1

icon() {
    ~/.config/eww/scripts/icon.py "$1" "$2"
}

title() {
    class_name=$(hyprctl activewindow -j | jq '.class')
    title_name=$(hyprctl activewindow -j | jq '.title')
    get_title "$class_name" "$title_name"

    # shellcheck disable=SC2016
    socat -u "UNIX-CONNECT:/tmp/hypr/$HYPRLAND_INSTANCE_SIGNATURE/.socket2.sock" - |
        get_title $(stdbuf -o0 awk -F '>>|,' -e '/^activewindow>>/ {printf "\"%s\" \"%s\"", $2, $3}')
}

get_title() {

    icon_output=$(icon "$1" "$2")
    hyprctl activewindow -j | jq --arg icon_output "$icon_output" '[.class, .title, $icon_output]'
}

if [[ $arg == "title" ]]; then
    title
fi
