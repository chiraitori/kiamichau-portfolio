<script lang="ts">
	import { page } from '$app/state';
	import { theme } from '$lib/theme.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import {
		House,
		Sun,
		Moon,
		DiscordLogo,
		YoutubeLogo,
		Compass
	} from 'phosphor-svelte';
	import { profileData } from '$lib/data';

	const is404 = $derived(page.status === 404);
	const errorTitle = $derived(
		is404
			? '404 · Bạn dạng lạc lúi?'
			: `${page.status || 500} · Có sự cố xảy ra`
	);
	const errorHeading = $derived(
		is404
			? 'Bạn dạng lạc lúi? :)))'
			: 'Ôi hỏng! Đã có lỗi xảy ra rồi ~'
	);
	const errorDesc = $derived(
		is404
			? 'HAACHAMA CHAMA~ Có vẻ bạn đã đi lạc vào một chiều không gian không tồn tại rồi! Đừng hoảng sợ, để Kiami Châu dẫn đường về nhà nghen ~'
			: (page.error?.message || 'Hệ thống đang gặp sự cố tạm thời, vui lòng thử lại sau.')
	);
	const discordUrl =
		profileData.socials.find((s) => s.name === 'Discord')?.url ||
		'https://discord.com/servers/thanh-duong-kiami-chau-1078935785522331688';
	const youtubeUrl =
		profileData.socials.find((s) => s.name === 'YouTube')?.url ||
		'https://www.youtube.com/@KiamiChau?sub_confirmation=1';
</script>

<svelte:head>
	<title>{errorTitle} | Kiami Châu</title>
	<meta name="robots" content="noindex, follow" />
	<meta name="description" content={errorDesc} />
</svelte:head>

