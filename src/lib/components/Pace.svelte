<script lang="ts">
	import { time2Seconds } from '$lib/index.svelte';

	let { distance } = $props();

	let time = $state<number | undefined>();
	let pace = $derived.by(() => {
		if (time) {
			const paceInSecondsPerKm = time2Seconds(time) / distance;
			const paceMinutes = Math.floor(paceInSecondsPerKm / 60);
			const paceSeconds = Math.round(paceInSecondsPerKm % 60);
			return `${paceMinutes}:${paceSeconds.toString().padStart(2, '0')}`;
		}
		return '';
	});
</script>

<div>
	<div class="mx-2 flex justify-between">
		<div class=" font-bold">{distance} km</div>
		<div>
			{pace !== '' ? pace : '--- '}<span class="text-xs"> min/km</span>
		</div>
	</div>
	<input
		bind:value={time}
		type="number"
		placeholder="target time (min.sec)"
		pattern="[0-9]+([\.,][0-9]+)?"
		class="input input-bordered w-full"
	/>
</div>
