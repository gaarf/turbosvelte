<!-- 
  @component a clickable button
	with optional icon
 -->
<script lang="ts">
	import Icon from '$components/Icon';
	import type { IconName } from '$components/Icon';

	interface $$Props {
		small?: boolean;
		wide?: boolean;
		disabled?: boolean;
		type?: 'button' | 'submit' | 'reset';
		icon?: IconName;
	}

	export let small = false;
	export let wide = false;
	export let disabled = false;
	export let type = 'button';
	export let icon: IconName | undefined = undefined;

	$: icon_alone = icon && !$$slots.default;
</script>

<button class:small class:wide class:icon_alone on:click on:focus on:blur {disabled} {type}>
	{#if icon}
		<Icon name={icon} size={icon_alone ? '1x' : '2x'} />
	{/if}
	<slot />
</button>

<style lang="postcss">
	button {
		@apply select-none;
		@apply rounded-lg bg-slate-600 px-4 py-2 text-white;
		@apply inline-flex items-center justify-center gap-3;
	}

	button:hover:not(:focus-visible) {
		@apply outline outline-2 outline-offset-1;
		@apply dark\:outline-blue-900 outline-blue-300;
	}

	button:active {
		@apply scale-95;
	}

	button.small {
		@apply gap-1 px-2 py-1 text-xs;
	}

	button.icon_alone {
		@apply h-5 w-5 rounded-full p-0;
		@apply bg-transparent text-inherit;
	}

	button.icon_alone.small {
		@apply h-3 w-3;
	}

	button.wide {
		@apply \!w-full;
	}

	button:disabled {
		@apply pointer-events-none opacity-50;
	}
</style>
