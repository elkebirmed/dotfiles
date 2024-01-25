#!/usr/bin/env bash

ags -b hypr quit && ags -b hypr &

inotifywait -qmr -e 'modify,move,create,delete' --format '%e %w%f' \
    ~/.config/ags | while read -r _; do
    echo "Reloading config..."
    ags -b hypr quit && ags -b hypr &
done
