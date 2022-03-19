/// <reference types="svelte" />

declare module 'svelte-portal' {
	export function portal(node: Node, target?: string | HTMLElement): void;
}
