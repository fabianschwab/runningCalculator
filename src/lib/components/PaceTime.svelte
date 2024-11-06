<script lang="ts">
	import { type Snippet } from 'svelte';

	let duration = $state('00:30:00');
	let pace = $state('00:05:30');

	let recoverPace = $state('00:06:00');
	let recoverDuration = $state('00:06:00');

	let enableWorkout: boolean = $state(false);
	let rounds: number = $state(1);
	let skipLastRecover: boolean = $state(true);

	let distance: number = $derived.by(() => {
		if (enableWorkout) {
			let paceTime = time2Seconds(pace);
			let durationTime = time2Seconds(duration);

			let recoverPaceTime = time2Seconds(recoverPace);
			let recoverDurationTime = time2Seconds(recoverDuration);

			return (
				(durationTime / paceTime) * rounds +
				(recoverDurationTime / recoverPaceTime) * (skipLastRecover ? rounds - 1 : rounds)
			);
		}

		return time2Seconds(duration) / time2Seconds(pace);
	});

	function time2Seconds(time: string): number {
		let [h, m, s] = time.split(':').map(Number);
		return h * 3600 + m * 60 + s;
	}

	type Props = {
		children?: Snippet;
		workoutOption?: boolean;
	};

	let { children, workoutOption = false }: Props = $props();
</script>

<div class="card bg-base-100 shadow-md">
	<div class="card-body flex gap-3">
		<div class=" text-center text-lg font-bold">
			{#if children}
				{@render children()}
			{:else}
				Training
			{/if}
			<div class="text-sm font-semibold">
				Split distance {distance.toFixed(2)} km
			</div>
		</div>
		{#if workoutOption}
			<div class="form-control">
				<label class="label cursor-pointer">
					<span class="label-text">Do a workout</span>
					<input type="checkbox" class="toggle" bind:checked={enableWorkout} />
				</label>
			</div>
		{/if}
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
			<div class="divider">Run</div>
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
		{#if enableWorkout}
			<div class="divider">Recover</div>
			<label class="form-control">
				<div class="label">
					<span class="label-text">Duration</span>
				</div>
				<input
					step="1"
					min="0"
					bind:value={recoverDuration}
					type="time"
					class="input input-bordered"
				/>
			</label>
			<label class="form-control">
				<div class="label">
					<span class="label-text">Pace (Time for 1 km)</span>
				</div>
				<input bind:value={recoverPace} type="time" step="1" min="0" class="input input-bordered" />
			</label>
			<div class="form-control">
				<label class="label cursor-pointer">
					<span class="label-text">Skip last recover</span>
					<input type="checkbox" class="toggle" bind:checked={skipLastRecover} />
				</label>
			</div>
		{/if}
	</div>
</div>
