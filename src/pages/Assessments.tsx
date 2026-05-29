import { useState, useEffect, useRef } from 'react';
import { CheckCircle, XCircle, Clock, Award, AlertTriangle, ChevronRight, RotateCcw } from 'lucide-react';
import Layout from '../components/Layout';
import { ASSESSMENTS } from '../data/mockData';
import type { Assessment } from '../types';

type Screen = 'list' | 'intro' | 'quiz' | 'result';

export default function Assessments() {
  const [screen, setScreen] = useState<Screen>('list');
  const [active, setActive] = useState<Assessment | null>(null);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [score, setScore] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  const startAssessment = (assessment: Assessment) => {
    setActive(assessment);
    setCurrentQ(0);
    setAnswers(new Array(assessment.questions.length).fill(null));
    setSelected(null);
    setShowExplanation(false);
    setTimeLeft(assessment.timeLimit * 60);
    setScreen('intro');
  };

  const beginQuiz = () => {
    setScreen('quiz');
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          finishQuiz();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
  };

  const selectAnswer = (idx: number) => {
    if (showExplanation) return;
    setSelected(idx);
    setShowExplanation(true);
    const updated = [...answers];
    updated[currentQ] = idx;
    setAnswers(updated);
  };

  const nextQuestion = () => {
    if (!active) return;
    if (currentQ < active.questions.length - 1) {
      setCurrentQ(q => q + 1);
      setSelected(null);
      setShowExplanation(false);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (!active) return;
    const correct = answers.filter((a, i) => a === active.questions[i]?.correct).length;
    const pct = Math.round((correct / active.questions.length) * 100);
    setScore(pct);
    setScreen('result');
  };

  const formatTime = (s: number) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  if (screen === 'intro' && active) {
    return (
      <Layout>
        <div className="px-6 lg:px-8 py-8 max-w-2xl mx-auto animate-fade-in">
          <button onClick={() => setScreen('list')} className="text-sm text-danske-muted hover:text-danske-text mb-6 flex items-center gap-1 transition-colors">
            ← Back to Assessments
          </button>
          <div className="bg-white rounded-xl border border-danske-border p-8 text-center">
            <div className="w-16 h-16 bg-danske-navy/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-danske-navy" />
            </div>
            <h1 className="text-xl font-bold text-danske-text mb-2">{active.title}</h1>
            <p className="text-danske-muted text-sm mb-8 leading-relaxed max-w-md mx-auto">{active.description}</p>
            <div className="grid grid-cols-3 gap-4 mb-8">
              {[
                { label: 'Questions', value: active.questions.length },
                { label: 'Time Limit', value: `${active.timeLimit} min` },
                { label: 'Pass Mark', value: `${active.passMark}%` },
              ].map(({ label, value }) => (
                <div key={label} className="bg-danske-gray rounded-lg p-3">
                  <div className="text-lg font-bold text-danske-text">{value}</div>
                  <div className="text-xs text-danske-muted">{label}</div>
                </div>
              ))}
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8 text-left">
              <p className="text-xs text-amber-700">
                <strong>Attempt {active.attempts + 1} of {active.maxAttempts}.</strong> Once started, the timer cannot be paused. Read each question carefully before answering.
              </p>
            </div>
            <button
              onClick={beginQuiz}
              className="w-full py-3 bg-danske-navy text-white rounded-lg font-semibold hover:bg-danske-navyLight transition-colors"
            >
              Begin Exam
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  if (screen === 'quiz' && active) {
    const q = active.questions[currentQ];
    const isLast = currentQ === active.questions.length - 1;
    const progress = ((currentQ + (showExplanation ? 1 : 0)) / active.questions.length) * 100;

    return (
      <Layout>
        <div className="px-6 lg:px-8 py-8 max-w-2xl mx-auto animate-fade-in">
          {/* Quiz header */}
          <div className="flex items-center justify-between mb-6">
            <span className="text-sm font-medium text-danske-muted">
              Question {currentQ + 1} of {active.questions.length}
            </span>
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-mono font-medium ${
              timeLeft < 300 ? 'bg-red-50 text-red-700' : 'bg-danske-gray text-danske-text'
            }`}>
              <Clock className="w-4 h-4" />
              {formatTime(timeLeft)}
            </div>
          </div>

          <div className="h-1.5 bg-danske-border rounded-full mb-6 overflow-hidden">
            <div className="h-full bg-danske-cyan rounded-full transition-all" style={{ width: `${progress}%` }} />
          </div>

          <div className="bg-white rounded-xl border border-danske-border p-6 mb-4">
            <h2 className="font-semibold text-danske-text mb-6 leading-relaxed">{q.text}</h2>
            <div className="space-y-3">
              {q.options.map((opt, i) => {
                let style = 'border-danske-border bg-white hover:border-danske-cyan hover:bg-danske-cyan/5';
                if (showExplanation) {
                  if (i === q.correct) style = 'border-green-400 bg-green-50';
                  else if (i === selected && i !== q.correct) style = 'border-red-400 bg-red-50';
                  else style = 'border-danske-border bg-white opacity-60';
                } else if (selected === i) {
                  style = 'border-danske-cyan bg-danske-cyan/10';
                }
                return (
                  <button
                    key={i}
                    onClick={() => selectAnswer(i)}
                    disabled={showExplanation}
                    className={`w-full text-left px-4 py-3 rounded-lg border-2 transition-all text-sm ${style}`}
                  >
                    <div className="flex items-start gap-3">
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5 ${
                        showExplanation && i === q.correct ? 'bg-green-500 text-white' :
                        showExplanation && i === selected && i !== q.correct ? 'bg-red-500 text-white' :
                        'bg-danske-gray text-danske-muted'
                      }`}>
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span className="text-danske-text">{opt}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {showExplanation && (
            <div className={`rounded-xl border p-4 mb-4 ${selected === q.correct ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
              <div className="flex items-center gap-2 mb-1">
                {selected === q.correct
                  ? <CheckCircle className="w-4 h-4 text-green-600" />
                  : <XCircle className="w-4 h-4 text-red-600" />
                }
                <span className={`text-sm font-medium ${selected === q.correct ? 'text-green-700' : 'text-red-700'}`}>
                  {selected === q.correct ? 'Correct!' : 'Incorrect'}
                </span>
              </div>
              <p className="text-xs text-danske-muted leading-relaxed">{q.explanation}</p>
            </div>
          )}

          {showExplanation && (
            <button
              onClick={nextQuestion}
              className="w-full py-3 bg-danske-navy text-white rounded-xl font-semibold hover:bg-danske-navyLight transition-colors flex items-center justify-center gap-2"
            >
              {isLast ? 'Finish & See Results' : 'Next Question'}
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </Layout>
    );
  }

  if (screen === 'result' && active) {
    const passed = score >= active.passMark;
    const correct = Math.round((score / 100) * active.questions.length);

    return (
      <Layout>
        <div className="px-6 lg:px-8 py-8 max-w-2xl mx-auto animate-fade-in">
          <div className="bg-white rounded-xl border border-danske-border p-8 text-center">
            <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${passed ? 'bg-green-100' : 'bg-red-100'}`}>
              {passed
                ? <Award className="w-10 h-10 text-green-600" />
                : <XCircle className="w-10 h-10 text-red-600" />
              }
            </div>
            <h2 className="text-2xl font-bold text-danske-text mb-1">{passed ? 'Congratulations!' : 'Not Passed'}</h2>
            <p className="text-danske-muted text-sm mb-6">
              {passed
                ? `You passed ${active.title} with a score of ${score}%.`
                : `You scored ${score}%. You need ${active.passMark}% to pass.`
              }
            </p>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className={`rounded-lg p-4 ${passed ? 'bg-green-50' : 'bg-red-50'}`}>
                <div className={`text-3xl font-bold ${passed ? 'text-green-700' : 'text-red-700'}`}>{score}%</div>
                <div className="text-xs text-danske-muted mt-0.5">Your Score</div>
              </div>
              <div className="bg-danske-gray rounded-lg p-4">
                <div className="text-3xl font-bold text-danske-text">{correct}/{active.questions.length}</div>
                <div className="text-xs text-danske-muted mt-0.5">Correct</div>
              </div>
              <div className="bg-danske-gray rounded-lg p-4">
                <div className="text-3xl font-bold text-danske-text">{active.passMark}%</div>
                <div className="text-xs text-danske-muted mt-0.5">Pass Mark</div>
              </div>
            </div>

            <div className="flex gap-3">
              {!passed && active.attempts < active.maxAttempts - 1 && (
                <button
                  onClick={() => startAssessment(active)}
                  className="flex-1 flex items-center justify-center gap-2 py-3 border border-danske-border rounded-lg text-sm font-medium text-danske-text hover:bg-danske-gray transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  Retry
                </button>
              )}
              <button
                onClick={() => setScreen('list')}
                className="flex-1 py-3 bg-danske-navy text-white rounded-lg text-sm font-semibold hover:bg-danske-navyLight transition-colors"
              >
                Back to Assessments
              </button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // List screen
  return (
    <Layout>
      <div className="px-6 lg:px-8 py-8 max-w-4xl mx-auto animate-fade-in">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-danske-text">Assessments</h1>
          <p className="text-danske-muted mt-1">Mandatory certification exams and knowledge checks</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {ASSESSMENTS.map(assessment => {
            const canStart = !assessment.passed && assessment.attempts < assessment.maxAttempts;
            return (
              <div key={assessment.id} className="bg-white rounded-xl border border-danske-border overflow-hidden">
                <div className={`h-1.5 ${assessment.passed ? 'bg-green-400' : assessment.attempts > 0 ? 'bg-amber-400' : 'bg-danske-border'}`} />
                <div className="p-6">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h3 className="font-semibold text-danske-text leading-tight">{assessment.title}</h3>
                    {assessment.passed
                      ? <span className="text-xs bg-green-50 text-green-700 border border-green-200 px-2 py-0.5 rounded-full font-medium flex-shrink-0">Passed</span>
                      : assessment.attempts >= assessment.maxAttempts
                      ? <span className="text-xs bg-red-50 text-red-700 border border-red-200 px-2 py-0.5 rounded-full font-medium flex-shrink-0">Max attempts</span>
                      : <span className="text-xs bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded-full font-medium flex-shrink-0">
                          {assessment.attempts === 0 ? 'Not started' : `Attempt ${assessment.attempts}`}
                        </span>
                    }
                  </div>
                  <p className="text-xs text-danske-muted mb-4 leading-relaxed">{assessment.description}</p>

                  <div className="grid grid-cols-3 gap-3 mb-4 text-center">
                    <div className="bg-danske-gray rounded-lg p-2">
                      <div className="text-sm font-bold text-danske-text">{assessment.questions.length || '—'}</div>
                      <div className="text-[10px] text-danske-muted">Questions</div>
                    </div>
                    <div className="bg-danske-gray rounded-lg p-2">
                      <div className="text-sm font-bold text-danske-text">{assessment.timeLimit}m</div>
                      <div className="text-[10px] text-danske-muted">Time limit</div>
                    </div>
                    <div className="bg-danske-gray rounded-lg p-2">
                      <div className="text-sm font-bold text-danske-text">{assessment.passMark}%</div>
                      <div className="text-[10px] text-danske-muted">Pass mark</div>
                    </div>
                  </div>

                  {assessment.lastScore !== undefined && (
                    <div className={`flex items-center gap-2 text-xs px-3 py-2 rounded-lg mb-3 ${assessment.passed ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'}`}>
                      {assessment.passed ? <CheckCircle className="w-3.5 h-3.5" /> : <AlertTriangle className="w-3.5 h-3.5" />}
                      Last score: {assessment.lastScore}% · {assessment.attempts}/{assessment.maxAttempts} attempts used
                    </div>
                  )}

                  <button
                    onClick={() => canStart && assessment.questions.length > 0 && startAssessment(assessment)}
                    disabled={!canStart || assessment.questions.length === 0}
                    className={`w-full py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                      canStart && assessment.questions.length > 0
                        ? 'bg-danske-navy text-white hover:bg-danske-navyLight'
                        : 'bg-danske-gray text-danske-muted cursor-not-allowed'
                    }`}
                  >
                    {assessment.passed
                      ? 'Passed ✓'
                      : assessment.attempts >= assessment.maxAttempts
                      ? 'No attempts remaining'
                      : assessment.questions.length === 0
                      ? 'Coming soon'
                      : assessment.attempts === 0
                      ? 'Start Exam'
                      : 'Retry Exam'
                    }
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
