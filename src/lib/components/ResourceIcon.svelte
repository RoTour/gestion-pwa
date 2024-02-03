<script lang="ts">
	import type { ResourceType } from '../../models/ResourceType';

	export let type: ResourceType = 'gold';
	export let className = '';
</script>

<img src={`/resources/${type}.png`} class="h-12 w-12 {className}" alt={type} />
