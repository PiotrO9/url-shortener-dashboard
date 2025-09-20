import Dashboard from './components/Dashboard';
import ErrorState from './components/ui/ErrorState';
import LoadingState from './components/ui/LoadingState';
import { useDashboardData } from './hooks/useDashboardData';
import './App.css';

function App() {
	const { data, loading, error, errorType, refreshing, refetch } =
		useDashboardData();

	if (loading) {
		return <LoadingState message="Ładowanie danych dashboardu..." />;
	}

	if (error) {
		return (
			<ErrorState
				message={error}
				type={errorType || 'generic'}
				onRetry={refetch}
				retryLabel="Spróbuj ponownie"
				showDetails={true}
			/>
		);
	}

	if (!data) {
		return (
			<div className="min-h-screen bg-gray-50 flex items-center justify-center">
				<div className="text-center">
					<p className="text-lg text-gray-600">
						Brak danych do wyświetlenia
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className="App">
			<Dashboard
				data={data}
				onRefresh={refetch}
				isRefreshing={refreshing}
			/>
		</div>
	);
}

export default App;
