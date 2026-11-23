<script lang="ts">
	import { onMount } from 'svelte';
	import { profileData } from '$lib/data';
	import type { CachedCreatorStats } from '$lib/server/stats';
	import {
		Cake,
		MapPin,
		Translate,
		DiscordLogo,
		EnvelopeSimple,
		Check,
		YoutubeLogo,
		TiktokLogo,
		ArrowUpRight
	} from 'phosphor-svelte';

	let {
		onCopyEmail,
		copiedEmail = false,
		stats
	}: {
		onCopyEmail: () => void;
		copiedEmail?: boolean;
		stats?: CachedCreatorStats;
	} = $props();

	const discordLink =
		profileData.socials.find((s) => s.category === 'community')?.url || 'https://discord.com';
	const youtubeLink =
		profileData.socials.find((s) => s.iconKey === 'youtube')?.url ||
		'https://www.youtube.com/@KiamiChau';
	const tiktokLink =
		profileData.socials.find((s) => s.iconKey === 'tiktok')?.url ||
		'https://www.tiktok.com/@kiami.chau';

	let liveStats = $derived({
		youtubeSubs: stats?.youtubeSubs || profileData.stats.youtubeSubs,
		tiktokFollowers: stats?.tiktokFollowers || profileData.stats.tiktokFollowers
	});

	let clientOverride = $state<{ youtubeSubs?: string; tiktokFollowers?: string }>({});

	const displayedYoutubeSubs = $derived(clientOverride.youtubeSubs ?? liveStats.youtubeSubs);
	const displayedTiktokFollowers = $derived(
		clientOverride.tiktokFollowers ?? liveStats.tiktokFollowers
	);

	onMount(async () => {
		// Skip client waterfall fetch if SSR already provided fresh live stats
		if (stats?.fresh) return;

		try {
			const res = await fetch('/api/stats');
			if (res.ok) {
				const data = (await res.json()) as { youtubeSubs?: string; tiktokFollowers?: string };
				clientOverride = {
					youtubeSubs: data.youtubeSubs,
					tiktokFollowers: data.tiktokFollowers
				};
			}
		} catch {
			// Keep initial fallback values
		}
	});
</script>

