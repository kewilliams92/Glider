<script>
	import { getAuthContext } from "@components/context/auth";
    import { goto } from "$app/navigation";

    const { auth } = getAuthContext()

    if($auth.isAuthenticated){
        goto('/')
    }
</script>


{#if !$auth.isAuthenticated}
<slot />
{/if}
		
