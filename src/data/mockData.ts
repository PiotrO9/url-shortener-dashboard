import type {
	DashboardData,
	ShortLink,
	ClickData,
	StatsData,
	ChartData,
} from '../types';

export const mockShortLinks: ShortLink[] = [
	{
		id: '1',
		originalUrl: 'https://www.google.com',
		shortCode: 'abc123',
		shortUrl: 'https://short.ly/abc123',
		title: 'Google Search',
		description: 'Main Google search page',
		createdAt: '2024-01-15T10:30:00Z',
		clicks: 1250,
		isActive: true,
		tags: ['search', 'google'],
	},
	{
		id: '2',
		originalUrl: 'https://github.com/microsoft/vscode',
		shortCode: 'def456',
		shortUrl: 'https://short.ly/def456',
		title: 'VS Code Repository',
		description: 'Visual Studio Code source code',
		createdAt: '2024-01-14T14:20:00Z',
		clicks: 890,
		isActive: true,
		tags: ['development', 'vscode'],
	},
	{
		id: '3',
		originalUrl: 'https://stackoverflow.com/questions/tagged/react',
		shortCode: 'ghi789',
		shortUrl: 'https://short.ly/ghi789',
		title: 'React Questions',
		description: 'Stack Overflow React questions',
		createdAt: '2024-01-13T09:15:00Z',
		clicks: 2100,
		isActive: true,
		tags: ['react', 'stackoverflow'],
	},
	{
		id: '4',
		originalUrl: 'https://tailwindcss.com/docs',
		shortCode: 'jkl012',
		shortUrl: 'https://short.ly/jkl012',
		title: 'TailwindCSS Documentation',
		description: 'Official TailwindCSS documentation',
		createdAt: '2024-01-12T16:45:00Z',
		clicks: 750,
		isActive: true,
		tags: ['css', 'tailwind'],
	},
	{
		id: '5',
		originalUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
		shortCode: 'mno345',
		shortUrl: 'https://short.ly/mno345',
		title: 'Rick Roll Video',
		description: 'Never gonna give you up',
		createdAt: '2024-01-11T12:00:00Z',
		clicks: 500,
		isActive: false,
		tags: ['video', 'fun'],
	},
];

export const mockClickData: ClickData[] = [
	{
		id: '1',
		linkId: '1',
		timestamp: '2024-01-15T10:35:00Z',
		ipAddress: '192.168.1.1',
		userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
		country: 'Poland',
		city: 'Warsaw',
		referrer: 'https://google.com',
	},
	{
		id: '2',
		linkId: '1',
		timestamp: '2024-01-15T11:20:00Z',
		ipAddress: '192.168.1.2',
		userAgent:
			'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
		country: 'Germany',
		city: 'Berlin',
		referrer: 'https://facebook.com',
	},
	{
		id: '3',
		linkId: '2',
		timestamp: '2024-01-15T12:10:00Z',
		ipAddress: '192.168.1.3',
		userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36',
		country: 'United States',
		city: 'New York',
		referrer: 'https://twitter.com',
	},
];

export const mockStatsData: StatsData = {
	totalLinks: 5,
	totalClicks: 5490,
	activeLinks: 4,
	clicksToday: 45,
	clicksThisWeek: 320,
	clicksThisMonth: 1200,
	topCountry: 'Poland',
	topReferrer: 'Google',
};

export const mockChartData: ChartData[] = [
	{ date: '2024-01-09', clicks: 120, links: 2 },
	{ date: '2024-01-10', clicks: 180, links: 3 },
	{ date: '2024-01-11', clicks: 250, links: 4 },
	{ date: '2024-01-12', clicks: 320, links: 4 },
	{ date: '2024-01-13', clicks: 280, links: 5 },
	{ date: '2024-01-14', clicks: 350, links: 5 },
	{ date: '2024-01-15', clicks: 420, links: 5 },
];

export const mockDashboardData: DashboardData = {
	stats: mockStatsData,
	recentLinks: mockShortLinks.slice(0, 3),
	clickHistory: mockChartData,
	topLinks: mockShortLinks.sort((a, b) => b.clicks - a.clicks).slice(0, 3),
};
