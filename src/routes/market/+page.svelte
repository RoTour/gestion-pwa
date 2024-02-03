<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import ResourceIcon from '$lib/components/ResourceIcon.svelte';
	import type { ResourceType } from '../../models/ResourceType';
	import type { PageServerData } from './$types';

	export let data: PageServerData;
	const order = ['WOOD', 'MARBLE', 'SULFUR', 'WINE', 'CRYSTAL']; 
	let action: 'buy' | 'sell' = 'buy';

	$: prices = data.prices.sort((a, b) => order.indexOf(a.resource) - order.indexOf(b.resource));
	const formatPrice = (price: number) => {
		return Math.floor(price / 100);
	};
	const formatResource = (resource: string): ResourceType => {
		return resource.toLowerCase() as ResourceType;
	};
  $: console.log(prices);
</script>

<div class="flex pb-4">
	<Button
		on:click={() => (action = 'buy')}
		className="flex-1 {action === 'buy'
			? 'bg-emerald-300'
			: 'bg-white border-2 border-emerald-300 border-b-0'}">Acheter</Button
	>
	<Button
  on:click={() => (action = 'sell')}
  className="flex-1 {action === 'sell' ? 'bg-red-300' : 'bg-white border-2 border-red-300 border-b-0'}"
		>Vendre</Button
	>
</div>

<div class="divide-y-2">
	{#each prices as { price, resource }}
		<div class="flex items-center px-4">
			<ResourceIcon type={formatResource(resource)} />
			<p class={'mr-2'}>:</p>

			<div class="flex items-center w-16 justify-end">
				<div class="">{formatPrice(price)}</div>
				<ResourceIcon type={'gold'} className={'p-1 h-10 w-10'} />
			</div>

      <div class="ml-auto flex gap-4">
        <Button className="text-xs {action === "sell" ? 'bg-red-300' : ''}">1</Button>
        <Button className="text-xs {action === "sell" ? 'bg-red-300' : ''}">10</Button>
        <Button className="text-xs {action === "sell" ? 'bg-red-300' : ''}">100</Button>
      </div>
		</div>
	{/each}
</div>
