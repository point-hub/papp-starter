# Pointhub App Starter

This template should help get you started developing with Vue 3 in Vite.

## Features

- [Bun](https://bun.sh/) Javascript runtime
- [Vue](https://vuejs.org/) JavaScript framework
- [Cucumber](https://cucumber.io/) for BDD testing
- [Cypress](https://www.cypress.io/) for testing framework
- [ESLint](https://eslint.org) for code linting
- [Prettier](https://prettier.io) for code formatting

## UI Components

We are using Pointhub App Components for designin UI & UX https://dev.pointhub.net/library/papp/

## Installation

We are using [Bun](https://dev.pointhub.net/guide/introduction/bun) as a drop-in replacement for Node.js

### Install Node.js

We still need to install Node.js because Cypress requires Node.js in order to install. Follow the instructions on [https://nodejs.org/en/download/package-manager](https://nodejs.org/en/download/package-manager) to download and install Node.js

### Install Bun

Install Bun a JavaScript runtime

Linux / MacOS

```bash
curl -fsSL https://bun.sh/install | bash
```

Windows

```bash
powershell -c "irm bun.sh/install.ps1 | iex"
```

### Install dependencies

```sh
bun install --frozen-lock
```

### Install Cypress (optional)

You can skip this step, if you already have cypress on your system

```sh
./node_modules/.bin/cypress install
```

### Compile and Hot-Reload for Development

```sh
bun run dev
```

### Type-Check, Compile and Minify for Production

```sh
bun run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
bun run test:unit
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
bun run test:e2e:dev
```

This runs the end-to-end tests against the Vite development server.
It is much faster than the production build.

But it's still recommended to test the production build with `test:e2e` before deploying (e.g. in CI environments):

```sh
bun run build
bun run test:e2e
```

### Lint with [ESLint](https://eslint.org/)

```sh
bun run lint
```
