<script lang="ts">
	import ResourceIcon from "$lib/components/ResourceIcon.svelte";
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

  // Replace with K, M, B, T, etc.
  const formatNumbers = (number: number) => {
    const golds = Math.floor(number/100);
    if (golds < 1e3) return golds;
    if (golds >= 1e3 && golds < 1e6) return +(golds / 1e3).toFixed(1) + "K";
    if (golds >= 1e6 && golds < 1e9) return +(golds / 1e6).toFixed(1) + "M";
    if (golds >= 1e9 && golds < 1e12) return +(golds / 1e9).toFixed(1) + "B";
  };

  $: ranking = data.ranking.filter(player => player.wealth > 0);

</script>

<div class="flex flex-col gap-4 p-4">
  {#each ranking as player, i}
    <div class="flex items-center {places[i+1] ?? otherPlaceStyle}">
      <p class="w-12">#{i + 1}</p>
      <p>{player.username}</p>
      <p class="ml-auto">{formatNumbers(player.wealth)}</p>
      <ResourceIcon type="gold" className="w-6 h-6 ml-2 -mt-1" />
    </div>
  {/each}
</div>