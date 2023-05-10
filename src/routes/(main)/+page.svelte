<script>
	import { createGlideStore } from '@stores/createGlideStore';
	import Messenger from '@components/utils/Messenger.svelte';
	import PaginatedGlides from '@components/glides/PaginatedGlides.svelte';
	import { pageStore } from '@stores/pageStore';
	import { getAuthContext } from '@components/context/auth';

	//we are using auth to pass user to createGlideStore
	const { auth } = getAuthContext();

	const { pages, loading, addGlide, loadGlides } = createGlideStore($auth.user);

    pageStore.title.set("Home");

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


