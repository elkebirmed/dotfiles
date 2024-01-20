#!/usr/bin/env bash

pamixer --get-volume-human | tr -d '%'

pactl subscribe | rg --line-buffered "on sink" | while read -r; do
    pamixer --get-volume-human | tr -d '%'
done
