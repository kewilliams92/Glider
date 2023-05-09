<script>
	import { onMount, setContext } from 'svelte';
	import { key } from '.';
	import { writable } from 'svelte/store';

	let snackbars = writable([]);

	let isXl = writable(false);
	let isLg = writable(false);

	let innerWidth; //innerWidth is undefined when the page is loaded and refreshed

	$: {
		$isXl = innerWidth > 1280;
		$isLg = innerWidth > 1024;
	}

    function addSnackbar(message, type){
        snackbars.update(list => [{message, type, id: new Date().toISOString()}, ...list]);
    }

    const removeSnackbar = (id) => () => {
		snackbars.update(list => {
			//find the index of the snackbar with the id
			const index = list.findIndex((snackbar) => snackbar.id === id);
			
			//if the index is larger than -1, remove the snackbar from the list
			if(index > -1){
				list.splice(index, 1);
			}

			return list;
		})
	}

	setContext(key, {
		isXl,
		isLg,
		snackbars,
        addSnackbar,
        removeSnackbar
	});
</script>

<svelte:window bind:innerWidth />
<slot />
