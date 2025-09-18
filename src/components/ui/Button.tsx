interface ButtonProps {
	children: React.ReactNode;
	variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
	size?: 'sm' | 'md' | 'lg';
	disabled?: boolean;
	loading?: boolean;
	onClick?: () => void;
	className?: string;
	type?: 'button' | 'submit' | 'reset';
}

function Button({
	children,
	variant = 'primary',
	size = 'md',
	disabled = false,
	loading = false,
	onClick,
	className = '',
	type = 'button',
}: ButtonProps) {
	const baseClasses =
		'inline-flex items-center justify-center font-medium rounded-lg transition-colors duration-200 focus-ring disabled:opacity-50 disabled:cursor-not-allowed';

	const variantClasses = {
		primary: 'bg-primary-600 hover:bg-primary-700 text-white',
		secondary: 'bg-gray-100 hover:bg-gray-200 text-gray-900',
		danger: 'bg-danger-600 hover:bg-danger-700 text-white',
		ghost: 'text-gray-600 hover:text-gray-900 hover:bg-gray-100',
	};

	const sizeClasses = {
		sm: 'px-3 py-1.5 text-sm',
		md: 'px-4 py-2 text-sm',
		lg: 'px-6 py-3 text-base',
	};

	return (
		<button
			type={type}
			className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
			disabled={disabled || loading}
			onClick={onClick}
		>
			{loading && <div className="loading-spinner w-4 h-4 mr-2"></div>}
			{children}
		</button>
	);
}

export default Button;
