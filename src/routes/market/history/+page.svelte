<script lang="ts">
	import type { PageServerData } from "./$types";
	import TransactionItem from "./TransactionItem.svelte";

  export let data: PageServerData;

  $: history = data.history!;
</script>

<div class="divide-y-2">
  {#each history as transaction}
    <TransactionItem {...transaction}/>
  {/each}
</div>