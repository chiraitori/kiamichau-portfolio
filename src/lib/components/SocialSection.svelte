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
			<div class="w-7 h-7 rounded-xl bg-[var(--accent-soft)] flex items-center justify-center text-[var(--accent)]">
				<ShareNetwork size={16} weight="bold" />
			</div>
			<h2 class="text-lg font-bold tracking-tight text-[var(--ink)]">Kênh mạng xã hội chính thức</h2>
		</div>
		<span class="text-xs text-[var(--ink-muted)]">Official Links</span>
	</div>

	<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
		{#each profileData.socials as s}
			<a
				href={s.url}
				target="_blank"
				rel="noreferrer"
				class="chiraitori-card p-5 rounded-3xl active:scale-[0.98] flex items-center justify-between group"
			>
				<div class="flex items-start gap-3.5">
					<div class="w-10 h-10 rounded-2xl bg-[var(--surface-hover)] border border-[var(--line)] flex items-center justify-center shrink-0 mt-0.5 group-hover:border-[var(--accent)] group-hover:bg-[var(--accent-soft)] transition-colors duration-200">
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
							<h3 class="text-sm font-bold text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors duration-200">
								{s.name}
							</h3>
							{#if s.badge}
								<span class="text-[9px] px-2 py-0.5 rounded-full bg-[var(--accent-soft)] text-[var(--accent)] font-bold">
									{s.badge}
								</span>
							{/if}
						</div>
						<p class="text-xs font-mono text-[var(--accent)] font-medium">{s.handle}</p>
						<p class="text-[11px] text-[var(--ink-muted)]">{s.description}</p>
					</div>
				</div>

				<div class="w-8 h-8 rounded-full flex items-center justify-center text-[var(--ink-muted)] group-hover:text-[var(--accent)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 ease-[var(--bezier-one)] shrink-0">
					<ArrowUpRight size={17} weight="bold" />
				</div>
			</a>
		{/each}
	</div>

	<!-- Security Notice Directly Below Channels -->
	<div class="p-4 sm:p-5 rounded-2xl bg-[var(--accent-soft)] border border-[var(--line)] flex items-start gap-3.5 text-xs mt-2">
		<ShieldWarning size={22} weight="bold" class="text-[var(--accent)] shrink-0 mt-0.5" />
		<div class="space-y-1">
			<p class="font-bold text-[var(--accent)] uppercase tracking-wider">CẢNH BÁO BẢO MẬT</p>
			<p class="text-[var(--ink)] leading-relaxed font-medium">
				{profileData.warning}
			</p>
		</div>
	</div>
</section>
