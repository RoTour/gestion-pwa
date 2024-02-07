<script lang="ts">
	import ResourceIcon from "$lib/components/ResourceIcon.svelte";
	import { formatGold } from "$lib/helpers/resources.helper";
	import type { PageServerData } from "./$types";

  export let data: PageServerData;
  const firstPlaceStyle = "text-3xl text-yellow-400";
  const secondPlaceStyle = "text-2xl text-gray-400";
  const thirdPlaceStyle = "text-xl text-yellow-600";
  const otherPlaceStyle = "text-lg text-gray-600";
  const places = {
    1: firstPlaceStyle,
    2: secondPlaceStyle,
    3: thirdPlaceStyle,
  }

  const getPlaces = (place: number) => {
    return places[place as 1 | 2 | 3] ?? otherPlaceStyle;
  }

  $: ranking = data.ranking.filter(player => player.wealth > 0);

</script>

<div class="flex flex-col p-4 divide-y-2">
  {#each ranking as player, i}
    <div class="flex items-center p-2 {getPlaces(i+1)}">
      <p class="w-12">#{i + 1}</p>
      <p>{player.username}</p>
      <p class="ml-auto">{formatGold(player.wealth)}</p>
      <ResourceIcon type="gold" className="w-6 h-6 ml-2 -mt-1" />
    </div>
  {/each}
</div>