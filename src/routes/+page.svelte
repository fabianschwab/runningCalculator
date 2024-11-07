<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	import Warmup from '$lib/components/Warmup.svelte';
	import Cooldown from '$lib/components/Cooldown.svelte';
	import Training from '$lib/components/Training.svelte';

	import { warmupStore, cooldownStore, trainingStore, time2Seconds } from '$lib/index.svelte';

	let enableWarmUp: boolean = $state(false);
	let enableCoolDown: boolean = $state(false);

	let totalDistance = $derived.by(() => {
		let td = 0;
		if (enableWarmUp) {
			td += time2Seconds(warmupStore.duration) / time2Seconds(warmupStore.pace);
		}
		if (enableCoolDown) {
			td += time2Seconds(cooldownStore.duration) / time2Seconds(cooldownStore.pace);
		}

		let d = time2Seconds(trainingStore.duration) / time2Seconds(trainingStore.pace);

		if (trainingStore.enableWorkout) {
			d =
				d * trainingStore.rounds +
				(time2Seconds(trainingStore.recoverDuration) / time2Seconds(trainingStore.recoverPace)) *
					(trainingStore.skipLastRecover ? trainingStore.rounds - 1 : trainingStore.rounds);
		}

		return td + d;
	});

	let copied = $state(false);

	function copyToClipboard() {
		copied = true;
		let message = 'https://' + $page.url.host + '?shared';

		if (enableWarmUp) {
			message += '&warmup=' + warmupStore.pace + '-' + warmupStore.duration;
		}
		if (enableCoolDown) {
			message += '&cooldown=' + cooldownStore.pace + '-' + cooldownStore.duration;
		}

		message +=
			'&run=' +
			trainingStore.enableWorkout +
			'-' +
			trainingStore.rounds +
			'-' +
			trainingStore.pace +
			'-' +
			trainingStore.duration +
			'-' +
			trainingStore.recoverDuration +
			'-' +
			trainingStore.recoverPace +
			'-' +
			trainingStore.skipLastRecover;

		navigator.clipboard.writeText(message);

		console.log(message);
		setTimeout(() => {
			copied = false;
		}, 2000);
	}

	onMount(() => {
		// parse url params
		let warm = $page.url.searchParams.get('warmup');
		let cool = $page.url.searchParams.get('cooldown');
		let run = $page.url.searchParams.get('run');

		if (warm) {
			console.log('warmup');
			console.log(warm);
			enableWarmUp = true;
			warmupStore.pace = parseFloat(warm.split('-')[0]);
			warmupStore.duration = parseFloat(warm.split('-')[1]);
		}
		if (cool) {
			console.log('cooldown');
			console.log(cool);
			enableCoolDown = true;
			cooldownStore.pace = parseFloat(cool.split('-')[0]);
			cooldownStore.duration = parseFloat(cool.split('-')[1]);
		}
		if (run) {
			console.log('run');
			console.log(run);
			let [enable, rounds, pace, duration, recoverDuration, recoverPace, skipLastRecover] =
				run.split('-');
			trainingStore.enableWorkout = enable === 'true';
			trainingStore.rounds = parseInt(rounds);
			trainingStore.pace = parseFloat(pace);
			trainingStore.duration = parseFloat(duration);
			trainingStore.recoverDuration = parseFloat(recoverDuration);
			trainingStore.recoverPace = parseFloat(recoverPace);
			trainingStore.skipLastRecover = skipLastRecover === 'true';
		}
	});
</script>

{#if copied}
	<div role="alert" class="alert absolute right-0 top-0 mx-4 mt-4 w-[364px] bg-base-100">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			class="h-6 w-6 shrink-0 stroke-info"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
			></path>
		</svg>
		<span>Run copied to clipboard!</span>
	</div>
{/if}
<h1 class="text-center md:text-left">Running Distance Calculator</h1>
<p class="text-center md:text-left">Calculate total distance for your daily running workout!</p>
<div class="mb-8 flex justify-center md:justify-start">
	<div class="stats shadow">
		<div class="stat">
			<div class="stat-title">Todays run totals in</div>
			<div class="stat-value">{totalDistance.toFixed(2)} km</div>
			<div class="stat-desc">Have good luck finding a nice track.</div>
		</div>
		<div class="stat items-center">
			<button class="btn btn-square btn-ghost" aria-label="share run" onclick={copyToClipboard}>
				<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"
					><path
						fill="currentColor"
						d="M6.616 22q-.691 0-1.153-.462T5 20.385v-9.77q0-.69.463-1.152T6.616 9H8.23q.213 0 .357.143t.143.357t-.143.357T8.23 10H6.616q-.231 0-.424.192T6 10.616v9.769q0 .23.192.423t.423.192h10.77q.23 0 .423-.192t.192-.423v-9.77q0-.23-.192-.423T17.384 10H15.77q-.213 0-.357-.143T15.27 9.5t.143-.357T15.77 9h1.615q.691 0 1.153.463T19 10.616v9.769q0 .69-.463 1.153T17.385 22zM11.5 4.614L9.754 6.36q-.146.146-.344.153q-.199.006-.364-.16q-.16-.164-.162-.353t.162-.354l2.388-2.388q.243-.243.566-.243t.566.243l2.388 2.388q.14.14.15.342q.01.2-.15.366q-.166.165-.357.165t-.357-.165l-1.74-1.74V15q0 .214-.143.357T12 15.5t-.357-.143T11.5 15z"
					/></svg
				></button
			>
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
		<Warmup />
	{/if}
	<Training />
	{#if enableCoolDown}
		<Cooldown />
	{/if}
</div>
