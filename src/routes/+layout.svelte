<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<div class="prose m-auto max-w-md pt-6">
	<h1>Running Calculator</h1>
	<p>Calculate total distance for your daily running workout</p>
	{@render children()}
</div>
