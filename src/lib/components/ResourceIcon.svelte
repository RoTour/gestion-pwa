<script lang="ts">
  type ResourceType = "wood" | "marble" | "sulfur" | "crystal" | "wine"
  export let type: ResourceType = "wood"
</script>

<img src={`/resources/${type}.png`} class="h-8 w-8" alt={type}/>