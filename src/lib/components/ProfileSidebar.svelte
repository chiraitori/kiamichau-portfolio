<script lang="ts">
	import { onMount } from 'svelte';
	import { profileData } from '$lib/data';
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
		copiedEmail = false
	}: {
		onCopyEmail: () => void;
		copiedEmail?: boolean;
	} = $props();

	const discordLink = profileData.socials.find((s) => s.category === 'community')?.url || 'https://discord.com';
	const youtubeLink = profileData.socials.find((s) => s.iconKey === 'youtube')?.url || 'https://www.youtube.com/@KiamiChau';
	const tiktokLink = profileData.socials.find((s) => s.iconKey === 'tiktok')?.url || 'https://www.tiktok.com/@kiami.chau';

	let liveStats = $state({
		youtubeSubs: profileData.stats?.youtubeSubs || '10.7K',
		tiktokFollowers: profileData.stats?.tiktokFollowers || '48.7K'
	});

	onMount(async () => {
		try {
			const res = await fetch('/api/stats');
			if (res.ok) {
				const data = await res.json();
				if (data.youtubeSubs) liveStats.youtubeSubs = data.youtubeSubs;
				if (data.tiktokFollowers) liveStats.tiktokFollowers = data.tiktokFollowers;
			}
		} catch {
			// Keep initial fallback values
		}
	});
</script>

<aside class="space-y-4 w-full xl:sticky xl:top-24">
	<!-- Profile Card -->
	<div class="rounded-3xl border-[1.5px] border-[var(--line)] bg-[var(--surface)] p-6 shadow-[4px_4px_0px_0px_rgba(var(--shadow-color),0.03)] space-y-6">
		<!-- Avatar Frame -->
		<div class="relative w-full aspect-square rounded-2xl overflow-hidden border-[1.5px] border-[var(--line)] bg-[var(--surface-hover)] shadow-inner group">
			<picture class="w-full h-full block">
				<source srcset="/avatar.webp" type="image/webp" />
				<img
					src={profileData.avatarUrl}
					alt="{profileData.name} ({profileData.realName})"
					width="550"
					height="550"
					loading="eager"
					fetchpriority="high"
					decoding="async"
					class="w-full h-full object-cover object-top group-hover:-translate-y-1 transition-transform duration-500"
				/>
			</picture>
			<div class="absolute bottom-2 left-2 right-2 p-2 rounded-xl bg-[var(--surface)]/90 backdrop-blur-md border border-[var(--line)] text-center">
				<p class="text-xs font-bold text-[var(--ink)]">{profileData.name}</p>
				<p class="text-[10px] font-mono text-[var(--accent)]">@{profileData.realName}</p>
			</div>
		</div>

		<!-- Quick Info Specs -->
		<div class="space-y-3 text-xs text-[var(--ink-muted)] border-t border-[var(--line)] pt-4">
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
				<strong class="text-[var(--ink)]">TP. Hồ Chí Minh</strong>
			</div>
			<div class="flex items-center justify-between">
				<span class="inline-flex items-center gap-1.5">
					<Translate size={14} weight="bold" class="text-[var(--accent)]" />
					Ngôn ngữ:
				</span>
				<strong class="text-[var(--ink)]">Tiếng Việt & English</strong>
			</div>
			<div class="flex items-center justify-between">
				<a
					href={youtubeLink}
					target="_blank"
					rel="noreferrer"
					class="inline-flex items-center gap-1.5 hover:text-rose-500 transition-colors group/yt"
				>
					<YoutubeLogo size={14} weight="bold" class="text-rose-500" />
					<span>YouTube:</span>
				</a>
				<a
					href={youtubeLink}
					target="_blank"
					rel="noreferrer"
					class="text-[var(--ink)] font-bold hover:text-rose-500 transition-colors inline-flex items-center gap-1 group/yt"
				>
					<span>{liveStats.youtubeSubs} subs</span>
					<ArrowUpRight
						size={11}
						class="text-[var(--ink-muted)] group-hover/yt:text-rose-500 group-hover/yt:translate-x-0.5 group-hover/yt:-translate-y-0.5 transition-transform"
					/>
				</a>
			</div>
			<div class="flex items-center justify-between">
				<a
					href={tiktokLink}
					target="_blank"
					rel="noreferrer"
					class="inline-flex items-center gap-1.5 hover:text-cyan-500 transition-colors group/tt"
				>
					<TiktokLogo size={14} weight="bold" class="text-cyan-500" />
					<span>TikTok:</span>
				</a>
				<a
					href={tiktokLink}
					target="_blank"
					rel="noreferrer"
					class="text-[var(--ink)] font-bold hover:text-cyan-500 transition-colors inline-flex items-center gap-1 group/tt"
				>
					<span>{liveStats.tiktokFollowers} follow</span>
					<ArrowUpRight
						size={11}
						class="text-[var(--ink-muted)] group-hover/tt:text-cyan-500 group-hover/tt:translate-x-0.5 group-hover/tt:-translate-y-0.5 transition-transform"
					/>
				</a>
			</div>
		</div>

		<!-- Quick Actions in Sidebar -->
		<div class="space-y-2 pt-2">
			<a
				href={discordLink}
				target="_blank"
				rel="noreferrer"
				class="w-full py-2.5 rounded-full bg-[var(--accent)] hover:opacity-95 active:scale-[0.98] text-[var(--on-accent)] font-bold text-xs text-center inline-flex items-center justify-center gap-2 shadow transition-all"
			>
				<DiscordLogo size={16} weight="bold" />
				<span>Vào Thánh Đường</span>
			</a>
			<button
				type="button"
				onclick={onCopyEmail}
				class="w-full py-2.5 rounded-full border-[1.5px] border-[var(--line)] bg-[var(--surface-hover)] hover:bg-[var(--line)] active:scale-[0.98] text-[var(--ink)] font-semibold text-xs text-center inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
			>
				{#if copiedEmail}
					<Check size={15} weight="bold" class="text-emerald-500 shrink-0" />
					<span>Đã sao chép email</span>
				{:else}
					<EnvelopeSimple size={15} weight="bold" class="text-[var(--accent)] shrink-0" />
					<span>Liên hệ hợp tác</span>
				{/if}
			</button>
		</div>
	</div>

	<!-- Warm Goodbye Card -->
	<div class="rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-5 text-center space-y-1 shadow-[2px_2px_0px_0px_rgba(var(--shadow-color),0.02)]">
		<p class="font-handwritten text-base text-[var(--accent)] leading-[1.25] pb-0.5">
			"Thanks for stopping by. See you around the internet~"
		</p>
		<p class="text-[10px] text-[var(--ink-muted)]">© {new Date().getFullYear()} Kiami Châu</p>
	</div>
</aside>
