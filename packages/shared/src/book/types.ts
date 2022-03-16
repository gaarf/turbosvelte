import type { SvelteComponentTyped } from 'svelte';

export type Props = Record<string, unknown>;

export type Variant<T = Props> = {
	name?: string;
	slot?: unknown;
	props?: T;
};

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export type Component<T = Props> = new (...args: any) => SvelteComponentTyped<T>;

export type LibraryItem<T = Props> = [Component<T>, Required<Variant<T>>[]];

export function mkItem<T>(
	Klass: Component<T>,
	varDef: Record<string, Omit<Variant<T>, 'name'>> = {}
): LibraryItem<T> {
	let defaultVariant: Variant<T> = {};
	const variants: Required<Variant<T>>[] = [];

	const entries = Object.entries(varDef);

	if (!entries.length) {
		entries.push(['default', {}]);
	}

	entries.forEach(([name, variant], index) => {
		if (!index && ['_', 'default'].includes(name)) {
			defaultVariant = variant;
			if (name === '_') {
				return;
			}
		}

		const { props, slot = '' } = variant;

		variants.push({
			name,
			props: { ...defaultVariant.props, ...props } as T,
			slot: slot || defaultVariant.slot
		});
	});

	return [Klass, variants];
}
