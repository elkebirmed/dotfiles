#!/usr/bin/env bash

set -e

echo_info() {
    echo -e "\e[1;34m$1\e[0m"
}

echo_error() {
    echo -e "\e[1;31m$1\e[0m"
}

echo_warning() {
    echo -e "\e[1;33m$1\e[0m"
}

echo_success() {
    echo -e "\e[1;32m$1\e[0m"
}

service_ctl() {
    local ServChk=$1

    if [[ $(systemctl list-units --all -t service --full --no-legend "${ServChk}.service" | sed 's/^\s*//g' | cut -f1 -d' ') == "${ServChk}.service" ]]; then
        echo_success "[SERVICE]: $ServChk service is already enabled..."
    else
        echo_warning "[SERVICE]: $ServChk service is not running, enabling..."
        sudo systemctl enable ${ServChk}.service
        sudo systemctl start ${ServChk}.service
        echo_info "[SERVICE]: $ServChk service enabled, and running..."
    fi
}

pkg_installed() {
    local PkgIn=$1

    if pacman -Qi "$PkgIn" &>/dev/null; then
        return 0
    else
        return 1
    fi
}

flat_pkg_installed() {
    local AppIn=$1

    if flatpak list | grep -q "$AppIn"; then
        return 0
    else
        return 1
    fi
}

pkg_available() {
    local PkgIn=$1

    if pacman -Si $PkgIn &>/dev/null; then
        return 0
    else
        return 1
    fi
}

aur_available() {
    local PkgIn=$1
    chk_aurh

    if yay -Si $PkgIn &>/dev/null; then
        return 0
    else
        return 1
    fi
}

nvidia_detect() {
    if [ $(lspci -k | grep -A 2 -E "(VGA|3D)" | grep -i nvidia | wc -l) -gt 0 ]; then
        return 0
    else
        return 1
    fi
}
