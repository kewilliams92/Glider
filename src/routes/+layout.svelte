<script>
	import UiContext from '@components/context/UI/UIContext.svelte';
	import SnackbarContainer from '@components/snackbar/SnackbarContainer.svelte';
	import '../app.css';
	import AuthContext from '@components/context/auth/AuthContext.svelte';
</script>

<UiContext>
	<AuthContext>
		<SnackbarContainer />
		<slot />
	</AuthContext>
</UiContext>
