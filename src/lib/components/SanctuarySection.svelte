<script lang="ts">
	import { onMount, tick } from 'svelte';
	import { profileData } from '$lib/data';
	import {
		DiscordLogo,
		CalendarBlank,
		LightbulbFilament,
		MagnifyingGlassPlus,
		ArrowUpRight,
		X,
		Hash,
		PlayCircle
	} from 'phosphor-svelte';

	const discordLink =
		profileData.socials.find((s) => s.category === 'community')?.url || 'https://discord.com';
	const demoVideoUrl = profileData.discordDemoVideoUrl;

	let isGuideModalOpen = $state(false);
	let isPreviewVisible = $state(false);
	let inlineVideoEl = $state<HTMLVideoElement | null>(null);
	let closeButtonEl = $state<HTMLButtonElement | null>(null);
	let previousFocusEl: HTMLElement | null = null;

	function openModal() {
		previousFocusEl = document.activeElement instanceof HTMLElement ? document.activeElement : null;
		isGuideModalOpen = true;
	}

	function closeModal() {
		isGuideModalOpen = false;
		previousFocusEl?.focus();
		previousFocusEl = null;
	}

	onMount(() => {
		const el = inlineVideoEl;
		if (!el) return;

		const observer = new IntersectionObserver(
			(entries) => {
				isPreviewVisible = entries.some((entry) => entry.isIntersecting);
			},
			{ rootMargin: '120px 0px', threshold: 0.1 }
		);

		observer.observe(el);
		return () => observer.disconnect();
	});

	$effect(() => {
		const el = inlineVideoEl;
		if (!el) return;

		const prefersReduced =
			typeof window !== 'undefined' &&
			window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		if (isPreviewVisible && !isGuideModalOpen && !prefersReduced) {
			void el.play().catch(() => {
				// Autoplay may be blocked by browser battery/data saver policies
			});
		} else {
			el.pause();
		}
	});

	$effect(() => {
		if (isGuideModalOpen) {
			const originalOverflow = document.body.style.overflow;
			document.body.style.overflow = 'hidden';
			void tick().then(() => closeButtonEl?.focus());
			return () => {
				document.body.style.overflow = originalOverflow;
			};
		}
	});
</script>

<svelte:window
	onkeydown={(e) => {
		if (isGuideModalOpen && e.key === 'Escape') {
			e.preventDefault();
			closeModal();
		}
	}}
/>

