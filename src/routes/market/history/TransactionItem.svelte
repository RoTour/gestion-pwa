<script lang="ts">
	import ResourceIcon from '$lib/components/ResourceIcon.svelte';
	import { formatGold } from '$lib/helpers/resources.helper';

	export let type: 'BUY' | 'SELL';
	export let amount: number;
	export let resource: 'WOOD' | 'MARBLE' | 'SULFUR' | 'CRYSTAL' | 'WINE' | 'GOLD';
  export let price: number;

	$: color = type === 'BUY' ? 'bg-emerald-300' : 'bg-red-300';
	$: iconType = resource.toLowerCase() as
		| 'wood'
		| 'marble'
		| 'sulfur'
		| 'crystal'
		| 'wine'
		| 'gold';
  $: resourceName = resource.at(0) + [...resource].slice(1).join('').toLowerCase();
  $: displayedPrice = formatGold(price * amount);
  $: displayerUnitPrice = formatGold(price);
</script>

<div class="flex gap-2 px-4 py-2 {color} items-center">
	<ResourceIcon type={iconType} />
  <div class="flex flex-col justify-center">
    <p class="font-bold text-xl leading-4">{resourceName}</p>
    <p class="text-sm leading-4">x{amount}</p>
  </div>
  <div class="flex items-center ml-auto text-xl font-bold">
    <p>{displayerUnitPrice}</p>
    <ResourceIcon type="gold" className="h-6 w-6 inline-block" />
    <p class="text-sm font-medium mt-1">/u</p>
  </div>
</div>
