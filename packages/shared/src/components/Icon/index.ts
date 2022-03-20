import mkItem from '../../book/mkItem';
import Icon from './Icon.svelte';
import iconDefs from './icons';

export type { IconName } from './icons';

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
