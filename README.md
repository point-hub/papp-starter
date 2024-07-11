# Pointhub App Starter

This template should help get you started developing with Vue 3 in Vite.

## Installation

We are using [Bun](https://dev.pointhub.net/guide/introduction/bun) as a drop-in replacement for Node.js

### Install Bun

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
