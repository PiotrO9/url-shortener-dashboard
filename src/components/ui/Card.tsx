interface CardProps {
	children: React.ReactNode;
	className?: string;
	hover?: boolean;
	animate?: boolean;
}

function Card({
	children,
	className = '',
	hover = true,
	animate = true,
}: CardProps) {
	const baseClasses = 'bg-white rounded-lg border border-gray-200 p-6';
	const hoverClasses = hover
		? 'hover:shadow-card-hover transition-shadow duration-200'
		: '';
	const animateClasses = animate ? 'animate-fade-in' : '';
	const shadowClasses = 'shadow-card';

	return (
		<div
			className={`${baseClasses} ${shadowClasses} ${hoverClasses} ${animateClasses} ${className}`}
		>
			{children}
		</div>
	);
}

interface CardHeaderProps {
	children: React.ReactNode;
	className?: string;
}

function CardHeader({ children, className = '' }: CardHeaderProps) {
	return (
		<div className={`border-b border-gray-200 pb-4 mb-4 ${className}`}>
			{children}
		</div>
	);
}

interface CardContentProps {
	children: React.ReactNode;
	className?: string;
}

function CardContent({ children, className = '' }: CardContentProps) {
	return <div className={className}>{children}</div>;
}

export { Card, CardHeader, CardContent };