<div class="min-h-[100dvh] flex flex-col justify-between bg-[var(--page)] text-[var(--ink)]">
	<!-- Top Navigation Bar -->
	<header class="sticky top-0 z-40 backdrop-blur-md bg-[var(--nav-bg)] border-b border-[var(--line)] transition-colors">
		<div class="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between">
			<!-- Brand Logo -->
			<a
				href="/"
				class="flex items-center gap-2.5 group text-[var(--ink)] active:scale-[0.98] transition-transform"
			>
				<div
					class="w-8 h-8 rounded-xl bg-[var(--surface-hover)] border border-[var(--line)] flex items-center justify-center text-[var(--accent)] group-hover:border-[var(--accent)] group-hover:bg-[var(--accent-soft)] transition-colors"
				>
					<svg
						class="w-4 h-4"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2.2"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<path d="M4 18L7 5l6 7 6-7 3 13" />
						<path d="M9 18c1.5-.7 4.5-.7 6 0" stroke-width="1.8" />
					</svg>
				</div>
				<span class="font-extrabold tracking-tight text-base sm:text-lg text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors">
					Kiami Châu
				</span>
			</a>

			<!-- Right Actions: Home Button & Theme Toggle -->
			<div class="flex items-center gap-2 sm:gap-3">
				<a
					href="/"
					class="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-2xl border-[1.5px] border-[var(--line)] bg-[var(--surface)] hover:bg-[var(--surface-hover)] text-xs font-semibold text-[var(--ink)] transition-colors"
				>
					<House size={15} weight="bold" class="text-[var(--accent)]" />
					<span class="hidden sm:inline">Trang chủ</span>
				</a>

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
						<Moon size={18} weight="bold" class="text-[var(--ink)]" />
					{/if}
				</button>
			</div>
		</div>
	</header>

	<!-- Main 404 Hero Container -->
	<main class="flex-1 flex items-center justify-center p-4 sm:p-8">
		<div class="max-w-xl w-full text-center space-y-6 my-auto">
			<!-- Cute Animated Avatar Badge -->
			<div class="relative inline-block mx-auto">
				<div
					class="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-[var(--surface)] border-2 border-[var(--line)] p-2 shadow-sm flex items-center justify-center overflow-hidden"
				>
					<picture class="w-full h-full flex items-center justify-center">
						<source srcset="/error/haachama-bruh.webp" type="image/webp" />
						<img
							src="/error/haachama-bruh.gif"
							alt="Haachama confused"
							width="160"
							height="160"
							loading="eager"
							fetchpriority="high"
							decoding="async"
							class="w-full h-full object-contain select-none"
						/>
					</picture>
				</div>
				<div
					class="absolute -bottom-2 -right-2 px-3 py-1 rounded-full font-mono text-xs font-extrabold bg-[var(--accent)] text-[var(--on-accent)] shadow-md border-2 border-[var(--surface)]"
				>
					{page.status || 404}
				</div>
			</div>

			<!-- Status & Title -->
			<div class="space-y-3">
				<div
					class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[var(--accent-soft)] text-[var(--accent)] border border-[var(--line)]"
				>
					<Compass size={14} weight="bold" />
					<span>{is404 ? 'HAACHAMA CHAMA~' : 'Không tìm thấy toạ độ'}</span>
				</div>

				<h1 class="text-2xl sm:text-4xl font-extrabold tracking-tight text-[var(--ink)] text-balance">
					{errorHeading}
				</h1>

				<p class="text-sm sm:text-base text-[var(--ink-muted)] max-w-md mx-auto leading-relaxed">
					{errorDesc}
				</p>
			</div>

			<!-- Action Buttons -->
			<div class="flex flex-wrap items-center justify-center gap-3 pt-2">
				<a
					href="/"
					class="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--accent)] hover:opacity-95 active:scale-95 text-[var(--on-accent)] font-bold text-sm shadow-md transition-all cursor-pointer"
				>
					<House size={18} weight="bold" />
					<span>Về trang chủ</span>
				</a>

				<a
					href={discordUrl}
					target="_blank"
					rel="noreferrer"
					class="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[var(--surface)] hover:bg-[var(--surface-hover)] border-[1.5px] border-[var(--line)] active:scale-95 text-[var(--ink)] font-semibold text-sm transition-all shadow-xs"
				>
					<DiscordLogo size={18} weight="bold" class="text-[#5865F2]" />
					<span>Vào Thánh đường</span>
				</a>

				<a
					href={youtubeUrl}
					target="_blank"
					rel="noreferrer"
					class="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[var(--surface)] hover:bg-[var(--surface-hover)] border-[1.5px] border-[var(--line)] active:scale-95 text-[var(--ink)] font-semibold text-sm transition-all shadow-xs"
				>
					<YoutubeLogo size={18} weight="fill" class="text-[#FF0000]" />
					<span>Kênh YouTube</span>
				</a>
			</div>

			<!-- Quick Links Card -->
			<div class="chiraitori-card rounded-2xl p-4 sm:p-5 text-left text-xs space-y-3 mt-6">
				<div class="flex items-center justify-between border-b border-[var(--line)] pb-2 text-[var(--ink-muted)]">
					<span class="font-mono uppercase font-bold text-[10px] tracking-wider">Đường tắt nhanh</span>
					<span class="font-mono text-[10px]">portal / shortcuts</span>
				</div>
				<div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
					<a
						href="/#about"
						class="p-2 rounded-xl bg-[var(--page)] hover:bg-[var(--surface-hover)] border border-[var(--line)] text-[var(--ink)] hover:text-[var(--accent)] font-medium transition-colors text-center"
					>
						✨ Giới thiệu
					</a>
					<a
						href="/#sanctuary"
						class="p-2 rounded-xl bg-[var(--page)] hover:bg-[var(--surface-hover)] border border-[var(--line)] text-[var(--ink)] hover:text-[var(--accent)] font-medium transition-colors text-center"
					>
						🏰 Thánh đường
					</a>
					<a
						href="/#donations"
						class="p-2 rounded-xl bg-[var(--page)] hover:bg-[var(--surface-hover)] border border-[var(--line)] text-[var(--ink)] hover:text-[var(--accent)] font-medium transition-colors text-center"
					>
						☕ Cổng Donate
					</a>
				</div>
			</div>
		</div>
	</main>

	<!-- Footer -->
	<Footer />
</div>
