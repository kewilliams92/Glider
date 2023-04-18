<script>
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import { key } from '.';
	import Loader from '@components/utils/Loader.svelte';

	let isLoading = writable(true);
	let isAuthenticated = writable(false, (set) => {
		setTimeout(() => {
			set(true); // isAuthenticated setter
			$isLoading = false;
		}, 2000);
	});

	setContext(key, {
		isAuthenticated,
		isLoading
	});
</script>

{#if $isLoading && !$isAuthenticated}
	<Loader size={100} />
{:else}
	<slot />
{/if}

<!-- IsLoading true-->
