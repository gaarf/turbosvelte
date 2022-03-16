import type { LibraryItem } from './types';
import { mkItem } from './types';

import Button from '$components/Button';
import { uiLibItem as iconsItem } from '$components/Icon';

const items: LibraryItem[] = [
	mkItem(Button, {
		default: {
			slot: 'Here be a Button'
		},
		small: {
			props: { small: true }
		},
		disabled: {
			props: { disabled: true }
		}
	}),
	iconsItem
];

export default items;
