#!/usr/bin/env bash

current_volume=$(pactl list sinks | grep '^[[:space:]]Volume:' | head -n 1 | awk '{print $5}' | sed 's/%$//')
max_volume=130

if [ "$current_volume" -lt $((max_volume - 5)) ]; then
    pactl set-sink-volume @DEFAULT_SINK@ +5%
else
    pactl set-sink-volume @DEFAULT_SINK@ $max_volume%
fi
