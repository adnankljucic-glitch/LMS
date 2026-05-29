import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Clock, CheckCircle, AlertTriangle, Search, Filter } from 'lucide-react';
import Layout from '../components/Layout';
import { COURSES } from '../data/mockData';

const CATEGORIES = ['All', 'Compliance', 'Regulatory', 'Risk', 'Security', 'Sustainability', 'Products', 'Culture'];

export default function Courses() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [filter, setFilter] = useState<'all' | 'mandatory' | 'in-progress' | 'completed'>('all');

  const filtered = COURSES.filter(c => {
    if (search && !c.title.toLowerCase().includes(search.toLowerCase())) return false;
    if (category !== 'All' && c.category !== category) return false;
    if (filter === 'mandatory' && !c.mandatory) return false;
    if (filter === 'in-progress' && (c.progress === 0 || c.completed)) return false;
    if (filter === 'completed' && !c.completed) return false;
    return true;
  });

  const statusBadge = (course: typeof COURSES[0]) => {
    if (course.completed) return <span className="text-xs bg-green-50 text-green-700 border border-green-200 px-2 py-0.5 rounded-full font-medium">Completed</span>;
    if (course.progress > 0) return <span className="text-xs bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded-full font-medium">In Progress</span>;
    return <span className="text-xs bg-gray-50 text-gray-500 border border-gray-200 px-2 py-0.5 rounded-full font-medium">Not Started</span>;
  };

  return (
    <Layout>
      <div className="px-6 lg:px-8 py-8 max-w-6xl mx-auto animate-fade-in">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-danske-text">Course Catalogue</h1>
          <p className="text-danske-muted mt-1">{COURSES.length} courses available · {COURSES.filter(c => c.completed).length} completed</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-danske-muted" />
            <input
              type="text"
              placeholder="Search courses…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-white border border-danske-border rounded-lg text-sm text-danske-text placeholder-danske-muted focus:outline-none focus:ring-2 focus:ring-danske-cyan focus:border-transparent"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {(['all', 'mandatory', 'in-progress', 'completed'] as const).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors capitalize whitespace-nowrap ${
                  filter === f
                    ? 'bg-danske-navy text-white'
                    : 'bg-white border border-danske-border text-danske-muted hover:text-danske-text'
                }`}
              >
                {f.replace('-', ' ')}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors whitespace-nowrap flex-shrink-0 ${
                category === cat
                  ? 'bg-danske-cyan text-danske-navy'
                  : 'bg-white border border-danske-border text-danske-muted hover:text-danske-text'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(course => (
            <Link
              key={course.id}
              to={`/courses/${course.id}`}
              className="bg-white rounded-xl border border-danske-border hover:border-danske-cyan hover:shadow-sm transition-all group"
            >
              <div className="h-2 rounded-t-xl overflow-hidden bg-danske-border">
                <div
                  className={`h-full ${course.completed ? 'bg-green-400' : 'bg-danske-cyan'}`}
                  style={{ width: `${course.progress}%` }}
                />
              </div>
              <div className="p-5">
                <div className="flex gap-2 flex-wrap mb-3">
                  {course.mandatory && (
                    <span className="text-xs bg-red-50 text-red-700 border border-red-200 px-2 py-0.5 rounded-full font-medium">Mandatory</span>
                  )}
                  {statusBadge(course)}
                </div>
                <h3 className="font-semibold text-sm text-danske-text leading-snug mb-1 group-hover:text-danske-cyan transition-colors">
                  {course.title}
                </h3>
                <p className="text-xs text-danske-muted line-clamp-2 mb-4">{course.description}</p>
                <div className="flex items-center gap-4 text-xs text-danske-muted">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{course.duration}</span>
                  <span className="flex items-center gap-1"><BookOpen className="w-3 h-3" />{course.modules} modules</span>
                </div>
                {course.deadline && !course.completed && (
                  <div className="mt-3 flex items-center gap-1.5 text-xs text-amber-700 bg-amber-50 px-3 py-1.5 rounded-lg">
                    <AlertTriangle className="w-3 h-3" />
                    Due {new Date(course.deadline).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </div>
                )}
                {course.completed && (
                  <div className="mt-3 flex items-center gap-1.5 text-xs text-green-700">
                    <CheckCircle className="w-3.5 h-3.5" />
                    Completed
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-danske-muted">
            <Filter className="w-8 h-8 mx-auto mb-3 opacity-40" />
            <p className="font-medium">No courses match your filters</p>
            <button onClick={() => { setSearch(''); setCategory('All'); setFilter('all'); }} className="mt-2 text-sm text-danske-cyan hover:underline">
              Clear filters
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
}
