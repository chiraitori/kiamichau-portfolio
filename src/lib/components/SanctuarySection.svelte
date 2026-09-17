<script lang="ts">
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

	const discordLink = profileData.socials.find((s) => s.category === 'community')?.url || 'https://discord.com';
	const demoVideoUrl = profileData.discordDemoVideoUrl || 'https://pub-dacee17aa371477bb160dbcf7313433e.r2.dev/demo/video/discord-demo-1080.mp4';
	let isGuideModalOpen = $state(false);

	$effect(() => {
		if (isGuideModalOpen) {
			const originalOverflow = document.body.style.overflow;
			document.body.style.overflow = 'hidden';
			return () => {
				document.body.style.overflow = originalOverflow;
			};
		}
	});
</script>

<section id="sanctuary" class="space-y-6">
	<div class="rounded-3xl border-[1.5px] border-[var(--line)] bg-[var(--surface)] p-6 sm:p-8 shadow-[4px_4px_0px_0px_rgba(var(--shadow-color),0.03)] space-y-5 relative overflow-hidden">
		<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--line)] pb-4">
			<div class="space-y-1">
				<span class="text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
					Official Community Server
				</span>
				<h2 class="text-2xl font-bold text-[var(--ink)]">Thánh đường Kiamị Châu</h2>
			</div>
			<a
				href={discordLink}
				target="_blank"
				rel="noreferrer"
				class="px-5 py-2.5 rounded-full bg-[#5865F2] hover:bg-[#4752c4] active:scale-[0.98] text-white font-bold text-xs shadow-md transition-all self-start sm:self-center inline-flex items-center gap-2"
			>
				<DiscordLogo size={16} weight="bold" />
				<span>Tham gia Discord</span>
			</a>
		</div>

		<div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs items-stretch">
			<!-- Schedule Card -->
			<div class="chiraitori-card p-4 rounded-2xl flex flex-col justify-between space-y-3">
				<div class="space-y-2">
					<p class="font-bold text-[var(--ink)] flex items-center gap-2">
						<CalendarBlank size={16} weight="bold" class="text-[var(--accent)]" />
						<span>Lịch Stream Của Kiami</span>
					</p>
					<p class="text-[var(--ink-muted)] leading-relaxed">
						{profileData.scheduleNote}
					</p>
				</div>

				<!-- Channel list preview from Discord -->
				<div class="rounded-xl overflow-hidden border border-[var(--line)] bg-[var(--page)] p-2.5 space-y-1.5">
					<div class="flex items-center gap-1.5 text-[10px] font-mono font-bold text-[var(--ink-muted)] uppercase tracking-wider">
						<Hash size={12} weight="bold" class="text-[var(--accent)]" />
						<span>Kênh thông báo trong máy chủ</span>
					</div>
					<img
						src="/banner.jpg"
						alt="Kênh lịch stream Discord"
						class="w-full h-auto rounded-lg object-contain block"
					/>
				</div>
			</div>

			<!-- Guide & Looping Video Demo Card -->
			<div class="chiraitori-card p-4 rounded-2xl flex flex-col justify-between space-y-3">
				<div class="space-y-2">
					<p class="font-bold text-[var(--ink)] flex items-center gap-2">
						<LightbulbFilament size={16} weight="bold" class="text-[var(--accent)]" />
						<span>Mẹo Vào Khi Link Lỗi</span>
					</p>
					<p class="text-[var(--ink-muted)] leading-relaxed">
						{profileData.discordTip}
					</p>
				</div>

				<!-- Looping Video Display -->
				<div class="space-y-1.5">
					<button
						type="button"
						onclick={() => (isGuideModalOpen = true)}
						class="group/video relative w-full aspect-[16/9] rounded-xl overflow-hidden border border-[var(--line)] bg-[#0f0d11] shadow-sm text-left cursor-pointer hover:border-[var(--accent)] transition-all block"
					>
						<!-- svelte-ignore a11y_media_has_caption -->
						<video
							src={demoVideoUrl}
							autoplay
							loop
							muted
							playsinline
							preload="auto"
							class="w-full h-full object-cover"
						></video>
						<div class="absolute inset-0 bg-black/30 opacity-0 group-hover/video:opacity-100 transition-opacity flex items-center justify-center gap-1.5 text-white font-bold text-xs backdrop-blur-[2px]">
							<MagnifyingGlassPlus size={16} weight="bold" />
							<span>Bấm để phóng to</span>
						</div>
					</button>

					<div class="flex items-center justify-between text-[11px] text-[var(--ink-muted)] px-1">
						<span class="flex items-center gap-1">
							<PlayCircle size={13} weight="fill" class="text-[var(--accent)]" />
							<span>Video tự động lặp lại</span>
						</span>
						<button
							type="button"
							onclick={() => (isGuideModalOpen = true)}
							class="font-semibold text-[var(--accent)] hover:underline flex items-center gap-1 cursor-pointer"
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
			tabindex="-1"
			class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md"
			onclick={(e) => {
				if (e.target === e.currentTarget) isGuideModalOpen = false;
			}}
			onkeydown={(e) => {
				if (e.key === 'Escape') isGuideModalOpen = false;
			}}
		>
			<div class="relative max-w-4xl w-full bg-[var(--surface)] rounded-2xl border border-[var(--line)] shadow-2xl overflow-hidden">
				<!-- Modal Header -->
				<div class="flex items-center justify-between px-4 py-3 sm:px-5 sm:py-3.5 border-b border-[var(--line)] bg-[var(--page)]">
					<div class="flex items-center gap-2.5">
						<div class="w-8 h-8 rounded-xl bg-[#5865F2] text-white flex items-center justify-center shadow-sm">
							<DiscordLogo size={18} weight="bold" />
						</div>
						<div>
							<h4 class="font-bold text-sm text-[var(--ink)]">Hướng dẫn tìm Thánh Đường trên Discord</h4>
							<p class="text-[11px] text-[var(--ink-muted)]">Video demo chi tiết thao tác khi link mời gặp sự cố</p>
						</div>
					</div>

					<button
						type="button"
						onclick={() => (isGuideModalOpen = false)}
						class="p-1.5 rounded-xl hover:bg-[var(--surface-hover)] text-[var(--ink-muted)] hover:text-[var(--ink)] transition-colors cursor-pointer"
						aria-label="Đóng"
					>
						<X size={20} weight="bold" />
					</button>
				</div>

				<!-- Modal Content Video View -->
				<div class="p-2 sm:p-3 bg-[#0f0d11]">
					<div class="relative w-full aspect-[16/9] rounded-xl overflow-hidden bg-black flex items-center justify-center">
						<!-- svelte-ignore a11y_media_has_caption -->
						<video
							src={demoVideoUrl}
							controls
							autoplay
							loop
							playsinline
							class="w-full h-full object-contain"
						></video>
					</div>
				</div>

				<!-- Modal Footer with Steps & CTA -->
				<div class="p-3 sm:p-4 bg-[var(--surface)] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-xs">
					<div class="text-[var(--ink-muted)] text-[11px] sm:text-xs space-y-0.5">
						<p><span class="font-bold text-[var(--accent)]">Bước 1:</span> Bấm biểu tượng <b>La Bàn "Khám phá" (Discover)</b> ở menu bên trái</p>
						<p><span class="font-bold text-[var(--accent)]">Bước 2:</span> Gõ tìm kiếm <b>"Thánh đường Kiamị Châu"</b></p>
						<p><span class="font-bold text-[var(--accent)]">Bước 3:</span> Chọn máy chủ và bấm <b>"Tham gia máy chủ"</b></p>
					</div>
					<a
						href={discordLink}
						target="_blank"
						rel="noreferrer"
						class="px-5 py-2.5 rounded-full bg-[#5865F2] hover:bg-[#4752c4] active:scale-95 text-white font-bold text-xs text-center inline-flex items-center justify-center gap-2 shadow transition-all shrink-0 self-center sm:self-auto"
					>
						<DiscordLogo size={16} weight="bold" />
						<span>Mở Discord tham gia ngay</span>
					</a>
				</div>
			</div>
		</div>
	{/if}
</section>
