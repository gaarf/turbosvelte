# turbosvelte

install dependencies from the root, with `yarn`

[@repo/ui](./workspaces/ui/) = shared components 

[@repo/web](./workspaces/web/) = sveltekit app

## Essential commands

- `yarn run dev` runs everything
- `yarn run check` typechecking
- `yarn run test` unit + e2e testing
- `yarn run build` 🤷

### Linting & Formatting

runs automatically at commit time.
to process the whole repo:

- `yarn run lint`
- `yarn run format`

### Generate an end-to-end test

- `yarn run playwright codegen`
