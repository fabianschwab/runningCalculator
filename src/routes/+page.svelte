<script lang="ts">
	import PaceTime from '$lib/components/PaceTime.svelte';
	let enableWarmUp: boolean = $state(false);
	let enableCoolDown: boolean = $state(false);

	let splitDistances = new Map<string, number>();

	function callback(distance: number, id: string) {
		splitDistances.set(id, distance);

		let total = 0;
		for (const [id, value] of splitDistances) {
			total += value;
		}
		totalDistance = total;
	}

	let totalDistance = $state(0);
</script>

<h1 class="text-center md:text-left">Running Distance Calculator</h1>
<p class="text-center md:text-left">Calculate total distance for your daily running workout!</p>
<div class="mb-8 flex justify-center md:justify-start">
	<div class="stats shadow">
		<div class="stat">
			<div class="stat-title">Todays run totals in</div>
			<div class="stat-value">{totalDistance.toFixed(2)} km</div>
			<div class="stat-desc">Have good luck finding a nice track.</div>
		</div>
	</div>
</div>
<div class="mb-8 flex flex-col">
	<div class="form-control w-52">
		<label class="label cursor-pointer">
			<span class="label-text">Warm up</span>
			<input type="checkbox" class="toggle toggle-error" bind:checked={enableWarmUp} />
		</label>
	</div>
	<div class="form-control w-52">
		<label class="label cursor-pointer">
			<span class="label-text">Cool down</span>
			<input type="checkbox" class="toggle toggle-info" bind:checked={enableCoolDown} />
		</label>
	</div>
</div>
<div class="flex flex-col gap-8 md:grid md:grid-cols-3">
	{#if enableWarmUp}
		<PaceTime totalDistanceCallBack={{ fn: callback, id: 'warm-up' }}>
			<span class="text-error">Warm up</span>
		</PaceTime>
	{/if}
	<PaceTime workoutOption={true} totalDistanceCallBack={{ fn: callback, id: 'main-run' }} />
	{#if enableCoolDown}
		<PaceTime totalDistanceCallBack={{ fn: callback, id: 'cool-down' }}>
			<span class="text-info">Cool down</span>
		</PaceTime>
	{/if}
</div>
