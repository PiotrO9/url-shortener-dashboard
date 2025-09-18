export interface ShortLink {
	id: string;
	originalUrl: string;
	shortCode: string;
	shortUrl: string;
	title: string;
	description?: string;
	createdAt: string;
	clicks: number;
	isActive: boolean;
	tags: string[];
}

export interface ClickData {
	id: string;
	linkId: string;
	timestamp: string;
	ipAddress: string;
	userAgent: string;
	country: string;
	city: string;
	referrer?: string;
}

export interface StatsData {
	totalLinks: number;
	totalClicks: number;
	activeLinks: number;
	clicksToday: number;
	clicksThisWeek: number;
	clicksThisMonth: number;
	topCountry: string;
	topReferrer: string;
}

export interface ChartData {
	date: string;
	clicks: number;
	links: number;
}

export interface DashboardData {
	stats: StatsData;
	recentLinks: ShortLink[];
	clickHistory: ChartData[];
	topLinks: ShortLink[];
}
