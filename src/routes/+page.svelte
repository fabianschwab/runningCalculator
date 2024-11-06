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

<h1>Running Distance Calculator</h1>
<p>Calculate total distance for your daily running workout!</p>
<p>
	Todays run totals in <span class="font-semibold">{totalDistance.toFixed(2)} km</span>. Have good
	luck finding a nice track.
</p>
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
<div class="grid grid-cols-3 gap-8">
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
