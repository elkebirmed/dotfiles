if [ -d "$HOME/.cargo/bin" ]; then
    PATH="$HOME/.cargo/bin:$PATH"
fi

if [ -d "$HOME/.local/bin" ]; then
    PATH="$HOME/.local/bin:$PATH"
fi

if [ -d "$HOME/.config/composer/vendor/bin" ]; then
    PATH="$HOME/.config/composer/vendor/bin:$PATH"
fi

export EDITOR=nvim
export SHELL=zsh

export ZSH="$HOME/.local/share/sheldon/repos/github.com/ohmyzsh/ohmyzsh"

plugins=(
    aliases
    colored-man-pages
    command-not-found
    direnv
    dotenv
    emoji
    fd
    fzf
    gh
    sudo
)

alias ls='eza'
alias l='eza -lFh --icons'
alias la='eza -lAFh --icons'
alias ll='eza -l --icons'
alias ld='eza -ld --icons .*'
alias lt='erd -I -L 1 -H -y inverted'
alias ltt='erd -I -L 2 -H -y inverted'
alias ltr='erd -I -H -y inverted'
alias cat='bat'
alias rm='rm -i'
alias cp='cp -i'
alias mv='mv -i'
alias grep='grep --color=auto'
alias t='tail -f'
alias h='history'
alias sail='[ -f sail ] && sh sail || sh vendor/bin/sail'

take() {
    mkdir -p $1
    cd $1
}

eval "$(sheldon source)"

eval "$(starship init zsh)"
