#!/usr/bin/env bash

arg=$1

truncate_str() {
    str=$2
    size=$3
    end=${4:-"..."}

    if [ "${#str}" -gt "$size" ]; then
        echo "${str:0:$size}${end}"
    else
        echo "$str"
    fi
}

icon() {
    if [[ $2 == "Alacritty" ]]; then
        echo "alacritty"
    else
        echo "$2"
    fi
}

if [[ $arg == "truncate" ]]; then
    truncate_str "$@"
elif [[ $arg == "icon" ]]; then
    icon "$@"
fi
