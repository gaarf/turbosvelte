import type { LibraryItem } from './types';
import { mkItem } from './types';

import Button from '$components/Button';
import DarkToggle from '$components/DarkToggle';
import { uiLibItem as iconsItem } from '$components/Icon';
import Input from '$components/Input';

const items: LibraryItem[] = [
	mkItem(DarkToggle),
	mkItem(Input, {
		default: { props: { value: 'content' } },
		disabled: { props: { disabled: true } },
		number: { props: { type: 'number', value: '2', min: 0 } }
	}),
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
