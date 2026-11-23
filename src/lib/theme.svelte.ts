import { browser } from '$app/environment';

class ThemeState {
	isDark = $state(
		browser && typeof document !== 'undefined' && document.documentElement
			? document.documentElement.classList.contains('dark')
			: false
	);

	init(): () => void {
		if (!browser) return () => {};
		this.isDark = document.documentElement.classList.contains('dark');

		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
		const onChange = (e: MediaQueryListEvent) => {
			try {
				if (!localStorage.getItem('theme')) {
					this.isDark = e.matches;
					document.documentElement.classList.toggle('dark', e.matches);
				}
			} catch {
				// Ignore storage access errors
			}
		};

		mediaQuery.addEventListener('change', onChange);
		return () => mediaQuery.removeEventListener('change', onChange);
	}

	toggle() {
		if (!browser) return;
		this.isDark = !this.isDark;
		document.documentElement.classList.toggle('dark', this.isDark);
		try {
			localStorage.setItem('theme', this.isDark ? 'dark' : 'light');
		} catch {
			// Ignore storage access errors
		}
	}
}

export const theme = new ThemeState();
