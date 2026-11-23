<script lang="ts">
	import { tick } from 'svelte';
	import { profileData } from '$lib/data';
	import { clipboard } from '$lib/clipboard.svelte';
	import { Coffee, PaypalLogo, ArrowRight, ArrowUpRight, X, Copy, Check } from 'phosphor-svelte';
	import { fade, fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';

	const bank = profileData.bankDetails;

	let isBankModalOpen = $state(false);
	let closeButtonEl = $state<HTMLButtonElement | null>(null);
	let previousFocusEl: HTMLElement | null = null;

	const copiedField = $derived(
		clipboard.copiedField === 'stk' || clipboard.copiedField === 'name'
			? clipboard.copiedField
			: null
	);

	function openModal() {
		previousFocusEl = document.activeElement instanceof HTMLElement ? document.activeElement : null;
		isBankModalOpen = true;
	}

	function closeModal() {
		isBankModalOpen = false;
		previousFocusEl?.focus();
		previousFocusEl = null;
	}

	$effect(() => {
		if (isBankModalOpen) {
			const originalOverflow = document.body.style.overflow;
			document.body.style.overflow = 'hidden';
			void tick().then(() => closeButtonEl?.focus());
			return () => {
				document.body.style.overflow = originalOverflow;
			};
		}
	});
</script>

<svelte:window
	onkeydown={(e) => {
		if (isBankModalOpen && e.key === 'Escape') {
			e.preventDefault();
			closeModal();
		}
	}}
/>

<section id="donations">
	<div class="space-y-4">
		<div class="flex items-center justify-between border-b border-[var(--line)] pb-3">
			<div>
				<div class="flex items-center gap-2">
					<div
						class="flex h-7 w-7 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)]"
					>
						<Coffee size={16} weight="bold" />
					</div>
					<h2 class="text-lg font-bold tracking-tight text-[var(--ink)]">Cổng Donate & Ủng Hộ</h2>
				</div>
				<p class="mt-1 text-xs text-[var(--ink-muted)]">
					Tiếp thêm năng lượng để Kiami duy trì và nâng cao chất lượng nội dung
				</p>
			</div>
		</div>

		<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
			{#each profileData.donations as d (d.name)}
				{@const isBank = d.iconKey === 'bank'}
				<a
					href={d.url}
					target={isBank ? undefined : '_blank'}
					rel="external noopener noreferrer"
					onclick={(e) => {
						if (isBank) {
							e.preventDefault();
							openModal();
						}
					}}
					class="chiraitori-card group flex cursor-pointer flex-col justify-between space-y-4 rounded-3xl p-5 active:scale-[0.98] {d.recommended
						? 'border-[var(--accent)] bg-[var(--accent-soft)]/25'
						: ''}"
				>
					<div class="space-y-3">
						<div class="flex items-center justify-between">
							<div
								class="flex h-10 w-10 items-center justify-center overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-1.5 shadow-sm transition-colors duration-200 group-hover:border-[var(--accent)] group-hover:bg-[var(--surface-hover)]"
							>
								{#if d.iconKey === 'bank'}
									<img
										src="/icons/vietcombank.png"
										alt="Vietcombank"
										width="24"
										height="24"
										loading="lazy"
										decoding="async"
										class="h-6 w-6 object-contain"
									/>
								{:else if d.iconKey === 'qrcode'}
									<img
										src="/icons/wescan.jpg"
										alt="WESCAN"
										width="28"
										height="28"
										loading="lazy"
										decoding="async"
										class="h-7 w-7 rounded-lg object-contain shadow-xs"
									/>
								{:else if d.iconKey === 'globe'}
									<img
										src="/icons/sociabuzz.png"
										alt="Sociabuzz"
										width="24"
										height="24"
										loading="lazy"
										decoding="async"
										class="h-6 w-6 object-contain"
									/>
								{:else if d.iconKey === 'creditcard'}
									<div class="flex items-center justify-center text-[#00457C] dark:text-[#0079C1]">
										<PaypalLogo size={22} weight="fill" />
									</div>
								{:else if d.iconKey === 'gift'}
									<img
										src="/icons/gank.png"
										alt="Gank"
										width="28"
										height="28"
										loading="lazy"
										decoding="async"
										class="h-7 w-7 object-contain"
									/>
								{:else if d.iconKey === 'zypage'}
									<img
										src="/icons/zypage.png"
										alt="ZyPage"
										width="24"
										height="24"
										loading="lazy"
										decoding="async"
										class="h-6 w-6 rounded-md object-contain"
									/>
								{:else}
									<Coffee size={20} weight="bold" class="text-[var(--accent)]" />
								{/if}
							</div>

							{#if d.recommended}
								<span
									class="rounded-full bg-[var(--accent)] px-2.5 py-0.5 text-[9px] font-bold text-[var(--on-accent)] shadow-xs"
								>
									Khuyên dùng
								</span>
							{/if}
						</div>

						<div class="space-y-1">
							<h3
								class="text-sm font-bold text-[var(--ink)] transition-colors group-hover:text-[var(--accent)]"
							>
								{d.name}
							</h3>
							<p class="text-xs leading-relaxed text-[var(--ink-muted)]">{d.note}</p>
							{#if d.noStreamAlert}
								<p
									class="flex items-center gap-1.5 pt-0.5 text-[11px] font-medium text-[var(--ink-muted)]"
								>
									<span class="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]"></span>
									<span>Không có thông báo lên stream</span>
								</p>
							{/if}
						</div>
					</div>

					<div
						class="flex items-center justify-between border-t border-[var(--line)] pt-2 text-xs font-semibold text-[var(--accent)]"
					>
						<span>{isBank ? 'Xem QR & Số tài khoản' : 'Mở cổng ủng hộ'}</span>
						<ArrowRight
							size={14}
							weight="bold"
							class="transition-transform duration-300 ease-[var(--bezier-one)] group-hover:translate-x-1.5"
						/>
					</div>
				</a>
			{/each}
		</div>
	</div>

	<!-- Banking Popup Modal -->
	{#if isBankModalOpen}
		<div
			role="dialog"
			aria-modal="true"
			aria-labelledby="bank-modal-title"
			tabindex="-1"
			transition:fade={{ duration: 200 }}
			class="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-3.5 backdrop-blur-md sm:p-6"
			onclick={(e) => {
				if (e.target === e.currentTarget) closeModal();
			}}
			onkeydown={(e) => {
				if (e.key === 'Escape') closeModal();
			}}
		>
			<div
				transition:fly={{ y: 80, duration: 320, easing: cubicOut }}
				class="relative my-auto w-full max-w-[440px] overflow-hidden rounded-3xl border border-[var(--line)] bg-[var(--surface)] shadow-2xl"
			>
				<!-- Modal Header -->
				<div
					class="flex items-center justify-between border-b border-[var(--line)] bg-[var(--page)] px-5 py-3.5"
				>
					<div class="flex items-center gap-3">
						<div
							class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[var(--line)] bg-[var(--surface)] p-1 shadow-sm"
						>
							<img
								src="/icons/vietcombank.png"
								alt={bank.bankName}
								width="24"
								height="24"
								loading="lazy"
								decoding="async"
								class="h-6 w-6 object-contain"
							/>
						</div>
						<div>
							<h3 id="bank-modal-title" class="text-base leading-tight font-bold text-[var(--ink)]">
								Ủng hộ qua {bank.bankName}
							</h3>
							<p class="text-xs text-[var(--ink-muted)]">Quét mã QR hoặc sao chép thông tin</p>
						</div>
					</div>

					<div class="flex items-center gap-2">
						<picture class="block">
							<source srcset="/donations/vcb-cat1.webp" type="image/webp" />
							<img
								src="/donations/vcb-cat1.gif"
								alt="Cheering"
								width="64"
								height="36"
								loading="lazy"
								decoding="async"
								class="h-9 w-auto rounded-lg object-contain"
							/>
						</picture>
						<button
							bind:this={closeButtonEl}
							type="button"
							onclick={closeModal}
							class="cursor-pointer rounded-xl p-1.5 text-[var(--ink-muted)] transition-colors hover:bg-[var(--surface-hover)] hover:text-[var(--ink)]"
							aria-label="Đóng"
						>
							<X size={18} weight="bold" />
						</button>
					</div>
				</div>

				<!-- Modal Body -->
				<div class="no-scrollbar max-h-[85vh] space-y-3 overflow-y-auto p-4">
					<!-- QR Code Container -->
					<div
						class="flex flex-col items-center justify-center space-y-2 rounded-2xl border border-[var(--line)] bg-[var(--page)] p-3 text-center"
					>
						<div class="rounded-xl border border-neutral-200 bg-white p-2 shadow-xs">
							<picture class="mx-auto block">
								<source srcset={bank.qrWebpUrl} type="image/webp" />
								<img
									src={bank.qrJpgUrl}
									alt="Mã QR {bank.bankName}"
									width="176"
									height="176"
									loading="lazy"
									decoding="async"
									class="mx-auto block h-40 w-40 object-contain sm:h-44 sm:w-44"
								/>
							</picture>
						</div>
						<div class="space-y-0.5">
							<p class="text-xs font-bold text-[var(--ink)] sm:text-sm">
								Mã QR {bank.bankName} (VietQR)
							</p>
							<p class="text-[11px] text-[var(--ink-muted)] sm:text-xs">
								Mở app ngân hàng bất kỳ để quét mã nhanh
							</p>
						</div>
					</div>

					<!-- Bank Details with 1-click Copy -->
					<div class="space-y-2 text-xs">
						<div
							class="flex items-center justify-between gap-2 rounded-xl border border-[var(--line)] bg-[var(--page)] p-2.5 px-3.5"
						>
							<div>
								<span
									class="block font-mono text-[11px] font-bold tracking-wider text-[var(--ink-muted)] uppercase"
								>
									Ngân hàng
								</span>
								<p class="text-sm font-bold text-[var(--ink)]">{bank.bankName}</p>
							</div>
							<span class="text-xs font-medium text-[var(--ink-muted)]">{bank.bankFullName}</span>
						</div>

						<!-- Account Number (STK) -->
						<div
							class="flex items-center justify-between gap-2.5 rounded-xl border border-[var(--line)] bg-[var(--page)] p-2.5 px-3.5"
						>
							<div class="min-w-0 flex-1">
								<span
									class="block font-mono text-[11px] font-bold tracking-wider text-[var(--ink-muted)] uppercase"
								>
									Số tài khoản
								</span>
								<p
									class="font-mono text-base font-black tracking-wider whitespace-nowrap text-[var(--accent)] select-all sm:text-lg"
								>
									{bank.accountNumber}
								</p>
							</div>
							<button
								type="button"
								onclick={() => void clipboard.copy(bank.accountNumber, 'stk')}
								class="flex shrink-0 cursor-pointer items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold shadow-xs transition-all {copiedField ===
								'stk'
									? 'bg-emerald-500 text-white'
									: 'border border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] hover:bg-[var(--accent)] hover:text-[var(--on-accent)]'}"
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
						<div
							class="flex items-center justify-between gap-2.5 rounded-xl border border-[var(--line)] bg-[var(--page)] p-2.5 px-3.5"
						>
							<div class="min-w-0 flex-1">
								<span
									class="block font-mono text-[11px] font-bold tracking-wider text-[var(--ink-muted)] uppercase"
								>
									Chủ tài khoản
								</span>
								<p class="text-sm font-bold whitespace-nowrap text-[var(--ink)] select-all">
									{bank.accountHolder}
								</p>
							</div>
							<button
								type="button"
								onclick={() => void clipboard.copy(bank.accountHolder, 'name')}
								class="flex shrink-0 cursor-pointer items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold shadow-xs transition-all {copiedField ===
								'name'
									? 'bg-emerald-500 text-white'
									: 'border border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] hover:bg-[var(--accent)] hover:text-[var(--on-accent)]'}"
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

					<!-- Stream Alert Notice -->
					<div
						class="flex items-start gap-2.5 rounded-2xl border border-[var(--line)] bg-[var(--page)] p-3 px-3.5 text-xs"
					>
						<span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-[var(--accent)]"></span>
						<p class="text-[11px] leading-relaxed text-[var(--ink)] sm:text-xs">
							<strong class="font-bold text-[var(--accent)]">Lưu ý:</strong> Chuyển khoản ngân hàng
							trực tiếp
							<span class="font-bold text-[var(--ink)]">không có thông báo lên livestream</span>.
							Nếu bạn muốn hiển thị donate và tin nhắn trên stream, hãy dùng cổng
							<strong class="font-bold text-[var(--accent)] underline decoration-dotted"
								>WESCAN</strong
							>
							nhé!
						</p>
					</div>

					<!-- Message Note -->
					<div
						class="flex items-center gap-3 rounded-2xl border border-[var(--accent)]/30 bg-[var(--accent-soft)]/35 p-3"
					>
						<picture class="block shrink-0">
							<source srcset="/donations/vcb-cat2.webp" type="image/webp" />
							<img
								src="/donations/vcb-cat2.gif"
								alt="Tohru"
								width="48"
								height="48"
								loading="lazy"
								decoding="async"
								class="h-12 w-12 rounded-xl border border-white/10 object-cover shadow-xs"
							/>
						</picture>
						<div class="space-y-0.5 text-[var(--ink)]">
							<p class="text-xs font-bold tracking-wider text-[var(--accent)] uppercase">
								Lời nhắn từ Kiami Châu
							</p>
							<p class="text-xs leading-relaxed text-[var(--ink)] italic">
								{bank.messageQuote}
							</p>
						</div>
					</div>
				</div>

				<!-- Modal Footer -->
				<div
					class="flex items-center justify-between gap-3 border-t border-[var(--line)] bg-[var(--page)] px-5 py-3"
				>
					<a
						href={bank.carrdUrl}
						target="_blank"
						rel="external noopener noreferrer"
						class="flex items-center gap-1 text-xs font-semibold text-[var(--ink-muted)] transition-colors hover:text-[var(--accent)] hover:underline"
					>
						<span>Mở trang Carrd gốc</span>
						<ArrowUpRight size={13} weight="bold" />
					</a>

					<button
						type="button"
						onclick={closeModal}
						class="cursor-pointer rounded-full bg-[var(--accent)] px-5 py-1.5 text-xs font-bold text-[var(--on-accent)] shadow-xs transition-all hover:opacity-95 active:scale-95"
					>
						Xong
					</button>
				</div>
			</div>
		</div>
	{/if}
</section>
