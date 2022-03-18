import type { SvelteComponentTyped } from 'svelte';

export type Props = Record<string, unknown>;

export type Component<T = Props> = AConstructorTypeOf<SvelteComponentTyped<T>>;

export type ComponentProps<T> = T extends SvelteComponentTyped<infer P> ? P : never;
