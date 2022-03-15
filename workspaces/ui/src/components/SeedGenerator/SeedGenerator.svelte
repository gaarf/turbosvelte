<script lang="ts">
	import Button from '$components/Button';
	import { generateMnemonic } from '$utils/bip39/mnemonic';

	let mnemonic: string;
</script>

<div class="flex flex-col items-center border p-2">
	<h1>seed generator</h1>
	<Button on:click={() => (mnemonic = generateMnemonic())} />
	<p>
		{#if mnemonic}
			<code>{mnemonic}</code>
		{/if}
	</p>
</div>
