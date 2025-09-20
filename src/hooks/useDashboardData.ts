import { useState, useEffect, useCallback } from 'react';
import { fetchDashboardData, ApiError } from '../services/apiService';
import type { DashboardData } from '../types';

interface UseDashboardDataResult {
	data: DashboardData | null;
	loading: boolean;
	error: string | null;
	errorType:
		| 'network'
		| 'server'
		| 'timeout'
		| 'not-found'
		| 'generic'
		| null;
	refreshing: boolean;
	refetch: () => Promise<void>;
}

export function useDashboardData(): UseDashboardDataResult {
	const [data, setData] = useState<DashboardData | null>(null);
	const [loading, setLoading] = useState(true);
	const [refreshing, setRefreshing] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [errorType, setErrorType] = useState<
		'network' | 'server' | 'timeout' | 'not-found' | 'generic' | null
	>(null);

	const fetchData = useCallback(async () => {
		try {
			setLoading(true);
			setError(null);
			setErrorType(null);
			const dashboardData = await fetchDashboardData();
			setData(dashboardData);
		} catch (err) {
			if (err instanceof ApiError) {
				setError(err.message);
				setErrorType(err.type);
			} else {
				setError(
					'Wystąpił nieoczekiwany błąd podczas ładowania danych'
				);
				setErrorType('generic');
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
		errorType,
		refreshing,
		refetch: fetchData,
	};
}
