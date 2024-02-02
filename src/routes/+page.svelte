<script lang="ts">
	import { goto } from '$app/navigation';
	import ManageWorkforce from '$lib/components/ManageWorkforce.svelte';
	import ResourceIcon from '$lib/components/ResourceIcon.svelte';
	import type { Resources } from '@prisma/client';
	import type { PageData } from './$types';
	import { playerCitizens, playerCitizensAvailable, playerCitizensMax as playerMaxCitizens, playerInfos, playerResources } from '$lib/stores/playerInfos.store';
	import Button from '$lib/components/Button.svelte';
	import { handleSubmit } from '$lib/helpers/form.helper';
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';

	export let data: PageData;
	let player: typeof data.player;
	let resources: Resources;
	const workforces = {
		wood: 0,
		marble: 0,
		sulfur: 0,
		wine: 0,
		crystal: 0,
	}

	$: player = data.player;
	$: if (data.player) {
		player = data.player;
		resources = data.player.Resources!;
		playerInfos.set(player);
		playerResources.set(resources);
		playerCitizens.set(data.player?.Citizens ?? []);
		playerCitizensAvailable.set(data.citizenAvailable);
		playerMaxCitizens.set(player.maxCitizens);
	}
	$: if (!data.player) {
		goto('/auth/login');
	}

	$: console.log("form", $page.form)

	const saveChanges = () => {
		console.log('Saving changes', {workforces});
		handleSubmit();
	};
</script>

<p class="">
	Joueur connecté :
	<span class="font-bold text-emerald-300">{player.name}</span>
</p>

<div class="flex items-center">
	<ResourceIcon type={'citizen'} />
	<p>Citoyens: {$playerCitizensAvailable} / {$playerMaxCitizens}</p>
</div>

<h2>Ressources:</h2>
<ul class="px-4 flex flex-col gap-2">
	<li>
		<ManageWorkforce bind:workforce={workforces.wood}
		 resourceType={'wood'} resourceAmount={resources.wood}/>
	</li>
	<li>
		<ManageWorkforce bind:workforce={workforces.marble}
		 resourceType={'marble'} resourceAmount={resources.marble}/>
	</li>
	<li>
		<ManageWorkforce bind:workforce={workforces.sulfur}
		 resourceType={'sulfur'} resourceAmount={resources.sulfur}/>
	</li>
	<li>
		<ManageWorkforce bind:workforce={workforces.wine}
		 resourceType={'wine'} resourceAmount={resources.wine}/>
	</li>
	<li>
		<ManageWorkforce bind:workforce={workforces.crystal}
		 resourceType={'crystal'} resourceAmount={resources.crystal}/>
	</li>
</ul>
<form method="POST" action="?/saveworkforce" use:enhance={() => handleSubmit()}
	class="px-4">
	{#each Object.entries(workforces) as [resourceType, workforce]}
		<input type="hidden" name={resourceType} value={workforce} />
	{/each}
	<Button on:click={saveChanges} className="ml-auto block">Validate</Button>
</form>
