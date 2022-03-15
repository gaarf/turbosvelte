<script lang="ts">
	import { Button } from '../index';
	import generateMnemonic from './jsbip39/mnemonic';

	let seed: string;

	function generateSeed() {
		seed = generateMnemonic();
	}
</script>

<div class="flex flex-col items-center border p-2">
	<h1>seed generator</h1>
	<Button on:click={generateSeed} />
	<p>
		{#if seed}
			<code>{seed}</code>
		{/if}
	</p>
</div>
