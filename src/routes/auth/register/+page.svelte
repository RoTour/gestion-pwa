<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';

  $: errorMessage = $page.form?.message || '';
</script>

<form use:enhance action="?/register" class="flex flex-col p-4" method="POST">
	<label for="email">Email: </label>
	<input type="email" id="email" name="email" class="border-solid border-black border px-4 py-2" />

	<label for="username">Username: </label>
	<input
		type="text"
		id="username"
		name="username"
		class="border-solid border-black border px-4 py-2"
	/>

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
	<button type="submit" class="bg-emerald-300 py-2 px-4 mt-4 font-extrabold">Register</button>
</form>

<p class="px-4">Vous avez déjà un compte ? <a href="/auth/login"  class="font-bold text-emerald-300 underline">Connectez-vous</a>.</p>