import Dashboard from './components/Dashboard';
import { mockDashboardData } from './data/mockData';
import './App.css';

function App() {
	return (
		<div className="App">
			<Dashboard data={mockDashboardData} />
		</div>
	);
}

export default App;
