<script lang="ts">
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { Check } from 'phosphor-svelte';
	import { profileData } from '$lib/data';
	import { theme } from '$lib/theme.svelte';
	import { clipboard } from '$lib/clipboard.svelte';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import MobileNav from '$lib/components/MobileNav.svelte';
	import './layout.css';

	let { children } = $props();

	const copiedEmail = $derived(clipboard.copiedField === 'email');

	function copyEmail() {
		void clipboard.copy(profileData.email, 'email');
	}

	onMount(() => {
		return theme.init();
	});
</script>

<div class="flex min-h-[100dvh] flex-col justify-between text-[var(--ink)] antialiased">
	<Header onCopyEmail={copyEmail} {copiedEmail} />

	{#if copiedEmail}
		<div
			role="status"
			aria-live="polite"
			transition:fly={{ y: -12, duration: 200 }}
			class="pointer-events-none fixed top-20 left-1/2 z-50 flex max-w-[90vw] -translate-x-1/2 items-center justify-center gap-2 rounded-full border-[1.5px] border-emerald-500/30 bg-[var(--surface)] px-4 py-2 text-xs font-semibold text-[var(--ink)] shadow-xl backdrop-blur-md"
		>
			<Check size={16} weight="bold" class="shrink-0 text-emerald-500" />
			<span class="truncate">
				Đã chép: <span class="font-bold text-[var(--accent)]">{profileData.email}</span>
			</span>
		</div>
	{/if}

	<div class="flex flex-1 flex-col">
		{@render children()}
	</div>

	<Footer />
	<MobileNav />
</div>
