<script>
    import * as api from "@api/users"
    import { getAuthContext } from '@components/context/auth';
    import { onMount } from 'svelte';
	import UserItem from './UserItem.svelte';
	import CenterDataLoader from '@components/utils/CenterDataLoader.svelte';
	import { getUIContext } from "@components/context/UI";


    const { auth, updateUser } = getAuthContext();
    const { addSnackbar } = getUIContext();

	let users = [];//this will be used to store the users fetched from the database.
	let loading = true;//this will be used to show a loading spinner while the users are being fetched.
    let followingInProgress = false; //this will be used to disable the follow button while the user is being followed.

	onMount(loadUsers);

	async function loadUsers() {
		try {
			users = await api.fetchUsers($auth.user);
		} catch (e) {
			console.log(e.message);
		} finally {
			loading = false;
		}
	}

    async function followUser(followingUser){
        followingInProgress = true;
        try{

            if($auth.user.following.filter(following => following.id === followingUser.uid).length > 0){
                throw new Error("You are already following this user.")
            }
            const followingRef = await api.followUser($auth.user.uid, followingUser.uid);
            //update the user in the firebase store.  This will trigger a re-render of the user list.
            updateUser({
                followingCount: $auth.user.followingCount + 1,
                following: [followingRef, ...$auth.user.following]
            });
            //update the user in the local store.  This will trigger a re-render of the user list.
            users = users.filter(user => user.uid !== followingUser.uid);

            //this will alert the logged in user that they are now following another user.
            addSnackbar(`You are now following ${followingUser.fullName}`, "success")
        }catch(e){
            addSnackbar(e.message, "error")
        } finally {
            followingInProgress = false;
        }
    }
</script>

{#if loading}
	<CenterDataLoader />
{:else if users.length > 0}
	{#each users as user (user.uid)}
		<UserItem 
        on:followClick={(e) => followUser(e.detail)}
        {user}
        {followingInProgress}
         />
	{/each}
    {:else}
    <div class="flex-it">
        <div class="bg-yellow-500 mt-6 p-2 rounded-lg mx-4">
            You follow all users in the world...
        </div>
    </div>
{/if}
