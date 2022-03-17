import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess({
		postcss: true
	}),

	kit: {
		adapter: adapter(),
		vite: {
			resolve: {
				alias: {
					$components: '@repo/shared/src/components',
					$utils: '@repo/shared/src/utils'
				}
			},
			optimizeDeps: {
				exclude: ['@urql/svelte']
			}
		}
	}
};

export default config;
