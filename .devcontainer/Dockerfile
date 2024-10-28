FROM mcr.microsoft.com/devcontainers/javascript-node:1-22-bookworm

RUN export DEBIAN_FRONTEND=noninteractive \
  && apt-get update \
  && apt-get -y install --no-install-recommends \
  chromium \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*
ENV CHROME_BIN=/usr/bin/chromium
