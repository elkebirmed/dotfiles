#!/usr/bin/env bash

arg=$1

volume() {
    pamixer --get-volume-human | tr -d '%'

    pactl subscribe | rg --line-buffered "on sink" | while read -r; do
        pamixer --get-volume-human | tr -d '%'
    done
}

change() {
    direction=$2

    current_volume=$(pactl list sinks | grep '^[[:space:]]Volume:' | head -n 1 | awk '{print $5}' | sed 's/%$//')
    max_volume=130

    if [[ $direction == "down" ]]; then
        pactl set-sink-volume @DEFAULT_SINK@ -5%
    elif [[ $direction == "up" ]]; then
        if [ "$current_volume" -lt $((max_volume - 5)) ]; then
            pactl set-sink-volume @DEFAULT_SINK@ +5%
        else
            pactl set-sink-volume @DEFAULT_SINK@ $max_volume%
        fi
    fi
}

if [[ $arg == "volume" ]]; then
    volume
elif [[ $arg == "change" ]]; then
    change "$@"
fi
