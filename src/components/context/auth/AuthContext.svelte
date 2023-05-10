<script>
	import { onMount, setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import { key } from '.';
	import { onAuthStateChanged } from 'firebase/auth';
	import Loader from '@components/utils/Loader.svelte';
	import { firebaseAuth } from '@db/index';
	import { getUser } from '@api/users';

	let isLoading = writable(true);
	let auth = writable({
		isAuthenticated: false,
		user: null
	});

	setContext(key, {
		auth,
		isLoading
	});

	onMount(listenToAuthChanges);

	function listenToAuthChanges(){
		onAuthStateChanged(firebaseAuth, async (user) => {
			//if user is authenticated -> user
			//if user is NOT authenticated -> null
			if(user) {
				//we will get user from Firestore DB depending on the user uid
				const gliderUser = await getUser(user.uid);
				auth.set({
					isAuthenticated: true,
					user: gliderUser
				});
			} else {
				auth.set({
					isAuthenticated: false,
					user: null
				});
			}

			isLoading.set(false);
		})
	}
</script>

{#if $isLoading}
	<Loader size={100} />
{:else}
	<slot />
{/if}

<!-- IsLoading true-->
