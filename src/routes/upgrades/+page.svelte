<script lang="ts">
	import type { UpgradeDetails } from '$lib/modules/upgrades/dto/UpgradeDetails.dto';
	import type { UpgradeType } from '$lib/modules/upgrades/entities/UpgradeType';
	import { playerResources } from '$lib/stores/playerInfos.store';
	import type { PageServerData } from './$types';
	import UpgradeBuilding from './UpgradeBuilding.svelte';

	export let data: PageServerData;
	$: citizenUpgradeDetails = data.citizenUpgradeDetails;
	$: prodBoostUpgradeDetails = data.prodBoostUpgradeDetails;
	$: passiveIncomeUpgradeDetails = data.passiveIncomeUpgradeDetails;
	$: equalPricesUpgradeDetails = data.equalPricesUpgradeDetails
	$: console.debug({ playerResources: $playerResources });

	let upgradeDetails: (UpgradeDetails & { iconFileName: string }) | undefined;

	const openUpgradeModal = (type: UpgradeType) => {
		if (type === 'MORE_PPL')
			return (upgradeDetails = { ...citizenUpgradeDetails, iconFileName: 'citizens' });
		if (type === 'PROD_BOOST')
			return (upgradeDetails = { ...prodBoostUpgradeDetails, iconFileName: 'resources' });
		if (type === 'PSV_INC')
			return (upgradeDetails = { ...passiveIncomeUpgradeDetails, iconFileName: 'passive' });
		if (type === 'EQL_PRICES')
			return (upgradeDetails = { ...equalPricesUpgradeDetails, iconFileName: 'trade' });
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
			<svg class="fill-white h-8 w-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"
				><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path
					d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
				/></svg
			>
		</button>
		<UpgradeBuilding {...upgradeDetails} on:close={() => (upgradeDetails = undefined)} />
	</div>
{/if}

<div class="grid grid-cols-2">
	<!-- Citizens -->
	<button
		on:click={() => openUpgradeModal('MORE_PPL')}
		class="flex-1 m-4 flex items-center justify-center aspect-square bg-white border-2 border-emerald-300"
	>
		<div class="flex flex-col items-center justify-center">
			<img
				class="aspect-square h-24 inline-block"
				src="/upgrades/citizens.png"
				alt="More citizen"
			/>
			<p class="-mt-2 pb-2 font-light text-nowrap text-sm">Citoyens</p>
		</div>
	</button>
	<button
		on:click={() => openUpgradeModal('PROD_BOOST')}
		class="flex-1 m-4 flex items-center justify-center aspect-square bg-white
		 border-2 border-emerald-300"
	>
		<div class="flex flex-col items-center justify-center">
			<img
				class="aspect-square h-24 inline-block"
				src="/upgrades/resources.png"
				alt="Production améliorée"
			/>
			<p class="-mt-2 pb-2 font-light text-nowrap text-sm">Production améliorée</p>
		</div>
	</button>
	<button
		on:click={() => openUpgradeModal('PSV_INC')}
		class="flex-1 m-4 flex items-center justify-center aspect-square bg-white
		 border-2 border-emerald-300"
	>
		<div class="flex flex-col items-center justify-center">
			<img
				class="aspect-square h-24 inline-block"
				src="/upgrades/passive.png"
				alt="Production améliorée"
			/>
			<p class="-mt-2 pb-2 font-light text-nowrap text-sm">Investissements<br/> passifs</p>
		</div>
	</button>
	<button
		on:click={() => openUpgradeModal('EQL_PRICES')}
		class="flex-1 m-4 flex items-center justify-center aspect-square bg-white
		 border-2 border-emerald-300"
	>
		<div class="flex flex-col items-center justify-center">
			<img
				class="aspect-square h-24 inline-block scale-110"
				src="/upgrades/trade.png"
				alt="Prix équitables"
			/>
			<p class="-mt-2 pb-2 font-light text-nowrap text-sm">Expert Tradder</p>
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
