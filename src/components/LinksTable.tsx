import { useState } from 'react';
import type { ShortLink } from '../types';

interface LinksTableProps {
	links: ShortLink[];
	title?: string;
}

function LinksTable({ links, title = 'Najnowsze linki' }: LinksTableProps) {
	const [sortField, setSortField] = useState<keyof ShortLink>('createdAt');
	const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

	function handleSort(field: keyof ShortLink) {
		if (sortField === field) {
			setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
		} else {
			setSortField(field);
			setSortDirection('desc');
		}
	}

	function handleCopyLink(shortUrl: string) {
		navigator.clipboard.writeText(shortUrl);
		// Tutaj można dodać toast notification
		console.log('Link skopiowany:', shortUrl);
	}

	function formatDate(dateString: string) {
		return new Date(dateString).toLocaleDateString('pl-PL', {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
		});
	}

	function truncateUrl(url: string, maxLength: number = 50) {
		if (url.length <= maxLength) return url;
		return url.substring(0, maxLength) + '...';
	}

	const sortedLinks = [...links].sort((a, b) => {
		const aValue = a[sortField];
		const bValue = b[sortField];

		if (typeof aValue === 'string' && typeof bValue === 'string') {
			return sortDirection === 'asc'
				? aValue.localeCompare(bValue)
				: bValue.localeCompare(aValue);
		}

		if (typeof aValue === 'number' && typeof bValue === 'number') {
			return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
		}

		return 0;
	});

	return (
		<div className="card animate-fade-in">
			<div className="card-header">
				<h3 className="text-lg font-semibold text-gray-900">{title}</h3>
				<p className="text-sm text-gray-500 mt-1 md:hidden">
					Przesuń w prawo, aby zobaczyć więcej
				</p>
			</div>

			<div className="table-container">
				<table className="table">
					<thead className="table-header">
						<tr>
							<th
								className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
								onClick={() => handleSort('title')}
								tabIndex={0}
								aria-label="Sortuj według tytułu"
							>
								Tytuł
								{sortField === 'title' && (
									<span className="ml-1">
										{sortDirection === 'asc' ? '↑' : '↓'}
									</span>
								)}
							</th>
							<th
								className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
								onClick={() => handleSort('shortUrl')}
								tabIndex={0}
								aria-label="Sortuj według skróconego URL"
							>
								Skrócony URL
								{sortField === 'shortUrl' && (
									<span className="ml-1">
										{sortDirection === 'asc' ? '↑' : '↓'}
									</span>
								)}
							</th>
							<th
								className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
								onClick={() => handleSort('clicks')}
								tabIndex={0}
								aria-label="Sortuj według liczby kliknięć"
							>
								Kliknięcia
								{sortField === 'clicks' && (
									<span className="ml-1">
										{sortDirection === 'asc' ? '↑' : '↓'}
									</span>
								)}
							</th>
							<th
								className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
								onClick={() => handleSort('createdAt')}
								tabIndex={0}
								aria-label="Sortuj według daty utworzenia"
							>
								Data utworzenia
								{sortField === 'createdAt' && (
									<span className="ml-1">
										{sortDirection === 'asc' ? '↑' : '↓'}
									</span>
								)}
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Status
							</th>
						</tr>
					</thead>
					<tbody className="table-body">
						{sortedLinks.map(link => (
							<tr key={link.id} className="table-row">
								<td className="px-6 py-4">
									<div className="flex flex-col">
										<div className="text-sm font-medium text-gray-900 line-clamp-2">
											{link.title}
										</div>
										<div className="text-sm text-gray-500 mt-1">
											{truncateUrl(link.originalUrl, 40)}
										</div>
									</div>
								</td>
								<td className="px-6 py-4">
									<div className="flex items-center space-x-2">
										<span className="text-sm text-blue-600 font-medium truncate">
											{link.shortUrl}
										</span>
										<button
											className="text-gray-400 hover:text-gray-600 flex-shrink-0"
											onClick={() =>
												handleCopyLink(link.shortUrl)
											}
											tabIndex={0}
											aria-label="Skopiuj link"
										>
											📋
										</button>
									</div>
								</td>
								<td className="px-6 py-4">
									<span className="text-sm font-medium text-gray-900">
										{link.clicks.toLocaleString()}
									</span>
								</td>
								<td className="px-6 py-4 text-sm text-gray-500">
									<div className="whitespace-nowrap">
										{formatDate(link.createdAt)}
									</div>
								</td>
								<td className="px-6 py-4">
									<span
										className={
											link.isActive
												? 'status-active'
												: 'status-inactive'
										}
									>
										{link.isActive
											? 'Aktywny'
											: 'Nieaktywny'}
									</span>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{links.length === 0 && (
				<div className="text-center py-8">
					<p className="text-gray-500">Brak linków do wyświetlenia</p>
				</div>
			)}
		</div>
	);
}

export default LinksTable;
