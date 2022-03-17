const plugin = require('tailwindcss/plugin');

module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: 'class',
	plugins: [
		plugin(({ addVariant, e }) => {
			addVariant("dark\\", ({ container, separator }) => {
				container.walkRules((rule) => {
					const className = rule.selector.slice(1);
					rule.selector = `:global(.dark) .${e(`dark\\${separator}${className}`)}`;
				});
			});
		}),
		require('@tailwindcss/forms')
	],
	theme: {
		extend: {

		}
	}
};
