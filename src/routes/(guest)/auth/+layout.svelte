<script>
	import { getAuthContext } from "@components/context/auth";
    import { goto } from "$app/navigation";
    const { isAuthenticated } = getAuthContext()

    if($isAuthenticated){
        goto('/')
    }
</script>


{#if !$isAuthenticated}
<slot />
{/if}
		
