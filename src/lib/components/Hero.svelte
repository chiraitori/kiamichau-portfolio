<script lang="ts">
	import { profileData } from '$lib/data';
	import {
		DiscordLogo,
		Coffee,
		EnvelopeSimple,
		Check,
		YoutubeLogo,
		TiktokLogo,
		FacebookLogo,
		XLogo
	} from 'phosphor-svelte';

	let {
		onCopyEmail,
		copiedEmail = false
	}: {
		onCopyEmail: () => void;
		copiedEmail?: boolean;
	} = $props();
</script>

<section id="home" class="relative rounded-3xl border-[1.5px] border-[var(--line)] bg-[var(--surface)] p-6 sm:p-10 shadow-[4px_4px_0px_0px_rgba(var(--shadow-color),0.03)] overflow-hidden">
	<!-- Background Character Artwork (Chiraitori Style - Desktop only, hidden on mobile) -->
	<div
		class="hidden lg:flex absolute right-0 top-0 bottom-0 w-1/2 pointer-events-none overflow-hidden items-end justify-end select-none opacity-40 lg:opacity-75 transition-opacity"
		aria-hidden="true"
	>
		<picture class="h-[85%] sm:h-[95%] max-h-[380px] flex items-end justify-end">
			<source srcset="/avatar.webp" type="image/webp" />
			<img
				src={profileData.avatarUrl}
				alt=""
				width="550"
				height="550"
				fetchpriority="high"
				decoding="async"
				class="h-full w-auto object-contain object-bottom-right"
				style="-webkit-mask-image: radial-gradient(circle at 70% 55%, black 40%, transparent 80%); mask-image: radial-gradient(circle at 70% 55%, black 40%, transparent 80%);"
			/>
		</picture>
	</div>

	<!-- Hero Content -->
	<div class="space-y-6 z-10 relative max-w-xl">
		<div class="space-y-3">
			<div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[var(--accent-soft)] text-[var(--accent)] border border-[var(--line)]">
				<span class="w-1.5 h-1.5 rounded-full bg-[var(--accent)]"></span>
				Chào mừng bạn ghé thăm portal cá nhân
			</div>

			<h1 class="text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--ink)] leading-tight">
				Hi there, <br />
				I'm <span class="text-[var(--accent)]">{profileData.name}</span>
			</h1>

			<p class="font-handwritten text-xl sm:text-2xl text-[var(--ink)] select-none pt-1 leading-[1.25] pb-1">
				<span class="line-through decoration-2 opacity-60">{profileData.realName}</span> <br />
				<span class="text-[var(--accent)] font-semibold">{profileData.title}.</span>
			</p>

			<p class="max-w-md text-sm leading-relaxed text-[var(--ink-muted)] pt-1">
				Sinh năm {profileData.birthYear} tại TP. Hồ Chí Minh. Người sáng lập máy chủ cộng đồng <strong>Thánh đường Kiamị Châu</strong>. Nơi chia sẻ những khoảnh khắc vui vẻ, chơi game và cập nhật lịch stream.
			</p>
		</div>

		<!-- Hero CTA Actions -->
		<div class="flex flex-wrap items-center gap-3 pt-1">
			<a
				href="#sanctuary"
				class="px-5 py-2.5 rounded-full bg-[var(--accent)] hover:opacity-95 active:scale-[0.98] text-[var(--on-accent)] font-bold text-xs shadow-md shadow-[var(--accent)]/20 transition-all inline-flex items-center gap-2"
			>
				<DiscordLogo size={16} weight="bold" />
				<span>Vào Thánh Đường</span>
			</a>

			<a
				href="#donations"
				class="px-5 py-2.5 rounded-full border-[1.5px] border-[var(--line)] bg-[var(--surface)] hover:bg-[var(--surface-hover)] active:scale-[0.98] text-[var(--ink)] font-semibold text-xs shadow-sm transition-all inline-flex items-center gap-1.5"
			>
				<Coffee size={15} weight="bold" class="text-[var(--accent)]" />
				<span>Cổng Donate</span>
			</a>

			<button
				type="button"
				onclick={onCopyEmail}
				class="w-[145px] py-2.5 rounded-full border-[1.5px] border-[var(--line)] bg-[var(--surface)] hover:bg-[var(--surface-hover)] active:scale-[0.98] text-[var(--ink)] font-semibold text-xs shadow-sm transition-colors cursor-pointer inline-flex items-center justify-center gap-1.5 shrink-0"
			>
				{#if copiedEmail}
					<Check size={15} weight="bold" class="text-emerald-500 shrink-0" />
					<span>Đã sao chép!</span>
				{:else}
					<EnvelopeSimple size={15} weight="bold" class="text-[var(--accent)] shrink-0" />
					<span>Sao chép Email</span>
				{/if}
			</button>
		</div>

		<!-- Quick Connect Row (Chiraitori style) -->
		<div class="pt-2 flex items-center gap-4 text-xs text-[var(--ink-muted)]">
			<span class="font-medium text-[11px]">Kết nối:</span>
			<div class="flex items-center gap-2.5 text-[var(--ink-muted)]">
				<a href="https://www.youtube.com/@KiamiChau?sub_confirmation=1" target="_blank" rel="noreferrer" class="p-1.5 rounded-xl hover:bg-[var(--accent-soft)] hover:text-rose-500 transition-colors" title="YouTube">
					<YoutubeLogo size={17} weight="bold" />
				</a>
				<a href="https://discord.com/servers/thanh-duong-kiami-chau-1078935785522331688" target="_blank" rel="noreferrer" class="p-1.5 rounded-xl hover:bg-[var(--accent-soft)] hover:text-[#5865F2] transition-colors" title="Discord">
					<DiscordLogo size={17} weight="bold" />
				</a>
				<a href="https://www.tiktok.com/@kiami.chau" target="_blank" rel="noreferrer" class="p-1.5 rounded-xl hover:bg-[var(--accent-soft)] hover:text-[var(--ink)] transition-colors" title="TikTok">
					<TiktokLogo size={17} weight="bold" />
				</a>
				<a href="https://www.facebook.com/kiamichau/" target="_blank" rel="noreferrer" class="p-1.5 rounded-xl hover:bg-[var(--accent-soft)] hover:text-blue-600 transition-colors" title="Facebook">
					<FacebookLogo size={17} weight="bold" />
				</a>
				<a href="https://x.com/KiamiChau" target="_blank" rel="noreferrer" class="p-1.5 rounded-xl hover:bg-[var(--accent-soft)] hover:text-[var(--ink)] transition-colors" title="X (Twitter)">
					<XLogo size={17} weight="bold" />
				</a>
			</div>
		</div>
	</div>
</section>
