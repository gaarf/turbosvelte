<script lang="ts">
	import Button from '$components/Button';
	import Icon from '$components/Icon';

	export let disabled = false;
	export let wide = false;
</script>

<div class="flex w-full flex-col items-center gap-5">
	<Button {disabled} {wide}>regular button</Button>
	<Button small {disabled} {wide}>small button</Button>
	<Button {disabled} {wide}>
		<Icon name="user" />
		button too
	</Button>
	<Button small {disabled} {wide}>
		<Icon name="user" />
		small button
	</Button>
	<Button {disabled} {wide} icon="close" />
	<Button small {disabled} {wide} icon="close" />
</div>
