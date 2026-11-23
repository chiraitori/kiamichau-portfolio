<script lang="ts">
	import { onMount } from 'svelte';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
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

	onMount(() => {
		try {
			const saved = sessionStorage.getItem('kiami_404_meme_idx');
			const nextIdx =
				saved !== null
					? (parseInt(saved, 10) + 1) % MEMES.length
					: Math.floor(Math.random() * MEMES.length);
			sessionStorage.setItem('kiami_404_meme_idx', nextIdx.toString());
			memeIndex = Number.isNaN(nextIdx) ? 0 : nextIdx;
		} catch {
			memeIndex = Math.floor(Math.random() * MEMES.length);
		}
	});

	function nextMeme() {
		memeIndex = (memeIndex + 1) % MEMES.length;
		try {
			sessionStorage.setItem('kiami_404_meme_idx', memeIndex.toString());
		} catch {
			// Ignore storage errors
		}
	}

	const is404 = $derived(page.status === 404);
	const activeMeme = $derived(MEMES[memeIndex] || MEMES[0]);

	const errorTitle = $derived(
		is404 ? `404 · ${activeMeme.heading}` : `${page.status || 500} · Có sự cố xảy ra`
	);
	const errorHeading = $derived(is404 ? activeMeme.heading : 'Ôi hỏng! Đã có lỗi xảy ra rồi ~');
	const errorDesc = $derived(
		is404
			? activeMeme.desc
			: page.error?.message || 'Hệ thống đang gặp sự cố tạm thời, vui lòng thử lại sau.'
	);
	const errorBadge = $derived(is404 ? activeMeme.badge : 'Có lỗi xảy ra');

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

