<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import ResourceIcon from '$lib/components/ResourceIcon.svelte';
	import { playerResources } from '$lib/stores/playerInfos.store';
	import { onMount } from 'svelte';
	import type { IconType } from '../../models/IconType';
	import type { PageServerData } from './$types';
	import type { EnumResource } from '@prisma/client';

	export let data: PageServerData;
	const order = ['WOOD', 'MARBLE', 'SULFUR', 'WINE', 'CRYSTAL'];
	let action: 'buy' | 'sell' = 'buy';
	let ressourcesAvailable: Record<EnumResource, bigint> = {
		WOOD: 0n,
		MARBLE: 0n,
		SULFUR: 0n,
		WINE: 0n,
		CRYSTAL: 0n
	};
	onMount(() => {
		playerResources.subscribe((value) => {
			ressourcesAvailable = {
				WOOD: BigInt(value?.wood || 0),
				MARBLE: BigInt(value?.marble || 0),
				SULFUR: BigInt(value?.sulfur || 0),
				WINE: BigInt(value?.wine || 0),
				CRYSTAL: BigInt(value?.crystal || 0)
			};
		});
	});

	$: prices = data.prices.sort((a, b) => order.indexOf(a.resource) - order.indexOf(b.resource));
	const formatPrice = (price: number) => {
		return Math.floor(price / 100);
	};
	const formatResource = (resource: string): IconType => {
		return resource.toLowerCase() as IconType;
	};
	$: console.log(prices);
	$: console.debug({ ressourcesAvailable });
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
		className="flex-1 {action === 'sell'
			? 'bg-red-300'
			: 'bg-white border-2 border-red-300 border-b-0'}">Vendre</Button
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

			{#if action === 'buy'}
				<div class="ml-auto flex gap-4">
					<Button className="text-xs">1</Button>
					<Button className="text-xs">10</Button>
					<Button className="text-xs">100</Button>
				</div>
			{:else}
				<div class="ml-auto flex gap-4">
					<Button
						disabled={ressourcesAvailable[resource] / 1000n < 1n}
						className="text-xs {ressourcesAvailable[resource] / 1000n < 1n
							? 'bg-gray-300'
							: 'bg-red-300'}">1</Button
					>
					<Button
						disabled={ressourcesAvailable[resource] / 1000n < 10n}
						className="text-xs {ressourcesAvailable[resource] / 1000n < 10n
							? 'bg-gray-300'
							: 'bg-red-300'}">10</Button
					>
					<Button
						disabled={ressourcesAvailable[resource] / 1000n < 100n}
						className="text-xs {ressourcesAvailable[resource] / 1000n < 100n
							? 'bg-gray-300'
							: 'bg-red-300'}">100</Button
					>
				</div>
			{/if}
		</div>
	{/each}
</div>