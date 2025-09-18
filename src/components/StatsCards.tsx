import type { StatsData } from '../types';

interface StatsCardsProps {
	stats: StatsData;
}

interface StatCardProps {
	title: string;
	value: number | string;
	change?: {
		value: number;
		isPositive: boolean;
	};
	icon: string;
	color: 'blue' | 'green' | 'yellow' | 'purple';
}

function StatCard({ title, value, change, icon, color }: StatCardProps) {
	const colorClasses = {
		blue: 'bg-blue-50 text-blue-600',
		green: 'bg-green-50 text-green-600',
		yellow: 'bg-yellow-50 text-yellow-600',
		purple: 'bg-purple-50 text-purple-600',
	};

	const changeColorClasses = {
		blue: 'text-blue-600',
		green: 'text-green-600',
		yellow: 'text-yellow-600',
		purple: 'text-purple-600',
	};

	return (
		<div className="card animate-fade-in">
			<div className="flex items-center justify-between">
				<div className="flex-1">
					<p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
					<p className="text-3xl font-bold text-gray-900">{value}</p>
					{change && (
						<div className="flex items-center mt-2">
							<span
								className={`text-sm font-medium ${
									change.isPositive ? changeColorClasses[color] : 'text-red-600'
								}`}
							>
								{change.isPositive ? '+' : ''}
								{change.value}%
							</span>
							<span className="text-sm text-gray-500 ml-1">vs poprzedni miesiąc</span>
						</div>
					)}
				</div>
				<div
					className={`w-12 h-12 rounded-lg ${colorClasses[color]} flex items-center justify-center animate-bounce-subtle`}
				>
					<span className="text-2xl">{icon}</span>
				</div>
			</div>
		</div>
	);
}

function StatsCards({ stats }: StatsCardsProps) {
	const cards = [
		{
			title: 'Wszystkie linki',
			value: stats.totalLinks,
			change: { value: 12, isPositive: true },
			icon: '🔗',
			color: 'blue' as const,
		},
		{
			title: 'Łączne kliknięcia',
			value: stats.totalClicks.toLocaleString(),
			change: { value: 8, isPositive: true },
			icon: '👆',
			color: 'green' as const,
		},
		{
			title: 'Aktywne linki',
			value: stats.activeLinks,
			change: { value: 5, isPositive: true },
			icon: '✅',
			color: 'yellow' as const,
		},
		{
			title: 'Kliknięcia dzisiaj',
			value: stats.clicksToday,
			change: { value: -2, isPositive: false },
			icon: '📊',
			color: 'purple' as const,
		},
	];

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
			{cards.map((card, index) => (
				<StatCard
					key={index}
					title={card.title}
					value={card.value}
					change={card.change}
					icon={card.icon}
					color={card.color}
				/>
			))}
		</div>
	);
}

export default StatsCards;
