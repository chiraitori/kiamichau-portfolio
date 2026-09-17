<script lang="ts">
	import { Heart } from 'phosphor-svelte';
</script>

<footer class="border-t border-[var(--line)] py-12 text-center text-xs text-[var(--ink-muted)] space-y-2">
	<p class="font-bold text-[var(--ink)]">Kiami Châu Portal</p>
	<p class="flex items-center justify-center gap-1.5">
		<span>Built with</span>
		<Heart size={14} weight="fill" class="text-rose-500 inline-block align-middle" />
		<span>by</span>
		<a href="https://www.chiraitori.dev" target="_blank" rel="noreferrer" class="font-bold text-[var(--accent)] hover:underline">chiraitori</a>
	</p>
</footer>
