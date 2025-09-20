import { useState } from 'react';
import Button from './Button';
import { Card, CardContent } from './Card';

interface ErrorStateProps {
	title?: string;
	message: string;
	type?: 'network' | 'server' | 'not-found' | 'timeout' | 'generic';
	onRetry?: () => void | Promise<void>;
	onGoHome?: () => void;
	retryLabel?: string;
	showHomeButton?: boolean;
	className?: string;
	showDetails?: boolean;
}

function ErrorState({
	title,
	message,
	type = 'generic',
	onRetry,
	onGoHome,
	retryLabel = 'Spróbuj ponownie',
	showHomeButton = false,
	className = '',
	showDetails = false,
}: ErrorStateProps) {
	const [isRetrying, setIsRetrying] = useState(false);

	const handleRetry = async () => {
		if (!onRetry || isRetrying) return;

		setIsRetrying(true);
		try {
			await onRetry();
		} catch (error) {
			console.error('Retry failed:', error);
		} finally {
			setIsRetrying(false);
		}
	};
	const getErrorIcon = () => {
		switch (type) {
			case 'network':
				return (
					<svg
						className="w-16 h-16 text-red-400"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={1.5}
							d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
						/>
					</svg>
				);
			case 'server':
				return (
					<svg
						className="w-16 h-16 text-red-400"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={1.5}
							d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
						/>
					</svg>
				);
			case 'not-found':
				return (
					<svg
						className="w-16 h-16 text-red-400"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={1.5}
							d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m6-8a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
				);
			case 'timeout':
				return (
					<svg
						className="w-16 h-16 text-red-400"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={1.5}
							d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
				);
			default:
				return (
					<svg
						className="w-16 h-16 text-red-400"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={1.5}
							d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
						/>
					</svg>
				);
		}
	};

	const getDefaultTitle = () => {
		switch (type) {
			case 'network':
				return 'Błąd połączenia';
			case 'server':
				return 'Błąd serwera';
			case 'not-found':
				return 'Nie znaleziono';
			case 'timeout':
				return 'Przekroczono limit czasu';
			default:
				return 'Wystąpił błąd';
		}
	};

	const getDescription = () => {
		switch (type) {
			case 'network':
				return 'Sprawdź połączenie internetowe i spróbuj ponownie.';
			case 'server':
				return 'Serwer tymczasowo niedostępny. Spróbuj ponownie za chwilę.';
			case 'not-found':
				return 'Szukana strona lub zasób nie został znaleziony.';
			case 'timeout':
				return 'Żądanie trwało zbyt długo. Sprawdź połączenie i spróbuj ponownie.';
			default:
				return 'Coś poszło nie tak. Spróbuj ponownie lub skontaktuj się z pomocą techniczną.';
		}
	};

	return (
		<div
			className={`min-h-screen bg-gray-50 flex items-center justify-center p-4 ${className}`}
		>
			<Card
				className="max-w-md w-full text-center animate-fade-in"
				animate={false}
			>
				<CardContent className="p-8">
					{/* Error Icon */}
					<div className="flex justify-center mb-6">
						{getErrorIcon()}
					</div>

					{/* Error Title */}
					<h1 className="text-2xl font-bold text-gray-900 mb-3">
						{title || getDefaultTitle()}
					</h1>

					{/* Error Message */}
					<p className="text-gray-600 mb-2 leading-relaxed">
						{message}
					</p>

					{/* Error Description */}
					<p className="text-sm text-gray-500 mb-8 leading-relaxed">
						{getDescription()}
					</p>

					{/* Action Buttons */}
					<div className="flex flex-col sm:flex-row gap-3 justify-center">
						{onRetry && (
							<Button
								onClick={handleRetry}
								variant="primary"
								className="min-w-32"
								loading={isRetrying}
								disabled={isRetrying}
							>
								<svg
									className="w-4 h-4 mr-2"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
									/>
								</svg>
								{isRetrying ? 'Ładowanie...' : retryLabel}
							</Button>
						)}

						{showHomeButton && onGoHome && (
							<Button
								onClick={onGoHome}
								variant="secondary"
								className="min-w-32"
							>
								<svg
									className="w-4 h-4 mr-2"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
									/>
								</svg>
								Strona główna
							</Button>
						)}
					</div>

					{/* Additional Help */}
					{type === 'network' && (
						<div className="mt-6 pt-6 border-t border-gray-200">
							<p className="text-xs text-gray-500">
								💡 Sprawdź czy:
							</p>
							<ul className="text-xs text-gray-500 mt-2 space-y-1">
								<li>• Masz połączenie z internetem</li>
								<li>• Serwer nie jest w trakcie konserwacji</li>
								<li>• Firewall nie blokuje połączenia</li>
							</ul>
						</div>
					)}

					{/* Debug Information */}
					{showDetails && process.env.NODE_ENV === 'development' && (
						<div className="mt-6 pt-6 border-t border-gray-200">
							<details className="text-left">
								<summary className="text-xs text-gray-500 cursor-pointer hover:text-gray-700">
									🐛 Szczegóły błędu (tylko w trybie
									deweloperskim)
								</summary>
								<div className="mt-3 p-3 bg-gray-50 rounded text-xs">
									<div className="mb-2">
										<strong>Typ błędu:</strong> {type}
									</div>
									<div className="mb-2">
										<strong>Komunikat:</strong> {message}
									</div>
									<div className="mb-2">
										<strong>Czas:</strong>{' '}
										{new Date().toLocaleString()}
									</div>
									<div>
										<strong>User Agent:</strong>{' '}
										{navigator.userAgent}
									</div>
								</div>
							</details>
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	);
}

export default ErrorState;
