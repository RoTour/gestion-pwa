<script lang="ts">
	export let type: 'submit' | 'button' = 'submit';
	export let className = '';
</script>

<button {type} on:click class="bg-emerald-300 py-2 px-4 mt-4 font-extrabold {className}"
	><slot /></button
>
