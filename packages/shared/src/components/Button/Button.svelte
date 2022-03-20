<!-- 
  @component a clickable button
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
		<Icon name={icon} size={small ? 'sm' : '1x'} />
	{/if}
	<slot />
</button>

<style lang="postcss">
	button {
		@apply rounded-xl bg-slate-600 px-4 py-2 text-white;
		@apply flex items-center gap-2;
	}

	button:hover:not(:focus-visible) {
		@apply outline outline-2 outline-offset-1;
		@apply dark\:outline-blue-900 outline-blue-300;
	}

	button:active {
		@apply scale-95;
	}

	button.small {
		@apply px-2 py-1 text-xs;
	}

	button.icon_alone {
		@apply bg-transparent p-0 text-blue-600;
	}

	button.wide {
		@apply w-full;
	}

	button:disabled {
		@apply pointer-events-none opacity-50;
	}
</style>
