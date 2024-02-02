<script lang="ts">
	import type { ResourceType } from '../../models/ResourceType';

	export let type: ResourceType = 'gold';
</script>

<img src={`/resources/${type}.png`} class="h-12 w-12" alt={type} />
