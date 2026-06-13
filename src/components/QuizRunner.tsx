import React, { useState, useEffect, useRef } from 'react';
import { Question, QuizMode, BackgroundTheme } from '../types';
import { quizQuestions } from '../data/quizQuestions';
import { 
  CheckCircle2, 
  XCircle, 
  Clock, 
  HelpCircle, 
  ChevronRight, 
  RotateCcw, 
  BookOpen, 
  Sparkles, 
  ChevronLeft,
  Award,
  BookMarked
} from 'lucide-react';

interface QuizRunnerProps {
  pdfModule: 1 | 2;
  mode: QuizMode;
  theme: BackgroundTheme;
  onQuizComplete: (score: number, total: number, mode: QuizMode, incorrectQuestionIds: number[]) => void;
  onBackToDashboard: () => void;
}

export default function QuizRunner({ pdfModule, mode, theme, onQuizComplete, onBackToDashboard }: QuizRunnerProps) {
  // Filter questions for the selected module
  const questions = quizQuestions.filter(q => q.pdfModule === pdfModule);
  
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [qIdx: number]: number }>({});
  const [answersSubmitted, setAnswersSubmitted] = useState<{ [qIdx: number]: boolean }>({});
  const [quizFinished, setQuizFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [incorrectQuestionIds, setIncorrectQuestionIds] = useState<number[]>([]);
  
  // Exam timer states (12 minutes / 720 seconds)
  const [timeLeft, setTimeLeft] = useState(720);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const currentQuestion = questions[currentQuestionIdx];
  const isExam = mode === 'exam';
  const hasSelectedCurrent = selectedAnswers[currentQuestionIdx] !== undefined;
  const isCurrentSubmitted = answersSubmitted[currentQuestionIdx];

  // Start exam countdown timer
  useEffect(() => {
    if (isExam && !quizFinished) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            handleQuizFinish(true); // Forced submission on timeout
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isExam, quizFinished]);

  // Handle option click
  const handleOptionClick = (optionIndex: number) => {
    if (isExam) {
      // In Exam mode, users can change options back and forth until the end
      setSelectedAnswers(prev => ({
        ...prev,
        [currentQuestionIdx]: optionIndex
      }));
    } else {
      // In Practice mode, click is absolute and triggers instant review
      if (hasSelectedCurrent) return; // Prevent multiple taps
      
      setSelectedAnswers(prev => ({
        ...prev,
        [currentQuestionIdx]: optionIndex
      }));
      setAnswersSubmitted(prev => ({
        ...prev,
        [currentQuestionIdx]: true
      }));

      // Directly update current score state & track wrong questions index lists
      const isCorrect = optionIndex === currentQuestion.correctOptionIndex;
      if (isCorrect) {
        setScore(prev => prev + 1);
      } else {
        setIncorrectQuestionIds(prev => {
          if (!prev.includes(currentQuestion.id)) {
            return [...prev, currentQuestion.id];
          }
          return prev;
        });
      }
    }
  };

  // Navigate back/forward
  const handleNext = () => {
    if (currentQuestionIdx < questions.length - 1) {
      setCurrentQuestionIdx(currentQuestionIdx + 1);
    } else if (isExam) {
      // Complete Exam
      handleQuizFinish(false);
    } else {
      // Complete Practice
      setQuizFinished(true);
      onQuizComplete(score, questions.length, 'practice', incorrectQuestionIds);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIdx > 0) {
      setCurrentQuestionIdx(currentQuestionIdx - 1);
    }
  };

  const handleQuizFinish = (isTimeout = false) => {
    if (timerRef.current) clearInterval(timerRef.current);
    
    // Calculate final score for Exam Mode
    let finalScore = 0;
    const failedQuestionsList: number[] = [];

    questions.forEach((q, idx) => {
      const userAns = selectedAnswers[idx];
      if (userAns === q.correctOptionIndex) {
        finalScore += 1;
      } else {
        failedQuestionsList.push(q.id);
      }
    });

    setScore(finalScore);
    setIncorrectQuestionIds(failedQuestionsList);
    setQuizFinished(true);
    
    // Save record to parent progress logs
    onQuizComplete(finalScore, questions.length, isExam ? 'exam' : 'practice', failedQuestionsList);
    
    if (isTimeout) {
      alert("Exam time expired! Your choices were submitted automatically.");
    }
  };

  // Formatting Exam clock text
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Percent progress computation
  const percentCompleted = Math.round(((Object.keys(selectedAnswers).length) / questions.length) * 100);

  return (
    <div className="flex flex-col gap-6" id="quiz-runner-body">
      
      {/* Header Panel */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <button
            onClick={onBackToDashboard}
            className="text-xs text-fuchsia-400 font-bold hover:underline mb-1 flex items-center gap-1 cursor-pointer"
          >
            ← Leave Quiz and Back of Study Hall
          </button>
          <h2 className="text-xl md:text-2xl font-extrabold tracking-tight">
            HEE117 Study Set: PDF {pdfModule}
          </h2>
          <p className="text-xs opacity-75 mt-0.5">
            {pdfModule === 1 
              ? "Violence (Domestic & Urban), Flooding, Psychoactive Substances, & Pollution Principles" 
              : "Adolescent Health, Intimate Infections (STIs), Stress Triggers, and Pollution Health Care by Dr. T.A. Ola"
            }
          </p>
        </div>

        {/* Timers & Badges */}
        <div className="flex items-center gap-2 flex-wrap text-xs font-mono font-bold shrink-0">
          <span className={`px-3 py-1.5 rounded-full uppercase tracking-wider ${
            isExam ? 'bg-rose-500/20 text-rose-300 border border-rose-500/20' : 'bg-blue-500/20 text-blue-300 border border-blue-500/20'
          }`}>
            🎯 Mode: {mode}
          </span>
          {isExam && !quizFinished && (
            <span className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border ${
              timeLeft < 60 ? 'bg-rose-700 text-white animate-pulse border-rose-500' : 'bg-amber-500/20 text-amber-300 border-amber-500/20'
            }`}>
              <Clock className="w-3.5 h-3.5 shrink-0" />
              Clock: {formatTime(timeLeft)}
            </span>
          )}
        </div>
      </div>

      {/* Main Body */}
      {!quizFinished ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          
          {/* Question View Controller (Left/Center 2 cols) */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            
            {/* Top Indicator bar */}
            <div className={`p-4 rounded-2xl ${theme.cardClass} flex flex-col gap-3`}>
              <div className="flex justify-between items-center text-xs font-medium">
                <span>Completed: <strong className="text-fuchsia-400 font-extrabold">{Object.keys(selectedAnswers).length}</strong> of {questions.length} Questions</span>
                <span className="font-mono">Progress: {percentCompleted}%</span>
              </div>
              
              <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-fuchsia-500 via-purple-500 to-indigo-500 transition-all duration-300 rounded-full"
                  style={{ width: `${percentCompleted}%` }}
                ></div>
              </div>

              {/* Box indicators map */}
              <div className="flex items-center gap-1 flex-wrap mt-1">
                {questions.map((_, i) => {
                  const isAnswered = selectedAnswers[i] !== undefined;
                  const isCurrent = i === currentQuestionIdx;
                  return (
                    <button
                      key={i}
                      id={`idx-indicator-button-${i}`}
                      onClick={() => setCurrentQuestionIdx(i)}
                      className={`w-7 h-7 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        isCurrent 
                          ? 'bg-fuchsia-500 text-black scale-110 shadow shadow-fuchsia-500/35'
                          : isAnswered
                            ? 'bg-purple-800/60 text-white border border-purple-500/30'
                            : 'bg-black/20 text-slate-400 hover:bg-white/5 border border-white/5'
                      }`}
                    >
                      {i + 1}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Question Text Panel */}
            <div className={`p-6 rounded-3xl ${theme.cardClass} flex flex-col gap-4`}>
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-bold tracking-widest opacity-60">
                  Question prompt {currentQuestionIdx + 1} of {questions.length}
                </span>
                <span className="text-[10px] uppercase font-bold opacity-70 bg-white/5 py-0.5 px-2 rounded">
                  HEE117 university target scope
                </span>
              </div>

              {/* Responsive Bigger text for phone users */}
              <h3 className="text-lg md:text-xl font-bold leading-relaxed tracking-tight text-white mt-1">
                {currentQuestion.text}
              </h3>

              {/* Dynamic Answer selections. Layout stacks vertically with full-width target buttons on small screens */}
              <div className="flex flex-col gap-3 mt-4">
                {currentQuestion.options.map((option, idx) => {
                  const isSelected = selectedAnswers[currentQuestionIdx] === idx;
                  const isCorrect = currentQuestion.correctOptionIndex === idx;
                  
                  let optionDesignClass = "bg-black/20 hover:bg-white/5 text-slate-100 hover:border-white/20 border border-white/10";
                  
                  if (isExam) {
                    if (isSelected) {
                      optionDesignClass = "bg-gradient-to-r from-fuchsia-600 to-indigo-600 text-white border-fuchsia-400 scale-[1.01] shadow-lg shadow-fuchsia-500/10";
                    }
                  } else {
                    // Practice Mode feedback states
                    if (isCurrentSubmitted) {
                      if (isCorrect) {
                        optionDesignClass = "bg-emerald-500/20 text-emerald-200 border-emerald-400 font-semibold scale-[1.01]";
                      } else if (isSelected) {
                        optionDesignClass = "bg-rose-500/20 text-rose-200 border-rose-400 font-semibold";
                      } else {
                        optionDesignClass = "bg-black/40 border-white/5 opacity-50";
                      }
                    }
                  }

                  return (
                    <button
                      key={idx}
                      id={`option-btn-${idx}`}
                      disabled={!isExam && isCurrentSubmitted}
                      onClick={() => handleOptionClick(idx)}
                      className={`w-full py-4 px-5 rounded-2xl text-left text-base font-medium leading-relaxed transition-all duration-200 cursor-pointer ${optionDesignClass}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-lg text-xs font-mono font-extrabold flex items-center justify-center border border-white/10 bg-white/5 group-hover:bg-white/10 shrink-0 select-none">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span className="grow text-[15px] md:text-base leading-snug">{option}</span>
                        
                        {/* Status Check icons for Practice mode */}
                        {!isExam && isCurrentSubmitted && isCorrect && (
                          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                        )}
                        {!isExam && isCurrentSubmitted && isSelected && !isCorrect && (
                          <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Practice mode instant explanation card */}
              {!isExam && isCurrentSubmitted && (
                <div className="mt-4 p-5 rounded-2xl bg-white/5 border border-white/10 flex flex-col gap-3 animate-fade-in">
                  
                  <div className="flex items-start gap-2 text-sm text-slate-200 leading-relaxed font-sans">
                    <span className="font-bold text-teal-400 uppercase shrink-0 mt-0.5 tracking-wider font-mono text-[11px] bg-teal-950/40 py-0.5 px-2 rounded">
                      Background Proof
                    </span>
                    <p className="text-white text-sm md:text-base">
                      {currentQuestion.explanation}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-2 text-xs text-rose-300 font-medium bg-rose-950/20 py-2 px-3 border border-rose-900/30 rounded-xl overflow-hidden mt-1">
                    <BookOpen className="w-4 h-4 shrink-0 text-rose-400" />
                    <span>HEE117 Core PDF Section: <strong className="text-white">{currentQuestion.pdfSection}</strong></span>
                  </div>

                </div>
              )}

              {/* Navigation Actions. Responsive layout */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-6 pt-4 border-t border-white/10">
                <button
                  disabled={currentQuestionIdx === 0}
                  onClick={handlePrev}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 transition-colors disabled:opacity-30 flex items-center justify-center gap-2 font-bold cursor-pointer text-sm"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous Question
                </button>

                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                  {isExam && currentQuestionIdx === questions.length - 1 ? (
                    <button
                      onClick={() => handleQuizFinish(false)}
                      className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-extrabold text-sm uppercase bg-gradient-to-r from-rose-500 to-fuchsia-600 text-white cursor-pointer hover:opacity-90 shadow-lg shadow-rose-500/25"
                    >
                      Finish and Submit Exam
                    </button>
                  ) : (
                    <button
                      disabled={!isExam && !isCurrentSubmitted}
                      onClick={handleNext}
                      className="w-full sm:w-auto px-7 py-3 rounded-xl text-black bg-gradient-to-r from-fuchsia-400 to-indigo-400 hover:brightness-110 disabled:opacity-40 transition-all font-bold flex items-center justify-center gap-2 cursor-pointer text-sm"
                    >
                      <span>{currentQuestionIdx === questions.length - 1 ? "Finish Quiz" : "Next Question"}</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

            </div>

          </div>

          {/* Quick study references / Info guide (Right sidebar 1 col) */}
          <div className="flex flex-col gap-4">
            
            <div className={`p-5 rounded-2xl ${theme.cardClass}`}>
              <h4 className="text-xs uppercase tracking-widest font-bold text-fuchsia-400 flex items-center gap-1.5 mb-2">
                <BookMarked className="w-4 h-4 text-fuchsia-400" />
                Active Module Material
              </h4>
              <p className="text-xs opacity-75 mt-1 leading-relaxed">
                You are currently taking HEE117 Mock evaluation over the official printed lecture notes content.
              </p>
              
              <div className="bg-black/20 p-3 rounded-xl mt-3 border border-white/5">
                <span className="text-[10px] font-bold text-indigo-300 tracking-wider block mb-1 uppercase">Study Guidelines</span>
                <ul className="text-[11px] space-y-1.5 list-disc pl-4 opacity-80 leading-normal">
                  <li><strong>Practice Mode:</strong> Take your time to review quotes. Study citations and verify notes.</li>
                  <li><strong>Exam Mode:</strong> Strictly timed. Answers are processed together at submission. No immediate review cards shown.</li>
                  <li><strong>100% accurate:</strong> Covers formulas, stats, definitions and chemical limits directly found in textbooks.</li>
                </ul>
              </div>
            </div>

            {/* Background theme preview widget inside quiz runner */}
            <div className={`p-5 rounded-2xl ${theme.cardClass} flex flex-col gap-2`}>
              <span className="text-xs font-bold opacity-80 block">Selected Ambiance</span>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded-full bg-gradient-to-r from-fuchsia-500 to-indigo-500"></span>
                <span className="text-xs font-mono font-bold">{theme.name}</span>
              </div>
            </div>

          </div>

        </div>
      ) : (
        /* Results Celebration Panel */
        <div className={`p-8 rounded-3xl ${theme.cardClass} text-center flex flex-col items-center justify-center max-w-3xl mx-auto gap-6 animate-scale-up`}>
          
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-fuchsia-500/10 flex items-center justify-center text-fuchsia-400 border border-fuchsia-500/20">
              <Award className="w-12 h-12" />
            </div>
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-fuchsia-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-fuchsia-500"></span>
            </span>
          </div>

          <div>
            <span className="text-xs font-bold tracking-widest uppercase opacity-60">Session Evaluation Complete</span>
            <h3 className="text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-indigo-400 mt-1 md:text-4xl">
              Quiz Set Score: {score} / {questions.length}
            </h3>
            <p className="text-xs font-mono tracking-wider text-teal-400 mt-2 font-bold uppercase uppercase">
              HEE117 university Grade achieved: {Math.round((score / questions.length) * 100)}% Accuracy
            </p>
          </div>

          {/* Quick breakdown metrics */}
          <div className="grid grid-cols-2 gap-4 w-full max-w-md bg-black/25 p-5 rounded-2xl border border-white/5">
            <div className="text-center">
              <span className="text-[10px] uppercase font-bold tracking-wider opacity-60 text-slate-300">Attempt Module</span>
              <h5 className="font-extrabold text-sm text-fuchsia-300 mt-1">HEE117 PDF {pdfModule}</h5>
            </div>
            
            <div className="text-center">
              <span className="text-[10px] uppercase font-bold tracking-wider opacity-60 text-slate-300">Study Session</span>
              <h5 className="font-extrabold text-sm text-cyan-300 mt-1 capitalize">{mode} Mode</h5>
            </div>
          </div>

          <div className="max-w-md text-sm opacity-80 leading-relaxed text-slate-200">
            {score === questions.length ? (
              <p className="text-emerald-400 font-bold">🎉 Outstanding perfection score! You have completely mastered HEE117 for this PDF. Maintain this consistency for direct success in school exams!</p>
            ) : score >= (questions.length * 0.7) ? (
              <p className="text-teal-300">🌟 Great job! You scored well above target levels. You are fully ready for the HEE117 second semester final examinations. Check back on any wrong answers below to reinforce!</p>
            ) : (
              <p className="text-rose-300">📚 Good try! HEE117 CBT requires detailed memorization of numbers, definitions, and health indicators. Utilize Practice Mode with details to score higher!</p>
            )}
          </div>

          {/* List incorrect questions of the session */}
          {incorrectQuestionIds.length > 0 && (
            <div className="w-full text-left mt-2">
              <h5 className="text-xs font-extrabold uppercase tracking-widest text-rose-400 mb-3 flex items-center gap-1.5">
                <XCircle className="w-4 h-4 shrink-0 text-rose-400" />
                Incorrect Questions to Review ({incorrectQuestionIds.length}):
              </h5>
              
              <div className="flex flex-col gap-3.5 max-h-64 overflow-y-auto pr-1">
                {questions.map((q) => {
                  if (!incorrectQuestionIds.includes(q.id)) return null;
                  const chosenIdx = selectedAnswers[questions.indexOf(q)];

                  return (
                    <div key={q.id} className="p-4 rounded-xl bg-black/45 border border-white/5 flex flex-col gap-1.5 text-xs">
                      <span className="text-[9px] uppercase font-semibold text-rose-300">Citation: {q.pdfSection}</span>
                      <p className="font-bold text-white text-sm">{q.text}</p>
                      
                      <div className="flex flex-col gap-1 mt-1 opacity-75">
                        <p><strong className="text-rose-400">Your choice:</strong> {chosenIdx !== undefined ? q.options[chosenIdx] : "Unanswered"}</p>
                        <p><strong className="text-emerald-400">Correct Option:</strong> {q.options[q.correctOptionIndex]}</p>
                      </div>
                      
                      <p className="mt-1 opacity-80 bg-white/5 p-2 rounded leading-relaxed italic text-slate-300 border-l border-indigo-400/30">
                        {q.explanation}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Action buttons. Responsive stacking */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-md mt-4">
            <button
              onClick={() => {
                setQuizFinished(false);
                setCurrentQuestionIdx(0);
                setSelectedAnswers({});
                setAnswersSubmitted({});
                setScore(0);
                // Clear state list but leave local storage undisturbed
              }}
              className="w-full py-3 px-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 transition-all text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              Retake Module
            </button>

            <button
              onClick={onBackToDashboard}
              className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-fuchsia-600 via-purple-600 to-indigo-600 hover:from-fuchsia-500 hover:via-purple-500 hover:to-indigo-500 shadow-lg text-xs font-bold uppercase tracking-wider text-white flex items-center justify-center gap-1.5 cursor-pointer"
            >
              Return to Hall Dashboard
            </button>
          </div>

        </div>
      )}

    </div>
  );
}
