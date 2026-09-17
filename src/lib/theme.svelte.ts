import { browser } from '$app/environment';

class ThemeState {
	isDark = $state(
		browser && typeof document !== 'undefined' && document.documentElement
			? document.documentElement.classList.contains('dark')
			: false
	);

	init() {
		if (!browser) return;
		this.isDark = document.documentElement.classList.contains('dark');
	}

	toggle() {
		if (!browser) return;
		this.isDark = !this.isDark;
		if (this.isDark) {
			document.documentElement.classList.add('dark');
			localStorage.setItem('theme', 'dark');
		} else {
			document.documentElement.classList.remove('dark');
			localStorage.setItem('theme', 'light');
		}
	}
}

export const theme = new ThemeState();
