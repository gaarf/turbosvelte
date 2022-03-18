import { writable } from 'svelte/store';
import type Toast from './Toast.svelte';
import type { ComponentProps } from '$utils/types';

type ToastProps = ComponentProps<Toast>;

export default writable<ToastProps[]>([]);
