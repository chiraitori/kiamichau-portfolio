<script lang="ts">
	import { page } from '$app/state';
	import { profileData } from '$lib/data';
	import Portal from '$lib/components/Portal.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const title = 'Kiami Châu · Trang liên kết chính thức';
	const description =
		'Trang thông tin, mạng xã hội và cổng donate chính thức của Kiami Châu (Châu Hoàng Long) · VTuber & Content Creator.';
	const canonicalUrl = $derived(`${page.url.origin}/`);
	const previewImage = $derived(`${page.url.origin}${profileData.avatarUrl}`);

	const personJsonLd = $derived(
		`<script type="application/ld+json">${JSON.stringify({
			'@context': 'https://schema.org',
			'@type': 'Person',
			name: profileData.name,
			alternateName: profileData.realName,
			description,
			url: canonicalUrl,
			image: previewImage,
			jobTitle: profileData.title,
			sameAs: profileData.socials.filter((s) => s.url.startsWith('http')).map((s) => s.url)
		}).replace(/</g, '\\u003c')}<` + '/script>'
	);
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={canonicalUrl} />

	<!-- Open Graph / Facebook / Discord -->
	<meta property="og:type" content="website" />
	<meta property="og:locale" content="vi_VN" />
	<meta property="og:site_name" content="Kiami Châu" />
	<meta property="og:url" content={page.url.href} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={previewImage} />
	<meta property="og:image:width" content="550" />
	<meta property="og:image:height" content="550" />
	<meta property="og:image:alt" content="{profileData.name} ({profileData.realName})" />

	<!-- Twitter / X (compact summary thumbnail) -->
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={previewImage} />

	<!-- Theme Color -->
	<meta name="theme-color" content="#944c68" media="(prefers-color-scheme: light)" />
	<meta name="theme-color" content="#1b171c" media="(prefers-color-scheme: dark)" />

	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html personJsonLd}
</svelte:head>

<Portal stats={data.stats} />
