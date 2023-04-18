<script>
    import { onMount, setContext } from "svelte";
    import { key } from '.'
	import { writable } from "svelte/store";

    let isXl = writable(false)
    let isLg = writable(false)

    let innerWidth; //innerWidth is undefined when the page is loaded and refreshed

    $: {
        $isXl = innerWidth > 1280;
        $isLg = innerWidth > 1024;
    }

    setContext(key, {
        isXl,
        isLg,
    })
</script>

<svelte:window 
    bind:innerWidth
/>
<slot />