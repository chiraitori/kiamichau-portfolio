export type CopyField = 'email' | 'stk' | 'name';

class ClipboardState {
	copiedField = $state<CopyField | null>(null);
	private timeoutId: ReturnType<typeof setTimeout> | null = null;

	async copy(text: string, field: CopyField): Promise<boolean> {
		let ok = false;

		try {
			if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
				await navigator.clipboard.writeText(text);
				ok = true;
			}
		} catch {
			ok = false;
		}

		if (!ok && typeof document !== 'undefined') {
			try {
				const textarea = document.createElement('textarea');
				textarea.value = text;
				textarea.setAttribute('readonly', '');
				textarea.style.position = 'fixed';
				textarea.style.opacity = '0';
				document.body.appendChild(textarea);
				textarea.select();
				ok = document.execCommand('copy');
				document.body.removeChild(textarea);
			} catch {
				ok = false;
			}
		}

		if (ok) {
			this.copiedField = field;
			if (this.timeoutId !== null) {
				clearTimeout(this.timeoutId);
			}
			this.timeoutId = setTimeout(() => {
				if (this.copiedField === field) {
					this.copiedField = null;
				}
				this.timeoutId = null;
			}, 2000);
		}

		return ok;
	}
}

export const clipboard = new ClipboardState();
