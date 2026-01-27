# ---------------------------------------------------------------------------
# stage 1 - builder
# ---------------------------------------------------------------------------
FROM node:24-slim AS builder

# install curl (required for bun install)
RUN apt-get update && apt-get install -y \
    curl \
    unzip \
    && rm -rf /var/lib/apt/lists/*

# setup default user and working directory
USER node
WORKDIR /home/node/app

# install requirements for Bun
RUN curl -fsSL https://bun.sh/install | bash

# ensure Bun is in the PATH
ENV PATH="/home/node/.bun/bin:${PATH}"

# environment variable
ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
ARG VITE_API_TIMEOUT
ENV VITE_API_TIMEOUT=$VITE_API_TIMEOUT

# install dependencies
COPY --chown=node:node package.json bun.lock ./
RUN bun install --frozen-lockfile

# copy source code
COPY --chown=node:node . .

# build app
RUN bun run build

# ---------------------------------------------------------------------------
# stage 2 - runner
# ---------------------------------------------------------------------------
FROM nginx:1.29.1-alpine AS runner

# copy nginx configuration server block file
COPY .nginx/default.conf /etc/nginx/conf.d/default.conf

# copy web files
COPY --from=builder /home/node/app/dist /usr/share/nginx/html
