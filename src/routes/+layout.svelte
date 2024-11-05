<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<div class="prose m-auto max-w-3xl pt-6">
	{@render children()}
</div>
