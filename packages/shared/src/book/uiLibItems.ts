import type { LibraryItem } from './mkItem';
import mkItem from './mkItem';

import { uiLibItem as iconsItem } from '$components/Icon';
import ToastDemo from '$components/Toast/ToastDemo.svelte';
import SelectDemo from '$components/Select/SelectDemo.svelte';
import ModalDemo from '$components/Modal/ModalDemo.svelte';
import ButtonDemo from '$components/Button/ButtonDemo.svelte';
import Alert from '$components/Alert';
import Input from '$components/Input';

const items: LibraryItem[] = [
	mkItem(ModalDemo),
	mkItem(SelectDemo, {
		default: {},
		selected: { props: { value: 2 } },
		disabled: { props: { disabled: true } },
		wide: { props: { wide: true } }
	}),
	mkItem(Alert, {
		default: { content: 'This is an alert!' },
		transparent: { props: { transparent: true } },
		assertive: { props: { assertive: true } }
	}),
	mkItem(ToastDemo),
	mkItem(Input, {
		default: {},
		datalist: { props: { datalist: ['foo', 'bar', 'baz'] } },
		wide: { props: { wide: true, value: 'a wide input' } },
		area: { props: { area: true, value: 'textarea content' } },
		disabled: { props: { disabled: true, value: 'disabled' } },
		number: { props: { type: 'number', value: '2', min: 0 } },
		date: { props: { type: 'date', value: '2022-02-02' } }
	}),
	mkItem(ButtonDemo, {
		default: {},
		wide: { props: { wide: true } },
		disabled: { props: { disabled: true } }
	}),
	iconsItem
];

export default items;
