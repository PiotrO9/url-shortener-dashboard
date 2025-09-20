import type { ShortLink, StatsData, ChartData, DashboardData } from '../types';

const API_BASE_URL = 'http://localhost:3000/api';

export class ApiError extends Error {
	public status?: number;

	constructor(message: string, status?: number) {
		super(message);
		this.name = 'ApiError';
		this.status = status;
	}
}

async function fetchApi<T>(endpoint: string): Promise<T> {
	try {
		const response = await fetch(`${API_BASE_URL}${endpoint}`);

		if (!response.ok) {
			throw new ApiError(
				`API request failed: ${response.statusText}`,
				response.status
			);
		}

		const data = await response.json();
		return data;
	} catch (error) {
		if (error instanceof ApiError) {
			throw error;
		}
		throw new ApiError(
			`Network error: ${error instanceof Error ? error.message : 'Unknown error'}`
		);
	}
}

export async function fetchLinks(): Promise<ShortLink[]> {
	return fetchApi<ShortLink[]>('/links');
}

export async function fetchStats(): Promise<StatsData> {
	// If your API doesn't have a dedicated stats endpoint, we'll calculate it from the links data
	const links = await fetchLinks();

	const totalLinks = links.length;
	const totalClicks = links.reduce((sum, link) => sum + link.clicks, 0);
	const activeLinks = links.filter(link => link.isActive).length;

	// For these metrics, you'll need to implement them in your backend or calculate them differently
	// For now, I'll provide placeholder values that you can update based on your actual API
	const stats: StatsData = {
		totalLinks,
		totalClicks,
		activeLinks,
		clicksToday: 0, // You'll need an endpoint for this
		clicksThisWeek: 0, // You'll need an endpoint for this
		clicksThisMonth: 0, // You'll need an endpoint for this
		topCountry: 'Poland', // You'll need click analytics for this
		topReferrer: 'Google', // You'll need click analytics for this
	};

	return stats;
}

export async function fetchClickHistory(): Promise<ChartData[]> {
	// If your API doesn't have a dedicated analytics endpoint,
	// you'll need to implement this in your backend
	// For now, returning empty array - you can update this based on your actual API
	return [];
}

export async function fetchDashboardData(): Promise<DashboardData> {
	try {
		// Fetch all data in parallel
		const [links, stats, clickHistory] = await Promise.all([
			fetchLinks(),
			fetchStats(),
			fetchClickHistory(),
		]);

		// Sort links by creation date (most recent first)
		const sortedLinks = [...links].sort(
			(a, b) =>
				new Date(b.createdAt).getTime() -
				new Date(a.createdAt).getTime()
		);

		// Get recent links (last 3)
		const recentLinks = sortedLinks.slice(0, 3);

		// Get top links by clicks
		const topLinks = [...links]
			.sort((a, b) => b.clicks - a.clicks)
			.slice(0, 3);

		return {
			stats,
			recentLinks,
			clickHistory,
			topLinks,
		};
	} catch (error) {
		throw new ApiError(
			`Failed to fetch dashboard data: ${error instanceof Error ? error.message : 'Unknown error'}`
		);
	}
}
