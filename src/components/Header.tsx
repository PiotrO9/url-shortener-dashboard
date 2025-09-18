interface HeaderProps {
	title: string;
}

function Header({ title }: HeaderProps) {
	return (
		<header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center h-16">
					<div className="flex items-center">
						<h1 className="text-2xl font-bold text-gray-900 animate-fade-in">
							{title}
						</h1>
					</div>
				</div>
			</div>
		</header>
	);
}

export default Header;
