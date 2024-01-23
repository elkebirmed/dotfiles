#!/usr/bin/env bash

arg=$1

workspaces() {
    hyprctl workspaces -j | jq -c

    socat -u "UNIX-CONNECT:/tmp/hypr/$HYPRLAND_INSTANCE_SIGNATURE/.socket2.sock" - | while read -r; do
        hyprctl workspaces -j | jq -c 'sort_by(.id)'
    done
}

active() {
    hyprctl monitors -j | jq '.[] | select(.focused) | .activeWorkspace.id'

    # shellcheck disable=SC2016
    socat -u "UNIX-CONNECT:/tmp/hypr/$HYPRLAND_INSTANCE_SIGNATURE/.socket2.sock" - |
        stdbuf -o0 awk -F '>>|,' -e '/^workspace>>/ {print $2}' -e '/^focusedmon>>/ {print $3}'
}

change() {
    direction=$2

    if [[ $direction == "down" ]]; then
        hyprctl dispatch workspace e+1
    elif [[ $direction == "up" ]]; then
        hyprctl dispatch workspace e-1
    fi
}

if [[ $arg == 'workspaces' ]]; then
    workspaces
elif [[ $arg == 'active' ]]; then
    active
elif [[ $arg == 'change' ]]; then
    change "$@"
fi
