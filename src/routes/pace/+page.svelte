<script>
	import Pace from '$lib/components/Pace.svelte';
</script>

<p class="text-center md:text-left">Calculate your pace from distance and time!</p>
<div class="card bg-base-100 shadow-md">
	<div class="card-body flex gap-4">
		<div class=" text-center text-lg font-bold">Calculate paces</div>
		<Pace distance={5} />
		<Pace distance={10} />
		<Pace distance={21.1} />
		<Pace distance={42.195} />
	</div>
</div>
