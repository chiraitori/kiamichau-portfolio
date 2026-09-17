<script lang="ts">
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { Check } from 'phosphor-svelte';
	import { profileData } from '$lib/data';
	import { theme } from '$lib/theme.svelte';

	import Header from '$lib/components/Header.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import AboutSection from '$lib/components/AboutSection.svelte';
	import SanctuarySection from '$lib/components/SanctuarySection.svelte';
	import SocialSection from '$lib/components/SocialSection.svelte';
	import DonationSection from '$lib/components/DonationSection.svelte';
	import ProfileSidebar from '$lib/components/ProfileSidebar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import MobileNav from '$lib/components/MobileNav.svelte';

	let copiedEmail = $state(false);

	onMount(() => {
		theme.init();
	});

	function copyEmail() {
		navigator.clipboard.writeText(profileData.email);
		copiedEmail = true;
		setTimeout(() => (copiedEmail = false), 2000);
	}
</script>

<div class="min-h-[100dvh] text-[var(--ink)] antialiased">
	<Header onCopyEmail={copyEmail} {copiedEmail} />

	{#if copiedEmail}
		<div
			transition:fly={{ y: -12, duration: 200 }}
			class="fixed top-20 left-1/2 -translate-x-1/2 z-50 flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-[var(--surface)] border-[1.5px] border-emerald-500/30 text-[var(--ink)] shadow-xl text-xs font-semibold backdrop-blur-md pointer-events-none max-w-[90vw]"
		>
			<Check size={16} weight="bold" class="text-emerald-500 shrink-0" />
			<span class="truncate">Đã chép: <span class="font-bold text-[var(--accent)]">{profileData.email}</span></span>
		</div>
	{/if}

	<main class="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 pb-10 sm:pb-12">
		<div class="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_320px] gap-8 items-start max-w-4xl xl:max-w-none mx-auto">
			<!-- Left Column: Main Sections -->
			<div class="space-y-12 min-w-0">
				<Hero onCopyEmail={copyEmail} {copiedEmail} />
				<AboutSection />
				<SanctuarySection />
				<SocialSection />
				<DonationSection />
			</div>

			<!-- Right Column: Profile Sidebar (Desktop widescreen only, hidden on mobile/tablet) -->
			<div class="hidden xl:block xl:sticky xl:top-24">
				<ProfileSidebar onCopyEmail={copyEmail} {copiedEmail} />
			</div>
		</div>
	</main>

	<Footer />
	<MobileNav />
</div>
