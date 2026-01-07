import { getTypeColors } from '@/constants/pokemon-types';

interface TypeBadgeProps {
  typeName: string;
}

export function TypeBadge({ typeName }: TypeBadgeProps) {
  const colors = getTypeColors(typeName);

  return (
    <span
      className={`inline-block rounded-full px-3 py-1 text-sm font-medium ${colors.bg} ${colors.text}`}
    >
      {typeName}
    </span>
  );
}
