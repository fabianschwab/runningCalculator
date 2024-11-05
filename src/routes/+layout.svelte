<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<div class="prose m-auto max-w-4xl pt-6">
	{@render children()}
</div>
