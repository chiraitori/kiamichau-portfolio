export interface SocialLink {
	name: string;
	url: string;
	handle: string;
	category: 'social' | 'community' | 'contact';
	iconSlug?: string;
	iconKey?: 'youtube' | 'tiktok' | 'facebook' | 'discord' | 'x' | 'email';
	badge?: string;
	description?: string;
}

export interface DonationLink {
	name: string;
	url: string;
	accountInfo?: string;
	note?: string;
	recommended?: boolean;
	iconKey?: 'bank' | 'qrcode' | 'globe' | 'creditcard' | 'gift' | 'zypage';
	noStreamAlert?: boolean;
}

export interface CreatorStats {
	youtubeSubs: string;
	tiktokFollowers: string;
}

export interface CreatorProfile {
	name: string;
	realName: string;
	title: string;
	birthYear: number;
	location: string;
	languages: string[];
	email: string;
	avatarUrl: string;
	bannerUrl: string;
	cardUrl: string;
	bioGreeting: string;
	warning: string;
	scheduleNote: string;
	discordTip: string;
	discordDemoVideoUrl?: string;
	stats?: CreatorStats;
	socials: SocialLink[];
	donations: DonationLink[];
}

export const profileData: CreatorProfile = {
	name: 'Kiami Châu',
	realName: 'Châu Hoàng Long',
	title: 'Content Creator & Streamer',
	birthYear: 2001,
	location: 'TP. Hồ Chí Minh, Việt Nam',
	languages: ['Tiếng Việt', 'English'],
	email: 'kiamichau@gmail.com',
	avatarUrl: '/avatar.png',
	bannerUrl: '/banner.jpg',
	cardUrl: '/card.jpg',
	bioGreeting: 'Hellu mọi người! Mình là Kiami Châu, một content creator & streamer tự do.',
	warning: 'NGOÀI CÁC ACCOUNT MÌNH ĐỂ Ở ĐÂY THÌ MÌNH KHÔNG CÓ BẤT KÌ TÀI KHOẢN NÀO KHÁC.',
	scheduleNote: 'Lịch stream mình có thông báo chi tiết trong Discord. Lịch phát sóng có thể linh hoạt theo tuần nên các bạn nhớ vào Discord để nhận thông báo sớm nhất nhé.',
	discordTip: 'Nếu gặp lỗi không mở được link mời trực tiếp, bạn hãy tìm từ khóa "Thánh đường Kiamị Châu" trong mục Khám phá (Discover) của Discord.',
	discordDemoVideoUrl: 'https://pub-dacee17aa371477bb160dbcf7313433e.r2.dev/demo/video/discord-demo-1080.mp4',
	stats: {
		youtubeSubs: '10.7K',
		tiktokFollowers: '48.7K'
	},
	socials: [
		{
			name: 'YouTube',
			url: 'https://www.youtube.com/@KiamiChau?sub_confirmation=1',
			handle: '@KiamiChau',
			category: 'social',
			iconKey: 'youtube',
			description: 'Video highlight, reaction & series dài tập'
		},
		{
			name: 'TikTok',
			url: 'https://www.tiktok.com/@kiami.chau',
			handle: '@kiami.chau',
			category: 'social',
			iconKey: 'tiktok',
			description: 'Short clips, funny moments hàng ngày'
		},
		{
			name: 'Facebook',
			url: 'https://www.facebook.com/kiamichau/',
			handle: 'kiamichau',
			category: 'social',
			iconKey: 'facebook',
			description: 'Cập nhật đời sống & thông báo fanpage'
		},
		{
			name: 'Discord',
			url: 'https://discord.com/servers/thanh-duong-kiami-chau-1078935785522331688',
			handle: 'Thánh đường Kiamị Châu',
			category: 'community',
			iconKey: 'discord',
			badge: 'Official Sanctuary',
			description: 'Giao lưu cộng đồng & cập nhật lịch stream tức thì'
		},
		{
			name: 'X (Twitter)',
			url: 'https://x.com/KiamiChau',
			handle: '@KiamiChau',
			category: 'social',
			iconKey: 'x',
			description: 'Thoughts & cập nhật nhanh'
		},
		{
			name: 'Email',
			url: 'mailto:kiamichau@gmail.com',
			handle: 'kiamichau@gmail.com',
			category: 'contact',
			iconKey: 'email',
			description: 'Liên hệ công việc & hợp tác'
		}
	],
	donations: [
		{
			name: 'Vietcombank',
			url: 'https://kiamibanking.carrd.co/',
			iconKey: 'bank',
			note: 'Chuyển khoản trực tiếp qua ngân hàng',
			recommended: true,
			noStreamAlert: true
		},
		{
			name: 'WESCAN',
			url: 'https://wescan.vn/kiamichau',
			iconKey: 'qrcode',
			note: 'Cổng donate quét mã QR & thông báo live'
		},
		{
			name: 'Sociabuzz',
			url: 'https://sociabuzz.com/kiamichau/donate',
			iconKey: 'globe',
			note: 'Ủng hộ tiện lợi qua cổng quốc tế'
		},
		{
			name: 'PayPal',
			url: 'https://www.paypal.com/paypalme/KiamiChau',
			iconKey: 'creditcard',
			note: 'Dành cho anh em bạn bè quốc tế'
		},
		{
			name: 'Gank',
			url: 'https://ganknow.com/KiamiChau/tip',
			iconKey: 'gift',
			note: 'Tip & quà tặng creator'
		},
		{
			name: 'ZyPage',
			url: 'https://zypage.com/kiamichau',
			iconKey: 'zypage',
			note: 'Cổng donate & ủng hộ tiện lợi',
			noStreamAlert: true
		}
	]
};
