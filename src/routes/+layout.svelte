<script lang="ts">
	import { dev } from '$app/environment';
	import { goto } from '$app/navigation';
	import { navigating, page } from '$app/stores';
	import Button from '$lib/components/Button.svelte';
	import Loader from '$lib/components/Loader.svelte';
	import { appIsLoading } from '$lib/stores/appIsLoading.store';
	import { playerResources } from '$lib/stores/playerInfos.store';
	import { inject } from '@vercel/analytics';
	import '../app.css';

	inject({ mode: dev ? 'development' : 'production' });

	$: isAuthPage = $page.url.pathname.includes('/auth/');

	const logout = () => {
		goto('/auth/logout');
	};

	$: if ($page.data.user) {
		playerResources.set($page.data.user.Resources);
	}
</script>

<header class="flex justify-between items-center mb-4">
	<p>AppVersion: 6.4.1</p>
	{#if !isAuthPage}
		<Button on:click={logout}>Logout</Button>
	{/if}
</header>

{#if $appIsLoading || $navigating}
	<Loader />
{/if}
<slot />

{#if !isAuthPage}
	<nav class="flex gap-2 text-center bg-emerald-300 pt-2 pb-0 fixed z-10 bottom-0 w-full">
		<a href="/" class="flex-1 bg-white">
			<div class="h-16 flex flex-col items-center justify-center">
				<img class="aspect-square h-14 inline-block" src="/home.png" alt="Home" />
				<p class="-mt-2 pb-2 text-xs font-light">Home</p>
			</div>
		</a>
		<a href="/market" class="flex-1 bg-white">
			<div class="h-16 flex flex-col items-center justify-center">
				<img class="aspect-square h-14 inline-block" src="/market.png" alt="Market" />
				<p class="-mt-2 pb-2 text-xs font-light">Market</p>
			</div>
		</a>
		<a href="/buildings" class="flex-1 bg-white pointer-events-none grayscale">
			<div class="h-16 flex flex-col items-center justify-center">
				<img class="aspect-square h-14 inline-block" src="/buildings.png" alt="Market" />
				<p class="-mt-2 pb-2 text-xs font-light">Buildings</p>
			</div>
		</a>
		<a href="/leaderboard" class="flex-1 bg-white">
			<div class="h-16 flex flex-col items-center justify-center">
				<img class="aspect-square h-14 inline-block" src="/podium.png" alt="Leaderboard" />
				<p class="-mt-2 pb-2 text-xs font-light">Leaderboard</p>
			</div>
		</a>
	</nav>
{/if}
