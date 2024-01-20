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
alias cat='bat'

eval "$(sheldon source)"

eval "$(starship init zsh)"
