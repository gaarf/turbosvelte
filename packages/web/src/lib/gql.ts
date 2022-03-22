import type { ClientOptions } from '@urql/svelte';
export { initClient, getClient, operationStore, query } from '@urql/svelte';

const options: ClientOptions = {
	url: 'https://graphqlpokemon.favware.tech/'
};

export * as codegen from '@repo/graphql';
export default options;
