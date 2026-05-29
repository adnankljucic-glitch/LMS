import { Link } from 'react-router-dom';
import { BookOpen, CheckCircle, Clock, AlertTriangle, TrendingUp, ArrowRight, ChevronRight } from 'lucide-react';
import Layout from '../components/Layout';
import { DEMO_USER, COURSES, ONBOARDING_TASKS, CALENDAR_EVENTS } from '../data/mockData';

export default function Dashboard() {
  const mandatory = COURSES.filter(c => c.mandatory);
  const completed = mandatory.filter(c => c.completed).length;
  const overallProgress = Math.round(
    COURSES.reduce((sum, c) => sum + c.progress, 0) / COURSES.length
  );
  const onboardingCompleted = ONBOARDING_TASKS.filter(t => t.completed).length;
  const onboardingProgress = Math.round((onboardingCompleted / ONBOARDING_TASKS.length) * 100);

  const upcomingEvents = CALENDAR_EVENTS
    .filter(e => new Date(e.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 4);

  const inProgress = COURSES.filter(c => c.progress > 0 && !c.completed).slice(0, 3);

  const daysSinceStart = Math.floor(
    (new Date().getTime() - new Date(DEMO_USER.startDate).getTime()) / (1000 * 60 * 60 * 24)
  );

  const eventTypeStyle = {
    deadline: 'bg-red-50 text-red-700 border-red-200',
    'live-session': 'bg-blue-50 text-blue-700 border-blue-200',
    milestone: 'bg-purple-50 text-purple-700 border-purple-200',
    exam: 'bg-amber-50 text-amber-700 border-amber-200',
  };

  const eventTypeLabel = {
    deadline: 'Deadline',
    'live-session': 'Live Session',
    milestone: 'Milestone',
    exam: 'Exam',
  };

  return (
    <Layout>
      <div className="px-6 lg:px-8 py-8 max-w-6xl mx-auto animate-fade-in">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-danske-text">
            Good morning, {DEMO_USER.name.split(' ')[0]} 👋
          </h1>
          <p className="text-danske-muted mt-1">
            Day {daysSinceStart} of your onboarding journey · {DEMO_USER.department}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            {
              icon: CheckCircle,
              label: 'Mandatory Complete',
              value: `${completed}/${mandatory.length}`,
              sub: 'certifications',
              color: 'text-green-600',
              bg: 'bg-green-50',
            },
            {
              icon: TrendingUp,
              label: 'Overall Progress',
              value: `${overallProgress}%`,
              sub: 'across all courses',
              color: 'text-danske-cyan',
              bg: 'bg-danske-cyan/10',
            },
            {
              icon: BookOpen,
              label: 'Onboarding Plan',
              value: `${onboardingProgress}%`,
              sub: `${onboardingCompleted}/${ONBOARDING_TASKS.length} tasks done`,
              color: 'text-purple-600',
              bg: 'bg-purple-50',
            },
            {
              icon: Clock,
              label: 'Days Remaining',
              value: `${Math.max(0, 90 - daysSinceStart)}`,
              sub: 'in onboarding period',
              color: 'text-amber-600',
              bg: 'bg-amber-50',
            },
          ].map(({ icon: Icon, label, value, sub, color, bg }) => (
            <div key={label} className="bg-white rounded-xl p-5 border border-danske-border">
              <div className={`w-10 h-10 rounded-lg ${bg} flex items-center justify-center mb-3`}>
                <Icon className={`w-5 h-5 ${color}`} />
              </div>
              <div className="text-2xl font-bold text-danske-text">{value}</div>
              <div className="text-xs font-medium text-danske-text mt-0.5">{label}</div>
              <div className="text-xs text-danske-muted mt-0.5">{sub}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left: Mandatory certifications */}
          <div className="lg:col-span-2 space-y-6">
            {/* Mandatory certs */}
            <div className="bg-white rounded-xl border border-danske-border">
              <div className="flex items-center justify-between px-6 py-4 border-b border-danske-border">
                <h2 className="font-semibold text-danske-text">Mandatory Certifications</h2>
                <Link to="/courses" className="text-sm text-danske-cyan hover:text-danske-cyanDark font-medium flex items-center gap-1">
                  View all <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="divide-y divide-danske-border">
                {mandatory.map(course => (
                  <Link
                    key={course.id}
                    to={`/courses/${course.id}`}
                    className="flex items-center gap-4 px-6 py-4 hover:bg-danske-gray transition-colors"
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      course.completed ? 'bg-green-100' : 'bg-danske-navy/10'
                    }`}>
                      {course.completed
                        ? <CheckCircle className="w-5 h-5 text-green-600" />
                        : <BookOpen className="w-5 h-5 text-danske-navy" />
                      }
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-danske-text truncate">{course.title}</div>
                      <div className="flex items-center gap-3 mt-1">
                        <div className="flex-1 h-1.5 bg-danske-border rounded-full max-w-32">
                          <div
                            className={`h-full rounded-full ${course.completed ? 'bg-green-500' : 'bg-danske-cyan'}`}
                            style={{ width: `${course.progress}%` }}
                          />
                        </div>
                        <span className="text-xs text-danske-muted">{course.progress}%</span>
                      </div>
                    </div>
                    {course.deadline && !course.completed && (
                      <div className="flex items-center gap-1 text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded-full flex-shrink-0">
                        <AlertTriangle className="w-3 h-3" />
                        {new Date(course.deadline).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                      </div>
                    )}
                    {course.completed && (
                      <span className="text-xs text-green-700 bg-green-50 px-2 py-1 rounded-full font-medium flex-shrink-0">Passed</span>
                    )}
                  </Link>
                ))}
              </div>
            </div>

            {/* In-progress courses */}
            {inProgress.length > 0 && (
              <div className="bg-white rounded-xl border border-danske-border">
                <div className="flex items-center justify-between px-6 py-4 border-b border-danske-border">
                  <h2 className="font-semibold text-danske-text">Continue Learning</h2>
                </div>
                <div className="divide-y divide-danske-border">
                  {inProgress.map(course => (
                    <Link
                      key={course.id}
                      to={`/courses/${course.id}`}
                      className="flex items-center gap-4 px-6 py-4 hover:bg-danske-gray transition-colors group"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-danske-text">{course.title}</div>
                        <div className="text-xs text-danske-muted mt-0.5">{course.category} · {course.duration}</div>
                        <div className="flex items-center gap-2 mt-2">
                          <div className="flex-1 h-1.5 bg-danske-border rounded-full">
                            <div className="h-full rounded-full bg-danske-cyan" style={{ width: `${course.progress}%` }} />
                          </div>
                          <span className="text-xs text-danske-muted w-8 text-right">{course.progress}%</span>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-danske-muted group-hover:text-danske-cyan transition-colors flex-shrink-0" />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right: Upcoming events */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-danske-border">
              <div className="flex items-center justify-between px-6 py-4 border-b border-danske-border">
                <h2 className="font-semibold text-danske-text">Upcoming</h2>
                <Link to="/calendar" className="text-sm text-danske-cyan hover:text-danske-cyanDark font-medium flex items-center gap-1">
                  Calendar <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="divide-y divide-danske-border">
                {upcomingEvents.map(event => (
                  <div key={event.id} className="px-6 py-4">
                    <div className="flex items-start gap-3">
                      <div className="text-center flex-shrink-0 w-10">
                        <div className="text-xs text-danske-muted uppercase">
                          {new Date(event.date).toLocaleDateString('en-GB', { month: 'short' })}
                        </div>
                        <div className="text-lg font-bold text-danske-navy leading-none">
                          {new Date(event.date).getDate()}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-danske-text leading-tight">{event.title}</div>
                        {event.time && <div className="text-xs text-danske-muted mt-0.5">{event.time}</div>}
                        <span className={`inline-flex mt-1.5 text-xs px-2 py-0.5 rounded-full border font-medium ${eventTypeStyle[event.type]}`}>
                          {eventTypeLabel[event.type]}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick actions */}
            <div className="bg-danske-navy rounded-xl p-6 text-white">
              <h3 className="font-semibold mb-1">Need help?</h3>
              <p className="text-white/60 text-xs mb-4">Ask the AI Tutor about regulations, compliance rules, or your learning path.</p>
              <Link
                to="/ai-tutor"
                className="flex items-center justify-center gap-2 w-full py-2.5 bg-danske-cyan text-danske-navy rounded-lg text-sm font-semibold hover:bg-danske-cyanLight transition-colors"
              >
                Open AI Tutor <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
