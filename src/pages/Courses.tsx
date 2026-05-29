import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Clock, CheckCircle, AlertTriangle, Search, Filter, ArrowRight, Sparkles, TrendingUp } from 'lucide-react';
import Layout from '../components/Layout';
import { COURSES } from '../data/mockData';

const FILTERS = ['All', 'Mandatory', 'In Progress', 'Completed'] as const;
type FilterType = typeof FILTERS[number];

const CATEGORY_COLORS: Record<string, string> = {
  Compliance: 'bg-red-500',
  Regulatory: 'bg-blue-500',
  Risk: 'bg-orange-500',
  Security: 'bg-purple-500',
  Sustainability: 'bg-green-500',
  Products: 'bg-cyan-500',
  Culture: 'bg-pink-500',
};

export default function Courses() {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterType>('All');

  const featuredCourse = COURSES.find(c => c.progress > 0 && !c.completed && c.mandatory) || COURSES[0];

  const filtered = COURSES.filter(c => {
    if (search && !c.title.toLowerCase().includes(search.toLowerCase())) return false;
    if (activeFilter === 'Mandatory' && !c.mandatory) return false;
    if (activeFilter === 'In Progress' && (c.progress === 0 || c.completed)) return false;
    if (activeFilter === 'Completed' && !c.completed) return false;
    return true;
  });

  const completedCount = COURSES.filter(c => c.completed).length;
  const inProgressCount = COURSES.filter(c => c.progress > 0 && !c.completed).length;
  const nextModuleIndex = featuredCourse ? Math.floor((featuredCourse.progress / 100) * featuredCourse.modules) + 1 : 1;

  return (
    <Layout>
      {/* Page header */}
      <div className="bg-white border-b border-danske-border px-6 lg:px-8 py-8">
        <div className="max-w-6xl mx-auto">
          <nav className="text-xs text-danske-muted mb-2">
            Dashboard <span className="mx-1.5">→</span> <span className="text-danske-text font-medium">My Courses</span>
          </nav>
          <h1 className="text-3xl font-bold text-danske-navy mb-1">My Courses</h1>
          <p className="text-danske-muted">Continue your learning journey and track your progress</p>
        </div>
      </div>

      <div className="px-6 lg:px-8 py-8 max-w-6xl mx-auto animate-fade-in">
        {/* Featured course + AI Tutor sidebar */}
        {featuredCourse && (
          <div className="grid lg:grid-cols-3 gap-5 mb-10">
            {/* Featured hero card */}
            <Link
              to={`/courses/${featuredCourse.id}`}
              className="lg:col-span-2 relative rounded-2xl overflow-hidden group min-h-[280px] flex flex-col justify-end"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url(${featuredCourse.thumbnail})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

              <div className="relative p-6 lg:p-8">
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  <span className="text-xs bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full font-medium border border-white/20">
                    In Progress
                  </span>
                  <span className="text-xs text-white/70">
                    {featuredCourse.modules - Math.floor((featuredCourse.progress / 100) * featuredCourse.modules)}h remaining
                  </span>
                </div>

                <h2 className="text-2xl font-bold text-white mb-4">{featuredCourse.title}</h2>

                <div className="mb-4">
                  <div className="flex items-center justify-between text-xs text-white/70 mb-1.5">
                    <span>Progress</span>
                    <span className="font-semibold text-white">{featuredCourse.progress}%</span>
                  </div>
                  <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-danske-cyan rounded-full transition-all"
                      style={{ width: `${featuredCourse.progress}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-white/70">
                    {Math.floor((featuredCourse.progress / 100) * featuredCourse.modules)} of {featuredCourse.modules} modules
                  </span>
                  <span className="flex items-center gap-2 bg-danske-navy text-white px-5 py-2.5 rounded-xl text-sm font-bold group-hover:bg-danske-navyLight transition-colors">
                    Resume Course <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>

            {/* AI Tutor sidebar */}
            <div className="bg-white rounded-2xl border border-danske-border flex flex-col overflow-hidden">
              <div className="px-5 py-4 border-b border-danske-border flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-danske-cyan/20 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-sm text-danske-text">AI Tutor</div>
                  <div className="text-danske-cyan text-xs font-medium">Learning Assistant</div>
                </div>
              </div>

              <div className="p-5 flex-1 space-y-4">
                <div className="border border-danske-border rounded-xl p-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-danske-muted">Latest Quiz</span>
                    <CheckCircle className="w-4 h-4 text-danske-cyan" />
                  </div>
                  <div className="text-2xl font-bold text-danske-cyan">85%</div>
                  <div className="text-xs text-danske-muted flex items-center gap-1 mt-0.5">
                    <TrendingUp className="w-3 h-3 text-green-500" /> Keep it up!
                  </div>
                </div>

                <div className="border border-danske-border rounded-xl p-4">
                  <div className="flex items-center gap-2 text-xs text-danske-muted mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span className="font-medium">Next Steps</span>
                  </div>
                  <div className="text-xs text-danske-text font-medium">
                    Focus on Module {nextModuleIndex}: {nextModuleIndex <= 4 ? 'Enhanced Due Diligence' : 'Suspicious Activity Reporting'}
                  </div>
                </div>

                <div className="border border-danske-border rounded-xl p-4">
                  <div className="text-xs font-semibold text-danske-text mb-3">Study Stats</div>
                  {[
                    { label: 'Time invested', value: '4h 30m', highlight: true },
                    { label: 'Completed', value: `${completedCount} / ${COURSES.length}`, highlight: false },
                    { label: 'In progress', value: `${inProgressCount} courses`, highlight: true },
                  ].map(({ label, value, highlight }) => (
                    <div key={label} className="flex items-center justify-between py-1.5 text-xs border-t border-danske-border first:border-0">
                      <span className="text-danske-muted">{label}</span>
                      <span className={`font-semibold ${highlight ? 'text-danske-cyan' : 'text-danske-text'}`}>{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-5 pt-0">
                <Link
                  to="/ai-tutor"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-danske-navy text-white rounded-xl text-sm font-semibold hover:bg-danske-navyLight transition-colors"
                >
                  <Sparkles className="w-4 h-4 text-danske-cyan" />
                  Ask AI Tutor
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Filter tabs + search */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
          <div className="flex gap-2">
            {FILTERS.map(f => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeFilter === f
                    ? 'bg-danske-navy text-white'
                    : 'bg-white border border-danske-border text-danske-muted hover:text-danske-text'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="relative sm:ml-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-danske-muted" />
            <input
              type="text"
              placeholder="Search courses…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 bg-white border border-danske-border rounded-lg text-sm text-danske-text placeholder-danske-muted focus:outline-none focus:ring-2 focus:ring-danske-cyan focus:border-transparent w-56"
            />
          </div>
        </div>

        {/* Course grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(course => (
            <Link
              key={course.id}
              to={`/courses/${course.id}`}
              className="bg-white rounded-2xl border border-danske-border hover:shadow-md hover:border-danske-cyan/50 transition-all group overflow-hidden"
            >
              {/* Thumbnail */}
              <div className="relative h-44 overflow-hidden">
                {course.thumbnail ? (
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full bg-danske-navy/10 flex items-center justify-center">
                    <BookOpen className="w-10 h-10 text-danske-navy/30" />
                  </div>
                )}
                {/* Overlay badges */}
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className={`text-xs text-white px-2.5 py-1 rounded-full font-semibold ${CATEGORY_COLORS[course.category] || 'bg-gray-500'}`}>
                    {course.category}
                  </span>
                </div>
                {course.completed && (
                  <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-0.5 rounded-full font-medium">
                    Completed
                  </div>
                )}
              </div>

              <div className="p-5">
                <h3 className="font-semibold text-danske-text leading-snug mb-1 group-hover:text-danske-navy transition-colors">
                  {course.title}
                </h3>
                <p className="text-xs text-danske-muted line-clamp-2 mb-4">{course.description}</p>

                <div className="flex items-center gap-4 text-xs text-danske-muted mb-4">
                  <span className="flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" />
                    {course.modules} of {course.modules} modules
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {course.completed ? 'Completed' : course.progress > 0 ? `${Math.round(parseFloat(course.duration) * (1 - course.progress / 100))}h remaining` : course.duration}
                  </span>
                </div>

                {/* Progress bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-danske-muted">Progress</span>
                    <span className={`font-semibold ${course.completed ? 'text-green-600' : 'text-danske-text'}`}>{course.progress}%</span>
                  </div>
                  <div className="h-2 bg-danske-gray rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${course.completed ? 'bg-green-400' : 'bg-danske-cyan'}`}
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>

                {/* Deadline warning */}
                {course.deadline && !course.completed && (
                  <div className="flex items-center gap-1.5 text-xs text-amber-700 bg-amber-50 px-3 py-2 rounded-lg mb-3">
                    <AlertTriangle className="w-3 h-3" />
                    Due {new Date(course.deadline).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                  </div>
                )}

                {/* CTA button */}
                <button className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                  course.completed
                    ? 'bg-danske-gray text-danske-muted hover:bg-danske-border'
                    : course.progress > 0
                    ? 'bg-danske-cyan text-white hover:bg-danske-cyanDark'
                    : 'bg-danske-navy text-white hover:bg-danske-navyLight'
                }`}>
                  {course.completed ? 'Review' : course.progress > 0 ? 'Continue' : 'Start Course'}
                </button>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-danske-muted">
            <Filter className="w-8 h-8 mx-auto mb-3 opacity-30" />
            <p className="font-medium">No courses match your filters</p>
            <button onClick={() => { setSearch(''); setActiveFilter('All'); }} className="mt-2 text-sm text-danske-cyan hover:underline">
              Clear filters
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
}
