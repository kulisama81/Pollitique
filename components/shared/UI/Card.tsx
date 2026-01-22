import { cn } from '@/lib/utils';

export type CardVariant = 'elevated' | 'outlined' | 'flat';

interface CardProps {
  children: React.ReactNode;
  variant?: CardVariant;
  className?: string;
}

export function Card({ children, variant = 'elevated', className }: CardProps) {
  const variantStyles = {
    elevated: 'bg-white shadow-md hover:shadow-lg transition-shadow',
    outlined: 'bg-white border border-gray-200',
    flat: 'bg-gray-50',
  };

  return (
    <div className={cn('rounded-lg overflow-hidden', variantStyles[variant], className)}>
      {children}
    </div>
  );
}
