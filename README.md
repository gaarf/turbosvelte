# turbosvelte

install dependencies from the root, with `yarn`

[@repo/shared](./packages/shared/) = components, utils, tailwind config

[@repo/web](./packages/web/) = sveltekit app

## Repo-level commands

- `yarn run dev` runs everything
- `yarn run check` typechecking
- `yarn run test` run unit + e2e tests
- `yarn run jest --watch` watch unit tests
- `yarn run build` 🤷

### Linting & Formatting

runs automatically at commit time.
to process the whole repo:

- `yarn run lint`
- `yarn run format`

### Generate an End-to-End test

- `yarn run playwright codegen`
