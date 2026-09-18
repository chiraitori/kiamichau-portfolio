<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import MobileNav from '$lib/components/MobileNav.svelte';
	import {
		House,
		User,
		DiscordLogo,
		YoutubeLogo,
		ShareNetwork,
		Coffee,
		ArrowsClockwise
	} from 'phosphor-svelte';
	import { profileData } from '$lib/data';

	interface ErrorMeme {
		id: string;
		gif: string;
		webp: string | null;
		alt: string;
		badge: string;
		heading: string;
		desc: string;
	}

	const MEMES: ErrorMeme[] = [
		{
			id: 'haachama-bruh',
			gif: '/error/haachama-bruh.gif',
			webp: '/error/haachama-bruh.webp',
			alt: 'Haachama bruh confused',
			badge: 'HAACHAMA CHAMA~',
			heading: 'Bạn dạng lạc lúi? :)))',
			desc: 'HAACHAMA CHAMA~ Có vẻ bạn đã đi lạc vào một chiều không gian không tồn tại rồi! Đừng hoảng sợ, để Kiami Châu dẫn đường về nhà nghen ~'
		},
		{
			id: 'haachama-nonono',
			gif: '/error/haachama-nonono.gif',
			webp: '/error/haachama-nonono.webp',
			alt: 'Haachama panic nonono',
			badge: 'HAACHAMA PANIC',
			heading: 'NO NO NO NO! Lạc rồi! 😱',
			desc: 'Chạy đâu cho thoát khỏi chiều không gian hỗn mang của Haachama đây? Mau bấm nút quay về trước khi bị lôi đi nấu lẩu nghen!'
		},
		{
			id: 'haachama-floor',
			gif: '/error/haachama-floor.gif',
			webp: '/error/haachama-floor.webp',
			alt: 'Chibi Haachama sitting on floor wiggling',
			badge: 'CHIBI HAACHAMA',
			heading: 'Ủa rồi đi đâu đây ta? :D',
			desc: 'Lạc vào đây thì chỉ có nước ngồi bệt xuống lắc lư theo điệu nhảy của Haachama thôi, trang này không có thật đâu bạn ơiii ~'
		},
		{
			id: 'zoro-lost',
			gif: '/error/zoro-lost.gif',
			webp: null,
			alt: 'Zoro getting lost',
			badge: 'THÁNH LẠC ĐƯỜNG ZORO',
			heading: 'Oh wait... đây là đâu?!',
			desc: 'Đến người đi đường thẳng còn lạc được thì trang web này lạc lối cũng là chuyện thường tình. Để Kiami Châu chỉ đường lại cho nè!'
		},
		{
			id: 'memcho-confused',
			gif: '/error/memcho-confused.gif',
			webp: null,
			alt: 'Memcho eyes swirling confused',
			badge: 'MEMCHO CONFUSED',
			heading: 'Tọa độ này lạ quá ta?',
			desc: 'Mắt đã xoay mòng mòng đầy dấu chấm hỏi luôn rồi! Trang này không tồn tại đâu, bấm nút quay về trang chủ thôi nào!'
		}
	];

	let memeIndex = $state(0);
	let copiedEmail = $state(false);

	onMount(() => {
		try {
			const saved = sessionStorage.getItem('kiami_404_meme_idx');
			let nextIdx: number;
			if (saved !== null) {
				nextIdx = (parseInt(saved, 10) + 1) % MEMES.length;
			} else {
				nextIdx = Math.floor(Math.random() * MEMES.length);
			}
			sessionStorage.setItem('kiami_404_meme_idx', nextIdx.toString());
			memeIndex = nextIdx;
		} catch {
			memeIndex = Math.floor(Math.random() * MEMES.length);
		}
	});

	function nextMeme() {
		memeIndex = (memeIndex + 1) % MEMES.length;
		try {
			sessionStorage.setItem('kiami_404_meme_idx', memeIndex.toString());
		} catch {}
	}

	function copyEmail() {
		navigator.clipboard.writeText(profileData.email);
		copiedEmail = true;
		setTimeout(() => (copiedEmail = false), 2000);
	}

	const is404 = $derived(page.status === 404);
	const activeMeme = $derived(MEMES[memeIndex] || MEMES[0]);

	const errorTitle = $derived(
		is404
			? `404 · ${activeMeme.heading}`
			: `${page.status || 500} · Có sự cố xảy ra`
	);
	const errorHeading = $derived(
		is404
			? activeMeme.heading
			: 'Ôi hỏng! Đã có lỗi xảy ra rồi ~'
	);
	const errorDesc = $derived(
		is404
			? activeMeme.desc
			: (page.error?.message || 'Hệ thống đang gặp sự cố tạm thời, vui lòng thử lại sau.')
	);
	const errorBadge = $derived(
		is404
			? activeMeme.badge
			: 'Có lỗi xảy ra'
	);

	const discordUrl =
		profileData.socials.find((s) => s.name === 'Discord')?.url ||
		'https://discord.com/servers/thanh-duong-kiami-chau-1078935785522331688';
	const youtubeUrl =
		profileData.socials.find((s) => s.name === 'YouTube')?.url ||
		'https://www.youtube.com/@KiamiChau?sub_confirmation=1';
