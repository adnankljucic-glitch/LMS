export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  department: string;
  startDate: string;
  avatar?: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  duration: string;
  modules: number;
  mandatory: boolean;
  deadline?: string;
  progress: number;
  completed: boolean;
  thumbnail?: string;
  tags: string[];
}

export interface Module {
  id: string;
  courseId: string;
  title: string;
  type: 'video' | 'reading' | 'quiz' | 'interactive';
  duration: string;
  completed: boolean;
  locked: boolean;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  time?: string;
  type: 'deadline' | 'live-session' | 'milestone' | 'exam';
  description?: string;
  courseId?: string;
}

export interface OnboardingTask {
  id: string;
  title: string;
  description: string;
  week: number;
  category: string;
  completed: boolean;
  deadline?: string;
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correct: number;
  explanation: string;
}

export interface Assessment {
  id: string;
  title: string;
  description: string;
  questions: Question[];
  timeLimit: number;
  passMark: number;
  attempts: number;
  maxAttempts: number;
  lastScore?: number;
  passed?: boolean;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}
