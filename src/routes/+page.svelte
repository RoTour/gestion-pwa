<script lang="ts">
	import { goto } from "$app/navigation";
	import ResourceIcon from "$lib/components/ResourceIcon.svelte";
	import type { Player, Resources } from "@prisma/client";
	import type { LayoutData, PageData } from "./$types";

  export let data: PageData & LayoutData

  $: player = data.player as Player;
  $: resources = data.player.Resources as Resources;
  $: console.debug('player', player);
  $: if (!player) {
    goto('/auth/login')
  }
</script>

<p class="">Joueur connecté : 
  <span class="font-bold text-emerald-300">{player.name}</span>
</p>

<h2>Ressources: </h2>
<ul class="px-4">
  <li class="flex items-center gap-2"><ResourceIcon type={"wood"}/> {player.Resources.wood}</li>
  <li class="flex items-center gap-2"><ResourceIcon type={"marble"}/> {player.Resources.marble}</li>
  <li class="flex items-center gap-2"><ResourceIcon type={"sulfur"}/> {player.Resources.sulfur}</li>
  <li class="flex items-center gap-2"><ResourceIcon type={"wine"}/> {player.Resources.wine}</li>
  <li class="flex items-center gap-2"><ResourceIcon type={"crystal"}/> {player.Resources.crystal}</li>
</ul>