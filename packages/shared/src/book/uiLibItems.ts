import type { LibraryItem } from './mkItem';
import mkItem from './mkItem';

import DarkToggle from '$components/DarkToggle';
import Button from '$components/Button';
import { uiLibItem as iconsItem } from '$components/Icon';
import Input from '$components/Input';
import Toast from '$components/Toast';
import Alert from '$components/Alert';

const items: LibraryItem[] = [
	mkItem(DarkToggle),
	mkItem(Alert, {
		default: { slot: 'This is an alert!' }
	}),
	mkItem(Toast, {
		default: { slot: 'Dismissable toast' }
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
