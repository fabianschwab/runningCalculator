<script lang="ts">
	import PaceTime from '$lib/components/PaceTime.svelte';
	let enableWarmUp: boolean = $state(false);
	let enableCoolDown: boolean = $state(false);
</script>

<h1>Running Calculator</h1>
<p>Calculate total distance for your daily running workout</p>
<div class="mb-16 flex flex-col">
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
		<PaceTime>
			<span class="text-error">Warm up</span>
		</PaceTime>
	{/if}
	<PaceTime />
	{#if enableCoolDown}
		<PaceTime>
			<span class="text-info">Cool down</span>
		</PaceTime>
	{/if}
</div>
