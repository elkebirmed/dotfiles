#!/usr/bin/env bash

arg=$1

layout() {
    # shellcheck disable=SC2016
    socat -u "UNIX-CONNECT:/tmp/hypr/$HYPRLAND_INSTANCE_SIGNATURE/.socket2.sock" - |
        stdbuf -o0 awk -F '>>|,' -e '/^activelayout>>/ {print toupper(substr($3, 1, 2))}'
}

if [[ $arg == "layout" ]]; then
    layout
fi
