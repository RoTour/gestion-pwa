<script lang="ts">
	import { playerResources } from "$lib/stores/playerInfos.store";
	import ResourceIcon from "./ResourceIcon.svelte";


  $: goldAmount = Math.floor(Number(($playerResources?.gold || 0n) / 100n));
</script>

<section class="flex justify-center items-center bg-emerald-100 pb-2 pt-1">
	<ResourceIcon type={'gold'} />
	<p class="font-bold text-xl mt-2">{goldAmount}</p>
</section>