<section id="sanctuary" class="space-y-6">
	<div
		class="relative space-y-5 overflow-hidden rounded-3xl border-[1.5px] border-[var(--line)] bg-[var(--surface)] p-6 shadow-[4px_4px_0px_0px_rgba(var(--shadow-color),0.03)] sm:p-8"
	>
		<div
			class="flex flex-col justify-between gap-4 border-b border-[var(--line)] pb-4 sm:flex-row sm:items-center"
		>
			<div class="space-y-1">
				<span class="text-xs font-semibold tracking-wider text-[var(--accent)] uppercase">
					Official Community Server
				</span>
				<h2 class="text-2xl font-bold text-[var(--ink)]">Thánh đường Kiamị Châu</h2>
			</div>
			<a
				href={discordLink}
				target="_blank"
				rel="external noopener noreferrer"
				class="inline-flex items-center gap-2 self-start rounded-full bg-[#5865F2] px-5 py-2.5 text-xs font-bold text-white shadow-md transition-all hover:bg-[#4752c4] active:scale-[0.98] sm:self-center"
			>
				<DiscordLogo size={16} weight="bold" />
				<span>Tham gia Discord</span>
			</a>
		</div>

		<div class="grid grid-cols-1 items-stretch gap-4 text-xs sm:grid-cols-2">
			<!-- Schedule Card -->
			<div class="chiraitori-card flex flex-col justify-between space-y-3 rounded-2xl p-4">
				<div class="space-y-2">
					<p class="flex items-center gap-2 font-bold text-[var(--ink)]">
						<CalendarBlank size={16} weight="bold" class="text-[var(--accent)]" />
						<span>Lịch Stream Của Kiami</span>
					</p>
					<p class="leading-relaxed text-[var(--ink-muted)]">
						{profileData.scheduleNote}
					</p>
				</div>

				<!-- Channel list preview from Discord -->
				<div
					class="space-y-1.5 overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--page)] p-2.5"
				>
					<div
						class="flex items-center gap-1.5 font-mono text-[10px] font-bold tracking-wider text-[var(--ink-muted)] uppercase"
					>
						<Hash size={12} weight="bold" class="text-[var(--accent)]" />
						<span>Kênh thông báo trong máy chủ</span>
					</div>
					<picture class="block w-full">
						<source srcset={profileData.bannerWebpUrl} type="image/webp" />
						<img
							src={profileData.bannerUrl}
							alt="Kênh lịch stream Discord"
							width="355"
							height="246"
							loading="lazy"
							decoding="async"
							class="block h-auto w-full rounded-lg object-contain"
						/>
					</picture>
				</div>
			</div>

			<!-- Guide & Looping Video Demo Card -->
			<div class="chiraitori-card flex flex-col justify-between space-y-3 rounded-2xl p-4">
				<div class="space-y-2">
					<p class="flex items-center gap-2 font-bold text-[var(--ink)]">
						<LightbulbFilament size={16} weight="bold" class="text-[var(--accent)]" />
						<span>Mẹo Vào Khi Link Lỗi</span>
					</p>
					<p class="leading-relaxed text-[var(--ink-muted)]">
						{profileData.discordTip}
					</p>
				</div>

				<!-- Looping Video Display -->
				<div class="space-y-1.5">
					<button
						type="button"
						onclick={openModal}
						aria-label="Phóng to video hướng dẫn tìm Thánh Đường trên Discord"
						class="group/video relative block aspect-[16/9] w-full cursor-pointer overflow-hidden rounded-xl border border-[var(--line)] bg-[#0f0d11] text-left shadow-sm transition-all hover:border-[var(--accent)]"
					>
						<video
							bind:this={inlineVideoEl}
							src={isPreviewVisible ? demoVideoUrl : undefined}
							loop
							muted
							playsinline
							preload="metadata"
							aria-hidden="true"
							class="h-full w-full object-cover"
						></video>
						<div
							class="absolute inset-0 flex items-center justify-center gap-1.5 bg-black/30 text-xs font-bold text-white opacity-0 backdrop-blur-[2px] transition-opacity group-hover/video:opacity-100"
						>
							<MagnifyingGlassPlus size={16} weight="bold" />
							<span>Bấm để phóng to</span>
						</div>
					</button>

					<div class="flex items-center justify-between px-1 text-[11px] text-[var(--ink-muted)]">
						<span class="flex items-center gap-1">
							<PlayCircle size={13} weight="fill" class="text-[var(--accent)]" />
							<span>Video tự động lặp lại</span>
						</span>
						<button
							type="button"
							onclick={openModal}
							class="flex cursor-pointer items-center gap-1 font-semibold text-[var(--accent)] hover:underline"
						>
							<span>Xem cỡ lớn</span>
							<ArrowUpRight size={12} weight="bold" />
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Lightbox Modal for Looping Video -->
	{#if isGuideModalOpen}
		<div
			role="dialog"
			aria-modal="true"
			aria-labelledby="sanctuary-modal-title"
			tabindex="-1"
			class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-3 backdrop-blur-md sm:p-6"
			onclick={(e) => {
				if (e.target === e.currentTarget) closeModal();
			}}
			onkeydown={(e) => {
				if (e.key === 'Escape') closeModal();
			}}
		>
			<div
				class="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--surface)] shadow-2xl"
			>
				<!-- Modal Header -->
				<div
					class="flex items-center justify-between border-b border-[var(--line)] bg-[var(--page)] px-4 py-3 sm:px-5 sm:py-3.5"
				>
					<div class="flex items-center gap-2.5">
						<div
							class="flex h-8 w-8 items-center justify-center rounded-xl bg-[#5865F2] text-white shadow-sm"
						>
							<DiscordLogo size={18} weight="bold" />
						</div>
						<div>
							<h4 id="sanctuary-modal-title" class="text-sm font-bold text-[var(--ink)]">
								Hướng dẫn tìm Thánh Đường trên Discord
							</h4>
							<p class="text-[11px] text-[var(--ink-muted)]">
								Video demo chi tiết thao tác khi link mời gặp sự cố
							</p>
						</div>
					</div>

					<button
						bind:this={closeButtonEl}
						type="button"
						onclick={closeModal}
						class="cursor-pointer rounded-xl p-1.5 text-[var(--ink-muted)] transition-colors hover:bg-[var(--surface-hover)] hover:text-[var(--ink)]"
						aria-label="Đóng"
					>
						<X size={20} weight="bold" />
					</button>
				</div>

				<!-- Modal Content Video View -->
				<div class="bg-[#0f0d11] p-2 sm:p-3">
					<div
						class="relative flex aspect-[16/9] w-full items-center justify-center overflow-hidden rounded-xl bg-black"
					>
						<!-- svelte-ignore a11y_media_has_caption -->
						<video
							src={demoVideoUrl}
							controls
							autoplay
							loop
							playsinline
							class="h-full w-full object-contain"
						></video>
					</div>
				</div>

				<!-- Modal Footer with Steps & CTA -->
				<div
					class="flex flex-col items-stretch justify-between gap-3 bg-[var(--surface)] p-3 text-xs sm:flex-row sm:items-center sm:p-4"
				>
					<div class="space-y-0.5 text-[11px] text-[var(--ink-muted)] sm:text-xs">
						<p>
							<span class="font-bold text-[var(--accent)]">Bước 1:</span> Bấm biểu tượng
							<b>La Bàn "Khám phá" (Discover)</b> ở menu bên trái
						</p>
						<p>
							<span class="font-bold text-[var(--accent)]">Bước 2:</span> Gõ tìm kiếm
							<b>"Thánh đường Kiamị Châu"</b>
						</p>
						<p>
							<span class="font-bold text-[var(--accent)]">Bước 3:</span> Chọn máy chủ và bấm
							<b>"Tham gia máy chủ"</b>
						</p>
					</div>
					<a
						href={discordLink}
						target="_blank"
						rel="external noopener noreferrer"
						class="inline-flex shrink-0 items-center justify-center gap-2 self-center rounded-full bg-[#5865F2] px-5 py-2.5 text-center text-xs font-bold text-white shadow transition-all hover:bg-[#4752c4] active:scale-95 sm:self-auto"
					>
						<DiscordLogo size={16} weight="bold" />
						<span>Mở Discord tham gia ngay</span>
					</a>
				</div>
			</div>
		</div>
	{/if}
</section>
