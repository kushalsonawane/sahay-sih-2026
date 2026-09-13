import React from 'react';
import { PageHeader } from '../../components/PageHeader';
import { mockAppointments } from '../../data/mockTimeline';
import { formatDate } from '../../lib/dateUtils';
import { useLanguage } from '../../hooks/useLanguage';
import { CalendarCheck, Clock, User, Shield, CheckCircle2 } from 'lucide-react';

export const AppointmentsPage: React.FC = () => {
  const { isHindi, isMarathi, isMarathi } = useLanguage();

  return (
    <div className="space-y-6 max-w-4xl mx-auto py-2">
      <PageHeader
        title={(isMarathi || isHindi) ? 'काउंसलर एवं कानूनी सत्र' : 'Counsellor & Legal Consultations'}
        subtitle={
          (isMarathi || isHindi)
            ? 'आपके आगामी और पिछले सत्रों की सूची'
            : 'Track upcoming trauma support appointments, pre-trial legal briefings, and counsellor sessions.'
        }
      />

      <div className="grid gap-4">
        {mockAppointments.map((apt) => (
          <div
            key={apt.id}
            className="bg-white rounded-xl border border-stone-200 p-5 shadow-2xs space-y-3"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-100 pb-2">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-navy-900 text-white text-[11px] font-bold uppercase tracking-wider">
                  {apt.type}
                </span>
                <span
                  className={`px-2 py-0.5 rounded text-[11px] font-semibold uppercase ${
                    apt.status === 'scheduled'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-emerald-100 text-emerald-800'
                  }`}
                >
                  {apt.status}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-stone-600 font-medium">
                <Clock className="w-3.5 h-3.5 text-stone-400" />
                <span>{formatDate(apt.scheduledAt)}</span>
              </div>
            </div>

            <div className="space-y-1 text-xs">
              <div className="flex items-center gap-1.5 text-stone-800 font-semibold">
                <User className="w-3.5 h-3.5 text-teal-700" />
                <span>With: {apt.counsellorName}</span>
              </div>
              {apt.notes && (
                <p className="text-stone-600 bg-stone-50 p-2.5 rounded-lg border border-stone-200/60 leading-relaxed">
                  {apt.notes}
                </p>
              )}
            </div>

            {apt.status === 'scheduled' && (
              <div className="pt-2 flex items-center justify-between text-xs border-t border-stone-100">
                <span className="text-stone-500">Mode: In-person / Confidential</span>
                <button
                  type="button"
                  onClick={() => alert('Appointment confirmed with clinical psychologist.')}
                  className="px-3 py-1 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded font-medium transition"
                >
                  Confirm Attendance
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
