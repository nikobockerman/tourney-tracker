FROM mcr.microsoft.com/devcontainers/javascript-node:1-22-bookworm

ARG USERNAME=node

RUN export DEBIAN_FRONTEND=noninteractive \
    && apt update \
    && apt-get -y install --no-install-recommends \
    curl \
    libglu1-mesa \
    unzip \
    xz-utils \
    zip \
    && rm -rf /var/lib/apt/lists/*

# Get latest stable Flutter
USER $USERNAME
RUN [ "${HOME}" = "/home/node" ] || { echo "HOME env var should be /home/node. Value: ${HOME}"; exit 1; } && \
    git clone --depth=1 --branch stable https://github.com/flutter/flutter $HOME/flutter
ENV PATH "$PATH:/home/node/flutter/bin"
# Trigger flutter to install binaries for itself
RUN flutter --help
RUN flutter config --no-enable-android
RUN flutter config --no-enable-linux-desktop
RUN flutter config --enable-web
RUN flutter precache
