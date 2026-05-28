import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  BookOpen,
  ClipboardCheck,
  Bot,
  Video,
  FileText,
  Bell,
  Search,
  ChevronDown,
  ChevronRight,
  User,
  Award,
  LogOut,
  Settings,
  Clock,
  TrendingUp,
  AlertCircle,
  Sparkles,
  CheckCircle,
  Home,
  Headphones,
  Menu,
  X
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

export default function Courses() {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('Courses');
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filters = ['All', 'AI-Recommended', 'VR Courses', 'Completed'];

  const courses = [
    {
      id: 1,
      title: 'CPR Certification',
      description: 'Advanced cardiac life support and emergency response procedures',
      progress: 60,
      status: 'In Progress',
      thumbnail: 'https://images.pexels.com/photos/4225880/pexels-photo-4225880.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
      modules: '6 of 10 modules',
      duration: '2h 15m remaining',
      category: 'Emergency Care',
      isAIRecommended: false,
      aiComment: '',
      isVRCourse: false,
      hasVRVersion: true
    },
    {
      id: 2,
      title: 'Patient Safety Fundamentals',
      description: 'Core principles of maintaining patient safety in healthcare environments',
      progress: 65,
      status: 'In Progress',
      thumbnail: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=600&h=300&fit=crop',
      modules: '5 of 8 modules',
      duration: '1h 30m remaining',
      category: 'Patient Care',
      isAIRecommended: false,
      aiComment: '',
      isVRCourse: false,
      hasVRVersion: true
    },
    {
      id: 3,
      title: 'Medical Ethics & Law',
      description: 'Legal and ethical considerations in modern healthcare practice',
      progress: 100,
      status: 'Quiz Ready',
      thumbnail: 'https://images.pexels.com/photos/8111856/pexels-photo-8111856.jpeg?auto=compress&cs=tinysrgb&w=600&h=300&fit=crop',
      modules: '10 of 10 modules',
      duration: 'Take Quiz',
      category: 'Compliance',
      isAIRecommended: false,
      aiComment: '',
      isVRCourse: false,
      hasVRVersion: false
    },
    {
      id: 4,
      title: 'Infection Control & Hygiene',
      description: 'Best practices for preventing and managing healthcare-associated infections',
      progress: 100,
      status: 'Completed',
      thumbnail: 'https://images.pexels.com/photos/4386470/pexels-photo-4386470.jpeg?auto=compress&cs=tinysrgb&w=600&h=300&fit=crop',
      modules: '8 of 8 modules',
      duration: 'Completed',
      category: 'Safety',
      isAIRecommended: false,
      aiComment: '',
      isVRCourse: false,
      hasVRVersion: true
    },
    {
      id: 5,
      title: 'Data Security & Privacy',
      description: 'HIPAA compliance and protecting patient health information',
      progress: 88,
      status: 'In Progress',
      thumbnail: 'https://images.pexels.com/photos/5380642/pexels-photo-5380642.jpeg?auto=compress&cs=tinysrgb&w=600&h=300&fit=crop',
      modules: '7 of 8 modules',
      duration: '45m remaining',
      category: 'Compliance',
      isAIRecommended: false,
      aiComment: '',
      isVRCourse: false
    },
    {
      id: 6,
      title: 'Pharmacology Basics',
      description: 'Essential medication knowledge for healthcare professionals',
      progress: 25,
      status: 'In Progress',
      thumbnail: 'https://images.pexels.com/photos/3683053/pexels-photo-3683053.jpeg?auto=compress&cs=tinysrgb&w=600&h=300&fit=crop',
      modules: '2 of 12 modules',
      duration: '5h 10m remaining',
      category: 'Medical Knowledge',
      isAIRecommended: false,
      aiComment: '',
      isVRCourse: false
    },
    {
      id: 7,
      title: 'VR Emergency Response Training',
      description: 'Immersive VR simulation for critical care and emergency procedures',
      progress: 0,
      status: 'Not Started',
      thumbnail: 'https://images.pexels.com/photos/4225920/pexels-photo-4225920.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
      modules: '0 of 9 modules',
      duration: '4h 30m',
      category: 'Emergency Care',
      isAIRecommended: false,
      aiComment: '',
      isVRCourse: true
    },
    {
      id: 8,
      title: 'Advanced Patient Communication',
      description: 'Effective communication strategies for healthcare professionals',
      progress: 0,
      status: 'Not Started',
      thumbnail: 'https://images.pexels.com/photos/7551662/pexels-photo-7551662.jpeg?auto=compress&cs=tinysrgb&w=600&h=300&fit=crop',
      modules: '0 of 6 modules',
      duration: '3h',
      category: 'Patient Care',
      isAIRecommended: false,
      aiComment: '',
      isVRCourse: false
    },
    {
      id: 9,
      title: 'Advanced Hygiene Protocols 2025',
      description: 'Updated infection control and hygiene best practices for 2025',
      progress: 0,
      status: 'Not Started',
      thumbnail: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
      modules: '0 of 7 modules',
      duration: '2h 30m',
      category: 'Safety',
      isAIRecommended: true,
      aiComment: 'Suggested based on your Hygiene course results',
      isVRCourse: false
    },
    {
      id: 10,
      title: 'VR Sterile Technique Mastery',
      description: 'Practice advanced sterile procedures in virtual reality environments',
      progress: 0,
      status: 'Not Started',
      thumbnail: 'https://images.pexels.com/photos/8460157/pexels-photo-8460157.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
      modules: '0 of 5 modules',
      duration: '1h 45m',
      category: 'Safety',
      isAIRecommended: true,
      aiComment: 'Builds on your strong Infection Control foundation',
      isVRCourse: true
    },
    {
      id: 11,
      title: 'VR Surgical Training Simulator',
      description: 'Practice surgical procedures in realistic VR operating room environments',
      progress: 0,
      status: 'Not Started',
      thumbnail: 'https://images.pexels.com/photos/4031818/pexels-photo-4031818.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
      modules: '0 of 8 modules',
      duration: '5h',
      category: 'Surgery',
      isAIRecommended: false,
      aiComment: '',
      isVRCourse: true
    },
    {
      id: 12,
      title: 'VR Patient Communication Scenarios',
      description: 'Immersive role-playing for challenging patient interactions',
      progress: 0,
      status: 'Not Started',
      thumbnail: 'https://images.pexels.com/photos/7089020/pexels-photo-7089020.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
      modules: '0 of 6 modules',
      duration: '3h',
      category: 'Patient Care',
      isAIRecommended: false,
      aiComment: '',
      isVRCourse: true
    },
    {
      id: 13,
      title: 'VR Anatomy Explorer',
      description: '3D interactive anatomy learning in virtual reality',
      progress: 0,
      status: 'Not Started',
      thumbnail: 'https://images.pexels.com/photos/4225880/pexels-photo-4225880.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
      modules: '0 of 7 modules',
      duration: '4h',
      category: 'Medical Knowledge',
      isAIRecommended: false,
      aiComment: '',
      isVRCourse: true
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-emerald-100 text-emerald-700 border border-emerald-200';
      case 'Quiz Ready':
        return 'bg-gradient-to-r from-blue-500 to-blue-600 text-white border border-blue-500 font-bold shadow-sm';
      case 'In Progress':
        return 'bg-[#70EF85]/20 text-[#004d40] border border-[#70EF85]/40';
      case 'Not Started':
        return 'bg-gray-100 text-gray-600 border border-gray-200';
      default:
        return 'bg-gray-100 text-gray-600 border border-gray-200';
    }
  };

  const getProgressColor = (progress: number, status?: string) => {
    if (progress === 100 && status === 'Quiz Ready') return 'bg-gradient-to-r from-blue-500 to-blue-600';
    if (progress === 100) return 'bg-gradient-to-r from-emerald-500 to-emerald-600';
    if (progress >= 50) return 'bg-gradient-to-r from-[#70EF85] to-[#5FD974]';
    return 'bg-gradient-to-r from-blue-500 to-blue-600';
  };

  const filteredCourses = courses
    .filter(course => {
      const matchesFilter =
        activeFilter === 'All' ||
        (activeFilter === 'AI-Recommended' && course.isAIRecommended) ||
        (activeFilter === 'VR Courses' && course.isVRCourse) ||
        course.status === activeFilter;
      const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            course.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    })
    .sort((a, b) => {
      if (a.status === 'Quiz Ready' && b.status !== 'Quiz Ready') return -1;
      if (a.status !== 'Quiz Ready' && b.status === 'Quiz Ready') return 1;
      return 0;
    });

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

          {/* Close Button (Mobile Only) */}
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

      {/* Main Content */}
      <div className="flex-1 flex flex-col w-full lg:w-auto">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 h-16 flex items-center justify-between">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg hover:bg-[#004d40] transition-colors"
            >
              <Menu size={24} className="text-[#004d40] hover:text-white" />
            </button>

            {/* Search Bar - Desktop */}
            <div className="flex-1 max-w-2xl hidden lg:block">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search courses, topics, or modules..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 focus:border-[#70EF85] focus:ring-2 focus:ring-[#70EF85]/20 focus:bg-white outline-none transition-all text-sm"
                />
              </div>
            </div>

            {/* Icons and Profile */}
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
                  <p className="text-sm font-semibold text-gray-800">Ema Smith</p>
                  <p className="text-xs text-gray-500">Registered Nurse</p>
                </div>
                <ChevronDown size={16} className="text-gray-600" />
              </button>

              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                  <button className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors">
                    <User size={16} />
                    <span>My Profile</span>
                  </button>
                  <button
                    onClick={() => navigate('/reports')}
                    className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors"
                  >
                    <Award size={16} />
                    <span>Certificates</span>
                  </button>
                  <button className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors">
                    <Settings size={16} />
                    <span>Settings</span>
                  </button>
                  <div className="border-t border-gray-100 my-2"></div>
                  <button
                    onClick={() => navigate('/login')}
                    className="w-full px-4 py-2.5 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-3 transition-colors"
                  >
                    <LogOut size={16} />
                    <span>Log Out</span>
                  </button>
                </div>
              )}
            </div>
          </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-auto">
          {/* Top Section - Page Header */}
          <div className="bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
              {/* Breadcrumb - Fixed height of 36px */}
              <div className="h-[36px] flex items-center border-b border-gray-100">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <button onClick={() => navigate('/dashboard')} className="hover:text-[#004d40] transition-colors">
                    Dashboard
                  </button>
                  <span className="text-gray-300">—</span>
                  <span className="text-[#004d40] font-medium">Courses</span>
                </div>
              </div>

              {/* Header */}
              <div className="py-8">
                <h1 className="text-5xl font-extrabold text-[#004d40] leading-tight mb-2" style={{ fontFamily: "'Abhaya Libre', serif", fontWeight: '800' }}>My Courses</h1>
                <p className="text-gray-600">Continue your learning journey and track your progress</p>
              </div>
            </div>
          </div>

          {/* Main Content */
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-8">

          {/* Featured Course Hero - 3 Column Layout */
          <div className="mb-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Video Section - 2 Columns */
            <div className="lg:col-span-2 relative rounded-2xl overflow-hidden h-[400px] lg:h-[480px]">
              {/* Video Background */}
              <img
                src="https://images.pexels.com/photos/4225880/pexels-photo-4225880.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&fit=crop"
                alt="CPR Certification"
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* Gradient Overlay - Bottom to Top */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>

              {/* Content Overlay */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8">
                <div>
                  {/* Status Badge */}
                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-[#70EF85]/10 text-white border border-white/60">In Progress</span>
                    <span className="text-xs font-semibold text-white/80">2h 15m remaining</span>
                  </div>

                  {/* Title */
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-8">CPR Certification</h2>

                  {/* Progress Bar */}
                  <div className="mb-5">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-white">Progress</span>
                      <span className="text-sm font-bold text-[#70EF85]">60%</span>
                    </div>
                    <div className="w-full bg-white/20 backdrop-blur-sm rounded-full h-2.5 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-[#70EF85] to-[#5FD974] h-2.5 rounded-full transition-all duration-500"
                        style={{ width: '60%' }}
                      ></div>
                    </div>
                  </div>

                  {/* Module Info and Resume Button */}
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl font-bold text-white">6 of 10</span>
                        <span className="text-2xl font-bold text-white/80">modules</span>
                      </div>
                    </div>
                    <button
                      onClick={() => navigate('/courses/1')}
                      className="h-[42px] bg-[#70EF85] hover:bg-[#004d40] text-[#1A434B] hover:text-white font-bold px-6 rounded-xl transition-all duration-300 flex items-center gap-2 hover:shadow-lg hover:shadow-[#004d40]/20"
                    >
                      Resume Course
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Feedback Column - 1 Column */
            <div className="lg:col-span-1 h-[400px] lg:h-[480px] bg-gradient-to-br from-[#FF8C42]/15 to-[#FF6B35]/5 rounded-2xl p-5 sm:p-6 flex flex-col shadow-lg hover:shadow-2xl transition-all duration-300 border border-[#FF8C42]/40">
              {/* AI Icon Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#FF8C42] to-[#FF6B35] rounded-xl flex items-center justify-center shadow-md">
                  <Bot size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#004d40]">Hilio AI Tutor</h3>
                  <p className="text-[#FF8C42] text-xs font-medium">Progress Assistant</p>
                </div>
              </div>

              {/* Feedback Content */
              <div className="flex-1 space-y-3 overflow-y-auto">
                {/* Latest Score */}
                <div className="bg-white rounded-xl p-3 border border-[#FF8C42]/40">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-[#1A434B]">Latest Quiz</span>
                    <CheckCircle size={16} className="text-[#FF8C42]" />
                  </div>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-3xl font-extrabold text-[#FF8C42]">85%</span>
                    <TrendingUp size={18} className="text-[#FF8C42]" />
                  </div>
                  <p className="text-gray-600 text-xs">Keep it up!</p>
                </div>

                {/* Recommendation */
                <div className="bg-white rounded-xl p-3 border border-[#FF8C42]/40">
                  <div className="flex items-start gap-2">
                    <Sparkles size={16} className="text-[#FF8C42] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-[#1A434B] mb-1">Next Steps</p>
                      <p className="text-gray-600 text-xs">Focus on Module 7: Airway Management</p>
                    </div>
                  </div>
                </div>

                {/* Study Stats */
                <div className="bg-white rounded-xl p-3 border border-[#FF8C42]/40">
                  <p className="text-xs font-semibold text-[#1A434B] mb-2">Study Stats</p>
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-600">Time invested</span>
                      <span className="text-[#FF8C42] font-bold">4h 30m</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-600">Completed</span>
                      <span className="text-[#FF8C42] font-bold">6 / 10</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-600">Avg. score</span>
                      <span className="text-[#FF8C42] font-bold">82%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* AI Chat Button */
              <button
                onClick={() => navigate('/ai-tutor')}
                className="w-full bg-gradient-to-r from-[#FF8C42] to-[#FF6B35] hover:from-[#E86A1F] hover:to-[#D94A1A] text-white font-bold py-2.5 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 mt-4 hover:shadow-lg shadow-md">
                <Bot size={18} />
                Ask Hilio AI
              </button>
            </div>
          </div>

          {/* VR Learning Banner */
          <div className="mb-8 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-2xl overflow-hidden border border-gray-700 hover:border-gray-600 transition-all duration-300" style={{ boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)' }}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
              {/* Image Section */}
              <div className="lg:col-span-2 relative h-64 lg:h-auto">
                <img
                  src="/image copy copy copy copy copy.png"
                  alt="VR Medical Training"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/70"></div>

                {/* Overlay Badge */
                <div className="absolute top-4 left-4">
                  <div className="bg-gradient-to-r from-[#70EF85] to-[#5FD974] text-gray-900 px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-4a2 2 0 0 1-1.6-.8l-1.6-2.13a1 1 0 0 0-1.6 0L9.6 17.2A2 2 0 0 1 8 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z"/>
                    </svg>
                    <span className="text-sm font-bold">VR Courses</span>
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6 lg:p-8 flex flex-col justify-center">
                <div className="mb-4">
                  <h3 className="text-2xl font-extrabold text-white mb-2">
                    Immersive VR Learning
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Step into the future of medical training with our VR-enhanced courses. Practice procedures in realistic environments.
                  </p>
                </div>

                {/* Quick Stats */
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                    <p className="text-[#70EF85] text-2xl font-bold">5</p>
                    <p className="text-gray-300 text-xs">VR Courses</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                    <p className="text-[#70EF85] text-2xl font-bold">360°</p>
                    <p className="text-gray-300 text-xs">Scenarios</p>
                  </div>
                </div>

                <button
                  onClick={() => setActiveFilter('VR Courses')}
                  className="w-full bg-gradient-to-r from-[#70EF85] to-[#5FD974] hover:from-[#5FD974] hover:to-[#4FC964] text-[#1A434B] font-bold py-3 px-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-4a2 2 0 0 1-1.6-.8l-1.6-2.13a1 1 0 0 0-1.6 0L9.6 17.2A2 2 0 0 1 8 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z"/>
                  </svg>
                  Explore VR Courses
                </button>
              </div>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="mb-8 overflow-x-auto">
            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-5 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 whitespace-nowrap ${
                    activeFilter === filter
                      ? 'bg-[#70EF85] text-[#1A434B] shadow-md'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                  style={{
                    boxShadow: activeFilter === filter ? '0 4px 14px rgba(112, 239, 133, 0.25)' : 'none'
                  }}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Course Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                className={`bg-white rounded-2xl overflow-hidden border transition-all duration-300 flex flex-col ${
                  course.status === 'Completed' ? 'opacity-60 border-gray-200' : 'border-gray-200 hover:border-[#70EF85]/60 hover:shadow-xl'
                }`}
              >
                <div className="relative">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className={`w-full h-44 object-cover ${
                      course.status === 'Completed' ? 'grayscale' : ''
                    }`}
                  />
                  <div className="absolute top-3 left-3 right-3 flex items-start justify-between">
                    <span className={`text-xs font-semibold px-3 py-1.5 rounded-full backdrop-blur-sm ${
                      course.category === 'Compliance'
                        ? 'bg-blue-500/95 text-white'
                        : 'bg-[#70EF85]/95 text-[#004d40]'
                    }`}>
                      {course.category}
                    </span>
                    <div className="flex items-start gap-2">
                      {course.isAIRecommended && (
                        <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-gradient-to-r from-[#FF8C42] to-[#FF6B35] text-white shadow-md flex items-center gap-1">
                          <Sparkles size={12} />
                          AI Suggestion
                        </span>
                      )}
                      {course.status === 'Quiz Ready' && (
                        <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${getStatusColor(course.status)}`}>
                          {course.status}
                        </span>
                      )}
                      {course.status === 'Completed' && (
                        <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${getStatusColor(course.status)}`}>
                          {course.status}
                        </span>
                      )}
                      {(course.isVRCourse || course.hasVRVersion) && (
                        <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-gray-900/90 text-white backdrop-blur-sm flex items-center gap-1">
                          <Headphones size={12} />
                          VR
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-1">
                  {/* AI Comment */}
                  {course.isAIRecommended && course.aiComment && (
                    <div className="mb-3 bg-[#FF8C42]/10 border border-[#FF8C42]/30 rounded-lg p-2.5">
                      <p className="text-xs text-gray-700 flex items-start gap-2">
                        <Bot size={14} className="text-[#FF8C42] flex-shrink-0 mt-0.5" />
                        <span>{course.aiComment}</span>
                      </p>
                    </div>
                  )}

                  <div className="mb-3">
                    <h3 className="text-lg font-bold text-gray-900 mt-1 mb-2">{course.title}</h3>
                    <p className="text-sm text-gray-600 line-clamp-2">{course.description}</p>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <BookOpen size={14} />
                      <span>{course.modules}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      <span>{course.duration}</span>
                    </div>
                  </div>

                  {course.progress > 0 && (
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold text-gray-700">Progress</span>
                        <span className={`text-xs font-bold ${course.status === 'Quiz Ready' ? 'text-blue-600' : 'text-[#004d40]'}`}>{course.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div
                          className={`${getProgressColor(course.progress, course.status)} h-2 rounded-full transition-all duration-500"}
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}

                  <button
                    onClick={() => navigate(course.status === 'Quiz Ready' ? `/courses/${course.id}/quiz` : `/courses/${course.id}`)}
                    className="w-full bg-[#70EF85] hover:bg-[#004d40] text-[#1A434B] hover:text-white font-semibold py-2.5 px-4 rounded-xl transition-all duration-300 mt-auto hover:shadow-lg hover:shadow-[#004d40]/20"
                  >
                    {course.status === 'Not Started' ? 'Start Course' : course.status === 'Quiz Ready' ? 'Take Quiz' : course.status === 'Completed' ? 'Review' : 'Continue'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredCourses.length === 0 && (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search size={32} className="text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No courses found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria</p>
            </div>
          )}
          </div>
        </div>
      </div>
    </div>
  );
}