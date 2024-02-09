<script lang="ts">
	import type { UpgradeDetails } from '$lib/modules/upgrades/dto/UpgradeDetails.dto';
	import { playerResources } from '$lib/stores/playerInfos.store';
	import { EnumUpgradeType } from '@prisma/client';
	import type { PageServerData } from './$types';
	import UpgradeBuilding from './UpgradeBuilding.svelte';

	export let data: PageServerData;
	$: citizenUpgradeDetails = data.citizenUpgradeDetails;
	$: console.debug({playerResources: $playerResources});

	let upgradeDetails: UpgradeDetails | undefined;

	const openUpgradeModal = (type: EnumUpgradeType) => {
		if (type === 'MORE_PPL') return (upgradeDetails = citizenUpgradeDetails);
		console.log(type);
	};
</script>

<!-- Mpdal -->
{#if upgradeDetails}
	<div
		class="z-20 fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-60 flex items-center justify-center p-8"
	>
    <button
      class="absolute top-4 right-4 bg-black bg-opacity-50 rounded-xl p-2 border border-gray-400"
      on:click={() => (upgradeDetails = undefined)}
    >
    <svg class="fill-white h-8 w-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
  </button>
		<UpgradeBuilding {...upgradeDetails} on:close={() => (upgradeDetails = undefined)} />
	</div>
{/if}

<div class="grid grid-cols-2 divide-x-2 divide-emerald-300">
  <!-- Citizens -->
	<button
		on:click={() => openUpgradeModal('MORE_PPL')}
		class="flex-1 flex items-center justify-center aspect-square bg-white border-2 border-emerald-300"
	>
		<div class="flex flex-col items-center justify-center">
			<img
				class="aspect-square h-24 inline-block"
				src="/upgrades/citizens.png"
				alt="More citizen"
			/>
			<p class="-mt-2 pb-2 font-light">Citoyens</p>
		</div>
	</button>
  <!-- Passive Income -->
<!-- 
	<button
		class="flex-1 flex items-center justify-center aspect-square bg-white border-t-2 border-y-emerald-300"
	>
		<div class="flex flex-col items-center justify-center">
			<img
				class="aspect-square h-24 inline-block"
				src="/upgrades/passive.png"
				alt="Passive income"
			/>
			<p class="-mt-2 pb-2 font-light">Revenus passifs</p>
		</div>
	</button> -->
</div>
