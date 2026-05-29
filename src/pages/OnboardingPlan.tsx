import { useState } from 'react';
import { CheckCircle, Circle, ChevronDown, ChevronUp } from 'lucide-react';
import Layout from '../components/Layout';
import { ONBOARDING_TASKS, DEMO_USER } from '../data/mockData';

const CATEGORY_COLORS: Record<string, string> = {
  Admin: 'bg-blue-100 text-blue-700',
  People: 'bg-purple-100 text-purple-700',
  Compliance: 'bg-red-100 text-red-700',
  Regulatory: 'bg-amber-100 text-amber-700',
  Learning: 'bg-green-100 text-green-700',
};

export default function OnboardingPlan() {
  const [expandedWeeks, setExpandedWeeks] = useState<Set<number>>(new Set([1, 2, 3, 4]));
  const [tasks, setTasks] = useState(ONBOARDING_TASKS);

  const weeks = Array.from(new Set(tasks.map(t => t.week))).sort((a, b) => a - b);
  const completed = tasks.filter(t => t.completed).length;
  const progress = Math.round((completed / tasks.length) * 100);

  const daysSinceStart = Math.floor(
    (new Date().getTime() - new Date(DEMO_USER.startDate).getTime()) / (1000 * 60 * 60 * 24)
  );
  const currentWeek = Math.ceil(daysSinceStart / 7);

  const toggleWeek = (week: number) => {
    setExpandedWeeks(prev => {
      const next = new Set(prev);
      next.has(week) ? next.delete(week) : next.add(week);
      return next;
    });
  };

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const weekLabel = (week: number) => {
    const labels: Record<number, string> = {
      1: 'Week 1 — Orientation & Setup',
      2: 'Week 2 — Team & Systems',
      3: 'Week 3 — Core Compliance Start',
      4: 'Week 4 — 30-Day Review',
      5: 'Week 5 — Regulatory Training',
      6: 'Week 6 — Certifications',
      7: 'Week 7 — Cross-Functional',
      8: 'Week 8 — 60-Day Review',
      9: 'Week 9 — Advanced Modules',
      10: 'Week 10 — Presentations',
      11: 'Week 11 — Electives',
      12: 'Week 12 — Graduation',
    };
    return labels[week] || `Week ${week}`;
  };

  return (
    <Layout>
      <div className="px-6 lg:px-8 py-8 max-w-4xl mx-auto animate-fade-in">
        {/* Header */}
        <div className="mb-8">
          <nav className="text-xs text-danske-muted mb-2">
            Dashboard <span className="mx-1.5">→</span> <span className="text-danske-text font-medium">90-Day Onboarding Plan</span>
          </nav>
          <h1 className="text-3xl font-bold text-danske-navy">90-Day Onboarding Plan</h1>
          <p className="text-danske-muted mt-1">Your structured journey from Day 1 to Day 90 at Danske Bank</p>
        </div>

        {/* Progress card */}
        <div className="bg-danske-navy text-white rounded-xl p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-3xl font-bold">{progress}%</div>
              <div className="text-white/60 text-sm mt-0.5">Overall completion</div>
            </div>
            <div className="text-right">
              <div className="text-xl font-bold">Day {daysSinceStart}</div>
              <div className="text-white/60 text-sm mt-0.5">Week {currentWeek} of 12</div>
            </div>
          </div>
          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-danske-cyan rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between mt-2 text-xs text-white/50">
            <span>{completed} completed</span>
            <span>{tasks.length - completed} remaining</span>
          </div>
        </div>

        {/* Week-by-week */}
        <div className="space-y-3">
          {weeks.map(week => {
            const weekTasks = tasks.filter(t => t.week === week);
            const weekCompleted = weekTasks.filter(t => t.completed).length;
            const isExpanded = expandedWeeks.has(week);
            const isCurrent = week === currentWeek;
            const isPast = week < currentWeek;

            return (
              <div
                key={week}
                className={`bg-white rounded-xl border overflow-hidden ${
                  isCurrent ? 'border-danske-cyan shadow-sm' : 'border-danske-border'
                }`}
              >
                <button
                  onClick={() => toggleWeek(week)}
                  className="w-full flex items-center gap-4 px-6 py-4 text-left hover:bg-danske-gray transition-colors"
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                    weekCompleted === weekTasks.length
                      ? 'bg-green-100 text-green-700'
                      : isCurrent
                      ? 'bg-danske-cyan text-danske-navy'
                      : isPast
                      ? 'bg-danske-border text-danske-muted'
                      : 'bg-danske-gray text-danske-muted'
                  }`}>
                    {weekCompleted === weekTasks.length ? '✓' : week}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm text-danske-text">{weekLabel(week)}</span>
                      {isCurrent && (
                        <span className="text-xs bg-danske-cyan/20 text-danske-navy px-2 py-0.5 rounded-full font-medium">Current</span>
                      )}
                    </div>
                    <span className="text-xs text-danske-muted">{weekCompleted}/{weekTasks.length} tasks</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-20 h-1.5 bg-danske-border rounded-full hidden sm:block">
                      <div
                        className="h-full bg-danske-cyan rounded-full"
                        style={{ width: `${(weekCompleted / weekTasks.length) * 100}%` }}
                      />
                    </div>
                    {isExpanded ? <ChevronUp className="w-4 h-4 text-danske-muted" /> : <ChevronDown className="w-4 h-4 text-danske-muted" />}
                  </div>
                </button>

                {isExpanded && (
                  <div className="border-t border-danske-border divide-y divide-danske-border">
                    {weekTasks.map(task => (
                      <div
                        key={task.id}
                        className="flex items-start gap-4 px-6 py-4 hover:bg-danske-gray/50 transition-colors"
                      >
                        <button
                          onClick={() => toggleTask(task.id)}
                          className="mt-0.5 flex-shrink-0"
                        >
                          {task.completed
                            ? <CheckCircle className="w-5 h-5 text-green-500" />
                            : <Circle className="w-5 h-5 text-danske-border hover:text-danske-cyan transition-colors" />
                          }
                        </button>
                        <div className="flex-1 min-w-0">
                          <div className={`text-sm font-medium ${task.completed ? 'text-danske-muted line-through' : 'text-danske-text'}`}>
                            {task.title}
                          </div>
                          <div className="text-xs text-danske-muted mt-0.5">{task.description}</div>
                        </div>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0 ${CATEGORY_COLORS[task.category] || 'bg-gray-100 text-gray-600'}`}>
                          {task.category}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
