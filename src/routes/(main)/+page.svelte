<script>
	import Messenger from '@components/utils/Messenger.svelte';
	import GlidePost from '../../components/glides/GlidePost.svelte';

	let glides = []

</script>


<Messenger />
<div class="h-px bg-gray-700 my-1" />
{#each glides as glide}
	<GlidePost glide={glide}/>
{/each}
<!-- HOME PAGE END -->
