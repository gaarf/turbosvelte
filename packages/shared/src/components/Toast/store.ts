import { writable } from 'svelte/store';
import type Toast from './Toast.svelte';
import type { ComponentProps } from '$utils/types';
import uniqueId from '$utils/uniqueId';

export type ToastProps = ComponentProps<Toast>;

const store = writable<ToastProps[]>([]);

export function makeToast(message: string): void;
export function makeToast(error: Error): void;
export function makeToast(props: ToastProps, el?: HTMLElement): void;

export function makeToast(data: unknown, el?: HTMLElement) {
	const props: ToastProps = { id: uniqueId() };
	if (typeof data === 'string') {
		props.content = data;
	} else {
		if (data instanceof Error) {
			props.assertive = true;
			props.content = data.message;
		} else {
			Object.assign(props, data);
			if (el) {
				props.content = el;
			}
		}
	}

	store.update((toasts) => {
		if (toasts.find((one) => one.id === props.id)) {
			console.log('duplicate toast', props);
			return toasts;
		}
		return [...toasts, props];
	});
}

export function dismissToast(id: ToastProps['id']) {
	store.update((toasts) => toasts.filter((toast) => toast.id !== id));
}

export default store;
