<script>
    import {page} from '$app/stores';
    import { onMount } from 'svelte';
    import { fetchGlide } from '@api/glides';

    onMount(async () => {
        const glide = fetchGlide($page.params.uid, $page.params.id)
        console.log(glide)
    })
</script>

<div>
    uid:{$page.params.uid}
</div>

<div>
    id:{$page.params.id}
</div>