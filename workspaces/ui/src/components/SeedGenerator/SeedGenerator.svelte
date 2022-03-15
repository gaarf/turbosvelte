<script lang="ts">
	import Button from '$components/Button';
	import { generateMnemonic } from '$utils/bip39/mnemonic.js';

	let mnemonic: string;

	function generate() {
		mnemonic = generateMnemonic();
	}
</script>

<div class="flex flex-col items-center border p-2">
	<h1>seed generator</h1>
	<Button on:click={generate} />
	<p>
		{#if mnemonic}
			<code>{mnemonic}</code>
		{/if}
	</p>
</div>
