<script lang="ts">
	import { profileData } from '$lib/data';
	import { MapPin, Translate } from 'phosphor-svelte';
</script>

<section id="about" class="space-y-4 border-t border-[var(--line)] pt-6 pb-2">
	<div class="flex items-center justify-between">
		<h2 class="text-xl font-bold tracking-tight text-[var(--ink)]">About me</h2>
		<span class="font-mono text-xs font-bold text-[var(--accent)]"> @kiamichau </span>
	</div>

	<div class="max-w-2xl space-y-3 text-sm leading-relaxed text-[var(--ink-muted)]">
		<p>
			Hellu mọi người! Mình là <strong class="text-[var(--ink)]">{profileData.realName}</strong>
			(thường được biết đến với tên gọi
			<strong class="text-[var(--ink)]">{profileData.name}</strong>), sinh năm
			{profileData.birthYear} và hiện đang sống tại {profileData.location}.
		</p>
		<p>
			Hành trình làm content creator và stream của mình bắt đầu từ niềm đam mê kết nối, lan tỏa
			những khoảnh khắc giải trí và tạo nên một không gian giao lưu ấm cúng cho cộng đồng. Mình
			thích chơi game, trò chuyện, làm reaction video và xây dựng các kỷ niệm đáng nhớ cùng mọi
			người tại "Thánh Đường".
		</p>
	</div>

	<!-- Flattened Metadata Specs -->
	<div class="flex flex-wrap items-center gap-x-3 gap-y-2 pt-1 text-xs text-[var(--ink-muted)]">
		<span class="font-medium text-[var(--ink)]">{profileData.title}</span>
		<span class="font-bold text-[var(--line)] select-none">/</span>
		<span>Vtuber</span>
		<span class="font-bold text-[var(--line)] select-none">/</span>
		<span class="inline-flex items-center gap-1">
			<MapPin size={13} weight="bold" class="text-[var(--accent)]" />
			<span>{profileData.location}</span>
		</span>
		<span class="font-bold text-[var(--line)] select-none">/</span>
		<span class="inline-flex items-center gap-1">
			<Translate size={13} weight="bold" class="text-[var(--accent)]" />
			<span>{profileData.languages.join(' & ')}</span>
		</span>
	</div>
</section>
