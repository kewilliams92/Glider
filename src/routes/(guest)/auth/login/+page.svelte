<script>
	import { loginUser } from "@api/auth";
	import LoginForm from "@components/forms/LoginForm.svelte";
	import AuthLayout from "@components/layouts/AuthLayout.svelte";

	async function login(formData){
		const user = await loginUser(formData);
		console.log(user);
	}

</script>



<AuthLayout title="Get in!">
	<LoginForm onFormSubmit={login}/>
</AuthLayout>