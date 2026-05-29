import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, BookOpen, CheckCircle, Lock, Play, FileText, Zap, HelpCircle, AlertTriangle, X } from 'lucide-react';
import Layout from '../components/Layout';
import { COURSES, MODULES } from '../data/mockData';
import type { Module } from '../types';

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

const CATEGORY_COLORS: Record<string, string> = {
  Compliance: 'bg-red-500',
  Regulatory: 'bg-blue-500',
  Risk: 'bg-orange-500',
  Security: 'bg-purple-500',
  Sustainability: 'bg-green-500',
  Products: 'bg-cyan-500',
  Culture: 'bg-pink-500',
};

function VideoModal({ videoId, title, onClose }: { videoId: string; title: string; onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="w-full max-w-4xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-white font-semibold truncate pr-4">{title}</h3>
          <button onClick={onClose} className="text-white/70 hover:text-white flex-shrink-0">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="aspect-video rounded-xl overflow-hidden bg-black">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
      </div>
    </div>
  );
}

function ModuleRow({ mod, idx, onPlayVideo }: { mod: Module; idx: number; onPlayVideo: (mod: Module) => void }) {
  const Icon = MODULE_ICONS[mod.type];
  return (
    <div
      className={`flex items-center gap-4 px-5 py-4 ${
        mod.locked ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer hover:bg-danske-gray'
      } transition-colors`}
      onClick={() => !mod.locked && mod.type === 'video' && mod.videoId && onPlayVideo(mod)}
    >
      <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold ${
        mod.completed ? 'bg-green-100' : 'bg-danske-gray text-danske-muted'
      }`}>
        {mod.completed ? <CheckCircle className="w-4 h-4 text-green-600" /> : <span>{idx + 1}</span>}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium text-danske-text">{mod.title}</div>
        <div className="flex items-center gap-2 mt-0.5">
          <Icon className="w-3 h-3 text-danske-muted" />
          <span className="text-xs text-danske-muted">{MODULE_LABELS[mod.type]}</span>
          <span className="text-xs text-danske-muted">· {mod.duration}</span>
        </div>
      </div>
      {mod.locked ? (
        <Lock className="w-4 h-4 text-danske-muted flex-shrink-0" />
      ) : mod.completed ? (
        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
      ) : mod.type === 'video' && mod.videoId ? (
        <div className="w-8 h-8 rounded-full bg-danske-cyan/10 flex items-center justify-center flex-shrink-0 hover:bg-danske-cyan/20 transition-colors">
          <Play className="w-4 h-4 text-danske-cyan fill-danske-cyan" />
        </div>
      ) : (
        <ArrowLeft className="w-4 h-4 text-danske-muted rotate-180 flex-shrink-0" />
      )}
    </div>
  );
}

export default function CourseDetail() {
  const { id } = useParams<{ id: string }>();
  const [activeVideo, setActiveVideo] = useState<Module | null>(null);

  const course = COURSES.find(c => c.id === id);
  const modules = MODULES[id || ''] || [];

  if (!course) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64 text-danske-muted">Course not found.</div>
      </Layout>
    );
  }

  const firstVideoModule = modules.find(m => m.type === 'video' && m.videoId && !m.locked);
  const completedModules = modules.filter(m => m.completed).length;

  return (
    <Layout>
      {activeVideo && activeVideo.videoId && (
        <VideoModal videoId={activeVideo.videoId} title={activeVideo.title} onClose={() => setActiveVideo(null)} />
      )}

      {/* Page header with breadcrumb */}
      <div className="bg-white border-b border-danske-border px-6 lg:px-8 py-5">
        <div className="max-w-5xl mx-auto">
          <nav className="flex items-center gap-1.5 text-xs text-danske-muted mb-0">
            <Link to="/dashboard" className="hover:text-danske-text transition-colors">Dashboard</Link>
            <span>→</span>
            <Link to="/courses" className="hover:text-danske-text transition-colors">My Courses</Link>
            <span>→</span>
            <span className="text-danske-text font-medium truncate max-w-xs">{course.title}</span>
          </nav>
        </div>
      </div>

      {/* Course hero — full-width image banner */}
      <div className="relative overflow-hidden" style={{ minHeight: '280px' }}>
        {course.thumbnail ? (
          <>
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${course.thumbnail})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-danske-navy/90 via-danske-navy/75 to-danske-navy/30" />
          </>
        ) : (
          <div className="absolute inset-0 bg-danske-navy" />
        )}

        <div className="relative px-6 lg:px-8 py-10 max-w-5xl mx-auto">
          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-4">
            <span className={`text-xs text-white px-3 py-1 rounded-full font-semibold ${CATEGORY_COLORS[course.category] || 'bg-gray-500'}`}>
              {course.category}
            </span>
            {course.mandatory && (
              <span className="text-xs bg-white/20 backdrop-blur-sm text-white border border-white/20 px-3 py-1 rounded-full font-medium">
                Mandatory
              </span>
            )}
            {course.completed && (
              <span className="text-xs bg-green-400/90 text-white px-3 py-1 rounded-full font-semibold">
                ✓ Completed
              </span>
            )}
          </div>

          <h1 className="text-2xl lg:text-3xl font-bold text-white mb-3 max-w-2xl">{course.title}</h1>
          <p className="text-white/70 text-sm leading-relaxed mb-6 max-w-2xl">{course.description}</p>

          <div className="flex flex-wrap gap-6 text-sm text-white/80">
            <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-danske-cyan" />{course.duration}</div>
            <div className="flex items-center gap-2"><BookOpen className="w-4 h-4 text-danske-cyan" />{course.modules} modules</div>
            {course.deadline && !course.completed && (
              <div className="flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-amber-400" />
                Due {new Date(course.deadline).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
              </div>
            )}
          </div>

          {!course.completed && modules.length > 0 && (
            <div className="mt-6 max-w-md">
              <div className="flex justify-between text-xs text-white/60 mb-1.5">
                <span>Progress — {completedModules} of {modules.length} modules</span>
                <span>{course.progress}%</span>
              </div>
              <div className="h-2.5 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-danske-cyan rounded-full" style={{ width: `${course.progress}%` }} />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Content area */}
      <div className="px-6 lg:px-8 py-8 max-w-5xl mx-auto animate-fade-in">

        {/* Inline video player for current module (if available) */}
        {firstVideoModule && firstVideoModule.videoId && (
          <div className="mb-8">
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-black shadow-lg">
              <iframe
                src={`https://www.youtube.com/embed/${firstVideoModule.videoId}?rel=0`}
                title={firstVideoModule.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
            <p className="text-xs text-danske-muted mt-2 text-center">
              Currently watching: <span className="font-medium text-danske-text">{firstVideoModule.title}</span>
            </p>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Modules list */}
          <div className="lg:col-span-2">
            <h2 className="font-bold text-lg text-danske-text mb-4">Course Modules</h2>

            {modules.length > 0 ? (
              <div className="bg-white rounded-2xl border border-danske-border divide-y divide-danske-border overflow-hidden">
                {modules.map((mod, idx) => (
                  <ModuleRow key={mod.id} mod={mod} idx={idx} onPlayVideo={setActiveVideo} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-danske-border p-10 text-center">
                <BookOpen className="w-10 h-10 mx-auto mb-3 text-danske-muted opacity-30" />
                <p className="text-sm text-danske-muted mb-4">Module details coming soon.</p>
              </div>
            )}

            {modules.length > 0 && (
              <button className="mt-4 w-full py-3.5 bg-danske-navy text-white rounded-2xl text-sm font-bold hover:bg-danske-navyLight transition-colors">
                {course.completed
                  ? 'Review Course'
                  : course.progress > 0
                  ? `Continue — Module ${modules.findIndex(m => !m.completed) + 1}`
                  : 'Start Course'}
              </button>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Progress card */}
            <div className="bg-white rounded-2xl border border-danske-border p-5">
              <h3 className="font-semibold text-danske-text mb-4">Your Progress</h3>
              <div className="text-4xl font-bold text-danske-text mb-2">{course.progress}%</div>
              <div className="h-2.5 bg-danske-gray rounded-full overflow-hidden mb-3">
                <div
                  className={`h-full rounded-full ${course.completed ? 'bg-green-400' : 'bg-danske-cyan'}`}
                  style={{ width: `${course.progress}%` }}
                />
              </div>
              {modules.length > 0 && (
                <p className="text-xs text-danske-muted">{completedModules} of {modules.length} modules complete</p>
              )}
            </div>

            {/* Mandatory notice */}
            {course.mandatory && (
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
                <h3 className="font-semibold text-sm text-amber-800 mb-1">Mandatory Training</h3>
                <p className="text-xs text-amber-700 leading-relaxed">
                  Required for your role. Tracked by HR & Compliance.
                  {course.deadline && ` Deadline: ${new Date(course.deadline).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}.`}
                </p>
              </div>
            )}

            {/* Tags */}
            <div className="bg-white rounded-2xl border border-danske-border p-5">
              <h3 className="font-medium text-sm text-danske-text mb-3">Topics</h3>
              <div className="flex flex-wrap gap-2">
                {course.tags.map(tag => (
                  <span key={tag} className="text-xs bg-danske-gray text-danske-muted px-2.5 py-1 rounded-full">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
