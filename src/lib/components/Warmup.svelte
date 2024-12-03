<script lang="ts">
	import { warmupStore, time2Seconds } from '$lib/index.svelte';
	let distance = $derived(time2Seconds(warmupStore.duration) / time2Seconds(warmupStore.pace));

	import { persisted } from 'svelte-persisted-store';

	import { page } from '$app/stores';
	let isShared = $page.url.searchParams.has('shared');

	let saved = $state(false);

	const warmUp = persisted('warmUp', { pace: 0, duration: 0 });

	$effect(() => {
		if ($warmUp.pace !== 0 && $warmUp.duration !== 0 && !isShared) {
			warmupStore.duration = $warmUp.duration;
			warmupStore.pace = $warmUp.pace;
		}
	});

	function saveSettings() {
		saved = true;

		setTimeout(() => {
			saved = false;
		}, 1500);

		$warmUp.pace = warmupStore.pace;
		$warmUp.duration = warmupStore.duration;
	}
</script>

{#if saved}
	<div role="alert" class="alert absolute right-0 top-0 mx-4 mt-4 w-[364px] bg-base-100">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			class="h-6 w-6 shrink-0 stroke-success"
		>
			<path
				fill="currentColor"
				d="m10.562 14.492l-2.496-2.496q-.141-.14-.345-.15t-.363.15t-.16.354t.16.354l2.638 2.638q.242.243.565.243t.566-.243l5.477-5.476q.14-.141.15-.345t-.15-.363t-.354-.16t-.354.16zM12.003 21q-1.866 0-3.51-.708q-1.643-.709-2.859-1.924t-1.925-2.856T3 12.003t.709-3.51Q4.417 6.85 5.63 5.634t2.857-1.925T11.997 3t3.51.709q1.643.708 2.859 1.922t1.925 2.857t.709 3.509t-.708 3.51t-1.924 2.859t-2.856 1.925t-3.509.709M12 20q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-8"
			/>
		</svg>
		<span>Warm-up settings saved!</span>
	</div>
{/if}
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
