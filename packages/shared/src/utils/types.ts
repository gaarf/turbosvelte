import type { SvelteComponentTyped } from 'svelte';
export type Props = Record<string, unknown>;

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export type Component<T = Props> = new (...args: any) => SvelteComponentTyped<T>;

export type ComponentProps<K> = K extends SvelteComponentTyped<infer P> ? P : Props;
