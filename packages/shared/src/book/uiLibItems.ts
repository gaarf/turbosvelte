import type { LibraryItem } from './types';
import { mkItem } from './types';

import Button from '$components/Button';
import Dismissable from '$components/Dismissable';
import DarkToggle from '$components/DarkToggle';
import { uiLibItem as iconsItem } from '$components/Icon';
import Input from '$components/Input';

const items: LibraryItem[] = [
	mkItem(DarkToggle),
	mkItem(Dismissable, {
		default: { slot: 'Dismiss me' }
	}),
	mkItem(Input, {
		default: { props: { value: 'hello' } },
		disabled: { props: { disabled: true, value: 'disabled' } },
		number: { props: { type: 'number', value: 2, min: 0 } }
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
