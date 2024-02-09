#!/usr/bin/env bash

# shellcheck disable=SC2034
packages=(
    # base
    linux-zen-headers
    nvidia-390xx-dkms

    # tools
    man
    less
    jq
    imagemagick
    pacman-contrib
    parallel
    neofetch
    eza
    bat
    ripgrep
    fzf
    inxi
    socat
    inotify-tools
    dust
    hyperfine
    bottom
    zoxide
    nnn
    bandwhich
    procs
    fselect
    httm
    kmon
    fd
    erdtree
    autoenv-git
    direnv

    # Printer
    cups
    cnijfilter2
    cups-bjnp
    system-config-printer

    # Package managers
    flatpak
    flatseal

    # editors
    vim
    neovim
    visual-studio-code-bin

    # shell
    zsh
    starship

    # Display Manager
    sddm-git

    # Development Apps
    alacritty
    gnome-boxes

    # Browser Apps
    firefox

    # Media Apps
    clapper
    obs-studio
    kdenlive

    # Gaming Apps
    steam
    cartridges
    protonup-qt
    protontricks
    bottles

    # Social Apps
    webcord

    # Graphics Apps
    inkscape
    gimp
    krita
    upscaler
    eog

    # File Apps
    warp
    ark
    dolphin

    # audio
    pipewire
    pipewire-alsa
    pipewire-audio
    pipewire-jack
    pipewire-pulse
    gst-plugin-pipewire
    wireplumber
    pamixer
    cava

    # Network
    networkmanager
    network-manager-applet

    # bluetooth
    bluez
    bluez-utils
    blueman
    gnome-bluetooth-3.0

    # QT
    qt5ct
    qt5-wayland
    qt6-wayland
    qt5-quickcontrols
    qt5-quickcontrols2
    qt5-graphicaleffects
    qt5-imageformats
    qt5-svg

    # Hyprland
    hyprland-git
    rofi-lbonn-wayland-git
    xdg-desktop-portal-hyprland
    waybar
    wl-clipboard
    swww
    slurp
    aylurs-gtk-shell-git
    hyprpicker
    swaylock-effects

    # Programming
    docker
    docker-compose
    nodejs
    npm
    yarn
    typescript
    sassc
    sqlite
    php
    php-sqlite
    php-pgsql
    php-gd
    composer

    # Fonts
    ttf-jetbrains-mono-nerd
    ttf-firacode-nerd
    ttf-rubik
    ttf-ms-fonts
    ttf-twemoji
    ttf-arabeyes-fonts
    noto-fonts
    noto-fonts-cjk
    noto-fonts-emoji
    noto-fonts-extra
    otf-font-awesome

    # Themes
    catppuccin-gtk-theme-mocha
    catppuccin-cursors-mocha
    papirus-icon-theme

    # Misc
    brightnessctl
    pavucontrol
    polkit-kde-agent
    cliphist
    gamemode
    github-cli
    kvantum
)

flats=(
    # TODO: Blender is broken
    # org.blender.Blender
)

crates=(
    sheldon
    cargo-watch
)
