#!/usr/bin/env bash

source $(dirname $0)/utils.sh

# check first arg is not -r
if [[ "$1" != "-r" ]]; then
    # grub
    if pkg_installed grub && [ -f /boot/grub/grub.cfg ]; then
        echo_info "[BOOTLOADER]: grub detected..."

        if [ ! -f /etc/default/grub.t2.bkp ] && [ ! -f /boot/grub/grub.t2.bkp ]; then
            echo_info "[BOOTLOADER]: configuring grub..."
            sudo cp /etc/default/grub /etc/default/grub.t2.bkp
            sudo cp /boot/grub/grub.cfg /boot/grub/grub.t2.bkp

            if nvidia_detect; then
                echo_info "[BOOTLOADER]: nvidia detected, adding nvidia_drm.modeset=1 to boot option..."
                gcld=$(grep "^GRUB_CMDLINE_LINUX_DEFAULT=" "/etc/default/grub" | cut -d'"' -f2 | sed 's/\b nvidia_drm.modeset=.\b//g')
                sudo sed -i "/^GRUB_CMDLINE_LINUX_DEFAULT=/c\GRUB_CMDLINE_LINUX_DEFAULT=\"${gcld} nvidia_drm.modeset=1\"" /etc/default/grub
            fi

            sudo grub-mkconfig -o /boot/grub/grub.cfg
        else
            echo_success "[BOOTLOADER]: grub is already configured..."
        fi

    else
        echo_warning "[WARNING]: grub is not configured..."
    fi

    # pacman
    if [ -f /etc/pacman.conf ] && [ ! -f /etc/pacman.conf.t2.bkp ]; then
        echo_info "[PACMAN]: adding extra spice to pacman..."

        sudo cp /etc/pacman.conf /etc/pacman.conf.t2.bkp
        sudo sed -i "/^#Color/c\Color\nILoveCandy
    /^#VerbosePkgLists/c\VerbosePkgLists
    /^#ParallelDownloads/c\ParallelDownloads = 5" /etc/pacman.conf
        sudo sed -i '/^#\[multilib\]/,+1 s/^#//' /etc/pacman.conf

        sudo pacman -Syyu
        sudo pacman -Fy

    else
        echo_success "[PACMAN]: pacman is already configured..."
    fi

    if ! pkg_installed git; then
        echo_info "[GIT]: installing git..."
        sudo pacman -S git
    else
        echo_success "[GIT]: git is already installed..."
    fi

    # yay
    if ! pkg_installed yay; then
        echo_info "[YAY]: installing yay..."
        git clone https://aur.archlinux.org/yay-git.git
        cd yay-git
        makepkg -si
        cd ..
        rm -rf yay-git
        yay -Syyu
        yay -Fy
    else
        echo_success "[YAY]: yay is already installed..."
    fi

    source $(dirname $0)/packages.sh

    for package in ${packages[@]}; do
        if ! pkg_installed ${package}; then
            echo_info "[PACKAGE]: installing ${package}..."
            yay -S --noconfirm ${package}
        fi
    done

    yay -Yc

    services=(
        sddm
        NetworkManager
        bluetooth
    )

    for service in ${services[@]}; do
        service_ctl ${service}
    done
fi

if [ ! -d ~/Projects ]; then
    mkdir ~/Projects
fi

if [ ! -L ~/Projects/dotfiles ]; then
    ln -s ~/dotfiles ~/Projects/dotfiles
fi

dot_config=(
    hypr
)

for folder in ${dot_config[@]}; do
    rm -rf ~/.config/${folder}
    ln -s ~/dotfiles/files/.config/${folder} ~/.config/${folder}
done

for file in $(ls -A ~/dotfiles/files/.config/root); do
    rm ~/.config/${file}
    ln -s ~/dotfiles/files/.config/root/${file} ~/.config
done

for file in $(ls -A ~/dotfiles/files/home); do
    rm ~/${file}
    ln -s ~/dotfiles/files/home/${file} ~/
done