<aside class="w-full space-y-4 xl:sticky xl:top-24">
	<!-- Profile Card -->
	<div
		class="space-y-6 rounded-3xl border-[1.5px] border-[var(--line)] bg-[var(--surface)] p-6 shadow-[4px_4px_0px_0px_rgba(var(--shadow-color),0.03)]"
	>
		<!-- Avatar Frame -->
		<div
			class="group relative aspect-square w-full overflow-hidden rounded-2xl border-[1.5px] border-[var(--line)] bg-[var(--surface-hover)] shadow-inner"
		>
			<picture class="block h-full w-full">
				<source srcset={profileData.avatarWebpUrl} type="image/webp" />
				<img
					src={profileData.avatarUrl}
					alt="{profileData.name} ({profileData.realName})"
					width="550"
					height="550"
					loading="eager"
					fetchpriority="high"
					decoding="async"
					class="h-full w-full object-cover object-top transition-transform duration-500 group-hover:-translate-y-1"
				/>
			</picture>
			<div
				class="absolute right-2 bottom-2 left-2 rounded-xl border border-[var(--line)] bg-[var(--surface)]/90 p-2 text-center backdrop-blur-md"
			>
				<p class="text-xs font-bold text-[var(--ink)]">{profileData.name}</p>
				<p class="font-mono text-[10px] text-[var(--accent)]">@{profileData.realName}</p>
			</div>
		</div>

		<!-- Quick Info Specs -->
		<div class="space-y-3 border-t border-[var(--line)] pt-4 text-xs text-[var(--ink-muted)]">
			<div class="flex items-center justify-between">
				<span class="inline-flex items-center gap-1.5">
					<Cake size={14} weight="bold" class="text-[var(--accent)]" />
					Năm sinh:
				</span>
				<strong class="text-[var(--ink)]">{profileData.birthYear}</strong>
			</div>
			<div class="flex items-center justify-between">
				<span class="inline-flex items-center gap-1.5">
					<MapPin size={14} weight="bold" class="text-[var(--accent)]" />
					Nơi ở:
				</span>
				<strong class="text-[var(--ink)]">{profileData.location}</strong>
			</div>
			<div class="flex items-center justify-between">
				<span class="inline-flex items-center gap-1.5">
					<Translate size={14} weight="bold" class="text-[var(--accent)]" />
					Ngôn ngữ:
				</span>
				<strong class="text-[var(--ink)]">{profileData.languages.join(' & ')}</strong>
			</div>
			<a
				href={youtubeLink}
				target="_blank"
				rel="external noopener noreferrer"
				class="group/yt flex items-center justify-between transition-colors hover:text-rose-500"
			>
				<span class="inline-flex items-center gap-1.5">
					<YoutubeLogo size={14} weight="bold" class="text-rose-500" />
					<span>YouTube:</span>
				</span>
				<span
					class="inline-flex items-center gap-1 font-bold text-[var(--ink)] transition-colors group-hover/yt:text-rose-500"
				>
					<span>{displayedYoutubeSubs} subs</span>
					<ArrowUpRight
						size={11}
						class="text-[var(--ink-muted)] transition-transform group-hover/yt:translate-x-0.5 group-hover/yt:-translate-y-0.5 group-hover/yt:text-rose-500"
					/>
				</span>
			</a>
			<a
				href={tiktokLink}
				target="_blank"
				rel="external noopener noreferrer"
				class="group/tt flex items-center justify-between transition-colors hover:text-cyan-500"
			>
				<span class="inline-flex items-center gap-1.5">
					<TiktokLogo size={14} weight="bold" class="text-cyan-500" />
					<span>TikTok:</span>
				</span>
				<span
					class="inline-flex items-center gap-1 font-bold text-[var(--ink)] transition-colors group-hover/tt:text-cyan-500"
				>
					<span>{displayedTiktokFollowers} follow</span>
					<ArrowUpRight
						size={11}
						class="text-[var(--ink-muted)] transition-transform group-hover/tt:translate-x-0.5 group-hover/tt:-translate-y-0.5 group-hover/tt:text-cyan-500"
					/>
				</span>
			</a>
		</div>

		<!-- Quick Actions in Sidebar -->
		<div class="space-y-2 pt-2">
			<a
				href={discordLink}
				target="_blank"
				rel="external noopener noreferrer"
				class="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--accent)] py-2.5 text-center text-xs font-bold text-[var(--on-accent)] shadow transition-all hover:opacity-95 active:scale-[0.98]"
			>
				<DiscordLogo size={16} weight="bold" />
				<span>Vào Thánh Đường</span>
			</a>
			<button
				type="button"
				onclick={onCopyEmail}
				class="inline-flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-full border-[1.5px] border-[var(--line)] bg-[var(--surface-hover)] py-2.5 text-center text-xs font-semibold text-[var(--ink)] transition-colors hover:bg-[var(--line)] active:scale-[0.98]"
			>
				{#if copiedEmail}
					<Check size={15} weight="bold" class="shrink-0 text-emerald-500" />
					<span>Đã sao chép email</span>
				{:else}
					<EnvelopeSimple size={15} weight="bold" class="shrink-0 text-[var(--accent)]" />
					<span>Liên hệ hợp tác</span>
				{/if}
			</button>
		</div>
	</div>

	<!-- Warm Goodbye Card -->
	<div
		class="space-y-1 rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-5 text-center shadow-[2px_2px_0px_0px_rgba(var(--shadow-color),0.02)]"
	>
		<p class="font-handwritten pb-0.5 text-base leading-[1.25] text-[var(--accent)]">
			"Thanks for stopping by. See you around the internet~"
		</p>
		<p class="text-[10px] text-[var(--ink-muted)]">© {new Date().getFullYear()} Kiami Châu</p>
	</div>
</aside>
