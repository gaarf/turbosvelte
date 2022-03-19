<script lang="ts">
	import Select from '$components/Select';

	let value: unknown;
	$: console.log(typeof value, value);
</script>

<Select {...$$restProps} bind:value>
	<option value="">Foo</option>
	<option value="bar">Bar is another</option>
	<option value={2}>Baz</option>
	<option value={{ o: 1 }}>Qux</option>
	<option value={null}>Nil</option>
</Select>
