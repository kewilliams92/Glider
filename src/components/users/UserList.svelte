<script>
	import { fetchUsers } from '@api/users';
	import { getAuthContext } from '@components/context/auth';
    import { onMount } from 'svelte';
	import UserItem from './UserItem.svelte';
	import CenterDataLoader from '@components/utils/CenterDataLoader.svelte';

    const { auth } = getAuthContext();

	let users = [];
	let loading = true;

	onMount(loadUsers);

	async function loadUsers() {
		try {
			users = await fetchUsers($auth.user);
		} catch (e) {
			console.log(e.message);
		} finally {
			loading = false;
		}
	}
</script>

{#if loading}
	<CenterDataLoader />
{:else if users.length > 0}
	{#each users as user (user.uid)}
		<UserItem {user} />
	{/each}
{/if}
