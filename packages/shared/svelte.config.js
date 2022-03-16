const sveltePreprocess = require('svelte-preprocess');

function createPreprocessors(sourceMap = false) {
	return sveltePreprocess({
		sourceMap,
		postcss: true
	});
}

module.exports = {
	preprocess: createPreprocessors(true),
	createPreprocessors
};
