<script lang="ts">
	import { theme } from '$lib/theme.svelte';
	import { Sparkle, Sun, Moon, EnvelopeSimple, Check } from 'phosphor-svelte';

	let {
		onCopyEmail,
		copiedEmail = false
	}: {
		onCopyEmail: () => void;
		copiedEmail?: boolean;
	} = $props();
</script>

<header class="sticky top-0 z-40 backdrop-blur-md bg-[var(--nav-bg)] border-b border-[var(--line)] transition-colors">
	<div class="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between relative">
		<!-- Brand: Kiami Châu with custom character ear silhouette mark -->
		<div class="flex items-center">
			<a href="/#home" class="flex items-center gap-2.5 group text-[var(--ink)] active:scale-[0.98] transition-transform">
				<div class="w-8 h-8 rounded-xl bg-[var(--surface-hover)] border border-[var(--line)] flex items-center justify-center text-[var(--accent)] group-hover:border-[var(--accent)] group-hover:bg-[var(--accent-soft)] transition-colors">
					<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
						<path d="M4 18L7 5l6 7 6-7 3 13" />
						<path d="M9 18c1.5-.7 4.5-.7 6 0" stroke-width="1.8" />
					</svg>
				</div>
				<span class="font-extrabold tracking-tight text-base sm:text-lg text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors">
					Kiami Châu
				</span>
			</a>
		</div>

		<!-- Desktop Nav: Flatter, editorial style, no floating pill box -->
		<nav class="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center gap-7 text-xs font-semibold text-[var(--ink-muted)]">
			<a href="/#home" class="hover:text-[var(--ink)] transition-colors py-1">
				Trang chủ
			</a>
			<a href="/#about" class="hover:text-[var(--ink)] transition-colors py-1">
				Giới thiệu
			</a>
			<a href="/#sanctuary" class="hover:text-[var(--ink)] transition-colors py-1">
				Thánh đường
			</a>
			<a href="/#channels" class="hover:text-[var(--ink)] transition-colors py-1">
				Mạng xã hội
			</a>
			<a href="/#donations" class="hover:text-[var(--ink)] transition-colors py-1">
				Donate
			</a>
		</nav>

		<!-- Actions: Theme Toggle & Email -->
		<div class="flex items-center gap-2 sm:gap-3">
			<button
				type="button"
				onclick={() => theme.toggle()}
				aria-label="Toggle theme"
				class="w-10 h-10 rounded-2xl border-[1.5px] border-[var(--line)] bg-[var(--surface)] hover:bg-[var(--surface-hover)] active:scale-[0.95] flex items-center justify-center text-sm transition-colors shadow-[2px_2px_0px_0px_rgba(var(--shadow-color),0.03)] cursor-pointer"
				title={theme.isDark ? 'Chuyển sang chế độ sáng' : 'Chuyển sang chế độ tối'}
			>
				{#if theme.isDark}
					<Sun size={18} weight="bold" class="text-amber-300" />
				{:else}
					<Moon size={18} weight="bold" class="text-[var(--accent)]" />
				{/if}
			</button>

			<button
				type="button"
				onclick={onCopyEmail}
				class="hidden lg:inline-flex items-center justify-center gap-1.5 w-[96px] h-10 rounded-2xl border-[1.5px] border-[var(--line)] bg-[var(--surface)] hover:bg-[var(--surface-hover)] active:scale-[0.97] text-xs font-semibold text-[var(--ink)] shadow-[2px_2px_0px_0px_rgba(var(--shadow-color),0.03)] transition-colors cursor-pointer whitespace-nowrap"
			>
				{#if copiedEmail}
					<Check size={15} weight="bold" class="text-emerald-500 shrink-0" />
					<span>Đã chép!</span>
				{:else}
					<EnvelopeSimple size={15} weight="bold" class="text-[var(--accent)] shrink-0" />
					<span>Email</span>
				{/if}
			</button>
		</div>
	</div>
</header>
