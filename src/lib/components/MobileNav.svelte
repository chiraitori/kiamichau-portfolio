<script lang="ts">
	import { onMount } from 'svelte';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { House, User, DiscordLogo, ShareNetwork, Coffee } from 'phosphor-svelte';

	const navItems = [
		{ id: 'home', label: '/', href: resolve('/#home'), icon: House },
		{ id: 'about', label: 'about', href: resolve('/#about'), icon: User },
		{ id: 'sanctuary', label: 'sanctuary', href: resolve('/#sanctuary'), icon: DiscordLogo },
		{ id: 'channels', label: 'socials', href: resolve('/#channels'), icon: ShareNetwork },
		{ id: 'donations', label: 'donate', href: resolve('/#donations'), icon: Coffee }
	];

	let activeSection = $state('home');

	onMount(() => {
		const elements = navItems
			.map((item) => document.getElementById(item.id))
			.filter((el): el is HTMLElement => el !== null);

		if (elements.length === 0) {
			activeSection = '';
			return;
		}

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

		for (const el of elements) {
			observer.observe(el);
		}

		const onScroll = () => {
			if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 24) {
				activeSection = 'donations';
			}
		};

		window.addEventListener('scroll', onScroll, { passive: true });
		return () => {
			observer.disconnect();
			window.removeEventListener('scroll', onScroll);
		};
	});
</script>

<nav
	aria-label="Điều hướng di động"
	class="fixed inset-x-0 bottom-0 z-40 w-full border-t border-[var(--line)] bg-[var(--nav-bg)] shadow-[0_-4px_20px_rgba(var(--shadow-color),0.03)] backdrop-blur-xl lg:hidden"
>
	<ul
		class="mx-auto flex max-w-lg items-center justify-around px-1 pt-2 pb-[max(10px,env(safe-area-inset-bottom))]"
	>
		{#each navItems as item (item.id)}
			{@const isActive = !page.error && activeSection === item.id}
			<li class="flex-1">
				<a
					href={item.href}
					onclick={() => (activeSection = item.id)}
					aria-current={isActive ? 'location' : undefined}
					class="group flex flex-col items-center justify-center py-1 transition-transform active:scale-95"
				>
					<div
						class="flex h-7 w-14 items-center justify-center rounded-full transition-all {isActive
							? 'bg-[var(--accent-soft)] text-[var(--accent)] shadow-sm'
							: 'bg-transparent text-[var(--ink-muted)] group-hover:text-[var(--ink)]'}"
					>
						<item.icon size={18} weight={isActive ? 'fill' : 'bold'} />
					</div>
					<span
						class="mt-1 font-mono text-[11px] tracking-tight transition-colors {isActive
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
