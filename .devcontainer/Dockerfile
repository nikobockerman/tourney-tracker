FROM mcr.microsoft.com/devcontainers/javascript-node:1-22-bookworm

RUN apt update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends \
    curl git unzip xz-utils zip libglu1-mesa \
    && rm -rf /var/lib/apt/lists/*
