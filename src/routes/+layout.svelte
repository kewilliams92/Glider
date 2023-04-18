<script>
	import UiContext from '@components/context/UI/UIContext.svelte';
	import '../app.css';
	import AuthContext from '@components/context/auth/AuthContext.svelte';
</script>

<UiContext>
	<AuthContext>
		<slot />
	</AuthContext>
</UiContext>
