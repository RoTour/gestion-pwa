<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import { handleSubmit } from '$lib/helpers/form.helper';
	import { appIsLoading } from '$lib/stores/appIsLoading.store';

	$: errorMessage = $page.form?.message || '';
	
	const login = async () => {
		appIsLoading.set(true);
		return handleSubmit();
	}
</script>

<form use:enhance={login} method="POST" action="?/login" class="flex flex-col p-4">
	<label for="email">Email: </label>
	<input type="email" id="email" name="email" class="border-solid border-black border px-4 py-2" />

	<label for="password">Password: </label>
	<input
		type="password"
		id="password"
		name="password"
		class="border-solid border-black border px-4 py-2"
	/>

	{#if errorMessage}
		<p class="text-red-500">{errorMessage}</p>
	{/if}
	<button type="submit" class="bg-emerald-300 py-2 px-4 mt-4 font-extrabold">Login</button>
</form>

<p class="px-4">
	Pas de compte ? <a href="/auth/register" class="font-bold text-emerald-300 underline"
		>Créez-en un maintenant</a
	>.
</p>
