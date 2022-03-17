<script lang="ts">
	import '@repo/shared/src/app.css';
	import gqlOptions, { initClient } from '$lib/gql';

	initClient(gqlOptions);
</script>

<slot />
