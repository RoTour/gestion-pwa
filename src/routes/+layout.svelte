<script lang="ts">
	import { navigating } from '$app/stores';
	import Loader from '$lib/components/Loader.svelte';
	import { appIsLoading } from '$lib/stores/appIsLoading.store';
	import '../app.css';
</script>

<header>AppVersion: 3</header>

{#if $appIsLoading || $navigating}
	<Loader />
{/if}
<slot />
