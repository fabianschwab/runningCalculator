<script lang="ts">
	import type { Snippet } from 'svelte';

	let pace = $state('00:05:00');
	let duration = $state('00:30:00');

	let distance: number = $derived.by(() => {
		let [paceHours, paceMinutes, paceSeconds] = pace.split(':').map(Number);
		let [durationHours, durationMinutes, durationSeconds] = duration.split(':').map(Number);

		let paceTime = paceHours * 3600 + paceMinutes * 60 + paceSeconds;
		let durationTime = durationHours * 3600 + durationMinutes * 60 + durationSeconds;

		return durationTime / paceTime;
	});

	type Props = {
		children?: Snippet;
	};

	let { children }: Props = $props();
</script>

<div class="card max-w-xs bg-base-100 shadow-xl">
	<div class="card-body inline-flex w-full flex-col gap-3">
		<div class="w-full text-center text-lg font-bold">
			{#if children}
				{@render children()}
			{:else}
				Main Workout
			{/if}
		</div>
		<label class="form-control w-full">
			<div class="label">
				<span class="label-text">Duration</span>
			</div>
			<input
				step="1"
				min="0"
				bind:value={duration}
				type="time"
				class="input input-bordered w-full"
			/>
		</label>
		<label class="form-control w-full">
			<div class="label">
				<span class="label-text">Pace (Time for 1 km)</span>
			</div>
			<input bind:value={pace} type="time" step="1" min="0" class="input input-bordered w-full" />
		</label>
		<div class="label-text ml-1 mt-2 font-semibold">
			Split distance {distance.toFixed(2)} km
		</div>
	</div>
</div>
