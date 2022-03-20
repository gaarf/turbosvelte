import type { Props, Component } from '$utils/types';

export { Props, Component };

export type Variant<T = Props> = {
	name?: string;
	content?: unknown;
	props?: T;
};

export type LibraryItem<T = Props> = [
	Component<T>, // the component class
	Required<Variant<T>>[] // variants
];

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

		const { props, content } = variant;

		variants.push({
			name: name,
			props: { ...defaultVariant.props, ...props } as T,
			content: typeof content !== 'undefined' ? content : defaultVariant.content
		});
	});

	return [Klass, variants];
}
