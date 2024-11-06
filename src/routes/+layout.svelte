<script lang="ts">
	import '../app.css';
	let { children } = $props();

	export const prerender = true;
</script>

<div class="prose m-auto max-w-4xl pb-16 pt-6">
	{@render children()}
</div>
