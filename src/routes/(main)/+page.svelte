<script>
	import { createGlideStore } from '@stores/createGlideStore';
	import Messenger from '@components/utils/Messenger.svelte';
	import PaginatedGlides from '@components/glides/PaginatedGlides.svelte';

	const { pages, loading, addGlide, loadGlides } = createGlideStore();
</script>

<Messenger
	onGlidePosted={addGlide}
/>
<div class="h-px bg-gray-700 my-1" />

<PaginatedGlides 
	pages={$pages}
	loading={$loading}
	loadMoreGlides={loadGlides}
	/>


