#!/usr/bin/env bash

direction=$1

if [[ $direction == "down" ]]; then
    hyprctl dispatch workspace e+1
elif [[ $direction == "up" ]]; then
    hyprctl dispatch workspace e-1
fi
