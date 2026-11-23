<script lang="ts">
	import { resolve } from '$app/paths';
	import { theme } from '$lib/theme.svelte';
	import { Sun, Moon, EnvelopeSimple, Check } from 'phosphor-svelte';

	let {
		onCopyEmail,
		copiedEmail = false
	}: {
		onCopyEmail: () => void;
		copiedEmail?: boolean;
	} = $props();
</script>

<header
	class="sticky top-0 z-40 border-b border-[var(--line)] bg-[var(--nav-bg)] backdrop-blur-md transition-colors"
>
	<div
		class="relative mx-auto flex h-16 max-w-[1320px] items-center justify-between px-4 sm:h-18 sm:px-6 lg:px-8"
	>
		<!-- Brand: Kiami Châu with custom character ear silhouette mark -->
		<div class="flex items-center">
			<a
				href={resolve('/#home')}
				class="group flex items-center gap-2.5 text-[var(--ink)] transition-transform active:scale-[0.98]"
			>
				<div
					class="flex h-8 w-8 items-center justify-center rounded-xl border border-[var(--line)] bg-[var(--surface-hover)] text-[var(--accent)] transition-colors group-hover:border-[var(--accent)] group-hover:bg-[var(--accent-soft)]"
				>
					<svg
						class="h-4 w-4"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2.2"
						stroke-linecap="round"
						stroke-linejoin="round"
						aria-hidden="true"
					>
						<path d="M4 18L7 5l6 7 6-7 3 13" />
						<path d="M9 18c1.5-.7 4.5-.7 6 0" stroke-width="1.8" />
					</svg>
				</div>
				<span
					class="text-base font-extrabold tracking-tight text-[var(--ink)] transition-colors group-hover:text-[var(--accent)] sm:text-lg"
				>
					Kiami Châu
				</span>
			</a>
		</div>

		<!-- Desktop Nav -->
		<nav
			aria-label="Điều hướng chính"
			class="absolute left-1/2 hidden -translate-x-1/2 items-center gap-7 text-xs font-semibold text-[var(--ink-muted)] lg:flex"
		>
			<a href={resolve('/#home')} class="py-1 transition-colors hover:text-[var(--ink)]">
				Trang chủ
			</a>
			<a href={resolve('/#about')} class="py-1 transition-colors hover:text-[var(--ink)]">
				Giới thiệu
			</a>
			<a href={resolve('/#sanctuary')} class="py-1 transition-colors hover:text-[var(--ink)]">
				Thánh đường
			</a>
			<a href={resolve('/#channels')} class="py-1 transition-colors hover:text-[var(--ink)]">
				Mạng xã hội
			</a>
			<a href={resolve('/#donations')} class="py-1 transition-colors hover:text-[var(--ink)]">
				Donate
			</a>
		</nav>

		<!-- Actions: Theme Toggle & Email -->
		<div class="flex items-center gap-2 sm:gap-3">
			<button
				type="button"
				onclick={() => theme.toggle()}
				aria-pressed={theme.isDark}
				aria-label={theme.isDark ? 'Chuyển sang chế độ sáng' : 'Chuyển sang chế độ tối'}
				title={theme.isDark ? 'Chuyển sang chế độ sáng' : 'Chuyển sang chế độ tối'}
				class="flex h-10 w-10 cursor-pointer items-center justify-center rounded-2xl border-[1.5px] border-[var(--line)] bg-[var(--surface)] text-sm shadow-[2px_2px_0px_0px_rgba(var(--shadow-color),0.03)] transition-colors hover:bg-[var(--surface-hover)] active:scale-[0.95]"
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
				class="hidden h-10 w-[96px] cursor-pointer items-center justify-center gap-1.5 rounded-2xl border-[1.5px] border-[var(--line)] bg-[var(--surface)] text-xs font-semibold whitespace-nowrap text-[var(--ink)] shadow-[2px_2px_0px_0px_rgba(var(--shadow-color),0.03)] transition-colors hover:bg-[var(--surface-hover)] active:scale-[0.97] lg:inline-flex"
			>
				{#if copiedEmail}
					<Check size={15} weight="bold" class="shrink-0 text-emerald-500" />
					<span>Đã chép!</span>
				{:else}
					<EnvelopeSimple size={15} weight="bold" class="shrink-0 text-[var(--accent)]" />
					<span>Email</span>
				{/if}
			</button>
		</div>
	</div>
</header>
