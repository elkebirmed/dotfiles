#!/usr/bin/env bash

# shellcheck disable=SC2012
interface=$(ls -w1 /sys/class/backlight | head -1)
brightness=$(cat "/sys/class/backlight/${interface}/brightness")
max_brightness=$(cat "/sys/class/backlight/${interface}/max_brightness")

echo "$((brightness * 100 / max_brightness))"
