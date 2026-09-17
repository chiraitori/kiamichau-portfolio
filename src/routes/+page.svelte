<script lang="ts">
	import { page } from '$app/state';
	import Portal from '$lib/components/Portal.svelte';

	const title = 'Kiami Châu · Trang liên kết chính thức';
	const description =
		'Trang thông tin, mạng xã hội và cổng donate chính thức của Kiami Châu (Châu Hoàng Long) · VTuber & Content Creator.';
	const previewImage = $derived(`${page.url.origin}/preview.png`);
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />

	<!-- Open Graph / Facebook / Discord -->
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="Kiami Châu" />
	<meta property="og:url" content={page.url.href} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={previewImage} />

	<!-- Twitter / X -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={previewImage} />

	<!-- Theme Color for Discord Embed Accent Bar -->
	<meta name="theme-color" content="#d4618c" />
</svelte:head>

<Portal />
