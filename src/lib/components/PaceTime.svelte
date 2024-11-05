<script lang="ts">
	import type { Snippet } from 'svelte';

	let pace = $state('00:05:00');
	let duration = $state('00:30:00');

	let enableWorkout = $state(false);
	let rounds: number = $state(1);

	let distance: number = $derived.by(() => {
		let [paceHours, paceMinutes, paceSeconds] = pace.split(':').map(Number);
		let [durationHours, durationMinutes, durationSeconds] = duration.split(':').map(Number);

		let paceTime = paceHours * 3600 + paceMinutes * 60 + paceSeconds;
		let durationTime = durationHours * 3600 + durationMinutes * 60 + durationSeconds;

		if (enableWorkout) {
			return (durationTime / paceTime) * rounds;
		}

		return durationTime / paceTime;
	});

	type Props = {
		children?: Snippet;
	};

	let { children }: Props = $props();
</script>

<div class="card bg-base-100 shadow-md">
	<div class="card-body flex gap-3">
		<div class=" text-center text-lg font-bold">
			{#if children}
				{@render children()}
			{:else}
				{enableWorkout ? 'Workout' : 'Main Run'}
			{/if}
			<div class="text-sm font-semibold">
				Split distance {distance.toFixed(2)} km
			</div>
		</div>
		{#if !children}
			<div class="form-control">
				<label class="label cursor-pointer">
					<span class="label-text">Do a workout</span>
					<input type="checkbox" class="toggle" bind:checked={enableWorkout} />
				</label>
			</div>
			{#if enableWorkout}
				<label class="form-control">
					<div class="label">
						<span class="label-text">Number of rounds</span>
					</div>
					<input
						type="number"
						step="1"
						placeholder="Type here"
						class="input input-bordered"
						bind:value={rounds}
					/>
				</label>
			{/if}
		{/if}
		<label class="form-control">
			<div class="label">
				<span class="label-text">Duration</span>
			</div>
			<input step="1" min="0" bind:value={duration} type="time" class="input input-bordered" />
		</label>
		<label class="form-control">
			<div class="label">
				<span class="label-text">Pace (Time for 1 km)</span>
			</div>
			<input bind:value={pace} type="time" step="1" min="0" class="input input-bordered" />
		</label>
	</div>
</div>
