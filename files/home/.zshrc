if [ -d "$HOME/.cargo/bin" ]; then
    PATH="$HOME/.cargo/bin:$PATH"
fi

if [ -d "$HOME/.local/bin" ]; then
    PATH="$HOME/.local/bin:$PATH"
fi

export EDITOR=nvim
export SHELL=fish

alias ls='eza'
alias l='eza -l --icons'
alias ll='eza -al --icons'
alias lt='erd -I -L 1 -H -y inverted'
alias ltt='erd -I -L 2 -H -y inverted'
alias ltr='erd -I -H -y inverted'
alias cat='bat'

eval "$(sheldon source)"

eval "$(starship init zsh)"
