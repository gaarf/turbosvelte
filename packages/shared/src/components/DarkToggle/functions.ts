const DARK_CLASS = 'dark';
const STORAGE_KEY = 'theme';
type Theme = 'light' | 'dark';

const { classList } = document.documentElement;
const { localStorage } = window;

// On page load or when changing themes, best to add inline in `head` to avoid FOUC
export function setDarkDocument() {
	if (
		getStoredTheme() === 'dark' ||
		(!(STORAGE_KEY in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
	) {
		classList.add(DARK_CLASS);
	} else {
		classList.remove(DARK_CLASS);
	}
}

export function getStoredTheme(): Theme {
	const theme = localStorage.getItem(STORAGE_KEY);
	return theme === 'dark' ? theme : 'light';
}

export function setTheme(theme?: Theme) {
	if (theme) {
		localStorage.setItem(STORAGE_KEY, theme);
	} else {
		localStorage.removeItem(STORAGE_KEY);
	}
	setDarkDocument();
}

export function getCurrentTheme(): Theme {
	return classList.contains(DARK_CLASS) ? 'dark' : 'light';
}

export function toggleTheme() {
	const nextTheme: Theme = classList.contains(DARK_CLASS) ? 'light' : 'dark';
	setTheme(nextTheme);
	return nextTheme;
}
