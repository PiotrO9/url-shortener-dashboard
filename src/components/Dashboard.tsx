import { useState } from 'react';
import Header from './Header';
import StatsCards from './StatsCards';
import LinksTable from './LinksTable';
import Charts from './Charts';
import type { DashboardData } from '../types';

interface DashboardProps {
	data: DashboardData;
	onRefresh?: () => void;
	isRefreshing?: boolean;
}

function Dashboard({ data, onRefresh, isRefreshing }: DashboardProps) {
	const [activeTab, setActiveTab] = useState<
		'overview' | 'links' | 'analytics'
	>('overview');

	function handleTabChange(tab: 'overview' | 'links' | 'analytics') {
		setActiveTab(tab);
	}

	const tabs = [
		{ id: 'overview', label: 'Przegląd', icon: '📊' },
		{ id: 'links', label: 'Linki', icon: '🔗' },
	];

	return (
		<div className="min-h-screen bg-gray-50">
			<Header
				title="Dashboard Skróconych Linków"
				onRefresh={onRefresh}
				isRefreshing={isRefreshing}
			/>

			<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				{/* Navigation Tabs */}
				<div className="mb-8">
					<nav className="flex space-x-8" aria-label="Tabs">
						{tabs.map(tab => (
							<button
								key={tab.id}
								className={`flex items-center space-x-2 px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 focus-ring ${
									activeTab === tab.id
										? 'bg-blue-100 text-blue-700'
										: 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
								}`}
								onClick={() =>
									handleTabChange(
										tab.id as
											| 'overview'
											| 'links'
											| 'analytics'
									)
								}
								tabIndex={0}
								aria-label={`Przejdź do zakładki ${tab.label}`}
							>
								<span>{tab.icon}</span>
								<span>{tab.label}</span>
							</button>
						))}
					</nav>
				</div>

				{/* Tab Content */}
				{activeTab === 'overview' && (
					<div className="space-y-8">
						<StatsCards stats={data.stats} />

						<div className="flex flex-col gap-8">
							<LinksTable
								links={data.recentLinks}
								title="Najnowsze linki"
							/>
							<LinksTable
								links={data.topLinks}
								title="Najpopularniejsze linki"
							/>
						</div>
					</div>
				)}

				{activeTab === 'links' && (
					<div className="space-y-8">
						<div className="flex justify-between items-center">
							<h2 className="text-2xl font-bold text-gray-900">
								Wszystkie linki
							</h2>
						</div>

						<LinksTable
							links={data.recentLinks}
							title="Wszystkie linki"
						/>
					</div>
				)}

				{activeTab === 'analytics' && (
					<Charts data={data.clickHistory} title="Analityka ruchu" />
				)}
			</main>
		</div>
	);
}

export default Dashboard;
