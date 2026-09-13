import React from 'react';
import type { TimelineEvent } from '@sahay/shared';
import { formatDate } from '../../lib/dateUtils';
import {
  AlertTriangle,
  HeartHandshake,
  CheckCircle,
  FileCheck,
  Calendar,
  PhoneCall,
  Shield,
  HelpCircle,
} from 'lucide-react';
import { cn } from '../../lib/cn';

interface TimelineProps {
  events: TimelineEvent[];
}

export const Timeline: React.FC<TimelineProps> = ({ events }) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'alert':
        return <AlertTriangle className="w-4 h-4 text-rose-600" />;
      case 'intervention':
        return <Shield className="w-4 h-4 text-navy-800" />;
      case 'counselling':
        return <HeartHandshake className="w-4 h-4 text-teal-700" />;
      case 'check_in':
        return <PhoneCall className="w-4 h-4 text-sky-700" />;
      case 'court_date':
        return <Calendar className="w-4 h-4 text-purple-700" />;
      case 'compensation':
        return <FileCheck className="w-4 h-4 text-emerald-700" />;
      default:
        return <CheckCircle className="w-4 h-4 text-stone-600" />;
    }
  };

  return (
    <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-stone-200">
      {events.map((e) => (
        <div key={e.id} className="relative group">
          {/* Dot/icon anchor */}
          <div
            className={cn(
              'absolute -left-6 top-0.5 w-6 h-6 rounded-full bg-white border-2 border-stone-300 flex items-center justify-center shadow-2xs group-hover:scale-110 transition-transform',
              e.flagged && 'border-rose-500 bg-rose-50'
            )}
          >
            {getIcon(e.eventType)}
          </div>

          <div className="bg-white rounded-xl border border-stone-200/90 p-3.5 sm:p-4 shadow-2xs space-y-1.5">
            <div className="flex flex-wrap items-center justify-between gap-1">
              <h5 className="text-xs sm:text-sm font-bold text-stone-900 font-serif">
                {e.title}
              </h5>
              <span className="text-[11px] text-stone-500 font-medium">
                {formatDate(e.date)}
              </span>
            </div>

            <p className="text-xs text-stone-600 leading-relaxed">{e.description}</p>

            {(e.distressIndicator !== undefined || e.outcome || e.channel) && (
              <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-stone-500 border-t border-stone-100">
                {e.channel && (
                  <span className="uppercase bg-stone-100 px-1.5 py-0.5 rounded font-mono">
                    Via {e.channel}
                  </span>
                )}
                {e.distressIndicator !== undefined && (
                  <span className="text-rose-700 font-semibold">
                    Distress Indicator: {e.distressIndicator}/100
                  </span>
                )}
                {e.outcome && (
                  <span className="text-emerald-700 font-medium">
                    Outcome: {e.outcome}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
