<script lang="ts">
	import { invalidate } from '$app/navigation';
	import Button from '$lib/components/Button.svelte';
	import ResourceIcon from '$lib/components/ResourceIcon.svelte';
	import { formatGold, formatResources, getResourceFromEnum } from '$lib/helpers/resources.helper';
	import { afterUpgradeActions } from '$lib/modules/upgrades/afterUpgradeActions';
	import type { UpgradeResource } from '$lib/modules/upgrades/entities/UpgradeLevel.entity';
	import type { UpgradeType } from '$lib/modules/upgrades/entities/UpgradeType';
	import type { UpgradeResult } from '$lib/modules/upgrades/usecases/UseUpgrade.usecase';
	import { appIsLoading } from '$lib/stores/appIsLoading.store';
	import { playerResources } from '$lib/stores/playerInfos.store';
	import { createEventDispatcher, onMount } from 'svelte';
	import { UpgradesCosts } from '../../lib/modules/upgrades/upgrades.data';
	
	export let nextLevelCosts: { resource: UpgradeResource; amount: number }[] = [];
	export let currentBoost: string;
	export let nextBoost: string;
	export let labels: {name: string, description: string};
	export let buildingLevel: number;
	export let iconFileName: string;
	export let type: UpgradeType;
	export const costs = UpgradesCosts[type];

	let disabled = true;
	let errorMessage = '';
	const closeDispatcher = createEventDispatcher();

	onMount(() => {
		playerResources.subscribe((value) => {
			disabled = nextLevelCosts.some((cost) => {
				if (cost.resource === 'GOLD') return (value?.gold ?? 0) < cost.amount;
				return (getResourceFromEnum(cost.resource, value) ?? BigInt(0)) < BigInt(cost.amount);
			});
		});
	});

	const insertIcons = (str: string) => {
		const regex = /\[(\w+)\]/g;
		return str.replace(regex, (match, p1) => {
			return `<img src="/resources/${p1}.png" class="h-6 w-6" alt={type} />`;
		});
	};

	const removeTextInParentheses = (str: string) => str.replace(/\([^)]*\)/g, '');

	const buyUpgrade = async () => {
		appIsLoading.set(true);
		errorMessage = '';
		try {
			const result = await fetch('/api/upgrades', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ type })
			});
			const payload = await result.json() as App.ApiResponse<UpgradeResult>;
			const status = result.status;
			if (status !== 200)
				return (errorMessage = payload.message ?? "Erreur lors de l'achat de l'amélioration");
			const newPlayerData = payload.data;
			if (!newPlayerData) return (errorMessage = "Erreur lors de l'achat de l'amélioration");
			afterUpgradeActions[type]({ ...newPlayerData });
			closeDispatcher('close');
		} catch (error) {
			console.error(error);
			errorMessage = "Erreur lors de l'achat de l'amélioration";
		} finally {
			await invalidate('user:upgrades');
			appIsLoading.set(false);
		}
	};
</script>

<main class="bg-white rounded-xl p-4">
	<div class="flex justify-between">
		<div class="flex flex-col justify-center">
			<p class="text-xl">{labels.name}</p>
			<p class="font-bold">Level: {buildingLevel}</p>
		</div>
		<img src="/upgrades/{iconFileName}.png" alt="upgrade citizens" class="w-16" />
	</div>
	<p class="p-4 text-xs">{labels.description}</p>

	<p class="text-sm flex">
		<span class="font-bold mr-1">Effet actuel: </span>
		{@html insertIcons(removeTextInParentheses(currentBoost))}
	</p>

	{#if nextLevelCosts && nextLevelCosts.length > 0}
		<p class="flex items-center">
			<span class="font-bold mr-1">Au niveau suivant: </span>
			{@html insertIcons(nextBoost)}
		</p>
		<div class="grid grid-cols-3 mt-8">
			{#each nextLevelCosts as cost}
				{@const isGold = cost.resource === 'GOLD'}
				<div class="flex items-center gap-1">
					<ResourceIcon type={cost.resource} className="w-8 h-8 {isGold ? '-mt-2' : ''}" />
					<p class="text-sm" class:text-red-500={cost.amount > getResourceFromEnum(cost.resource, $playerResources)}>
						{isGold ? formatGold(cost.amount) : formatResources(BigInt(cost.amount))}
					</p>
				</div>
			{/each}
		</div>
		<p class="text-red-500">{errorMessage}</p>
		<Button
			{disabled}
			on:click={() => buyUpgrade()}
			className="w-full mt-8 disabled:bg-gray-400 disabled:text-white disabled:font-medium"
		>
			Améliorer
		</Button>
	{/if}
</main>
