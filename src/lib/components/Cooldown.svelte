<script lang="ts">
	import { cooldownStore, time2Seconds } from '$lib/index.svelte';
	let distance = $derived(time2Seconds(cooldownStore.duration) / time2Seconds(cooldownStore.pace));
</script>

<div class="card bg-base-100 shadow-md">
	<div class="card-body flex gap-3">
		<div class=" text-center text-lg font-bold">
			<span class="text-info">Cool down</span>
			<div class="text-sm font-semibold">
				Split distance {distance.toFixed(2)} km
			</div>
		</div>
		<label class="form-control">
			<div class="label">
				<span class="label-text">Duration (min)</span>
			</div>
			<input
				step=".1"
				min="0"
				bind:value={cooldownStore.duration}
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
				bind:value={cooldownStore.pace}
				type="number"
				pattern="[0-9]+([\.,][0-9]+)?"
				step=".1"
				min="0"
				class="input input-bordered"
			/>
		</label>
	</div>
</div>
