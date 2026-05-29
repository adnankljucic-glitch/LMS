import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import OnboardingPlan from './pages/OnboardingPlan';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import Calendar from './pages/Calendar';
import Assessments from './pages/Assessments';
import AiTutor from './pages/AiTutor';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/onboarding" element={<OnboardingPlan />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:id" element={<CourseDetail />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/assessments" element={<Assessments />} />
        <Route path="/ai-tutor" element={<AiTutor />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
