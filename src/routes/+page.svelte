<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Button from '$lib/components/Button.svelte';
	import GoldAmount from '$lib/components/GoldAmount.svelte';
	import ManageWorkforce from '$lib/components/ManageWorkforce.svelte';
	import ResourceIcon from '$lib/components/ResourceIcon.svelte';
	import SecondaryButton from '$lib/components/SecondaryButton.svelte';
	import { handleSubmit } from '$lib/helpers/form.helper';
	import { UpgradesBoosts } from '$lib/modules/upgrades/upgrades.data';
	import {
		playerCitizensAvailable,
		playerInfos,
		playerCitizensMax as playerMaxCitizens,
		playerResources,
		playerWorkforces,
		upgradeProductionLevel
	} from '$lib/stores/playerInfos.store';
	import type { Resources, Workforce } from '@prisma/client';
	import type { PageData } from './$types';

	export let data: PageData;
	let player: typeof data.player;
	let resources: Resources;
	let appInit = false;
	let touchedWorkforces = {
		wood: false,
		marble: false,
		sulfur: false,
		wine: false,
		crystal: false
	};
	$: touched = Object.values(touchedWorkforces).some((t) => t);

	let workforces = {
		wood: 0,
		marble: 0,
		sulfur: 0,
		wine: 0,
		crystal: 0
	};

	$: player = data.player;
	$: if (data.player && !appInit) {
		initValues(data.player);
		initWorkforces(data.player.Workforces ?? []);
		appInit = true;
	}
	$: if (!data.player) {
		goto('/auth/login');
	}

	const initValues = (newValues: typeof data.player) => {
		player = newValues;
		resources = newValues.Resources!;
		playerInfos.set(player);
		playerResources.set(resources);
		playerWorkforces.set(newValues.Workforces ?? []);
		playerCitizensAvailable.set(data.citizenAvailable);
		playerMaxCitizens.set(data.maxCitizens);
		upgradeProductionLevel.set(data.prodBoostUpgradeLevel);
	};

	const initWorkforces = (newValues: Workforce[]) => {
		const townHallLevel =
			player.Upgrades.find((upgrade) => upgrade.type === 'MORE_PPL')?.level || 0;

		const maxCitizens: number = UpgradesBoosts.MORE_PPL[townHallLevel]?.value ?? player.maxCitizens;
		const citizenAvailable: number =
			maxCitizens - player.Workforces.reduce((acc, workforce) => acc + workforce.amount, 0);
		playerCitizensAvailable.set(citizenAvailable);
		workforces.wood = newValues?.find((c) => c.resource === 'WOOD')?.amount ?? 0;
		workforces.marble = newValues?.find((c) => c.resource === 'MARBLE')?.amount ?? 0;
		workforces.sulfur = newValues?.find((c) => c.resource === 'SULFUR')?.amount ?? 0;
		workforces.wine = newValues?.find((c) => c.resource === 'WINE')?.amount ?? 0;
		workforces.crystal = newValues?.find((c) => c.resource === 'CRYSTAL')?.amount ?? 0;
		workforces = { ...workforces };
	};

	const saveChanges = async () => {
		return await handleSubmit().then((after) => {
			touched = false;
			return after;
		});
	};

	const cancelChanges = async () => {
		touched = false;
		initWorkforces(player.Workforces);
	};

	$: if ($page.form?.player) {
		initValues($page.form.player);
		initWorkforces($page.form.player.Workforces ?? []);
		touchedWorkforces = {
			wood: false,
			marble: false,
			sulfur: false,
			wine: false,
			crystal: false
		};
	}
</script>

<p class="">
	Joueur connecté :
	<span class="font-bold text-emerald-300">{player.name}</span>
</p>

<div class="flex items-center">
	<ResourceIcon type={'citizen'} />
	<p>Citoyens: {$playerCitizensAvailable} / {$playerMaxCitizens}</p>
</div>
<GoldAmount />

<h2>Ressources:</h2>
<ul class="px-4 flex flex-col gap-2">
	{#key workforces.wood}
		<li>
			<ManageWorkforce
				bind:workforce={workforces.wood}
				on:touched={(e) => (touchedWorkforces.wood = e.detail.touched)}
				resourceType={'wood'}
				resourceAmount={resources.wood}
			/>
		</li>
	{/key}
	{#key workforces.marble}
		<li>
			<ManageWorkforce
				bind:workforce={workforces.marble}
				on:touched={(e) => (touchedWorkforces.marble = e.detail.touched)}
				resourceType={'marble'}
				resourceAmount={resources.marble}
			/>
		</li>
	{/key}
	{#key workforces.sulfur}
		<li>
			<ManageWorkforce
				bind:workforce={workforces.sulfur}
				on:touched={(e) => (touchedWorkforces.sulfur = e.detail.touched)}
				resourceType={'sulfur'}
				resourceAmount={resources.sulfur}
			/>
		</li>
	{/key}
	{#key workforces.wine}
		<li>
			<ManageWorkforce
				bind:workforce={workforces.wine}
				on:touched={(e) => (touchedWorkforces.wine = e.detail.touched)}
				resourceType={'wine'}
				resourceAmount={resources.wine}
			/>
		</li>
	{/key}
	{#key workforces.crystal}
		<li>
			<ManageWorkforce
				bind:workforce={workforces.crystal}
				on:touched={(e) => (touchedWorkforces.crystal = e.detail.touched)}
				resourceType={'crystal'}
				resourceAmount={resources.crystal}
			/>
		</li>
	{/key}
</ul>

{#if $upgradeProductionLevel > 0}
	<p class="p-4">{UpgradesBoosts.PROD_BOOST[$upgradeProductionLevel].label}</p>
{/if}

<form method="POST" action="?/saveworkforce" use:enhance={saveChanges} class="p-4">
	{#if touched}
		{#each Object.entries(workforces) as [resourceType, workforce]}
			<input type="hidden" name={resourceType} value={workforce} />
		{/each}
		<div class="flex gap-4">
			<SecondaryButton on:click={cancelChanges} type={'button'}>Cancel</SecondaryButton>
			<Button className="ml-auto block">Validate</Button>
		</div>
	{/if}
</form>
