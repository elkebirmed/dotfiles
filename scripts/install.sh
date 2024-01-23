#!/usr/bin/env bash

source $(dirname $0)/utils.sh

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

    if [ ! -f /usr/share/grub/themes/mocha/theme.txt ]; then
        echo_info "[GRUB]: Adding mocha theme..."
        sudo cp /etc/default/grub /etc/default/grub.t3.bkp
        sudo cp -r ~/dotfiles/files/grub/themes/mocha /usr/share/grub/themes

        new_theme="/usr/share/grub/themes/mocha/theme.txt"
        grub_config="/etc/default/grub"

        sudo sed -i "s|^#GRUB_THEME=.*$|GRUB_THEME=\"$new_theme\"|" "$grub_config"

        sudo grub-mkconfig -o /boot/grub/grub.cfg
    fi

    if [ ! -f /usr/share/sddm/themes/mocha/theme.conf ]; then
        echo_info "[SDDM]: installing mocha theme..."
        sudo cp -r ~/dotfiles/files/sddm/themes/mocha /usr/share/sddm/themes
    fi

    if [ ! -f /etc/sddm.conf.d/kde_settings.conf ]; then
        echo_info "[SDDM]: Configuring sddm..."

        if [ ! -d /etc/sddm.conf.d ]; then
            sudo mkdir /etc/sddm.conf.d
        fi

        sudo cp -r ~/dotfiles/files/sddm/sddm.conf /etc/sddm.conf.d/kde_settings.conf
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

    if ! command -v rustup &>/dev/null; then
        echo_info "[RUST]: installing rustup..."
        curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- --no-modify-path -y
    else
        echo_success "[RUST]: rustup is already installed..."
    fi

    source $(dirname $0)/packages.sh

    for package in ${packages[@]}; do
        if ! pkg_installed ${package}; then
            echo_info "[PACKAGE]: installing ${package}..."
            yay -S --noconfirm ${package}
        fi
    done

    yay -Yc

    for flat in ${flats[@]}; do
        if [ ${flat} == 'flathub' ]; then
            flatpak remote-add --user --if-not-exists flathub https://flathub.org/repo/flathub.flatpakrepo
        fi

        if ! flat_pkg_installed ${flat}; then
            echo_info "[FLATPAK]: installing ${flat}..."
            flatpak install --user -y flathub ${flat}
        fi
    done

    flatpak remove --unused

    for crate in ${crates[@]}; do
        if ! command -v ${crate} &>/dev/null; then
            echo_info "[CRATE]: installing ${crate}..."
            cargo install ${crate}
        fi
    done

    if [ -f /etc/bluetooth/main.conf ] && ! grep -q '#Experimental = true' /etc/bluetooth/main.conf; then
        sudo sed -i 's/^#\(.*Experimental = true\)/\1/' /etc/bluetooth/main.conf
    fi

    services=(
        sddm
        NetworkManager
        bluetooth
    )

    for service in ${services[@]}; do
        service_ctl ${service}
    done

    fish_plugins=(
        catppuccin/fish
    )

    for plugin in ${fish_plugins[@]}; do
        if ! fish -c 'fisher list' | grep -q ${plugin}; then
            fish -c "fisher install ${plugin}"
        fi
    done

    if [ ! -d ~/.local/bin ]; then
        mkdir -p ~/.local/bin
    fi

    if ! command -v eww &>/dev/null; then
        echo_info "[EWW]: installing eww..."
        git clone --depth=1 https://github.com/elkowar/eww
        cd eww
        ~/.cargo/bin/cargo build --release --no-default-features --features=wayland
        chmod +x ./target/release/eww
        cp target/release/eww ~/.local/bin
        cd ..
        rm -rf eww
    fi
fi

if [ ! -d ~/Projects ]; then
    mkdir ~/Projects
fi

if [ ! -L ~/Projects/dotfiles ]; then
    ln -s ~/dotfiles ~/Projects/dotfiles
fi

dot_config=(
    hypr
    alacritty
    starship
    bat
    dunst
    gtk-3.0
    wallpapers
    sheldon
    eww
    ags
    fontconfig
)

for folder in ${dot_config[@]}; do
    [ -d ~/.config/${folder} ] && rm -rf ~/.config/${folder}
    ln -s ~/dotfiles/files/.config/${folder} ~/.config/${folder}
done

for file in $(ls -A ~/dotfiles/files/.config/root); do
    [ -f ~/.config/${file} ] && rm ~/.config/${file}
    ln -s ~/dotfiles/files/.config/root/${file} ~/.config
done

for file in $(ls -A ~/dotfiles/files/home); do
    [ -f ~/${file} ] && rm ~/${file}
    ln -s ~/dotfiles/files/home/${file} ~/
done

if [ ! -f ~/.config/.not_first_time ]; then
    bat cache --build
    fish -c "fish_config theme save \"Catppuccin Mocha\""

    GtkTheme=$(gsettings get org.gnome.desktop.interface gtk-theme | sed "s/'//g")
    GtkIcon=$(gsettings get org.gnome.desktop.interface icon-theme | sed "s/'//g")

    flatpak --user override --filesystem=~/.themes
    flatpak --user override --filesystem=~/.icons

    flatpak --user override --env=GTK_THEME=${GtkTheme}
    flatpak --user override --env=ICON_THEME=${GtkIcon}

    touch ~/.config/.not_first_time
fi
