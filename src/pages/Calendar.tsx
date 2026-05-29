import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Layout from '../components/Layout';
import { CALENDAR_EVENTS } from '../data/mockData';
import type { CalendarEvent } from '../types';

const TYPE_STYLE: Record<CalendarEvent['type'], string> = {
  deadline: 'bg-red-500',
  'live-session': 'bg-blue-500',
  milestone: 'bg-purple-500',
  exam: 'bg-amber-500',
};

const TYPE_CARD_STYLE: Record<CalendarEvent['type'], string> = {
  deadline: 'border-red-200 bg-red-50',
  'live-session': 'border-blue-200 bg-blue-50',
  milestone: 'border-purple-200 bg-purple-50',
  exam: 'border-amber-200 bg-amber-50',
};

const TYPE_TEXT: Record<CalendarEvent['type'], string> = {
  deadline: 'text-red-700',
  'live-session': 'text-blue-700',
  milestone: 'text-purple-700',
  exam: 'text-amber-700',
};

const TYPE_LABEL: Record<CalendarEvent['type'], string> = {
  deadline: 'Deadline',
  'live-session': 'Live Session',
  milestone: 'Milestone',
  exam: 'Exam',
};

const DAYS_OF_WEEK = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function Calendar() {
  const today = new Date();
  const [viewDate, setViewDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [selected, setSelected] = useState<string | null>(null);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  // Monday-based offset
  const startOffset = (firstDay.getDay() + 6) % 7;
  const totalCells = startOffset + lastDay.getDate();
  const rows = Math.ceil(totalCells / 7);

  const eventsByDate = CALENDAR_EVENTS.reduce<Record<string, CalendarEvent[]>>((acc, e) => {
    const key = e.date;
    if (!acc[key]) acc[key] = [];
    acc[key].push(e);
    return acc;
  }, {});

  const prevMonth = () => setViewDate(new Date(year, month - 1, 1));
  const nextMonth = () => setViewDate(new Date(year, month + 1, 1));

  const monthLabel = viewDate.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });

  const upcomingAll = CALENDAR_EVENTS
    .filter(e => new Date(e.date) >= new Date(today.toDateString()))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const selectedEvents = selected ? (eventsByDate[selected] || []) : [];

  return (
    <Layout>
      <div className="px-6 lg:px-8 py-8 max-w-6xl mx-auto animate-fade-in">
        <div className="mb-8">
          <nav className="text-xs text-danske-muted mb-2">
            Dashboard <span className="mx-1.5">→</span> <span className="text-danske-text font-medium">Calendar</span>
          </nav>
          <h1 className="text-3xl font-bold text-danske-navy">Calendar</h1>
          <p className="text-danske-muted mt-1">Deadlines, live sessions, exams, and milestones</p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 mb-6">
          {(Object.keys(TYPE_LABEL) as Array<CalendarEvent['type']>).map(type => (
            <div key={type} className="flex items-center gap-2 text-xs text-danske-muted">
              <div className={`w-2.5 h-2.5 rounded-full ${TYPE_STYLE[type]}`} />
              {TYPE_LABEL[type]}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Calendar grid */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-danske-border overflow-hidden">
            {/* Month nav */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-danske-border">
              <button onClick={prevMonth} className="p-1.5 rounded-lg hover:bg-danske-gray transition-colors">
                <ChevronLeft className="w-4 h-4 text-danske-muted" />
              </button>
              <h2 className="font-semibold text-danske-text">{monthLabel}</h2>
              <button onClick={nextMonth} className="p-1.5 rounded-lg hover:bg-danske-gray transition-colors">
                <ChevronRight className="w-4 h-4 text-danske-muted" />
              </button>
            </div>

            {/* Day headers */}
            <div className="grid grid-cols-7 border-b border-danske-border">
              {DAYS_OF_WEEK.map(d => (
                <div key={d} className="py-2 text-center text-xs font-medium text-danske-muted">{d}</div>
              ))}
            </div>

            {/* Day cells */}
            <div className="grid grid-cols-7">
              {Array.from({ length: rows * 7 }).map((_, i) => {
                const dayNum = i - startOffset + 1;
                const isValid = dayNum >= 1 && dayNum <= lastDay.getDate();
                const dateStr = isValid
                  ? `${year}-${String(month + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`
                  : '';
                const events = isValid ? (eventsByDate[dateStr] || []) : [];
                const isToday = isValid && dateStr === today.toISOString().split('T')[0];
                const isSelected = isValid && dateStr === selected;

                return (
                  <div
                    key={i}
                    onClick={() => isValid && setSelected(isSelected ? null : dateStr)}
                    className={`min-h-[70px] p-1.5 border-b border-r border-danske-border last:border-r-0 ${
                      isValid ? 'cursor-pointer hover:bg-danske-gray/50' : ''
                    } ${isSelected ? 'bg-danske-cyan/10' : ''} transition-colors`}
                  >
                    {isValid && (
                      <>
                        <div className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-medium mb-1 ${
                          isToday ? 'bg-danske-navy text-white' : 'text-danske-text'
                        }`}>
                          {dayNum}
                        </div>
                        <div className="space-y-0.5">
                          {events.slice(0, 2).map(e => (
                            <div key={e.id} className={`w-full h-1.5 rounded-full ${TYPE_STYLE[e.type]}`} title={e.title} />
                          ))}
                          {events.length > 2 && (
                            <div className="text-[10px] text-danske-muted">+{events.length - 2}</div>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right panel */}
          <div className="space-y-4">
            {selected && selectedEvents.length > 0 ? (
              <div>
                <h3 className="font-semibold text-sm text-danske-text mb-3">
                  {new Date(selected).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}
                </h3>
                <div className="space-y-3">
                  {selectedEvents.map(event => (
                    <div key={event.id} className={`rounded-xl border p-4 ${TYPE_CARD_STYLE[event.type]}`}>
                      <div className="flex items-center gap-2 mb-1">
                        <div className={`w-2 h-2 rounded-full ${TYPE_STYLE[event.type]}`} />
                        <span className={`text-xs font-medium ${TYPE_TEXT[event.type]}`}>{TYPE_LABEL[event.type]}</span>
                      </div>
                      <div className="font-medium text-sm text-danske-text">{event.title}</div>
                      {event.time && <div className="text-xs text-danske-muted mt-0.5">{event.time}</div>}
                      {event.description && <div className="text-xs text-danske-muted mt-2 leading-relaxed">{event.description}</div>}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div>
                <h3 className="font-semibold text-sm text-danske-text mb-3">Upcoming Events</h3>
                <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
                  {upcomingAll.map(event => (
                    <div key={event.id} className={`rounded-xl border p-4 ${TYPE_CARD_STYLE[event.type]}`}>
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-xs font-medium ${TYPE_TEXT[event.type]}`}>{TYPE_LABEL[event.type]}</span>
                        <span className="text-xs text-danske-muted">
                          {new Date(event.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                        </span>
                      </div>
                      <div className="font-medium text-sm text-danske-text">{event.title}</div>
                      {event.time && <div className="text-xs text-danske-muted mt-0.5">{event.time}</div>}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
