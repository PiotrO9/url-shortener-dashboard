import type { ShortLink, StatsData, ChartData, DashboardData } from '../types';

const API_BASE_URL = '/api';

export class ApiError extends Error {
	public status?: number;
	public type: 'network' | 'server' | 'timeout' | 'not-found' | 'generic';

	constructor(
		message: string,
		status?: number,
		type?: 'network' | 'server' | 'timeout' | 'not-found' | 'generic'
	) {
		super(message);
		this.name = 'ApiError';
		this.status = status;
		this.type = type || 'generic';
	}
}

async function fetchApi<T>(endpoint: string): Promise<T> {
	try {
		const response = await fetch(`${API_BASE_URL}${endpoint}`);

		if (!response.ok) {
			let errorType:
				| 'network'
				| 'server'
				| 'timeout'
				| 'not-found'
				| 'generic' = 'generic';
			let errorMessage = `API request failed: ${response.statusText}`;

			// Classify error based on status code
			if (response.status === 404) {
				errorType = 'not-found';
				errorMessage = 'Żądany zasób nie został znaleziony';
			} else if (response.status >= 500) {
				errorType = 'server';
				errorMessage = 'Błąd serwera - spróbuj ponownie później';
			} else if (response.status === 408) {
				errorType = 'timeout';
				errorMessage = 'Przekroczono limit czasu żądania';
			} else if (response.status >= 400) {
				errorType = 'generic';
				errorMessage = 'Błąd żądania - sprawdź dane i spróbuj ponownie';
			}

			throw new ApiError(errorMessage, response.status, errorType);
		}

		const data = await response.json();
		return data;
	} catch (error) {
		if (error instanceof ApiError) {
			throw error;
		}

		// Handle network errors
		if (
			error instanceof TypeError &&
			error.message.includes('Failed to fetch')
		) {
			throw new ApiError(
				'Brak połączenia z serwerem - sprawdź połączenie internetowe',
				undefined,
				'network'
			);
		}

		throw new ApiError(
			`Błąd sieci: ${error instanceof Error ? error.message : 'Nieznany błąd'}`,
			undefined,
			'network'
		);
	}
}

export async function fetchLinks(): Promise<ShortLink[]> {
	const data = await fetchApi<any>('/links');

	// Handle different possible response formats
	let linksArray: any[];

	if (Array.isArray(data)) {
		linksArray = data;
	} else if (data && typeof data === 'object') {
		// Check if the data is wrapped in an object (common API patterns)
		if (Array.isArray(data.links)) {
			linksArray = data.links;
		} else if (Array.isArray(data.data)) {
			linksArray = data.data;
		} else if (Array.isArray(data.results)) {
			linksArray = data.results;
		} else {
			throw new ApiError(
				`Expected array of links, but received object with keys: ${Object.keys(data).join(', ')}`
			);
		}
	} else {
		throw new ApiError(
			`Expected array of links, but received: ${typeof data}`
		);
	}

	return linksArray as ShortLink[];
}

export async function fetchStats(): Promise<StatsData> {
	try {
		// If your API doesn't have a dedicated stats endpoint, we'll calculate it from the links data
		const links = await fetchLinks();

		// Ensure links is a valid array
		if (!Array.isArray(links)) {
			throw new ApiError('Invalid links data received from API');
		}

		const totalLinks = links.length;
		const totalClicks = links.reduce((sum, link) => {
			// Ensure link has a valid clicks property
			const clicks = typeof link.clicks === 'number' ? link.clicks : 0;
			return sum + clicks;
		}, 0);
		const activeLinks = links.filter(link => link.isActive === true).length;

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
	} catch (error) {
		if (error instanceof ApiError) {
			throw error;
		}
		throw new ApiError(
			`Failed to calculate stats: ${error instanceof Error ? error.message : 'Unknown error'}`
		);
	}
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
