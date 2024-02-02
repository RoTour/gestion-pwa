<script lang="ts">
	import { playerCitizensAvailable, playerCitizensMax } from '$lib/stores/playerInfos.store';
	import type { ResourceType } from '../../models/ResourceType';
	import ResourceIcon from './ResourceIcon.svelte';

	export let resourceType: ResourceType = 'wood';
	export let resourceAmount: number = 0;

	export let workforce = 0;

  const editWorkforce = (change: -1 | 1) => {
		if (change === -1 && workforce > 0) {
			workforce--;
			playerCitizensAvailable.update((n) => n - change);
		} else if (change === 1 && $playerCitizensAvailable > 0) {
			workforce++;
			playerCitizensAvailable.update((n) => n - change);
		}
  }
</script>

<div class="flex items-center">
	<div class="flex flex-1 items-center">
		<ResourceIcon type={resourceType} />
		<p class="ml-2">{resourceAmount}</p>
	</div>

	<div class="ml-auto flex items-center gap-4">
		<button
			on:click={() => (editWorkforce(-1))}
			class="border-2 border-solid border-emerald-300 aspect-square h-8">-</button
		>
		<div class="flex">
			<ResourceIcon type={'citizen'} />
			<input type="number" class="text-center max-w-8" bind:value={workforce} />
		</div>
		<button
			on:click={() => (editWorkforce(1))}
			class="border-2 border-solid border-emerald-300 aspect-square h-8">+</button
		>
	</div>
</div>
