<!-- 
  @component a way to toggle .dark
 -->
<script lang="ts">
	import Button from '$components/Button';
	import { getCurrentTheme, toggleTheme } from './functions';

	let theme = getCurrentTheme();

	function handleClick() {
		theme = toggleTheme();
	}
</script>

<Button on:click={handleClick}>theme={theme}</Button>
