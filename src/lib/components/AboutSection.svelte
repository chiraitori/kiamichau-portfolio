<script lang="ts">
	import { profileData } from '$lib/data';
	import { MapPin, Translate } from 'phosphor-svelte';
</script>

<section id="about" class="pt-6 pb-2 space-y-4 border-t border-[var(--line)]">
	<div class="flex items-center justify-between">
		<h2 class="text-xl font-bold tracking-tight text-[var(--ink)]">About me</h2>
		<span class="text-xs font-mono text-[var(--accent)] font-bold">
			@kiamichau
		</span>
	</div>

	<div class="space-y-3 text-sm leading-relaxed text-[var(--ink-muted)] max-w-2xl">
		<p>
			Hellu mọi người! Mình là <strong class="text-[var(--ink)]">{profileData.realName}</strong> (thường được biết đến với tên gọi <strong class="text-[var(--ink)]">{profileData.name}</strong>), sinh năm {profileData.birthYear} và hiện đang sống tại TP. Hồ Chí Minh.
		</p>
		<p>
			Hành trình làm content creator và stream của mình bắt đầu từ niềm đam mê kết nối, lan tỏa những khoảnh khắc giải trí và tạo nên một không gian giao lưu ấm cúng cho cộng đồng. Mình thích chơi game, trò chuyện, làm reaction video và xây dựng các kỷ niệm đáng nhớ cùng mọi người tại "Thánh Đường".
		</p>
	</div>

	<!-- Flattened Metadata Specs (No pill overload, clean editorial dividers) -->
	<div class="pt-1 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-[var(--ink-muted)]">
		<span class="font-medium text-[var(--ink)]">Content Creator & Streamer</span>
		<span class="text-[var(--line)] font-bold select-none">/</span>
		<span>Vtuber</span>
		<span class="text-[var(--line)] font-bold select-none">/</span>
		<span class="inline-flex items-center gap-1">
			<MapPin size={13} weight="bold" class="text-[var(--accent)]" />
			TP. Hồ Chí Minh
		</span>
		<span class="text-[var(--line)] font-bold select-none">/</span>
		<span class="inline-flex items-center gap-1">
			<Translate size={13} weight="bold" class="text-[var(--accent)]" />
			Tiếng Việt & English
		</span>
	</div>
</section>
