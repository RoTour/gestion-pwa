<script lang="ts">
	export let type: 'submit' | 'button' = 'submit';
	export let className = '';
	export let disabled = false;
</script>

<button {type} {disabled} on:click class="bg-emerald-300 py-2 px-4 font-extrabold {className}">
	<slot />
</button>
