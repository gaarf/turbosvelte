import { writable } from 'svelte/store';
import type Toast from './Toast.svelte';
import type { ComponentProps } from '$utils/types';

type ToastProps = ComponentProps<Toast>;

const store = writable<ToastProps[]>([]);

export function makeToast(props: ToastProps) {
	console.log('makeToast', props);
	store.update((toasts) => [...toasts, props]);
}

export function dismissToast(id: ToastProps['id']) {
	console.log('dismissToast', id);
	store.update((toasts) => toasts.filter((toast) => toast.id !== id));
}

export default store;
