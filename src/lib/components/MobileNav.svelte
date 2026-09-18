<script lang="ts">
	import { onMount } from 'svelte';
	import { House, User, DiscordLogo, ShareNetwork, Coffee } from 'phosphor-svelte';

	let activeSection = $state('home');

	const navItems = [
		{ id: 'home', label: '/', href: '/#home', icon: House },
		{ id: 'about', label: 'about', href: '/#about', icon: User },
		{ id: 'sanctuary', label: 'sanctuary', href: '/#sanctuary', icon: DiscordLogo },
		{ id: 'channels', label: 'socials', href: '/#channels', icon: ShareNetwork },
		{ id: 'donations', label: 'donate', href: '/#donations', icon: Coffee }
	];

	onMount(() => {
		const sectionIds = ['home', 'about', 'sanctuary', 'channels', 'donations'];
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						activeSection = entry.target.id;
					}
				}
			},
			{ rootMargin: '-20% 0px -60% 0px', threshold: 0 }
		);

		sectionIds.forEach((id) => {
			const el = document.getElementById(id);
			if (el) observer.observe(el);
		});

		return () => observer.disconnect();
	});
</script>

<nav class="lg:hidden fixed bottom-0 inset-x-0 z-40 w-full border-t border-[var(--line)] backdrop-blur-xl bg-[var(--nav-bg)]/95 shadow-[0_-4px_20px_rgba(var(--shadow-color),0.03)]">
	<ul class="flex items-center justify-around px-1 pt-2 pb-[max(10px,env(safe-area-inset-bottom))] max-w-lg mx-auto">
		{#each navItems as item}
			{@const isActive = activeSection === item.id}
			<li class="flex-1">
				<a
					href={item.href}
					onclick={() => (activeSection = item.id)}
					class="flex flex-col items-center justify-center py-1 transition-transform active:scale-95 group"
				>
					<div
						class="w-14 h-7 rounded-full flex items-center justify-center transition-all {isActive
							? 'bg-[var(--accent-soft)] text-[var(--accent)] shadow-sm'
							: 'bg-transparent text-[var(--ink-muted)] group-hover:text-[var(--ink)]'}"
					>
						<item.icon size={18} weight={isActive ? 'fill' : 'bold'} />
					</div>
					<span
						class="font-mono text-[11px] mt-1 tracking-tight transition-colors {isActive
							? 'font-bold text-[var(--accent)]'
							: 'font-medium text-[var(--ink-muted)] group-hover:text-[var(--ink)]'}"
					>
						{item.label}
					</span>
				</a>
			</li>
		{/each}
	</ul>
</nav>
