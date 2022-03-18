import mkItem from 'src/book/mkItem';
import Icon from './Icon.svelte';
import iconDefs from './icons';

export { Icon };
export default Icon;

export const uiLibItem = mkItem(
	Icon,
	Object.keys(iconDefs).reduce(
		(memo, iconName) => ({
			...memo,
			[iconName]: {
				props: { name: iconName }
			}
		}),
		{}
	)
);
