<script lang="ts">
	import { goto } from '$app/navigation';
	import { navigating, page } from '$app/stores';
	import Button from '$lib/components/Button.svelte';
	import Loader from '$lib/components/Loader.svelte';
	import { appIsLoading } from '$lib/stores/appIsLoading.store';
	import '../app.css';

	$: isAuthPage = $page.url.pathname.includes('/auth/');
	const logout = () => {
		goto('/auth/logout');
	};
</script>

<header class="flex justify-between items-center mb-4">
	<p>AppVersion: 4.0.1</p>
	{#if !isAuthPage}
		<Button on:click={logout}>Logout</Button>
	{/if}
</header>

{#if $appIsLoading || $navigating}
	<Loader />
{/if}
<slot />
