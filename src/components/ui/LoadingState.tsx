import { Card, CardContent } from './Card';

interface LoadingStateProps {
	message?: string;
	className?: string;
	showCard?: boolean;
}

function LoadingState({
	message = 'Ładowanie danych...',
	className = '',
	showCard = false,
}: LoadingStateProps) {
	const spinner = (
		<div className="flex flex-col items-center">
			<div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mb-4"></div>
			<p className="text-lg text-gray-600 animate-pulse">{message}</p>
		</div>
	);

	if (showCard) {
		return (
			<div
				className={`min-h-screen bg-gray-50 flex items-center justify-center p-4 ${className}`}
			>
				<Card className="max-w-md w-full text-center" animate={false}>
					<CardContent className="p-8">{spinner}</CardContent>
				</Card>
			</div>
		);
	}

	return (
		<div
			className={`min-h-screen bg-gray-50 flex items-center justify-center ${className}`}
		>
			{spinner}
		</div>
	);
}

export default LoadingState;
