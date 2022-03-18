/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
export default function disableScroll(_node: HTMLElement) {
	// TODO: find a way to prevent layout shift
	const prevOverflow = document.documentElement.style.overflow;
	document.documentElement.style.overflow = 'hidden';

	return {
		destroy() {
			document.documentElement.style.overflow = prevOverflow || '';
		}
	};
}
