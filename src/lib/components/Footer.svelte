<script lang="ts">
	import { Heart } from 'phosphor-svelte';
</script>

<footer
	class="space-y-2 border-t border-[var(--line)] py-12 pb-24 text-center text-xs text-[var(--ink-muted)] lg:pb-12"
>
	<p class="font-bold text-[var(--ink)]">Kiami Châu Portal</p>
	<p class="flex items-center justify-center gap-1.5">
		<span>Built with</span>
		<Heart size={14} weight="fill" class="inline-block align-middle text-rose-500" />
		<span>by</span>
		<a
			href="https://www.chiraitori.dev"
			target="_blank"
			rel="external noopener noreferrer"
			class="font-bold text-[var(--accent)] hover:underline"
		>
			chiraitori
		</a>
	</p>
</footer>
