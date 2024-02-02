<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import Button from '$lib/components/Button.svelte';
	import ManageWorkforce from '$lib/components/ManageWorkforce.svelte';
	import ResourceIcon from '$lib/components/ResourceIcon.svelte';
	import { handleSubmit } from '$lib/helpers/form.helper';
	import {
		playerCitizens,
		playerCitizensAvailable,
		playerInfos,
		playerCitizensMax as playerMaxCitizens,
		playerResources
	} from '$lib/stores/playerInfos.store';
	import type { Resources } from '@prisma/client';
	import type { PageData } from './$types';

	export let data: PageData;
	let player: typeof data.player;
	let resources: Resources;
	let appInit = false;
	const workforces = {
		wood: 0,
		marble: 0,
		sulfur: 0,
		wine: 0,
		crystal: 0
	};

	$: player = data.player;
	$: if (data.player && !appInit) {
		player = data.player;
		resources = data.player.Resources!;
		playerInfos.set(player);
		playerResources.set(resources);
		playerCitizens.set(data.player?.Citizens ?? []);
		playerCitizensAvailable.set(data.citizenAvailable);
		playerMaxCitizens.set(player.maxCitizens);
		workforces.wood = data.player.Citizens?.find((c) => c.resource === 'WOOD')?.amount ?? 0;
		workforces.marble = data.player.Citizens?.find((c) => c.resource === 'MARBLE')?.amount ?? 0;
		workforces.sulfur = data.player.Citizens?.find((c) => c.resource === 'SULFUR')?.amount ?? 0;
		workforces.wine = data.player.Citizens?.find((c) => c.resource === 'WINE')?.amount ?? 0;
		workforces.crystal = data.player.Citizens?.find((c) => c.resource === 'CRYSTAL')?.amount ?? 0;
		appInit = true;
	}
	$: if (!data.player) {
		goto('/auth/login');
	}

	const saveChanges = () => {
		console.log('Saving changes', { workforces });
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
		<ManageWorkforce
			bind:workforce={workforces.wood}
			resourceType={'wood'}
			resourceAmount={resources.wood}
		/>
	</li>
	<li>
		<ManageWorkforce
			bind:workforce={workforces.marble}
			resourceType={'marble'}
			resourceAmount={resources.marble}
		/>
	</li>
	<li>
		<ManageWorkforce
			bind:workforce={workforces.sulfur}
			resourceType={'sulfur'}
			resourceAmount={resources.sulfur}
		/>
	</li>
	<li>
		<ManageWorkforce
			bind:workforce={workforces.wine}
			resourceType={'wine'}
			resourceAmount={resources.wine}
		/>
	</li>
	<li>
		<ManageWorkforce
			bind:workforce={workforces.crystal}
			resourceType={'crystal'}
			resourceAmount={resources.crystal}
		/>
	</li>
</ul>

<form method="POST" action="?/saveworkforce" use:enhance={() => handleSubmit()} class="p-4">
	{#each Object.entries(workforces) as [resourceType, workforce]}
		<input type="hidden" name={resourceType} value={workforce} />
	{/each}
	<Button on:click={saveChanges} className="ml-auto block">Validate</Button>
</form>
