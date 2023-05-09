<script>
	import { onMount } from 'svelte';
	import TiTimesOutline from 'svelte-icons/ti/TiTimesOutline.svelte';
	import { fly } from 'svelte/transition';

	const INTERVAL_STEP = 50;

	export let message;
	export let type = 'warning';
	export let autoHideDuration = 2500;
	export let onClose;

	let bgColor;
	let intervalId;

	//this is the progress bar, we calculate the progress by dividing the duration by the autoHideDuration and multiplying it by 100
	$: progress = Math.floor((duration / autoHideDuration) * 100);
	//we make a reactie variable that is the same as autoHideDuration, that way we can manipulate it instead of autoHideDuration
	$: duration = autoHideDuration;
	//when duration is 0 or less, we call the onClose function
	$: {
		if (duration <= 0) {
			clearInterval(intervalId);
			onClose();
		}
	}

	if (type === 'success') {
		bgColor = 'bg-blue-400';
	} else if (type === 'error') {
		bgColor = 'bg-red-700';
	} else {
		bgColor = 'bg-yellow-500';
	}

	onMount(() => {
		intervalId = setInterval(() => {
			duration -= INTERVAL_STEP;
		}, INTERVAL_STEP);
	});
</script>

<div
  in:fly={{ x: 200}}
  out:fly={{ x: 200}}
	class="{bgColor} min-w-68 text-white flex-it font-bold rounded-md md:max-w-xs w-full text-sm shadow-md"
>
	<div class="flex-it flex-row-reverse p-1">
		<button on:click={onClose} class="text-xl rounded-full">
			<div class="icon">
				<TiTimesOutline />
			</div>
		</button>
	</div>
	<div class="flex-it px-2 pb-3">
		{message}
	</div>
	<div style="width: {progress}%" class="bg-black opacity-40 text-right h-2" />
</div>
