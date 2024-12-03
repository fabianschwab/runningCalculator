<script lang="ts">
	import { warmupStore, time2Seconds } from '$lib/index.svelte';
	let distance = $derived(time2Seconds(warmupStore.duration) / time2Seconds(warmupStore.pace));

	import { persisted } from 'svelte-persisted-store';

	import { page } from '$app/stores';
	let isShared = $page.url.searchParams.has('shared');

	const warmUp = persisted('warmUp', { pace: 0, duration: 0 });

	$effect(() => {
		if ($warmUp.pace !== 0 && $warmUp.duration !== 0 && !isShared) {
			warmupStore.duration = $warmUp.duration;
			warmupStore.pace = $warmUp.pace;
		}
	});

	function saveSettings() {
		$warmUp.pace = warmupStore.pace;
		$warmUp.duration = warmupStore.duration;
	}
</script>

<div class="card bg-base-100 shadow-md">
	<div class="card-body flex gap-3">
		<div class=" text-center text-lg font-bold">
			<span class="text-error">Warm up</span>
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
				bind:value={warmupStore.duration}
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
				bind:value={warmupStore.pace}
				type="number"
				pattern="[0-9]+([\.,][0-9]+)?"
				step=".1"
				min="0"
				class="input input-bordered"
			/>
		</label>
		<button aria-label="Save" class="btn btn-square btn-ghost" onclick={saveSettings}>
			<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" viewBox="0 0 24 24"
				><path
					fill="currentColor"
					d="M20 7.423v10.962q0 .69-.462 1.153T18.384 20H5.616q-.691 0-1.153-.462T4 18.384V5.616q0-.691.463-1.153T5.616 4h10.961zm-1 .427L16.15 5H5.616q-.27 0-.443.173T5 5.616v12.769q0 .269.173.442t.443.173h12.769q.269 0 .442-.173t.173-.443zm-7 8.688q.827 0 1.414-.586T14 14.538t-.587-1.413T12 12.539t-1.413.586T10 14.538t.587 1.414t1.413.586M6.77 9.77h7.422v-3H6.77zM5 7.85V19V5z"
				/></svg
			>
		</button>
	</div>
</div>
