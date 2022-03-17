<script lang="ts">
	import Button from '$components/Button';
	import { browser, dev } from '$app/env';
	import { navigating, page, session } from '$app/stores';
	import { goto } from '$app/navigation';

	const data = { $navigating, $page, $session, browser, dev };
</script>

<section class="flex flex-col p-2">
	<p>
		<Button on:click={() => goto('/')}>Button from UI!</Button>
	</p>

	<code>
		<pre>{JSON.stringify(data, null, 2)}</pre>
	</code>
</section>
