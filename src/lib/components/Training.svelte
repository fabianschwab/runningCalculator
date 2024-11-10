<script lang="ts">
	import { trainingStore, time2Seconds } from '$lib/index.svelte';

	let distance = $derived.by(() => {
		let d = time2Seconds(trainingStore.duration) / time2Seconds(trainingStore.pace);

		if (trainingStore.enableWorkout) {
			d =
				d * trainingStore.rounds +
				(time2Seconds(trainingStore.recoverDuration) / time2Seconds(trainingStore.recoverPace)) *
					(trainingStore.skipLastRecover ? trainingStore.rounds - 1 : trainingStore.rounds);
		}
		return d;
	});
</script>

<div class="card bg-base-100 shadow-md">
	<div class="card-body flex gap-3">
		<div class=" text-center text-lg font-bold">
			Training
			<div class="text-sm font-semibold">
				Split distance {distance.toFixed(2)} km
			</div>
		</div>
		<div class="form-control">
			<label class="label cursor-pointer">
				<span class="label-text">Do a workout</span>
				<input
					type="checkbox"
					class="toggle toggle-success"
					bind:checked={trainingStore.enableWorkout}
				/>
			</label>
		</div>
		{#if trainingStore.enableWorkout}
			<label class="form-control">
				<div class="label">
					<span class="label-text">Number of rounds</span>
				</div>
				<input
					type="number"
					step="1"
					min="1"
					pattern="\d*"
					placeholder="Type here"
					class="input input-bordered"
					bind:value={trainingStore.rounds}
				/>
			</label>
			<div class="divider">Run</div>
		{/if}
		<label class="form-control">
			<div class="label">
				<span class="label-text">Duration (min)</span>
			</div>
			<input
				step=".1"
				min="0"
				bind:value={trainingStore.duration}
				type="number"
				pattern="[0-9]+([\.,][0-9]+)?"
				class="input input-bordered"
			/>
		</label>
		<label class="form-control">
			<div class="label">
				<span class="label-text">Pace (min/km)</span>
			</div>
			<input
				bind:value={trainingStore.pace}
				type="number"
				pattern="[0-9]+([\.,][0-9]+)?"
				step=".1"
				min="0"
				class="input input-bordered"
			/>
		</label>
		{#if trainingStore.enableWorkout}
			<div class="divider">Recover</div>
			<label class="form-control">
				<div class="label">
					<span class="label-text">Duration</span>
				</div>
				<input
					step=".1"
					min="0"
					bind:value={trainingStore.recoverDuration}
					type="number"
					pattern="[0-9]+([\.,][0-9]+)?"
					class="input input-bordered"
				/>
			</label>
			<label class="form-control">
				<div class="label">
					<span class="label-text">Pace (Time for 1 km)</span>
				</div>
				<input
					bind:value={trainingStore.recoverPace}
					type="number"
					pattern="[0-9]+([\.,][0-9]+)?"
					step=".1"
					min="0"
					class="input input-bordered"
				/>
			</label>
			<div class="form-control">
				<label class="label cursor-pointer">
					<span class="label-text">Skip last recover</span>
					<input
						type="checkbox"
						class="toggle toggle-warning"
						bind:checked={trainingStore.skipLastRecover}
					/>
				</label>
			</div>
		{/if}
	</div>
</div>
