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

	const quickConnectOrder = ['youtube', 'discord', 'tiktok', 'facebook', 'x'] as const;
	const quickConnectSocials = quickConnectOrder
		.map((key) => profileData.socials.find((s) => s.iconKey === key))
		.filter((s): s is NonNullable<typeof s> => Boolean(s));

	const hoverClasses: Record<string, string> = {
		youtube: 'hover:text-rose-500',
		discord: 'hover:text-[#5865F2]',
		tiktok: 'hover:text-[var(--ink)]',
		facebook: 'hover:text-blue-600',
		x: 'hover:text-[var(--ink)]'
	};
</script>

<section
	id="home"
	class="relative overflow-hidden rounded-3xl border-[1.5px] border-[var(--line)] bg-[var(--surface)] p-6 shadow-[4px_4px_0px_0px_rgba(var(--shadow-color),0.03)] sm:p-10"
>
	<!-- Background Character Artwork (Desktop only) -->
	<div
		class="pointer-events-none absolute top-0 right-0 bottom-0 hidden w-1/2 items-end justify-end overflow-hidden opacity-75 transition-opacity select-none lg:flex"
		aria-hidden="true"
	>
		<picture class="flex h-[95%] max-h-[380px] items-end justify-end">
			<source srcset={profileData.avatarWebpUrl} type="image/webp" />
			<img
				src={profileData.avatarUrl}
				alt=""
				width="550"
				height="550"
				loading="eager"
				fetchpriority="high"
				decoding="async"
				class="h-full w-auto object-contain object-right-bottom"
				style="-webkit-mask-image: radial-gradient(circle at 70% 55%, black 40%, transparent 80%); mask-image: radial-gradient(circle at 70% 55%, black 40%, transparent 80%);"
			/>
		</picture>
	</div>

	<!-- Hero Content -->
	<div class="relative z-10 max-w-xl space-y-6">
		<div class="space-y-3">
			<div class="flex items-center gap-3.5 lg:block">
				<!-- Compact Avatar for Mobile & Tablet (so portrait & preloaded avatar.webp are visible on < lg) -->
				<div
					class="h-14 w-14 shrink-0 overflow-hidden rounded-2xl border-[1.5px] border-[var(--line)] bg-[var(--surface-hover)] shadow-xs sm:h-16 sm:w-16 lg:hidden"
				>
					<picture class="block h-full w-full">
						<source srcset={profileData.avatarWebpUrl} type="image/webp" />
						<img
							src={profileData.avatarUrl}
							alt="{profileData.name} ({profileData.realName})"
							width="64"
							height="64"
							loading="eager"
							fetchpriority="high"
							decoding="async"
							class="h-full w-full object-cover object-top"
						/>
					</picture>
				</div>

				<div
					class="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--accent-soft)] px-3 py-1 text-xs font-semibold text-[var(--accent)]"
				>
					<span class="h-1.5 w-1.5 rounded-full bg-[var(--accent)]"></span>
					<span>Chào mừng bạn ghé thăm portal cá nhân</span>
				</div>
			</div>

			<h1
				class="text-3xl leading-tight font-extrabold tracking-tight text-[var(--ink)] sm:text-5xl"
			>
				Hi there, <br />
				I'm <span class="text-[var(--accent)]">{profileData.name}</span>
			</h1>

			<p
				class="font-handwritten pt-1 pb-1 text-xl leading-[1.25] text-[var(--ink)] select-none sm:text-2xl"
			>
				<span class="line-through decoration-2 opacity-60">{profileData.realName}</span> <br />
				<span class="font-semibold text-[var(--accent)]">{profileData.title}.</span>
			</p>

			<p class="max-w-md pt-1 text-sm leading-relaxed text-[var(--ink-muted)]">
				Sinh năm {profileData.birthYear} tại {profileData.location}. Người sáng lập máy chủ cộng
				đồng <strong>Thánh đường Kiamị Châu</strong>. Nơi chia sẻ những khoảnh khắc vui vẻ, chơi
				game và cập nhật lịch stream.
			</p>
		</div>

		<!-- Hero CTA Actions -->
		<div class="flex flex-wrap items-center gap-3 pt-1">
			<a
				href="#sanctuary"
				class="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-5 py-2.5 text-xs font-bold text-[var(--on-accent)] shadow-[var(--accent)]/20 shadow-md transition-all hover:opacity-95 active:scale-[0.98]"
			>
				<DiscordLogo size={16} weight="bold" />
				<span>Vào Thánh Đường</span>
			</a>

			<a
				href="#donations"
				class="inline-flex items-center gap-1.5 rounded-full border-[1.5px] border-[var(--line)] bg-[var(--surface)] px-5 py-2.5 text-xs font-semibold text-[var(--ink)] shadow-sm transition-all hover:bg-[var(--surface-hover)] active:scale-[0.98]"
			>
				<Coffee size={15} weight="bold" class="text-[var(--accent)]" />
				<span>Cổng Donate</span>
			</a>

			<button
				type="button"
				onclick={onCopyEmail}
				class="inline-flex w-[145px] shrink-0 cursor-pointer items-center justify-center gap-1.5 rounded-full border-[1.5px] border-[var(--line)] bg-[var(--surface)] py-2.5 text-xs font-semibold text-[var(--ink)] shadow-sm transition-colors hover:bg-[var(--surface-hover)] active:scale-[0.98]"
			>
				{#if copiedEmail}
					<Check size={15} weight="bold" class="shrink-0 text-emerald-500" />
					<span>Đã sao chép!</span>
				{:else}
					<EnvelopeSimple size={15} weight="bold" class="shrink-0 text-[var(--accent)]" />
					<span>Sao chép Email</span>
				{/if}
			</button>
		</div>

		<!-- Quick Connect Row -->
		<div class="flex items-center gap-4 pt-2 text-xs text-[var(--ink-muted)]">
			<span class="text-[11px] font-medium">Kết nối:</span>
			<div class="flex items-center gap-2.5 text-[var(--ink-muted)]">
				{#each quickConnectSocials as s (s.name)}
					<a
						href={s.url}
						target="_blank"
						rel="external noopener noreferrer"
						class="rounded-xl p-1.5 transition-colors hover:bg-[var(--accent-soft)] {hoverClasses[
							s.iconKey
						] ?? ''}"
						title={s.name}
						aria-label={s.name}
					>
						{#if s.iconKey === 'youtube'}
							<YoutubeLogo size={17} weight="bold" />
						{:else if s.iconKey === 'discord'}
							<DiscordLogo size={17} weight="bold" />
						{:else if s.iconKey === 'tiktok'}
							<TiktokLogo size={17} weight="bold" />
						{:else if s.iconKey === 'facebook'}
							<FacebookLogo size={17} weight="bold" />
						{:else if s.iconKey === 'x'}
							<XLogo size={17} weight="bold" />
						{/if}
					</a>
				{/each}
			</div>
		</div>
	</div>
</section>
