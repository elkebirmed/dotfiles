#!/usr/bin/env bash

# shellcheck disable=SC2034
packages=(
    # base
    linux-zen-headers
    nvidia-dkms

    # tools
    man
    less
    jq
    imagemagick
    pacman-contrib
    parallel
    neofetch
    eza

    # editors
    vim
    neovim
    visual-studio-code-bin

    # shell
    fish

    # Display Manager
    sddm-git

    # Apps
    alacritty
    firefox
    discord
    steam

    # audio
    pipewire
    pipewire-alsa
    pipewire-audio
    pipewire-jack
    pipewire-pulse
    gst-plugin-pipewire
    wireplumber

    # Network
    networkmanager
    network-manager-applet

    # bluetooth
    bluez
    bluez-utils
    blueman

    # QT
    qt5ct
    qt5-wayland
    qt6-wayland
    qt5-quickcontrols
    qt5-quickcontrols2
    qt5-graphicaleffects
    qt5-imageformats

    # Hyprland
    hyprland-git
    rofi-lbonn-wayland-git
    xdg-desktop-portal-hyprland
    waybar
    wl-clipboard

    # Fonts
    ttf-jetbrains-mono-nerd
    ttf-firacode-nerd
    noto-fonts
    noto-fonts-cjk
    noto-fonts-emoji
    noto-fonts-extra

    # Themes
    catppuccin-gtk-theme-mocha
    catppuccin-cursors-mocha
    sddm-theme-catppuccin-git

    # Misc
    brightnessctl
    pavucontrol
    polkit-kde-agent
    cliphist
    dolphin
    gamemode
    github-cli
)
