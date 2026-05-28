import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  LayoutDashboard,
  BookOpen,
  ClipboardCheck,
  Bot,
  Video,
  FileText,
  Bell,
  ChevronDown,
  User,
  Award,
  LogOut,
  Settings,
  ChevronRight,
  ChevronLeft,
  Play,
  CheckCircle,
  Circle,
  Download,
  FileText as FileTextIcon,
  ExternalLink,
  Sparkles,
  TrendingUp,
  AlertCircle,
  Trophy,
  X,
  Headphones,
  Menu
} from 'lucide-react';

interface NavigationItem {
  icon: React.ReactNode;
  label: string;
  path: string;
}

const navigationItems: NavigationItem[] = [
  { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/dashboard' },
  { icon: <BookOpen size={20} />, label: 'Courses', path: '/courses' },
  { icon: <ClipboardCheck size={20} />, label: 'Compliance', path: '/compliance' },
  { icon: <Bot size={20} />, label: 'Hilio AI Tutor', path: '/ai-tutor' },
  { icon: <Video size={20} />, label: 'Conferences', path: '/conferences' },
  { icon: <FileText size={20} />, label: 'Reports', path: '/reports' },
];

interface Lesson {
  id: number;
  title: string;
  duration: string;
  completed: boolean;
  isQuiz: boolean;
}

const lessons: Lesson[] = [
  { id: 1, title: 'Introduction to CPR', duration: '12:30', completed: true, isQuiz: false },
  { id: 2, title: 'Adult CPR Techniques', duration: '18:45', completed: true, isQuiz: false },
  { id: 3, title: 'Pediatric CPR', duration: '15:20', completed: true, isQuiz: false },
  { id: 4, title: 'AED Usage', duration: '10:15', completed: true, isQuiz: false },
  { id: 5, title: 'Module 1 Quiz', duration: '10 min', completed: true, isQuiz: true },
  { id: 6, title: 'Choking Response', duration: '14:30', completed: true, isQuiz: false },
  { id: 7, title: 'Emergency Scenarios', duration: '20:15', completed: false, isQuiz: false },
  { id: 8, title: 'Advanced Techniques', duration: '16:40', completed: false, isQuiz: false },
  { id: 9, title: 'Module 2 Quiz', duration: '15 min', completed: false, isQuiz: true },
  { id: 10, title: 'Final Assessment', duration: '20 min', completed: false, isQuiz: true },
];

const resources = [
  { id: 1, name: 'CPR Guidelines 2024.pdf', type: 'PDF', size: '2.4 MB' },
  { id: 2, name: 'Emergency Response Checklist', type: 'PDF', size: '890 KB' },
  { id: 3, name: 'AED Training Manual', type: 'PDF', size: '3.1 MB' },
  { id: 4, name: 'Official AHA Guidelines', type: 'Link', size: 'External' },
];

export default function CourseDetail() {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('Courses');
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [currentLesson, setCurrentLesson] = useState(6);
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [showWatchedLessons, setShowWatchedLessons] = useState(false);

  const courseProgress = 60;
  const currentLessonData = lessons.find(l => l.id === currentLesson);

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'resources', label: 'Resources' },
    { id: 'transcript', label: 'Transcript' },
    { id: 'ai', label: 'AI Feedback' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`bg-gradient-to-b from-[#1A434B] to-[#0d2128] text-white transition-all duration-300 flex flex-col fixed lg:relative inset-y-0 left-0 z-50 w-64 ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Logo Section */}
        <div className="h-16 flex items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#70EF85] rounded-lg flex items-center justify-center">
              <span className="text-[#1A434B] font-bold text-lg">M</span>
            </div>
            <span className="text-white font-bold text-xl">MediCorp</span>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="lg:hidden w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white/10 transition-all duration-200"
            title="Close menu"
          >
            <X size={20} className="text-white/80 hover:text-white" />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 py-2">
          {navigationItems.map((item) => (
            <button
              key={item.label}
              onClick={() => {
                setActiveItem(item.label);
                setIsMobileMenuOpen(false);
                navigate(item.path, { state: { from: '/courses' } });
              }}
              className={`w-full flex items-center gap-3 px-6 py-3 transition-colors border-b border-white/10 ${
                activeItem === item.label
                  ? 'bg-[#70EF85]/20 border-r-4 border-[#70EF85] text-[#70EF85]'
                  : 'text-white hover:bg-white/5'
              }`}
            >
              <span className="flex-shrink-0">
                {item.icon}
              </span>
              <span className={`text-sm font-medium ${
                activeItem === item.label ? 'text-[#70EF85]' : 'text-white'
              }`}>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Footer Section */}
        <div className="p-4 border-t border-white/10">
          <div className="text-left">
            <p className="text-xs text-white/50">Powered by <span className="font-semibold text-[#70EF85]">Hilio LMS</span></p>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col w-full lg:w-auto">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between lg:justify-end px-4 lg:px-12 shadow-sm">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg hover:bg-[#004d40] transition-colors"
          >
            <Menu size={24} className="text-[#004d40] hover:text-white" />
          </button>


          <div className="flex items-center gap-3">
            {/* Messages Icon */}
            <button className="relative w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center hover:bg-[#70EF85]/20 hover:border hover:border-[#70EF85]/40 transition-all duration-200">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
              <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Notifications Icon */}
            <button className="relative w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center hover:bg-[#70EF85]/20 hover:border hover:border-[#70EF85]/40 transition-all duration-200" title="Notifications">
              <Bell size={18} className="text-gray-600" />
            </button>

            {/* User Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center gap-3 pl-2 pr-3 py-1.5 rounded-lg hover:bg-[#70EF85]/10 hover:border hover:border-[#70EF85]/30 transition-all duration-200"
              >
                <img
                  src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop"
                  alt="Ema Smith"
                  className="w-9 h-9 rounded-full object-cover"
                />
                <div className="text-left">
                  <div className="text-sm font-medium text-gray-900">
                    Ema Smith
                  </div>
                </div>
                <ChevronDown size={14} className={`text-gray-500 transition-transform ${isProfileMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  <button className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-colors text-left">
                    <User size={18} className="text-gray-600" />
                    <span className="text-sm text-gray-700">My Profile</span>
                  </button>
                  <button
                    onClick={() => navigate('/reports')}
                    className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-colors text-left"
                  >
                    <Award size={18} className="text-gray-600" />
                    <span className="text-sm text-gray-700">Certificates</span>
                  </button>
                  <button className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-colors text-left">
                    <Settings size={18} className="text-gray-600" />
                    <span className="text-sm text-gray-700">Settings</span>
                  </button>
                  <div className="border-t border-gray-200 my-2"></div>
                  <button
                    onClick={() => navigate('/login')}
                    className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-colors text-left text-red-600"
                  >
                    <LogOut size={18} />
                    <span className="text-sm">Log Out</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto bg-gray-50">
          <div className="bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-8">
              <div className="h-[36px] flex items-center border-b border-gray-100">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <button onClick={() => navigate('/courses')} className="hover:text-[#004d40] transition-colors">
                    Courses
                  </button>
                  <span className="text-gray-300">—</span>
                  <span className="text-[#004d40] font-medium">CPR Certification</span>
                </div>
              </div>

              <div className="py-8">
                <div className="flex-1">
                  <h1 className="text-5xl font-extrabold text-[#004d40] leading-tight" style={{ fontFamily: "'Abhaya Libre', serif", fontWeight: '800' }}>CPR Certification</h1>
                  <div className="mt-5">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-sm font-semibold text-gray-700">Progress</span>
                      <span className="text-sm font-bold text-[#004d40]">{courseProgress}%</span>
                    </div>
                    <div className="w-full max-w-xl bg-gray-200 rounded-full h-2.5 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-[#70EF85] to-[#5FD974] h-2.5 rounded-full transition-all duration-500"
                        style={{ width: `${courseProgress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                  <div className="relative bg-black aspect-video">
                    <video
                      className="w-full h-full object-cover"
                      poster="https://images.pexels.com/videos/7469640/pictures/preview-0.jpg"
                      controls
                    >
                      <source src="https://videos.pexels.com/video-files/7469640/7469640-hd_1920_1080_25fps.mp4" type="video/mp4" />
                    </video>
                  </div>
                  <div className="p-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
                    <button
                      onClick={() => setCurrentLesson(Math.max(1, currentLesson - 1))}
                      disabled={currentLesson === 1}
                      className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronLeft size={18} />
                      <span className="text-sm font-medium">Previous</span>
                    </button>
                    <span className="text-sm text-gray-600">
                      Lesson {currentLesson} of {lessons.length}
                    </span>
                    <button
                      onClick={() => setCurrentLesson(Math.min(lessons.length, currentLesson + 1))}
                      disabled={currentLesson === lessons.length}
                      className="flex items-center gap-2 px-4 py-2 bg-[#1A434B] text-white rounded-lg hover:bg-[#153339] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span className="text-sm font-medium">Next</span>
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                  <div className="border-b border-gray-200">
                    <div className="flex">
                      {tabs.map((tab) => (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                            activeTab === tab.id
                              ? 'text-[#1A434B] border-b-2 border-[#70EF85] bg-[#70EF85]/5'
                              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                          }`}
                        >
                          {tab.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="p-6">
                    {activeTab === 'overview' && (
                      <div className="space-y-4">
                        <h3 className="text-lg font-bold text-[#004d40]">About This Lesson</h3>
                        <p className="text-gray-600 leading-relaxed">
                          In this lesson, you'll learn about choking response procedures and emergency intervention techniques.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-1 space-y-6">
                <div className="bg-white rounded-2xl border border-gray-200 p-5">
                  <h3 className="text-lg font-bold text-[#004d40] mb-4">Your Progress</h3>
                  <div className="space-y-2">
                    {lessons.map((lesson) => (
                      <button
                        key={lesson.id}
                        onClick={() => setCurrentLesson(lesson.id)}
                        className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-300 group relative overflow-hidden ${
                          currentLesson === lesson.id
                            ? 'bg-gradient-to-r from-[#70EF85]/25 to-[#70EF85]/15 border-2 border-[#70EF85] shadow-md scale-[1.02]'
                            : 'hover:bg-gray-50 border border-gray-200 hover:border-[#70EF85]/40 hover:shadow-sm'
                        }`}
                      >
                        <div className="relative z-10">
                          {lesson.completed ? (
                            <CheckCircle size={20} className="text-[#70EF85] flex-shrink-0" />
                          ) : (
                            <Circle size={20} className="flex-shrink-0 text-gray-300 group-hover:text-[#70EF85]/50" />
                          )}
                        </div>
                        <div className="flex-1 text-left relative z-10">
                          <p className={`text-sm font-medium transition-colors ${
                            currentLesson === lesson.id
                              ? 'text-[#004d40] font-semibold'
                              : 'text-gray-700 group-hover:text-[#004d40]'
                          }`}>
                            {lesson.title}
                          </p>
                          <p className={`text-xs ${
                            currentLesson === lesson.id ? 'text-[#004d40]/70' : 'text-gray-500'
                          }`}>{lesson.duration}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}