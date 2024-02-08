<script lang="ts">
	import type { PageServerData } from './$types';
	import TransactionItem from './TransactionItem.svelte';

	export let data: PageServerData;

	$: records = data.records;
</script>

<!-- left arrow in characters -->
<a class="flex items-center gap-1 text-emerald-600 p-2 font-bold underline" href="/market">
	<svg
		class="h-4 w-4 stroke-emerald-600 fill-emerald-600"
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 320 512"
		><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path
			d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"
		/></svg
	>
	Retourner sur le marché
</a>
<div class="divide-y-2">
	{#each records as transaction}
		<TransactionItem {...transaction} />
	{/each}
</div>
