import Mousetrap from 'mousetrap';
// adapted from https://github.com/Duder-onomy/svelte-focus-trap

export default function focusTrap(node: HTMLElement) {
	const keyboardShortcuts = {
		'alt+tab': previous,
		end: focusLastItem,
		home: focusFirstItem,
		'shift+tab': previous,
		tab: next
	};

	Object.entries(keyboardShortcuts).forEach(([keys, handler]) => {
		Mousetrap.bind(keys, (event) => {
			event.preventDefault();
			event.stopPropagation();
			const focusables = [
				...node.querySelectorAll<HTMLElement>(`
        a[href],
        area[href],
        input:not([disabled]):not([type="hidden"]):not([aria-hidden]),
        select:not([disabled]):not([aria-hidden]),
        textarea:not([disabled]):not([aria-hidden]),
        button:not([disabled]):not([aria-hidden]),
        iframe,
        object,
        embed,
        [contenteditable],
        [tabindex]:not([tabindex^="-"])
      `)
			].filter((el) => elementIsVisible(el));

			handler(focusables, elInside(document.activeElement));
		});
	});

	function elInside(el: Element | null): HTMLElement | null {
		return el instanceof HTMLElement && node.contains(el) ? el : null;
	}

	return {
		destroy() {
			Object.keys(keyboardShortcuts).forEach((key) => Mousetrap.unbind(key));
		}
	};
}

function next(focusables: HTMLElement[], currentlyFocusedItem: null | HTMLElement) {
	// if focus is not within the focuables, focus the first one.
	if (!currentlyFocusedItem) {
		focusFirstItem(focusables);
		return;
	}

	const focusIndex = focusables.indexOf(currentlyFocusedItem);

	// If we have focus on the last one, give focus on the first.
	if (focusables.length - 1 === focusIndex) {
		focusFirstItem(focusables);
		return;
	}

	// Focus the next one.
	focusables[focusIndex + 1]?.focus();
}

function previous(focusables: HTMLElement[], currentlyFocusedItem: null | HTMLElement) {
	// If focus is not within the focusables, focus the last one
	if (!currentlyFocusedItem) {
		focusLastItem(focusables);
		return;
	}

	const focusIndex = focusables.indexOf(currentlyFocusedItem);

	// If we have focus on the first one, wrap to the end one.
	if (focusIndex === 0) {
		focusLastItem(focusables);
		return;
	}

	// Focus the previous one.
	focusables[focusIndex - 1]?.focus();
}

function focusFirstItem(focusables: HTMLElement[]) {
	focusables[0]?.focus();
}

function focusLastItem(focusables: HTMLElement[]) {
	focusables[focusables.length - 1]?.focus();
}

function elementIsVisible(element: Element) {
	const computedStyle = document.defaultView?.getComputedStyle(element, null);
	if (!computedStyle) return false;
	return (
		computedStyle.getPropertyValue('display') !== 'none' &&
		computedStyle.getPropertyValue('visibility') !== 'hidden'
	);
}
