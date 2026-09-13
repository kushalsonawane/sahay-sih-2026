import React from 'react';
import { Inbox } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  icon?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No records found',
  description = 'There are currently no items matching your filter or criteria.',
  action,
  icon = <Inbox className="w-8 h-8 text-stone-400" />,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 sm:p-12 text-center bg-stone-50/50 rounded-xl border border-dashed border-stone-300">
      <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center mb-3">
        {icon}
      </div>
      <h3 className="text-sm font-semibold text-stone-800 font-serif">{title}</h3>
      <p className="text-xs text-stone-500 mt-1 max-w-sm leading-relaxed">{description}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
};
