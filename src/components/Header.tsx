interface HeaderProps {
	title: string;
	onRefresh?: () => void;
	isRefreshing?: boolean;
}

function Header({ title, onRefresh, isRefreshing }: HeaderProps) {
	return (
		<header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center h-16">
					<div className="flex items-center">
						<h1 className="text-2xl font-bold text-gray-900 animate-fade-in">
							{title}
						</h1>
					</div>
					{onRefresh && (
						<div className="flex items-center">
							<button
								onClick={onRefresh}
								disabled={isRefreshing}
								className={`flex items-center space-x-2 px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 focus-ring ${
									isRefreshing
										? 'bg-gray-100 text-gray-400 cursor-not-allowed'
										: 'bg-blue-100 text-blue-700 hover:bg-blue-200'
								}`}
								aria-label="Odśwież dane"
							>
								<span
									className={`text-lg ${
										isRefreshing ? 'animate-spin' : ''
									}`}
								>
									🔄
								</span>
								<span>Odśwież</span>
							</button>
						</div>
					)}
				</div>
			</div>
		</header>
	);
}

export default Header;
