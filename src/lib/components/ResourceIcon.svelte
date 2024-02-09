<script lang="ts">
	import type { IconType } from '../../models/IconType';

	export let type: IconType = 'gold';
	export let className = '';
</script>

<img src={`/resources/${type.toLowerCase()}.png`} class="h-12 w-12 {className}" alt={type} />