</script>

<svelte:head>
	<title>{errorTitle} | Kiami Châu</title>
	<meta name="robots" content="noindex, follow" />
	<meta name="description" content={errorDesc} />
</svelte:head>

<div class="min-h-[100dvh] flex flex-col justify-between bg-[var(--page)] text-[var(--ink)] antialiased">
	<!-- Synchronized Official Site Header -->
	<Header onCopyEmail={copyEmail} {copiedEmail} />

	<!-- Main 404 Hero Container -->
	<main class="flex-1 flex items-center justify-center p-4 sm:p-8 pb-24 lg:pb-12">
		<div class="max-w-xl w-full text-center space-y-6 my-auto">
			<!-- Cute Animated Avatar Badge (Clickable to rotate/shuffle) -->
			<div class="relative inline-block mx-auto">
				<button
					type="button"
					onclick={nextMeme}
					title="Bấm để đổi meme khác!"
					aria-label="Đổi meme khác"
					class="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-[var(--surface)] border-2 border-[var(--line)] p-2 shadow-sm flex items-center justify-center overflow-hidden active:scale-95 hover:border-[var(--accent)] transition-all cursor-pointer group"
				>
					<picture class="w-full h-full flex items-center justify-center pointer-events-none">
						{#if activeMeme.webp}
							<source srcset={activeMeme.webp} type="image/webp" />
						{/if}
						<img
							src={activeMeme.gif}
							alt={activeMeme.alt}
							width="160"
							height="160"
							loading="eager"
							fetchpriority="high"
							decoding="async"
							class="w-full h-full object-contain select-none group-hover:scale-105 transition-transform duration-300"
						/>
					</picture>
				</button>
				<div
					class="absolute -bottom-2 -right-2 px-3 py-1 rounded-full font-mono text-xs font-extrabold bg-[var(--accent)] text-[var(--on-accent)] shadow-md border-2 border-[var(--surface)] pointer-events-none"
				>
					{page.status || 404}
				</div>
			</div>

			<!-- Status & Title -->
			<div class="space-y-3">
				<div
					class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[var(--accent-soft)] text-[var(--accent)] border border-[var(--line)]"
				>
					<span class="w-1.5 h-1.5 rounded-full bg-[var(--accent)]"></span>
					<span>{errorBadge}</span>
				</div>

				<h1 class="text-2xl sm:text-4xl font-extrabold tracking-tight text-[var(--ink)] text-balance transition-all">
					{errorHeading}
				</h1>

				<p class="text-sm sm:text-base text-[var(--ink-muted)] max-w-md mx-auto leading-relaxed transition-all">
					{errorDesc}
				</p>
			</div>

			<!-- Action Buttons (Synchronized with Hero CTA button styling) -->
			<div class="flex flex-wrap items-center justify-center gap-3 pt-2">
				<a
					href="/"
					class="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-[var(--accent)] hover:opacity-95 active:scale-[0.98] text-[var(--on-accent)] font-bold text-xs sm:text-sm shadow-md shadow-[var(--accent)]/20 transition-all cursor-pointer"
				>
					<House size={16} weight="bold" />
					<span>Về trang chủ</span>
				</a>

				<a
					href={discordUrl}
					target="_blank"
					rel="noreferrer"
					class="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full border-[1.5px] border-[var(--line)] bg-[var(--surface)] hover:bg-[var(--surface-hover)] active:scale-[0.98] text-[var(--ink)] font-semibold text-xs sm:text-sm shadow-sm transition-all"
				>
					<DiscordLogo size={16} weight="bold" class="text-[#5865F2]" />
					<span>Vào Thánh đường</span>
				</a>

				<a
					href={youtubeUrl}
					target="_blank"
					rel="noreferrer"
					class="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full border-[1.5px] border-[var(--line)] bg-[var(--surface)] hover:bg-[var(--surface-hover)] active:scale-[0.98] text-[var(--ink)] font-semibold text-xs sm:text-sm shadow-sm transition-all"
				>
					<YoutubeLogo size={16} weight="bold" class="text-rose-500" />
					<span>Kênh YouTube</span>
				</a>
			</div>

			<!-- Quick Links Card (100% synchronized Phosphor icons, no emojis) -->
			<div class="chiraitori-card rounded-2xl p-4 sm:p-5 text-left text-xs space-y-3 mt-6">
				<div class="flex items-center justify-between border-b border-[var(--line)] pb-2 text-[var(--ink-muted)]">
					<span class="font-mono uppercase font-bold text-[10px] tracking-wider">Đường tắt nhanh</span>
					<button
						type="button"
						onclick={nextMeme}
						class="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[var(--accent)] hover:underline cursor-pointer"
					>
						<ArrowsClockwise size={13} weight="bold" />
						<span>Đổi meme khác</span>
					</button>
				</div>
				<div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
					<a
						href="/#about"
						class="p-2.5 rounded-xl bg-[var(--page)] hover:bg-[var(--surface-hover)] border border-[var(--line)] text-[var(--ink)] hover:text-[var(--accent)] font-medium transition-colors flex items-center justify-center gap-1.5 text-center"
					>
						<User size={14} weight="bold" class="text-[var(--accent)] shrink-0" />
						<span>Giới thiệu</span>
					</a>
					<a
						href="/#sanctuary"
						class="p-2.5 rounded-xl bg-[var(--page)] hover:bg-[var(--surface-hover)] border border-[var(--line)] text-[var(--ink)] hover:text-[var(--accent)] font-medium transition-colors flex items-center justify-center gap-1.5 text-center"
					>
						<DiscordLogo size={14} weight="bold" class="text-[#5865F2] shrink-0" />
						<span>Thánh đường</span>
					</a>
					<a
						href="/#channels"
						class="p-2.5 rounded-xl bg-[var(--page)] hover:bg-[var(--surface-hover)] border border-[var(--line)] text-[var(--ink)] hover:text-[var(--accent)] font-medium transition-colors flex items-center justify-center gap-1.5 text-center"
					>
						<ShareNetwork size={14} weight="bold" class="text-[var(--accent)] shrink-0" />
						<span>Mạng xã hội</span>
					</a>
					<a
						href="/#donations"
						class="p-2.5 rounded-xl bg-[var(--page)] hover:bg-[var(--surface-hover)] border border-[var(--line)] text-[var(--ink)] hover:text-[var(--accent)] font-medium transition-colors flex items-center justify-center gap-1.5 text-center"
					>
						<Coffee size={14} weight="bold" class="text-[var(--accent)] shrink-0" />
						<span>Cổng Donate</span>
					</a>
				</div>
			</div>
		</div>
	</main>

	<!-- Footer -->
	<Footer />

	<!-- Mobile Navigation Bar (100% synchronized with main page) -->
	<MobileNav />
</div>
