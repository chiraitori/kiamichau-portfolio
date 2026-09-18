<script lang="ts">
	import { profileData } from '$lib/data';
	import { Coffee, PaypalLogo, ArrowRight, ArrowUpRight, X, Copy, Check } from 'phosphor-svelte';
	import { fade, fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';

	let isBankModalOpen = $state(false);
	let copiedField = $state<'stk' | 'name' | null>(null);

	$effect(() => {
		if (isBankModalOpen) {
			const originalOverflow = document.body.style.overflow;
			document.body.style.overflow = 'hidden';
			return () => {
				document.body.style.overflow = originalOverflow;
			};
		}
	});

	function copyText(text: string, field: 'stk' | 'name') {
		navigator.clipboard.writeText(text);
		copiedField = field;
		setTimeout(() => {
			if (copiedField === field) copiedField = null;
		}, 2000);
	}
</script>

<section id="donations">
	<div class="space-y-4">
		<div class="flex items-center justify-between border-b border-[var(--line)] pb-3">
		<div>
			<div class="flex items-center gap-2">
				<div class="w-7 h-7 rounded-xl bg-[var(--accent-soft)] flex items-center justify-center text-[var(--accent)]">
					<Coffee size={16} weight="bold" />
				</div>
				<h2 class="text-lg font-bold tracking-tight text-[var(--ink)]">Cổng Donate & Ủng Hộ</h2>
			</div>
			<p class="text-xs text-[var(--ink-muted)] mt-1">Tiếp thêm năng lượng để Kiami duy trì và nâng cao chất lượng nội dung</p>
		</div>
	</div>

	<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
		{#each profileData.donations as d}
			<a
				href={d.url}
				target={d.name.toLowerCase().includes('vietcombank') ? undefined : '_blank'}
				rel={d.name.toLowerCase().includes('vietcombank') ? undefined : 'noreferrer'}
				onclick={(e) => {
					if (d.name.toLowerCase().includes('vietcombank')) {
						e.preventDefault();
						isBankModalOpen = true;
					}
				}}
				class="chiraitori-card p-5 rounded-3xl active:scale-[0.98] flex flex-col justify-between space-y-4 group cursor-pointer {d.recommended ? 'border-[var(--accent)] bg-[var(--accent-soft)]/25' : ''}"
			>
				<div class="space-y-3">
					<div class="flex items-center justify-between">
						<div class="w-10 h-10 rounded-2xl bg-[var(--surface)] border border-[var(--line)] flex items-center justify-center p-1.5 shadow-sm group-hover:border-[var(--accent)] group-hover:bg-[var(--surface-hover)] transition-colors duration-200 overflow-hidden">
							{#if d.name.toLowerCase().includes('vietcombank')}
								<img src="/icons/vietcombank.png" alt="Vietcombank" width="24" height="24" loading="lazy" decoding="async" class="w-6 h-6 object-contain" />
							{:else if d.name.toLowerCase().includes('wescan')}
								<img src="/icons/wescan.jpg" alt="WESCAN" width="28" height="28" loading="lazy" decoding="async" class="w-7 h-7 rounded-lg object-contain shadow-xs" />
							{:else if d.name.toLowerCase().includes('sociabuzz')}
								<img src="/icons/sociabuzz.png" alt="Sociabuzz" width="24" height="24" loading="lazy" decoding="async" class="w-6 h-6 object-contain" />
							{:else if d.name.toLowerCase().includes('paypal')}
								<div class="text-[#00457C] dark:text-[#0079C1] flex items-center justify-center">
									<PaypalLogo size={22} weight="fill" />
								</div>
							{:else if d.name.toLowerCase().includes('gank')}
								<img src="/icons/gank.png" alt="Gank" width="28" height="28" loading="lazy" decoding="async" class="w-7 h-7 object-contain" />
							{:else if d.name.toLowerCase().includes('zypage')}
								<img src="/icons/zypage.png" alt="ZyPage" width="24" height="24" loading="lazy" decoding="async" class="w-6 h-6 object-contain rounded-md" />
							{:else}
								<Coffee size={20} weight="bold" class="text-[var(--accent)]" />
							{/if}
						</div>

						{#if d.recommended}
							<span class="text-[9px] px-2.5 py-0.5 rounded-full bg-[var(--accent)] text-[var(--on-accent)] font-bold shadow-xs">
								Khuyên dùng
							</span>
						{/if}
					</div>

					<div class="space-y-1">
						<h3 class="text-sm font-bold text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors">
							{d.name}
						</h3>
						<p class="text-xs text-[var(--ink-muted)] leading-relaxed">{d.note}</p>
						{#if d.noStreamAlert}
							<p class="text-[11px] text-[var(--ink-muted)] font-medium flex items-center gap-1.5 pt-0.5">
								<span class="w-1.5 h-1.5 rounded-full bg-[var(--accent)] shrink-0"></span>
								<span>Không có thông báo lên stream</span>
							</p>
						{/if}
					</div>
				</div>

				<div class="flex items-center justify-between text-xs font-semibold text-[var(--accent)] pt-2 border-t border-[var(--line)]">
					<span>{d.name.toLowerCase().includes('vietcombank') ? 'Xem QR & Số tài khoản' : 'Mở cổng ủng hộ'}</span>
					<ArrowRight size={14} weight="bold" class="group-hover:translate-x-1.5 transition-transform duration-300 ease-[var(--bezier-one)]" />
				</div>
			</a>
		{/each}
	</div>
	</div>

	<!-- Banking Popup Modal from Bottom to Center -->
	{#if isBankModalOpen}
		<div
			role="dialog"
			aria-modal="true"
			tabindex="-1"
			transition:fade={{ duration: 200 }}
			class="fixed inset-0 z-50 flex items-center justify-center p-3.5 sm:p-6 bg-black/75 backdrop-blur-md !m-0"
			onclick={(e) => {
				if (e.target === e.currentTarget) isBankModalOpen = false;
			}}
			onkeydown={(e) => {
				if (e.key === 'Escape') isBankModalOpen = false;
			}}
		>
		<div
			transition:fly={{ y: 80, duration: 320, easing: cubicOut }}
			class="relative max-w-[440px] w-full bg-[var(--surface)] rounded-3xl border border-[var(--line)] shadow-2xl overflow-hidden my-auto"
		>
			<!-- Modal Header -->
			<div class="flex items-center justify-between px-5 py-3.5 border-b border-[var(--line)] bg-[var(--page)]">
				<div class="flex items-center gap-3">
					<div class="w-9 h-9 rounded-xl bg-[var(--surface)] border border-[var(--line)] flex items-center justify-center p-1 shadow-sm shrink-0">
						<img src="/icons/vietcombank.png" alt="Vietcombank" width="24" height="24" loading="lazy" decoding="async" class="w-6 h-6 object-contain" />
					</div>
					<div>
						<h3 class="font-bold text-base text-[var(--ink)] leading-tight">Ủng hộ qua Vietcombank</h3>
						<p class="text-xs text-[var(--ink-muted)]">Quét mã QR hoặc sao chép thông tin</p>
					</div>
				</div>

				<div class="flex items-center gap-2">
					<!-- Gif 1: Shamiko cheering -->
					<img src="/donations/vcb-cat1.gif" alt="Cheering" width="64" height="36" loading="lazy" decoding="async" class="h-9 w-auto rounded-lg object-contain" />
					<button
						type="button"
						onclick={() => (isBankModalOpen = false)}
						class="p-1.5 rounded-xl hover:bg-[var(--surface-hover)] text-[var(--ink-muted)] hover:text-[var(--ink)] transition-colors cursor-pointer"
						aria-label="Đóng"
					>
						<X size={18} weight="bold" />
					</button>
				</div>
			</div>

			<!-- Modal Body: Vertical unified card with no-scrollbar -->
			<div class="p-4 space-y-3 max-h-[85vh] overflow-y-auto no-scrollbar">
				<!-- QR Code Container -->
				<div class="flex flex-col items-center justify-center p-3 rounded-2xl bg-[var(--page)] border border-[var(--line)] space-y-2 text-center">
					<div class="p-2 bg-white rounded-xl shadow-xs border border-neutral-200">
						<picture class="block mx-auto">
							<source srcset="/donations/vcb-qr.webp" type="image/webp" />
							<img src="/donations/vcb-qr.jpg" alt="Mã QR Vietcombank" width="176" height="176" loading="lazy" decoding="async" class="w-40 h-40 sm:w-44 sm:h-44 object-contain block mx-auto" />
						</picture>
					</div>
					<div class="space-y-0.5">
						<p class="font-bold text-xs sm:text-sm text-[var(--ink)]">Mã QR Vietcombank (VietQR)</p>
						<p class="text-[11px] sm:text-xs text-[var(--ink-muted)]">Mở app ngân hàng bất kỳ để quét mã nhanh</p>
					</div>
				</div>

				<!-- Bank Details with 1-click Copy -->
				<div class="space-y-2 text-xs">
					<!-- Bank Name -->
					<div class="p-2.5 px-3.5 rounded-xl bg-[var(--page)] border border-[var(--line)] flex items-center justify-between gap-2">
						<div>
							<span class="text-[11px] font-mono font-bold text-[var(--ink-muted)] uppercase tracking-wider block">Ngân hàng</span>
							<p class="font-bold text-sm text-[var(--ink)]">Vietcombank</p>
						</div>
						<span class="text-xs font-medium text-[var(--ink-muted)]">Ngoại thương Việt Nam</span>
					</div>

					<!-- Account Number (STK) -->
					<div class="p-2.5 px-3.5 rounded-xl bg-[var(--page)] border border-[var(--line)] flex items-center justify-between gap-2.5">
						<div class="min-w-0 flex-1">
							<span class="text-[11px] font-mono font-bold text-[var(--ink-muted)] uppercase tracking-wider block">Số tài khoản</span>
							<p class="font-mono font-black text-base sm:text-lg text-[var(--accent)] tracking-wider select-all whitespace-nowrap">0251002781774</p>
						</div>
						<button
							type="button"
							onclick={() => copyText('0251002781774', 'stk')}
							class="px-3 py-1.5 rounded-lg font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer shrink-0 shadow-xs {copiedField === 'stk'
								? 'bg-emerald-500 text-white'
								: 'bg-[var(--surface)] hover:bg-[var(--accent)] hover:text-[var(--on-accent)] text-[var(--ink)] border border-[var(--line)]'}"
						>
							{#if copiedField === 'stk'}
								<Check size={14} weight="bold" />
								<span>Đã chép!</span>
							{:else}
								<Copy size={14} weight="bold" />
								<span>Sao chép STK</span>
							{/if}
						</button>
					</div>

					<!-- Account Name -->
					<div class="p-2.5 px-3.5 rounded-xl bg-[var(--page)] border border-[var(--line)] flex items-center justify-between gap-2.5">
						<div class="min-w-0 flex-1">
							<span class="text-[11px] font-mono font-bold text-[var(--ink-muted)] uppercase tracking-wider block">Chủ tài khoản</span>
							<p class="font-bold text-sm text-[var(--ink)] select-all whitespace-nowrap">CHAU HOANG LONG</p>
						</div>
						<button
							type="button"
							onclick={() => copyText('CHAU HOANG LONG', 'name')}
							class="px-3 py-1.5 rounded-lg font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer shrink-0 shadow-xs {copiedField === 'name'
								? 'bg-emerald-500 text-white'
								: 'bg-[var(--surface)] hover:bg-[var(--accent)] hover:text-[var(--on-accent)] text-[var(--ink)] border border-[var(--line)]'}"
						>
							{#if copiedField === 'name'}
								<Check size={14} weight="bold" />
								<span>Đã chép!</span>
							{:else}
								<Copy size={14} weight="bold" />
								<span>Sao chép tên</span>
							{/if}
						</button>
					</div>
				</div>

				<!-- Stream Alert Notice (High Contrast Theme Styling) -->
				<div class="p-3 px-3.5 rounded-2xl bg-[var(--page)] border border-[var(--line)] text-xs flex items-start gap-2.5">
					<span class="w-2 h-2 rounded-full bg-[var(--accent)] shrink-0 mt-1"></span>
					<p class="leading-relaxed text-[11px] sm:text-xs text-[var(--ink)]">
						<strong class="font-bold text-[var(--accent)]">Lưu ý:</strong> Chuyển khoản ngân hàng trực tiếp <span class="font-bold text-[var(--ink)]">không có thông báo lên livestream</span>. Nếu bạn muốn hiển thị donate và tin nhắn trên stream, hãy dùng cổng <strong class="font-bold text-[var(--accent)] underline decoration-dotted">WESCAN</strong> nhé!
					</p>
				</div>

				<!-- Message Note with Gif 2: Tohru -->
				<div class="p-3 rounded-2xl bg-[var(--accent-soft)]/35 border border-[var(--accent)]/30 flex items-center gap-3">
					<img src="/donations/vcb-cat2.gif" alt="Tohru" width="48" height="48" loading="lazy" decoding="async" class="w-12 h-12 rounded-xl object-cover shrink-0 shadow-xs border border-white/10" />
					<div class="space-y-0.5 text-[var(--ink)]">
						<p class="font-bold text-xs text-[var(--accent)] uppercase tracking-wider">Lời nhắn từ Kiami Châu</p>
						<p class="text-xs text-[var(--ink)] leading-relaxed italic">
							"P/s: có gì mọi người ghi chú tên mình với kèm theo lời nhắn càng tốt nghen ;> tui sẽ đọc hếttt. Cảm ơn mọi ngườiii ♥"
						</p>
					</div>
				</div>
			</div>

			<!-- Modal Footer -->
			<div class="px-5 py-3 border-t border-[var(--line)] bg-[var(--page)] flex items-center justify-between gap-3">
				<a
					href="https://kiamibanking.carrd.co/"
					target="_blank"
					rel="noreferrer"
					class="text-xs text-[var(--ink-muted)] hover:text-[var(--accent)] font-semibold flex items-center gap-1 hover:underline transition-colors"
				>
					<span>Mở trang Carrd gốc</span>
					<ArrowUpRight size={13} weight="bold" />
				</a>

				<button
					type="button"
					onclick={() => (isBankModalOpen = false)}
					class="px-5 py-1.5 rounded-full bg-[var(--accent)] hover:opacity-95 text-[var(--on-accent)] font-bold text-xs shadow-xs cursor-pointer transition-all active:scale-95"
				>
					Xong
				</button>
			</div>
		</div>
	</div>
{/if}
</section>
