import { cn } from '@/lib/utils';
import { PoliticalParty } from '@/types';

type BadgeVariant = 'default' | 'party' | 'trend';

interface BadgeProps {
  text: string;
  variant?: BadgeVariant;
  party?: PoliticalParty;
  className?: string;
}

export function Badge({ text, variant = 'default', party, className }: BadgeProps) {
  const getPartyColor = (party?: PoliticalParty) => {
    switch (party) {
      case 'LR':
        return 'bg-party-lr text-white';
      case 'LREM':
        return 'bg-party-lrem text-black';
      case 'PS':
        return 'bg-party-ps text-white';
      case 'RN':
        return 'bg-party-rn text-white';
      case 'LFI':
        return 'bg-party-lfi text-white';
      case 'EELV':
        return 'bg-party-eelv text-white';
      case 'MoDem':
        return 'bg-orange-500 text-white';
      case 'PCF':
        return 'bg-red-700 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const variantStyles = {
    default: 'bg-gray-100 text-gray-800',
    party: getPartyColor(party),
    trend: 'bg-blue-100 text-blue-800',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        variantStyles[variant],
        className
      )}
    >
      {text}
    </span>
  );
}
