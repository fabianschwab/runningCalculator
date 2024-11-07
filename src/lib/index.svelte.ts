// place files you want to import through the `$lib` alias in this folder.
export let warmupStore = $state({ duration: 10, pace: 5.3 });
export let trainingStore = $state({
	duration: 30,
	pace: 4.3,
	recoverDuration: 2,
	recoverPace: 6,
	skipLastRecover: true,
	rounds: 1,
	enableWorkout: false
});
export let cooldownStore = $state({ duration: 10, pace: 5.3 });

export function time2Seconds(time: number): number {
	let seconds = Math.floor(time) * 60 + (time % 1) * 100;
	return seconds;
}
