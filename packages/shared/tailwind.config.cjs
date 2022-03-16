module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: 'class',
	plugins: [
		require('tailwindcss-global-dark'),
		require('@tailwindcss/forms')
	],
	theme: {
		extend: {

		}
	}
};
