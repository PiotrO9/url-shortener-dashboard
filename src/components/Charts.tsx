import type { ChartData } from '../types';

interface ChartsProps {
	data: ChartData[];
	title?: string;
}

interface SimpleBarChartProps {
	data: ChartData[];
	title: string;
}

function SimpleBarChart({ data, title }: SimpleBarChartProps) {
	const maxClicks = Math.max(...data.map(d => d.clicks));
	const maxLinks = Math.max(...data.map(d => d.links));

	function formatDate(dateString: string) {
		return new Date(dateString).toLocaleDateString('pl-PL', {
			month: 'short',
			day: 'numeric',
		});
	}

	return (
		<div className="card animate-fade-in">
			<h3 className="text-lg font-semibold text-gray-900 mb-4">
				{title}
			</h3>

			<div className="space-y-4">
				{/* Legend */}
				<div className="flex items-center space-x-4 text-sm">
					<div className="flex items-center space-x-2">
						<div className="w-3 h-3 bg-blue-500 rounded"></div>
						<span className="text-gray-600">Kliknięcia</span>
					</div>
					<div className="flex items-center space-x-2">
						<div className="w-3 h-3 bg-green-500 rounded"></div>
						<span className="text-gray-600">Nowe linki</span>
					</div>
				</div>

				{/* Chart */}
				<div className="flex items-end space-x-2 h-64">
					{data.map((item, index) => (
						<div
							key={index}
							className="flex-1 flex flex-col items-center space-y-2"
						>
							{/* Bars */}
							<div className="flex items-end space-x-1 h-48 w-full justify-center">
								{/* Clicks bar */}
								<div
									className="bg-blue-500 rounded-t w-6 transition-all duration-300 hover:bg-blue-600"
									style={{
										height: `${(item.clicks / maxClicks) * 100}%`,
										minHeight:
											item.clicks > 0 ? '4px' : '0px',
									}}
									title={`${item.clicks} kliknięć`}
								></div>

								{/* Links bar */}
								<div
									className="bg-green-500 rounded-t w-6 transition-all duration-300 hover:bg-green-600"
									style={{
										height: `${(item.links / maxLinks) * 100}%`,
										minHeight:
											item.links > 0 ? '4px' : '0px',
									}}
									title={`${item.links} nowych linków`}
								></div>
							</div>

							{/* Date label */}
							<div className="text-xs text-gray-500 text-center">
								{formatDate(item.date)}
							</div>

							{/* Values */}
							<div className="text-xs text-gray-400 text-center">
								<div>{item.clicks}</div>
								<div>{item.links}</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

interface TopCountriesProps {
	title: string;
}

function TopCountries({ title }: TopCountriesProps) {
	const countries = [
		{ name: 'Poland', clicks: 1250, percentage: 35 },
		{ name: 'Germany', clicks: 890, percentage: 25 },
		{ name: 'United States', clicks: 750, percentage: 21 },
		{ name: 'United Kingdom', clicks: 420, percentage: 12 },
		{ name: 'Other', clicks: 180, percentage: 7 },
	];

	return (
		<div className="card animate-fade-in">
			<h3 className="text-lg font-semibold text-gray-900 mb-4">
				{title}
			</h3>

			<div className="space-y-3">
				{countries.map((country, index) => (
					<div
						key={index}
						className="flex items-center justify-between"
					>
						<div className="flex items-center space-x-3">
							<span className="text-sm font-medium text-gray-600 w-6">
								{index + 1}.
							</span>
							<span className="text-sm text-gray-900">
								{country.name}
							</span>
						</div>
						<div className="flex items-center space-x-3">
							<div className="w-24 bg-gray-200 rounded-full h-2">
								<div
									className="bg-blue-500 h-2 rounded-full transition-all duration-300"
									style={{ width: `${country.percentage}%` }}
								></div>
							</div>
							<span className="text-sm font-medium text-gray-900 w-12 text-right">
								{country.clicks.toLocaleString()}
							</span>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

interface ReferrerStatsProps {
	title: string;
}

function ReferrerStats({ title }: ReferrerStatsProps) {
	const referrers = [
		{ name: 'Google', clicks: 1850, percentage: 45 },
		{ name: 'Facebook', clicks: 1200, percentage: 29 },
		{ name: 'Twitter', clicks: 750, percentage: 18 },
		{ name: 'Direct', clicks: 320, percentage: 8 },
	];

	return (
		<div className="card animate-fade-in">
			<h3 className="text-lg font-semibold text-gray-900 mb-4">
				{title}
			</h3>

			<div className="space-y-3">
				{referrers.map((referrer, index) => (
					<div
						key={index}
						className="flex items-center justify-between"
					>
						<div className="flex items-center space-x-3">
							<span className="text-sm font-medium text-gray-600 w-6">
								{index + 1}.
							</span>
							<span className="text-sm text-gray-900">
								{referrer.name}
							</span>
						</div>
						<div className="flex items-center space-x-3">
							<div className="w-24 bg-gray-200 rounded-full h-2">
								<div
									className="bg-green-500 h-2 rounded-full transition-all duration-300"
									style={{ width: `${referrer.percentage}%` }}
								></div>
							</div>
							<span className="text-sm font-medium text-gray-900 w-12 text-right">
								{referrer.clicks.toLocaleString()}
							</span>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

function Charts({ data, title = 'Analiza ruchu' }: ChartsProps) {
	return (
		<div className="space-y-6">
			<h2 className="text-2xl font-bold text-gray-900">{title}</h2>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				<SimpleBarChart data={data} title="Kliknięcia w czasie" />
				<TopCountries title="Top kraje" />
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				<ReferrerStats title="Źródła ruchu" />
				<div className="card animate-fade-in">
					<h3 className="text-lg font-semibold text-gray-900 mb-4">
						Podsumowanie
					</h3>
					<div className="space-y-3">
						<div className="flex justify-between items-center">
							<span className="text-sm text-gray-600">
								Średnia kliknięć/dzień
							</span>
							<span className="text-sm font-medium text-gray-900">
								{Math.round(
									data.reduce(
										(sum, item) => sum + item.clicks,
										0
									) / data.length
								)}
							</span>
						</div>
						<div className="flex justify-between items-center">
							<span className="text-sm text-gray-600">
								Najlepszy dzień
							</span>
							<span className="text-sm font-medium text-gray-900">
								{formatDate(
									data.reduce(
										(max, item) =>
											item.clicks > max.clicks
												? item
												: max,
										data[0]
									).date
								)}
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

function formatDate(dateString: string) {
	return new Date(dateString).toLocaleDateString('pl-PL', {
		month: 'short',
		day: 'numeric',
	});
}

export default Charts;
