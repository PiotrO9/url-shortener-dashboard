import { useState, useEffect, useCallback } from 'react';
import { fetchDashboardData, ApiError } from '../services/apiService';
import type { DashboardData } from '../types';

interface UseDashboardDataResult {
	data: DashboardData | null;
	loading: boolean;
	error: string | null;
	refreshing: boolean;
	refetch: () => Promise<void>;
}

export function useDashboardData(): UseDashboardDataResult {
	const [data, setData] = useState<DashboardData | null>(null);
	const [loading, setLoading] = useState(true);
	const [refreshing, setRefreshing] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const fetchData = useCallback(async () => {
		try {
			setLoading(true);
			setError(null);
			const dashboardData = await fetchDashboardData();
			setData(dashboardData);
		} catch (err) {
			if (err instanceof ApiError) {
				setError(err.message);
			} else {
				setError(
					'Wystąpił nieoczekiwany błąd podczas ładowania danych'
				);
			}
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	return {
		data,
		loading,
		error,
		refreshing,
		refetch: fetchData,
	};
}
