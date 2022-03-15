import type { Config } from '@jest/types';

/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

const config: Config.InitialOptions = {
	rootDir: '..',

	testPathIgnorePatterns: ['e2e/'],

	setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],

	// A set of global variables that need to be available in all test environments
	globals: {
		'ts-jest': {
			diagnostics: {
				ignoreCodes: ['TS151001']
			}
		}
	},

	// An array of file extensions your modules use
	moduleFileExtensions: ['js', 'ts', 'svelte'],

	// A map from regular expressions to paths to transformers
	transform: {
		'^.+\\.svelte$': [
			'svelte-jester',
			{
				preprocess: true
			}
		],
		'^.+\\.js$': 'babel-jest',
		'^.+\\.ts$': 'ts-jest'
	}
};

export default config;
