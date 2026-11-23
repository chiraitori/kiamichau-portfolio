<script lang="ts">
	import { profileData } from '$lib/data';
	import { clipboard } from '$lib/clipboard.svelte';
	import type { CachedCreatorStats } from '$lib/server/stats';

	import Hero from '$lib/components/Hero.svelte';
	import AboutSection from '$lib/components/AboutSection.svelte';
	import SanctuarySection from '$lib/components/SanctuarySection.svelte';
	import SocialSection from '$lib/components/SocialSection.svelte';
	import DonationSection from '$lib/components/DonationSection.svelte';
	import ProfileSidebar from '$lib/components/ProfileSidebar.svelte';

	let { stats }: { stats?: CachedCreatorStats } = $props();

	const copiedEmail = $derived(clipboard.copiedField === 'email');

	function copyEmail() {
		void clipboard.copy(profileData.email, 'email');
	}
</script>

<main class="mx-auto w-full max-w-[1320px] px-4 pt-8 pb-10 sm:px-6 sm:pt-12 sm:pb-12 lg:px-8">
	<div
		class="mx-auto grid max-w-4xl grid-cols-1 items-start gap-8 xl:max-w-none xl:grid-cols-[minmax(0,1fr)_320px]"
	>
		<!-- Left Column: Main Sections -->
		<div class="min-w-0 space-y-12">
			<Hero onCopyEmail={copyEmail} {copiedEmail} />
			<AboutSection />
			<SanctuarySection />
			<SocialSection />
			<DonationSection />
		</div>

		<!-- Right Column: Profile Sidebar (Desktop widescreen only) -->
		<div class="hidden xl:sticky xl:top-24 xl:block">
			<ProfileSidebar onCopyEmail={copyEmail} {copiedEmail} {stats} />
		</div>
	</div>
</main>
