import type { Props, Component } from '$utils/types';

export { Props, Component };

export type Variant<T = Props> = {
	name?: string;
	slot?: unknown;
	props?: T;
};

export type LibraryItem<T = Props> = [Component<T>, Required<Variant<T>>[]];

export default function mkItem<T>(
	Klass: Component<T>,
	varDef: Record<string, Omit<Variant<Partial<T> & Props>, 'name'>> = {}
): LibraryItem<T> {
	let defaultVariant: Variant<Partial<T>> = {};
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