<main class="flex flex-1 items-center justify-center p-4 pb-12 sm:p-8">
	<div class="my-auto w-full max-w-xl space-y-6 text-center">
		<!-- Cute Animated Avatar Badge (Clickable to rotate/shuffle) -->
		<div class="relative mx-auto inline-block">
			<button
				type="button"
				onclick={nextMeme}
				title="Bấm để đổi meme khác!"
				aria-label="Đổi meme khác"
				class="group flex h-28 w-28 cursor-pointer items-center justify-center overflow-hidden rounded-3xl border-2 border-[var(--line)] bg-[var(--surface)] p-2 shadow-sm transition-all hover:border-[var(--accent)] active:scale-95 sm:h-32 sm:w-32"
			>
				<picture class="pointer-events-none flex h-full w-full items-center justify-center">
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
						class="h-full w-full object-contain transition-transform duration-300 select-none group-hover:scale-105"
					/>
				</picture>
			</button>
			<div
				class="pointer-events-none absolute -right-2 -bottom-2 rounded-full border-2 border-[var(--surface)] bg-[var(--accent)] px-3 py-1 font-mono text-xs font-extrabold text-[var(--on-accent)] shadow-md"
			>
				{page.status || 404}
			</div>
		</div>

		<!-- Status & Title -->
		<div class="space-y-3">
			<div
				class="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--accent-soft)] px-3 py-1 text-xs font-semibold text-[var(--accent)]"
			>
				<span class="h-1.5 w-1.5 rounded-full bg-[var(--accent)]"></span>
				<span>{errorBadge}</span>
			</div>

			<h1
				class="text-2xl font-extrabold tracking-tight text-balance text-[var(--ink)] transition-all sm:text-4xl"
			>
				{errorHeading}
			</h1>

			<p
				class="mx-auto max-w-md text-sm leading-relaxed text-[var(--ink-muted)] transition-all sm:text-base"
			>
				{errorDesc}
			</p>
		</div>

		<!-- Action Buttons -->
		<div class="flex flex-wrap items-center justify-center gap-3 pt-2">
			<a
				href={resolve('/')}
				class="inline-flex cursor-pointer items-center gap-2 rounded-full bg-[var(--accent)] px-5 py-2.5 text-xs font-bold text-[var(--on-accent)] shadow-[var(--accent)]/20 shadow-md transition-all hover:opacity-95 active:scale-[0.98] sm:px-6 sm:py-3 sm:text-sm"
			>
				<House size={16} weight="bold" />
				<span>Về trang chủ</span>
			</a>

			<a
				href={discordUrl}
				target="_blank"
				rel="external noopener noreferrer"
				class="inline-flex items-center gap-2 rounded-full border-[1.5px] border-[var(--line)] bg-[var(--surface)] px-5 py-2.5 text-xs font-semibold text-[var(--ink)] shadow-sm transition-all hover:bg-[var(--surface-hover)] active:scale-[0.98] sm:px-6 sm:py-3 sm:text-sm"
			>
				<DiscordLogo size={16} weight="bold" class="text-[#5865F2]" />
				<span>Vào Thánh đường</span>
			</a>

			<a
				href={youtubeUrl}
				target="_blank"
				rel="external noopener noreferrer"
				class="inline-flex items-center gap-2 rounded-full border-[1.5px] border-[var(--line)] bg-[var(--surface)] px-5 py-2.5 text-xs font-semibold text-[var(--ink)] shadow-sm transition-all hover:bg-[var(--surface-hover)] active:scale-[0.98] sm:px-6 sm:py-3 sm:text-sm"
			>
				<YoutubeLogo size={16} weight="bold" class="text-rose-500" />
				<span>Kênh YouTube</span>
			</a>
		</div>

		<!-- Quick Links Card -->
		<div class="chiraitori-card mt-6 space-y-3 rounded-2xl p-4 text-left text-xs sm:p-5">
			<div
				class="flex items-center justify-between border-b border-[var(--line)] pb-2 text-[var(--ink-muted)]"
			>
				<span class="font-mono text-[10px] font-bold tracking-wider uppercase">Đường tắt nhanh</span
				>
				<button
					type="button"
					onclick={nextMeme}
					class="inline-flex cursor-pointer items-center gap-1.5 text-[11px] font-semibold text-[var(--accent)] hover:underline"
				>
					<ArrowsClockwise size={13} weight="bold" />
					<span>Đổi meme khác</span>
				</button>
			</div>
			<div class="grid grid-cols-2 gap-2 sm:grid-cols-4">
				<a
					href={resolve('/#about')}
					class="flex items-center justify-center gap-1.5 rounded-xl border border-[var(--line)] bg-[var(--page)] p-2.5 text-center font-medium text-[var(--ink)] transition-colors hover:bg-[var(--surface-hover)] hover:text-[var(--accent)]"
				>
					<User size={14} weight="bold" class="shrink-0 text-[var(--accent)]" />
					<span>Giới thiệu</span>
				</a>
				<a
					href={resolve('/#sanctuary')}
					class="flex items-center justify-center gap-1.5 rounded-xl border border-[var(--line)] bg-[var(--page)] p-2.5 text-center font-medium text-[var(--ink)] transition-colors hover:bg-[var(--surface-hover)] hover:text-[var(--accent)]"
				>
					<DiscordLogo size={14} weight="bold" class="shrink-0 text-[#5865F2]" />
					<span>Thánh đường</span>
				</a>
				<a
					href={resolve('/#channels')}
					class="flex items-center justify-center gap-1.5 rounded-xl border border-[var(--line)] bg-[var(--page)] p-2.5 text-center font-medium text-[var(--ink)] transition-colors hover:bg-[var(--surface-hover)] hover:text-[var(--accent)]"
				>
					<ShareNetwork size={14} weight="bold" class="shrink-0 text-[var(--accent)]" />
					<span>Mạng xã hội</span>
				</a>
				<a
					href={resolve('/#donations')}
					class="flex items-center justify-center gap-1.5 rounded-xl border border-[var(--line)] bg-[var(--page)] p-2.5 text-center font-medium text-[var(--ink)] transition-colors hover:bg-[var(--surface-hover)] hover:text-[var(--accent)]"
				>
					<Coffee size={14} weight="bold" class="shrink-0 text-[var(--accent)]" />
					<span>Cổng Donate</span>
				</a>
			</div>
		</div>
	</div>
</main>
