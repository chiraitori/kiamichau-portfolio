<script lang="ts">
	import { profileData } from '$lib/data';
	import {
		ShareNetwork,
		ArrowUpRight,
		ShieldWarning,
		YoutubeLogo,
		TiktokLogo,
		FacebookLogo,
		DiscordLogo,
		XLogo,
		EnvelopeSimple
	} from 'phosphor-svelte';
</script>

<section id="channels" class="space-y-4">
	<div class="flex items-center justify-between border-b border-[var(--line)] pb-3">
		<div class="flex items-center gap-2">
			<div
				class="flex h-7 w-7 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)]"
			>
				<ShareNetwork size={16} weight="bold" />
			</div>
			<h2 class="text-lg font-bold tracking-tight text-[var(--ink)]">
				Kênh mạng xã hội chính thức
			</h2>
		</div>
		<span class="text-xs text-[var(--ink-muted)]">Official Links</span>
	</div>

	<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
		{#each profileData.socials as s (s.name)}
			{@const isMailto = s.url.startsWith('mailto:')}
			<a
				href={s.url}
				target={isMailto ? undefined : '_blank'}
				rel="external noopener noreferrer"
				class="chiraitori-card group flex items-center justify-between rounded-3xl p-5 active:scale-[0.98]"
			>
				<div class="flex items-start gap-3.5">
					<div
						class="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-[var(--line)] bg-[var(--surface-hover)] transition-colors duration-200 group-hover:border-[var(--accent)] group-hover:bg-[var(--accent-soft)]"
					>
						{#if s.iconKey === 'youtube'}
							<YoutubeLogo size={22} weight="bold" class="text-rose-500" />
						{:else if s.iconKey === 'tiktok'}
							<TiktokLogo size={22} weight="bold" class="text-[var(--ink)]" />
						{:else if s.iconKey === 'facebook'}
							<FacebookLogo size={22} weight="bold" class="text-blue-600" />
						{:else if s.iconKey === 'discord'}
							<DiscordLogo size={22} weight="bold" class="text-[#5865F2]" />
						{:else if s.iconKey === 'x'}
							<XLogo size={22} weight="bold" class="text-[var(--ink)]" />
						{:else}
							<EnvelopeSimple size={22} weight="bold" class="text-[var(--accent)]" />
						{/if}
					</div>

					<div class="space-y-1">
						<div class="flex items-center gap-2">
							<h3
								class="text-sm font-bold text-[var(--ink)] transition-colors duration-200 group-hover:text-[var(--accent)]"
							>
								{s.name}
							</h3>
							{#if s.badge}
								<span
									class="rounded-full bg-[var(--accent-soft)] px-2 py-0.5 text-[9px] font-bold text-[var(--accent)]"
								>
									{s.badge}
								</span>
							{/if}
						</div>
						<p class="font-mono text-xs font-medium text-[var(--accent)]">{s.handle}</p>
						<p class="text-[11px] text-[var(--ink-muted)]">{s.description}</p>
					</div>
				</div>

				<div
					class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[var(--ink-muted)] transition-all duration-300 ease-[var(--bezier-one)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--accent)]"
				>
					<ArrowUpRight size={17} weight="bold" />
				</div>
			</a>
		{/each}
	</div>

	<!-- Security Notice Directly Below Channels -->
	<div
		class="mt-2 flex items-start gap-3.5 rounded-2xl border border-[var(--line)] bg-[var(--accent-soft)] p-4 text-xs sm:p-5"
	>
		<ShieldWarning size={22} weight="bold" class="mt-0.5 shrink-0 text-[var(--accent)]" />
		<div class="space-y-1">
			<p class="font-bold tracking-wider text-[var(--accent)] uppercase">CẢNH BÁO BẢO MẬT</p>
			<p class="leading-relaxed font-medium text-[var(--ink)]">
				{profileData.warning}
			</p>
		</div>
	</div>
</section>
