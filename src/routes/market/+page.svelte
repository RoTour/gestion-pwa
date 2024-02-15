<script lang="ts">
	import { invalidate } from '$app/navigation';
	import { page } from '$app/stores';
	import Button from '$lib/components/Button.svelte';
	import GoldAmount from '$lib/components/GoldAmount.svelte';
	import ResourceIcon from '$lib/components/ResourceIcon.svelte';
	import { formatResources, getResourceFromEnum } from '$lib/helpers/resources.helper';
	import { appIsLoading } from '$lib/stores/appIsLoading.store';
	import { playerResources } from '$lib/stores/playerInfos.store';
	import type { EnumResource } from '@prisma/client';
	import { onMount } from 'svelte';
	import type { IconType } from '../../models/IconType';
	import type { PageServerData } from './$types';

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
	let playerGold = 0n;
	onMount(() => {
		playerResources.subscribe((value) => {
			ressourcesAvailable = {
				WOOD: BigInt(value?.wood || 0),
				MARBLE: BigInt(value?.marble || 0),
				SULFUR: BigInt(value?.sulfur || 0),
				WINE: BigInt(value?.wine || 0),
				CRYSTAL: BigInt(value?.crystal || 0)
			};
			playerGold = BigInt(value?.gold || 0);
		});
	});

	$: prices = data.prices.sort((a, b) => order.indexOf(a.resource) - order.indexOf(b.resource));
	$: lastUpdate = (data.prices[0]?.updatedAt ?? new Date()).toLocaleTimeString();
	$: hasEqualPricesUpgrade = data.hasEqualPricesUpgrade;

	const formatPrice = (price: number) => {
		return Math.floor(price / 100);
	};
	const formatResource = (resource: string): IconType => {
		return resource.toLowerCase() as IconType;
	};

	const sell = async (resource: EnumResource, quantity: number) => {
		appIsLoading.set(true);
		try {
			const res = await fetch(`/api/market/sell`, {
				method: 'POST',
				body: JSON.stringify({ resource, quantity })
			});
			const data = await res.json();
			console.log(data);
			await invalidate('refresh:user');
			playerResources.set($page.data.user.Resources);
		} catch (e) {
			console.error(e);
		}
		appIsLoading.set(false);
	};

	const buy = async (resource: EnumResource, quantity: number) => {
		appIsLoading.set(true);
		try {
			const res = await fetch(`/api/market/buy`, {
				method: 'POST',
				body: JSON.stringify({ resource, quantity })
			});
			const data = await res.json();
			console.log(data);
			await invalidate('refresh:user');
			playerResources.set($page.data.user.Resources);
		} catch (e) {
			console.error(e);
		}
		appIsLoading.set(false);
	};

	$: multiplier = 1;

	const switchValues = () => {
		multiplier = multiplier === 1 ? 1000 : 1;
	};

	const canSell = (base: number, resource: EnumResource) => {
		console.debug({
			ressourcesAvailable: ressourcesAvailable[resource] / 1000n,
			resource,
			base,
			totalToSell: BigInt(multiplier) * BigInt(base)
		});
		return ressourcesAvailable[resource] / 1000n >= BigInt(multiplier) * BigInt(base);
	};
</script>

<GoldAmount />

<div class="flex py-4">
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
		{@const buyPrice = price + (hasEqualPricesUpgrade ? 0 : 100)}
		<div class="flex items-center px-4">
			<ResourceIcon type={formatResource(resource)} />
			<div class="flex flex-col leading-4">
				<div class="flex items-center w-16 font-bold">
					<div class="">{action === 'buy' ? formatPrice(buyPrice) : formatPrice(price)}</div>
					<ResourceIcon type={'gold'} className={'mb-1 h-4 w-4'} />
					<p class="text-xs">/u</p>
				</div>
				<div class="flex items-baseline gap-1">
					<p class="text-sm">In stock:</p>
					<p class="text-sm">
						{formatResources(getResourceFromEnum(resource, $playerResources))}
					</p>
				</div>
			</div>

			{#key multiplier}
				{#if action === 'buy'}
					<div class="ml-auto flex gap-4">
						<Button
							on:click={() => buy(resource, 1 * multiplier)}
							disabled={buyPrice * 1 * multiplier > playerGold}
							className="rounded-lg text-xs {buyPrice * 1 * multiplier > playerGold
								? 'bg-gray-300'
								: ''}"
						>
							1{multiplier === 1000 ? 'K' : ''}
						</Button>
						<Button
							on:click={() => buy(resource, 10 * multiplier)}
							disabled={buyPrice * 10 * multiplier > playerGold}
							className="rounded-lg text-xs {buyPrice * 10 * multiplier > playerGold
								? 'bg-gray-300'
								: ''}"
						>
							10{multiplier === 1000 ? 'K' : ''}
						</Button>
						<Button
							on:click={() => buy(resource, 100 * multiplier)}
							disabled={buyPrice * 100 * multiplier > playerGold}
							className="rounded-lg text-xs {buyPrice * 100 * multiplier > playerGold
								? 'bg-gray-300'
								: ''}"
						>
							100{multiplier === 1000 ? 'K' : ''}
						</Button>
					</div>
				{:else}
					<!-- Selling -->
					<div class="ml-auto flex gap-4">
						<Button
							on:click={() => sell(resource, 1 * multiplier)}
							disabled={!(ressourcesAvailable[resource] / 1000n >= BigInt(multiplier) * BigInt(1))}
							className="rounded-lg text-xs {!(ressourcesAvailable[resource] / 1000n >= BigInt(multiplier) * BigInt(1)) ? 'bg-gray-300' : 'bg-red-300'}"
						>
							1{multiplier === 1000 ? 'K' : ''}
						</Button>
						<Button
							on:click={() => sell(resource, 10 * multiplier)}
							disabled={!(ressourcesAvailable[resource] / 1000n >= BigInt(multiplier) * BigInt(10))}
							className="rounded-lg text-xs {!(ressourcesAvailable[resource] / 1000n >= BigInt(multiplier) * BigInt(10)) ? 'bg-gray-300' : 'bg-red-300'}"
						>
							10{multiplier === 1000 ? 'K' : ''}
						</Button>
						<Button
							on:click={() => sell(resource, 100 * multiplier)}
							disabled={!(ressourcesAvailable[resource] / 1000n >= BigInt(multiplier) * BigInt(100))}
							className="rounded-lg text-xs {!(ressourcesAvailable[resource] / 1000n >= BigInt(multiplier) * BigInt(100)) ? 'bg-gray-300' : 'bg-red-300'}"
						>
							100{multiplier === 1000 ? 'K' : ''}
						</Button>
					</div>
				{/if}
			{/key}
		</div>
	{/each}
</div>
<p class="text-xs">Dernière mise à jour: {lastUpdate}</p>
<div class="flex justify-end gap-4 p-4">
	<div class="w-fit">
		<div>
			<a href="/market/history" class="flex flex-col items-center justify-center">
				<img src="history.png" alt="History" class="w-16 h-16" />
				<p class="text-sm leading-4 -mt-1">History</p>
			</a>
		</div>
	</div>
	<div class="w-fit">
		<div>
			<button on:click={switchValues} class="flex flex-col items-center justify-center">
				<img src="switch.png" alt="History" class="w-16 h-16" />
				<p class="text-sm leading-4 -mt-1">Switch</p>
			</button>
		</div>
	</div>
</div>
