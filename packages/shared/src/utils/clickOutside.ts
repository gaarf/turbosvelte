export default function clickOutside(node: HTMLElement, callback: (e: MouseEvent) => void) {
	const handleClick = (evt: MouseEvent) => {
		const { target } = evt;
		if (target instanceof Node && !node.contains(target)) {
			callback(evt);
		}
	};
	document.addEventListener('click', handleClick, true);
	return {
		destroy() {
			document.removeEventListener('click', handleClick, true);
		}
	};
}
