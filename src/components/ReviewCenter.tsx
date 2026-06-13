import React, { useState } from 'react';
import { Question, IncorrectAnswerRecord, BackgroundTheme } from '../types';
import { quizQuestions } from '../data/quizQuestions';
import { ThumbsUp, XCircle, CheckCircle, Trash2, ArrowRight, BookOpen, AlertCircle } from 'lucide-react';

interface ReviewCenterProps {
  incorrectRecords: IncorrectAnswerRecord[];
  onRemoveRecord: (questionId: number) => void;
  onClearAllRecords: () => void;
  theme: BackgroundTheme;
}

export default function ReviewCenter({ incorrectRecords, onRemoveRecord, onClearAllRecords, theme }: ReviewCenterProps) {
  const [retakeStates, setRetakeStates] = useState<{ [qId: number]: { selectedIndex?: number, showFeedback: boolean } }>({});

  const handleOptionSelect = (qId: number, optionIndex: number) => {
    setRetakeStates(prev => ({
      ...prev,
      [qId]: {
        selectedIndex: optionIndex,
        showFeedback: true
      }
    }));
  };

  const handleResetQuestion = (qId: number) => {
    setRetakeStates(prev => {
      const copy = { ...prev };
      delete copy[qId];
      return copy;
    });
  };

  return (
    <div id="review-center-panel" className="flex flex-col gap-6">
      <div className={`p-5 rounded-2xl ${theme.cardClass} border border-rose-500/10`}>
        <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
          <h3 className="text-lg font-bold tracking-tight text-rose-400 flex items-center gap-2">
            <XCircle className="w-5 h-5 text-rose-400" />
            Incorrect Answers Bank ({incorrectRecords.length})
          </h3>
          {incorrectRecords.length > 0 && (
            <button
              onClick={onClearAllRecords}
              className="flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 transition-all cursor-pointer border border-rose-500/10"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Clear Bank
            </button>
          )}
        </div>
        <p className="text-xs opacity-75">
          Review details of questions you answered incorrectly during exams or practice. Retake them here until you score 100%!
        </p>
      </div>

      {incorrectRecords.length === 0 ? (
        <div className={`p-8 rounded-2xl ${theme.cardClass} text-center flex flex-col items-center justify-center gap-3`}>
          <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400">
            <ThumbsUp className="w-6 h-6" />
          </div>
          <h4 className="font-bold text-base text-emerald-400">Pristine Answer Record!</h4>
          <p className="text-xs max-w-sm opacity-80 leading-relaxed">
            Fantastic work! You have no incorrect answers saved in this list. Take more exams or practice modes to challenge yourself.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {incorrectRecords.map((record) => {
            const question = quizQuestions.find(q => q.id === record.questionId);
            if (!question) return null;

            const retakeState = retakeStates[question.id] || { showFeedback: false };
            const wasUserAnswerCorrect = retakeState.selectedIndex === question.correctOptionIndex;

            return (
              <div
                key={record.questionId}
                id={`incorrect-card-${question.id}`}
                className={`p-5 rounded-3xl ${theme.cardClass} flex flex-col gap-4 border border-white/5 transition-all relative overflow-hidden`}
              >
                {/* PDF Module Tag */}
                <div className="flex justify-between items-center flex-wrap gap-2">
                  <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${
                    question.pdfModule === 1 ? 'bg-violet-500/20 text-violet-300' : 'bg-emerald-500/20 text-emerald-300'
                  }`}>
                    Study Set PDF {question.pdfModule} - {question.pdfModule === 1 ? 'Domestic/Urban Violence/Pollution' : 'Adolescent/STIs/Stress/Pollution'}
                  </span>
                  
                  <button
                    onClick={() => onRemoveRecord(question.id)}
                    className="text-xs text-slate-400 hover:text-rose-400 transition-colors cursor-pointer"
                    title="Remove from review list"
                  >
                    Delete record
                  </button>
                </div>

                {/* Question Info */}
                <h4 className="font-bold text-base md:text-lg leading-relaxed text-slate-100">
                  {question.text}
                </h4>

                {/* Interactive Retake Panel */}
                <div className="flex flex-col gap-2 mt-2">
                  <span className="text-xs font-semibold uppercase tracking-wider opacity-60">Retake Question Option:</span>
                  <div className="grid grid-cols-1 gap-2">
                    {question.options.map((option, idx) => {
                      const isCorrectAnswerOption = idx === question.correctOptionIndex;
                      const isUserSelectedOption = idx === retakeState.selectedIndex;
                      
                      let optBtnClass = 'bg-black/25 hover:bg-white/5 border border-white/5 text-slate-200';
                      if (retakeState.showFeedback) {
                        if (isCorrectAnswerOption) {
                          optBtnClass = 'bg-emerald-500/20 border-emerald-400 text-emerald-200';
                        } else if (isUserSelectedOption) {
                          optBtnClass = 'bg-rose-500/20 border-rose-400 text-rose-200';
                        } else {
                          optBtnClass = 'bg-black/40 border-white/5 opacity-50';
                        }
                      }

                      return (
                        <button
                          key={idx}
                          disabled={retakeState.showFeedback}
                          onClick={() => handleOptionSelect(question.id, idx)}
                          className={`w-full py-3 px-4 rounded-xl text-left text-sm font-medium transition-all duration-200 cursor-pointer ${optBtnClass}`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="font-bold font-mono opacity-60 shrink-0">
                              {String.fromCharCode(65 + idx)})
                            </span>
                            <span className="grow leading-snug">{option}</span>
                            {retakeState.showFeedback && isCorrectAnswerOption && (
                              <CheckCircle className="w-4.5 h-4.5 text-emerald-400 shrink-0" />
                            )}
                            {retakeState.showFeedback && isUserSelectedOption && !isCorrectAnswerOption && (
                              <XCircle className="w-4.5 h-4.5 text-rose-400 shrink-0" />
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Retake Result explanation & Mastery prompt */}
                {retakeState.showFeedback && (
                  <div className="p-4 rounded-xl bg-slate-950/60 border border-white/10 flex flex-col gap-3 mt-1 animate-fade-in">
                    <div className="flex items-start gap-2">
                      {wasUserAnswerCorrect ? (
                        <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                      )}
                      <div>
                        <p className={`text-sm font-bold ${wasUserAnswerCorrect ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {wasUserAnswerCorrect ? 'Correct Option Selected! Mastered!' : 'Incorrect. Still needs learning.'}
                        </p>
                        <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                          {question.explanation}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-[11px] text-fuchsia-300 bg-fuchsia-950/30 py-1.5 px-2.5 rounded-lg border border-fuchsia-500/10 font-medium">
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>HEE117 Citation: {question.pdfSection}</span>
                    </div>

                    <div className="flex items-center gap-2 justify-end mt-1">
                      <button
                        onClick={() => handleResetQuestion(question.id)}
                        className="px-3 py-1 text-xs rounded bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 cursor-pointer"
                      >
                        Reset Attempt
                      </button>
                      {wasUserAnswerCorrect && (
                        <button
                          onClick={() => {
                            onRemoveRecord(question.id);
                            // Clear state
                            handleResetQuestion(question.id);
                          }}
                          className="px-3 py-1 text-xs font-bold rounded bg-emerald-500 text-black hover:bg-emerald-400 transition-colors cursor-pointer"
                        >
                          Remove from Incorrect list
                        </button>
                      )}
                    </div>
                  </div>
                )}
                
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
