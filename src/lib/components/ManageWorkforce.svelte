<script lang="ts">
	import { playerCitizensAvailable, upgradeProductionLevel } from '$lib/stores/playerInfos.store';
	import { createEventDispatcher } from 'svelte';
	import type { IconType } from '../../models/IconType';
	import ResourceIcon from './ResourceIcon.svelte';
	import { UpgradesBoosts } from '$lib/modules/upgrades/upgrades.data';

	export let resourceType: IconType = 'wood';
	export let resourceAmount: bigint = 0n;

	export let workforce = 0;
	let initialWorkforce = workforce;
	const touchedEmitter = createEventDispatcher()

	const editWorkforce = (change: -1 | 1) => {
		if (change === -1 && workforce > 0) {
			workforce--;
			playerCitizensAvailable.update((n) => n - change);
		} else if (change === 1 && $playerCitizensAvailable > 0) {
			workforce++;
			playerCitizensAvailable.update((n) => n - change);
		}
		touchedEmitter('touched', { touched: initialWorkforce !== workforce});
	};

	const getTotalHourlyProduction = () => {
		return Math.floor(workforce * UpgradesBoosts.PROD_BOOST[$upgradeProductionLevel].value);
	};
</script>

<div class="flex items-center">
	<div class="flex flex-1 items-center">
		<ResourceIcon type={resourceType} />
		<p class="">{Math.floor(Number(BigInt(resourceAmount) / 1000n))}</p>
		<p class="ml-2">({getTotalHourlyProduction()}/h)</p>
	</div>

	<div class="ml-auto flex items-center gap-4">
		<button
			on:click={() => editWorkforce(-1)}
			class="rounded-xl border-2 border-solid border-emerald-300 aspect-square h-12">-</button
		>
		<div class="flex items-center">
			<ResourceIcon type={'citizen'} />
			<p class="text-center w-4">{workforce}</p>
		</div>
		<button
			on:click={() => editWorkforce(1)}
			class="rounded-xl border-2 border-solid border-emerald-300 aspect-square h-12">+</button
		>
	</div>
</div>
