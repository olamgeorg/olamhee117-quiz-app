import React from 'react';
import { QuizAttempt, BackgroundTheme } from '../types';
import { Award, Calendar, BookOpen, RotateCcw, TrendingUp, CheckCircle, Brain, RefreshCw } from 'lucide-react';

interface ProgressTrackerProps {
  attempts: QuizAttempt[];
  onResetProgress: () => void;
  theme: BackgroundTheme;
}

export default function ProgressTracker({ attempts, onResetProgress, theme }: ProgressTrackerProps) {
  // Compute overall stats
  const totalAttempts = attempts.length;
  const examAttempts = attempts.filter(a => a.mode === 'exam');
  const practiceAttempts = attempts.filter(a => a.mode === 'practice');
  
  const totalQuestionsAnswered = attempts.reduce((acc, current) => acc + current.totalQuestions, 0);
  const totalCorrectAnswers = attempts.reduce((acc, current) => acc + current.score, 0);
  
  const accuracyRate = totalQuestionsAnswered > 0 
    ? Math.round((totalCorrectAnswers / totalQuestionsAnswered) * 100) 
    : 0;

  // Compute stats per PDF module
  const pdf1Attempts = attempts.filter(a => a.pdfModule === 1);
  const pdf2Attempts = attempts.filter(a => a.pdfModule === 2);

  const getModuleAvgScore = (pModule: 1 | 2) => {
    const modAttempts = attempts.filter(a => a.pdfModule === pModule);
    if (modAttempts.length === 0) return 0;
    const totalCorrect = modAttempts.reduce((sum, item) => sum + item.score, 0);
    const totalQGroup = modAttempts.reduce((sum, item) => sum + item.totalQuestions, 0);
    return totalQGroup > 0 ? Math.round((totalCorrect / totalQGroup) * 100) : 0;
  };

  const pdf1Avg = getModuleAvgScore(1);
  const pdf2Avg = getModuleAvgScore(2);

  return (
    <div id="progress-tracker-panel" className="flex flex-col gap-6">
      
      {/* Overview Stats Cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        
        {/* Card 1: Total Completed */}
        <div className={`p-4 rounded-2xl flex flex-col justify-between ${theme.cardClass} transition-shadow duration-300`}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase opacity-75">Quizzes Run</span>
            <BookOpen className="w-5 h-5 text-fuchsia-400" />
          </div>
          <div className="mt-4">
            <span className="text-3xl font-extrabold tracking-tight md:text-4xl">{totalAttempts}</span>
            <p className="text-xs mt-1 opacity-70">
              {examAttempts.length} Exams / {practiceAttempts.length} Practice
            </p>
          </div>
        </div>

        {/* Card 2: Questions Answered */}
        <div className={`p-4 rounded-2xl flex flex-col justify-between ${theme.cardClass} transition-shadow duration-300`}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase opacity-75">HEE117 Questions</span>
            <Brain className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="mt-4">
            <span className="text-3xl font-extrabold tracking-tight md:text-4xl">{totalQuestionsAnswered}</span>
            <p className="text-xs mt-1 opacity-70">
              {totalCorrectAnswers} Correct answers
            </p>
          </div>
        </div>

        {/* Card 3: Overall Accuracy */}
        <div className={`p-4 rounded-2xl flex flex-col justify-between ${theme.cardClass} transition-shadow duration-300`}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase opacity-75">Avg Accuracy</span>
            <TrendingUp className="w-5 h-5 text-cyan-400" />
          </div>
          <div className="mt-4">
            <span className="text-3xl font-extrabold tracking-tight md:text-4xl">{accuracyRate}%</span>
            {/* Visual thin line progress */}
            <div className="w-full bg-white/10 h-1.5 rounded-full mt-2 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-teal-400 to-cyan-400 transition-all duration-500" 
                style={{ width: `${accuracyRate}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Card 4: Exam Status */}
        <div className={`p-4 rounded-2xl flex flex-col justify-between ${theme.cardClass} transition-shadow duration-300`}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase opacity-75">Syllabus Grade</span>
            <Award className="w-5 h-5 text-amber-400" />
          </div>
          <div className="mt-4">
            <span className="text-3xl font-extrabold tracking-tight md:text-4xl">
              {accuracyRate >= 80 ? 'A' : accuracyRate >= 70 ? 'B' : accuracyRate >= 50 ? 'C' : totalAttempts > 0 ? 'F' : 'N/A'}
            </span>
            <p className="text-xs mt-1 opacity-70">
              {accuracyRate >= 70 ? 'Exam Standard Ready 🎉' : totalAttempts === 0 ? 'No attempts' : 'Needs more practice'}
            </p>
          </div>
        </div>

      </div>

      {/* Target Module Performance */}
      <div className={`p-5 rounded-2xl ${theme.cardClass}`}>
        <h4 className="text-sm font-bold tracking-wider uppercase mb-4 opacity-90 flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-pink-400" />
          Differentiation of PDF Modules
        </h4>
        
        <div className="flex flex-col gap-5 sm:flex-row">
          {/* PDF 1 stats */}
          <div className="flex-1 p-4 rounded-xl bg-white/5 border border-white/5 flex flex-col justify-between">
            <div>
              <span className="py-1 px-2 rounded bg-violet-500/20 text-violet-300 text-[10px] font-bold uppercase tracking-wider">
                PDF 1 Study Set
              </span>
              <h5 className="font-bold text-base mt-2 line-clamp-2">
                Domestic, Urban Violence & Flooding, Substances, Pollution
              </h5>
              <p className="text-xs opacity-70 mt-1">Scope of Modules 2 - 3, types of abuses, pollution categories and solutions.</p>
            </div>
            
            <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
              <span className="text-xs opacity-75">Average Score:</span>
              <span className="text-lg font-extrabold text-violet-400">{pdf1Avg}% ({pdf1Attempts.length} runs)</span>
            </div>
          </div>

          {/* PDF 2 stats */}
          <div className="flex-1 p-4 rounded-xl bg-white/5 border border-white/5 flex flex-col justify-between">
            <div>
              <span className="py-1 px-2 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold uppercase tracking-wider">
                PDF 2 Study Set
              </span>
              <h5 className="font-bold text-base mt-2 line-clamp-2">
                Adolescent Health, STIs, Stress & Environment Health
              </h5>
              <p className="text-xs opacity-70 mt-1">Biological definition of adolescence, pathogens classification, and stress triggers from Dr. T.A. Ola.</p>
            </div>
            
            <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
              <span className="text-xs opacity-75">Average Score:</span>
              <span className="text-lg font-extrabold text-emerald-400">{pdf2Avg}% ({pdf2Attempts.length} runs)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quiz Attempt History Log */}
      <div className={`p-5 rounded-2xl ${theme.cardClass}`}>
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <h4 className="text-sm font-bold tracking-wider uppercase opacity-90 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-cyan-400" />
            Performance Attempt Logs
          </h4>
          {attempts.length > 0 && (
            <button
              onClick={() => {
                if (confirm('Are you sure you want to clear your full history?')) {
                  onResetProgress();
                }
              }}
              className="flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20 hover:bg-rose-500/20 transition-all cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              Reset Logs
            </button>
          )}
        </div>

        {attempts.length === 0 ? (
          <div className="text-center py-8 opacity-65 flex flex-col items-center gap-2">
            <RefreshCw className="w-8 h-8 text-white/30 animate-spin-slow" />
            <p className="text-sm">No exam or practice attempts recorded yet.</p>
            <p className="text-xs">Take your first quiz study set to begin logs tracking!</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-white/10 opacity-75 text-[10px] uppercase tracking-wider">
                  <th className="py-2">Date & Time</th>
                  <th className="py-2">Syllabus PDF Module</th>
                  <th className="py-2">Practice / Exam Mode</th>
                  <th className="py-2 text-right">Score Met</th>
                  <th className="py-2 text-right">Accuracy Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {[...attempts].reverse().slice(0, 10).map((attempt) => {
                  const percent = Math.round((attempt.score / attempt.totalQuestions) * 100);
                  return (
                    <tr key={attempt.id} className="hover:bg-white/5 transition-colors">
                      <td className="py-3 font-mono opacity-80">
                        {new Date(attempt.timestamp).toLocaleString(undefined, {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </td>
                      <td className="py-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          attempt.pdfModule === 1 ? 'bg-violet-500/20 text-violet-300' : 'bg-emerald-500/20 text-emerald-300'
                        }`}>
                          PDF {attempt.pdfModule} - {attempt.pdfModule === 1 ? 'Violence & Pollution' : 'Adolescent & Stress'}
                        </span>
                      </td>
                      <td className="py-3">
                        <span className={`capitalize font-bold ${
                          attempt.mode === 'exam' ? 'text-rose-400' : 'text-blue-400'
                        }`}>
                          {attempt.mode}
                        </span>
                      </td>
                      <td className="py-3 text-right font-semibold">
                        {attempt.score} / {attempt.totalQuestions}
                      </td>
                      <td className="py-3 text-right font-extrabold text-teal-400">
                        {percent}%
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {attempts.length > 10 && (
              <p className="text-center text-[11px] opacity-60 mt-3 font-mono">
                Showing the last 10 attempts. {attempts.length} attempts recorded in total.
              </p>
            )}
          </div>
        )}
      </div>

    </div>
  );
}
