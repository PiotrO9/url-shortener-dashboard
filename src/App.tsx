import Dashboard from './components/Dashboard';
import { useDashboardData } from './hooks/useDashboardData';
import './App.css';

function App() {
	const { data, loading, error, refreshing, refetch } = useDashboardData();

	if (loading) {
		return (
			<div className="min-h-screen bg-gray-50 flex items-center justify-center">
				<div className="text-center">
					<div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
					<p className="mt-4 text-lg text-gray-600">
						Ładowanie danych...
					</p>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="min-h-screen bg-gray-50 flex items-center justify-center">
				<div className="text-center max-w-md mx-auto">
					<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
						<h2 className="font-bold text-lg mb-2">
							Błąd ładowania danych
						</h2>
						<p>{error}</p>
					</div>
					<button
						onClick={refetch}
						className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
					>
						Spróbuj ponownie
					</button>
				</div>
			</div>
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
