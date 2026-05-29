import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, BookOpen, CheckCircle, Lock, Play, FileText, Zap, HelpCircle, AlertTriangle } from 'lucide-react';
import Layout from '../components/Layout';
import { COURSES, MODULES } from '../data/mockData';

const MODULE_ICONS = {
  video: Play,
  reading: FileText,
  interactive: Zap,
  quiz: HelpCircle,
};

const MODULE_LABELS = {
  video: 'Video',
  reading: 'Reading',
  interactive: 'Interactive',
  quiz: 'Quiz',
};

export default function CourseDetail() {
  const { id } = useParams<{ id: string }>();
  const course = COURSES.find(c => c.id === id);
  const modules = MODULES[id || ''] || [];

  if (!course) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64 text-danske-muted">
          Course not found.
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="px-6 lg:px-8 py-8 max-w-4xl mx-auto animate-fade-in">
        {/* Back */}
        <Link to="/courses" className="inline-flex items-center gap-2 text-sm text-danske-muted hover:text-danske-text mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Courses
        </Link>

        {/* Hero */}
        <div className="bg-danske-navy text-white rounded-xl p-8 mb-6">
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">{course.category}</span>
            {course.mandatory && (
              <span className="text-xs bg-red-400/80 px-2 py-0.5 rounded-full font-medium">Mandatory</span>
            )}
            {course.completed && (
              <span className="text-xs bg-green-400/80 text-danske-navy px-2 py-0.5 rounded-full font-medium">Completed</span>
            )}
          </div>

          <h1 className="text-2xl font-bold mb-3">{course.title}</h1>
          <p className="text-white/70 text-sm leading-relaxed mb-6">{course.description}</p>

          <div className="flex flex-wrap gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-danske-cyan" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-danske-cyan" />
              <span>{course.modules} modules</span>
            </div>
            {course.deadline && !course.completed && (
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <span>Due {new Date(course.deadline).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
              </div>
            )}
          </div>

          {!course.completed && (
            <div className="mt-6">
              <div className="flex justify-between text-xs text-white/60 mb-1.5">
                <span>Progress</span>
                <span>{course.progress}%</span>
              </div>
              <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-danske-cyan rounded-full" style={{ width: `${course.progress}%` }} />
              </div>
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Modules */}
          <div className="lg:col-span-2">
            <h2 className="font-semibold text-danske-text mb-4">Course Modules</h2>

            {modules.length > 0 ? (
              <div className="bg-white rounded-xl border border-danske-border divide-y divide-danske-border overflow-hidden">
                {modules.map((mod, idx) => {
                  const Icon = MODULE_ICONS[mod.type];
                  return (
                    <div
                      key={mod.id}
                      className={`flex items-center gap-4 px-5 py-4 ${mod.locked ? 'opacity-50' : 'hover:bg-danske-gray cursor-pointer'} transition-colors`}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                        mod.completed ? 'bg-green-100 text-green-700' : 'bg-danske-gray text-danske-muted'
                      }`}>
                        {mod.completed ? <CheckCircle className="w-4 h-4 text-green-600" /> : idx + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-danske-text">{mod.title}</div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <Icon className="w-3 h-3 text-danske-muted" />
                          <span className="text-xs text-danske-muted">{MODULE_LABELS[mod.type]}</span>
                          <span className="text-xs text-danske-muted">· {mod.duration}</span>
                        </div>
                      </div>
                      {mod.locked
                        ? <Lock className="w-4 h-4 text-danske-muted flex-shrink-0" />
                        : mod.completed
                        ? <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        : <Play className="w-4 h-4 text-danske-cyan flex-shrink-0" />
                      }
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-danske-border p-8 text-center">
                <BookOpen className="w-8 h-8 mx-auto mb-3 text-danske-muted opacity-40" />
                <p className="text-sm text-danske-muted">Module details coming soon.</p>
                <button className="mt-4 px-6 py-2.5 bg-danske-navy text-white rounded-lg text-sm font-semibold hover:bg-danske-navyLight transition-colors">
                  {course.completed ? 'Review Course' : course.progress > 0 ? 'Continue' : 'Start Course'}
                </button>
              </div>
            )}

            {modules.length > 0 && (
              <button className="mt-4 w-full py-3 bg-danske-navy text-white rounded-xl text-sm font-semibold hover:bg-danske-navyLight transition-colors">
                {course.completed ? 'Review Course' : course.progress > 0 ? `Continue — Module ${modules.findIndex(m => !m.completed) + 1}` : 'Start Course'}
              </button>
            )}
          </div>

          {/* Sidebar info */}
          <div className="space-y-4">
            <div className="bg-white rounded-xl border border-danske-border p-5">
              <h3 className="font-medium text-sm text-danske-text mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {course.tags.map(tag => (
                  <span key={tag} className="text-xs bg-danske-gray text-danske-muted px-2 py-1 rounded-full">{tag}</span>
                ))}
              </div>
            </div>

            {course.mandatory && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
                <h3 className="font-medium text-sm text-amber-800 mb-1">Mandatory Training</h3>
                <p className="text-xs text-amber-700">
                  This course is required for your role. Completion is tracked by HR and Compliance.
                  {course.deadline && ` Deadline: ${new Date(course.deadline).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}.`}
                </p>
              </div>
            )}

            <div className="bg-white rounded-xl border border-danske-border p-5">
              <h3 className="font-medium text-sm text-danske-text mb-3">Your Progress</h3>
              <div className="text-3xl font-bold text-danske-text mb-1">{course.progress}%</div>
              <div className="h-2 bg-danske-border rounded-full overflow-hidden mb-2">
                <div className={`h-full rounded-full ${course.completed ? 'bg-green-400' : 'bg-danske-cyan'}`} style={{ width: `${course.progress}%` }} />
              </div>
              {modules.length > 0 && (
                <p className="text-xs text-danske-muted">
                  {modules.filter(m => m.completed).length} of {modules.length} modules complete
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
