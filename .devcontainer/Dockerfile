FROM mcr.microsoft.com/devcontainers/javascript-node:1-20-bookworm

ARG USERNAME=node

RUN export DEBIAN_FRONTEND=noninteractive \
  && apt-get update \
  && apt-get -y install --no-install-recommends \
  chromium \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*
ENV CHROME_BIN=/usr/bin/chromium

USER $USERNAME
RUN npm install -g @angular/cli
