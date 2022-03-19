import type { LibraryItem } from './mkItem';
import mkItem from './mkItem';

import Button from '$components/Button';
import { uiLibItem as iconsItem } from '$components/Icon';
import ToastDemo from '$components/Toast/ToastDemo.svelte';
import Alert from '$components/Alert';
import Input from '$components/Input';
import SelectDemo from '$components/Select/SelectDemo.svelte';

const items: LibraryItem[] = [
	mkItem(SelectDemo, {
		default: {},
		selected: { props: { value: 2 } },
		disabled: { props: { disabled: true } },
		wide: { props: { wide: true } }
	}),
	mkItem(Alert, {
		default: { slot: 'This is an alert!' },
		transparent: { props: { transparent: true } },
		assertive: { props: { assertive: true } }
	}),
	mkItem(ToastDemo),
	mkItem(Input, {
		default: { props: { value: 'hello' } },
		wide: { props: { wide: true } },
		area: { props: { area: true } },
		disabled: { props: { disabled: true, value: 'disabled' } },
		number: { props: { type: 'number', value: '2', min: 0 } }
	}),
	mkItem(Button, {
		default: {
			slot: 'Here be a Button'
		},
		small: {
			props: { small: true }
		},
		wide: {
			props: { wide: true }
		},
		disabled: {
			props: { disabled: true }
		}
	}),
	iconsItem
];

export default items;
