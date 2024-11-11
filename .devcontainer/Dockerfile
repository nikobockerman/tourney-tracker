FROM mcr.microsoft.com/devcontainers/base:bookworm

RUN export DEBIAN_FRONTEND=noninteractive \
  && apt-get update \
  && apt-get -y install --no-install-recommends \
  chromium \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*
ENV CHROME_BIN=/usr/bin/chromium

# Disable download prompt for Corepack
ENV COREPACK_ENABLE_DOWNLOAD_PROMPT=0
