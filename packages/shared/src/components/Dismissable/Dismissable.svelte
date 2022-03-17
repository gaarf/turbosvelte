<script lang="ts">
	import Button from '$components/Button';
	import Icon from '$components/Icon';
</script>

<div class="flex items-start">
	<div class="mr-2">
		<slot /> Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique, inventore tenetur! Voluptates
		dolores atque, pariatur sequi incidunt quasi quos quia possimus? Doloribus necessitatibus magni rerum
		maiores iure similique libero modi!
	</div>
	<Button small><Icon name="close" aria-label="" /></Button>
</div>
