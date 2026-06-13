import React, { useState, useEffect } from 'react';
import { QuizMode, QuizAttempt, IncorrectAnswerRecord, BackgroundTheme } from './types';
import { BACKGROUND_THEMES } from './data/themes';
import ThemeSelector from './components/ThemeSelector';
import ProgressTracker from './components/ProgressTracker';
import ReviewCenter from './components/ReviewCenter';
import QuizRunner from './components/QuizRunner';
import { 
  BookOpen, 
  Settings, 
  HelpCircle, 
  History, 
  Award, 
  Compass, 
  GraduationCap, 
  FileText, 
  BookMarked,
  Search,
  ExternalLink,
  Github,
  Sparkles
} from 'lucide-react';
import { quizQuestions } from './data/quizQuestions';

export default function App() {
  // Navigation State: 'home' | 'quiz' | 'review' | 'progress' | 'notes'
  const [activeTab, setActiveTab] = useState<'home' | 'quiz' | 'review' | 'progress' | 'notes'>('home');
  
  // Quiz Launch parameters
  const [selectedPdfModule, setSelectedPdfModule] = useState<1 | 2>(1);
  const [selectedQuizMode, setSelectedQuizMode] = useState<QuizMode>('practice');

  // Background Ambiance Theme
  const [currentTheme, setCurrentTheme] = useState<BackgroundTheme>(BACKGROUND_THEMES[0]);

  // Persistent States
  const [attempts, setAttempts] = useState<QuizAttempt[]>([]);
  const [incorrectRecords, setIncorrectRecords] = useState<IncorrectAnswerRecord[]>([]);

  // Load from local storage on mount
  useEffect(() => {
    try {
      const savedAttempts = localStorage.getItem('hee117_quiz_attempts');
      if (savedAttempts) setAttempts(JSON.parse(savedAttempts));

      const savedIncorrect = localStorage.getItem('hee117_incorrect_records');
      if (savedIncorrect) setIncorrectRecords(JSON.parse(savedIncorrect));

      const savedThemeId = localStorage.getItem('hee117_selected_theme_id');
      if (savedThemeId) {
        const matched = BACKGROUND_THEMES.find(t => t.id === savedThemeId);
        if (matched) setCurrentTheme(matched);
      }
    } catch (e) {
      console.error("Storage loading failed", e);
    }
  }, []);

  // Save attempts to storage when modified
  const saveAttemptsToStorage = (newAttempts: QuizAttempt[]) => {
    setAttempts(newAttempts);
    localStorage.setItem('hee117_quiz_attempts', JSON.stringify(newAttempts));
  };

  // Save incorrect records to storage
  const saveIncorrectRecordsToStorage = (newRecords: IncorrectAnswerRecord[]) => {
    setIncorrectRecords(newRecords);
    localStorage.setItem('hee117_incorrect_records', JSON.stringify(newRecords));
  };

  // Handle a newly completed quiz attempt
  const handleQuizComplete = (
    score: number, 
    totalQuestions: number, 
    mode: QuizMode, 
    incorrectQuestionsIds: number[]
  ) => {
    const newAttempt: QuizAttempt = {
      id: `attempt-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString(),
      pdfModule: selectedPdfModule,
      score,
      totalQuestions,
      mode,
      incorrectQuestionsIndices: incorrectQuestionsIds
    };

    const updatedAttempts = [...attempts, newAttempt];
    saveAttemptsToStorage(updatedAttempts);

    // Update Incorrect records
    let updatedRecords = [...incorrectRecords];
    
    // 1. Remove any currently correct elements if they were solved flawlessly
    const correctQuestionIds = quizQuestions
      .filter(q => q.pdfModule === selectedPdfModule)
      .map(q => q.id)
      .filter(id => !incorrectQuestionsIds.includes(id));

    updatedRecords = updatedRecords.filter(rec => !correctQuestionIds.includes(rec.questionId));

    // 2. Add newly failed records
    incorrectQuestionsIds.forEach((qId) => {
      // Avoid inserting duplicates
      if (!updatedRecords.some(r => r.questionId === qId)) {
        updatedRecords.push({
          questionId: qId,
          userAnswerIndex: -1, // Placeholder
          timestamp: new Date().toISOString()
        });
      }
    });

    saveIncorrectRecordsToStorage(updatedRecords);
  };

  // Reset metrics / Clear states
  const handleResetProgress = () => {
    saveAttemptsToStorage([]);
  };

  const handleRemoveIncorrectRecord = (qId: number) => {
    const filtered = incorrectRecords.filter(r => r.questionId !== qId);
    saveIncorrectRecordsToStorage(filtered);
  };

  const handleClearAllIncorrectRecords = () => {
    saveIncorrectRecordsToStorage([]);
  };

  const handleThemeChange = (theme: BackgroundTheme) => {
    setCurrentTheme(theme);
    localStorage.setItem('hee117_selected_theme_id', theme.id);
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-all duration-500 pb-16 ${currentTheme.bgClass}`}>
      
      {/* Navbar Header Section */}
      <header className="border-b border-white/10 bg-black/35 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Custom Link Branding: OlamGeorg */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-fuchsia-500 via-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-fuchsia-500/25 shrink-0">
              <GraduationCap className="w-5.5 h-5.5" />
            </div>
            <div>
              <a 
                href="#OlamGeorg" 
                id="link-olamgeorg-brand"
                className="text-base font-extrabold tracking-tight hover:text-fuchsia-400 transition-colors flex items-center gap-1.5"
              >
                HEE117 Study Hub
                <span className="text-[10px] uppercase font-bold tracking-wider py-0.5 px-2 rounded-full bg-fuchsia-500/10 text-fuchsia-300 border border-fuchsia-500/10">
                  By OlamGeorg
                </span>
              </a>
              <p className="text-[10px] opacity-75">Second Semester 100L University Examination Prep</p>
            </div>
          </div>

          {/* Navigation Controls: Flexes, stacks on small resolutions */}
          <nav className="flex items-center gap-1.5 bg-black/40 p-1 rounded-xl border border-white/5 flex-wrap justify-center text-xs md:text-sm">
            <button
              onClick={() => { setActiveTab('home'); }}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                activeTab === 'home' || activeTab === 'quiz'
                  ? 'bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              Study Hub
            </button>
            <button
              onClick={() => { setActiveTab('review'); }}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all relative cursor-pointer ${
                activeTab === 'review'
                  ? 'bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              Review Center
              {incorrectRecords.length > 0 && (
                <span className="absolute -top-1.5 -right-1 px-1.5 py-0.5 text-[9px] font-extrabold rounded-full bg-rose-500 text-white animate-pulse">
                  {incorrectRecords.length}
                </span>
              )}
            </button>
            <button
              onClick={() => { setActiveTab('progress'); }}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                activeTab === 'progress'
                  ? 'bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              Progress Track
            </button>
            <button
              onClick={() => { setActiveTab('notes'); }}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                activeTab === 'notes'
                  ? 'bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              Lecture Briefs
            </button>
          </nav>

        </div>
      </header>

      {/* Main Content Body */}
      <main className="max-w-7xl mx-auto px-4 mt-6 w-full flex-grow flex flex-col gap-6" id="main-content-layout">
        
        {/* TAB 1: Study Lounge/Selector Page */}
        {activeTab === 'home' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start animate-fade-in text-slate-100">
            
            {/* Left 2 Cols: Main parameters launcher */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              
              {/* Introduction Card */}
              <div className={`p-6 md:p-8 rounded-3xl ${currentTheme.cardClass} flex flex-col gap-4 relative overflow-hidden`}>
                
                {/* Visual glow backdrop for premium look */}
                <div className="absolute -right-24 -bottom-24 w-64 h-64 bg-fuchsia-600/10 rounded-full blur-3xl pointer-events-none"></div>

                <div className="flex items-center gap-2 text-fuchsia-400 text-xs font-extrabold tracking-widest uppercase">
                  <Sparkles className="w-4.5 h-4.5 text-fuchsia-400" />
                  <span>Interactive Prep Simulator</span>
                </div>
                
                <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight leading-tight mt-1">
                  Master the HEE117 <br className="hidden md:inline" />
                  University Examinations
                </h1>
                
                <p className="text-sm md:text-base opacity-85 leading-relaxed max-w-2xl mt-1">
                  Connect deep knowledge pointers, track your performance logs, and review incorrect attempts dynamically. Highly accurate simulations designed precisely around the HEE117 official syllabus printed notes!
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-3.5 mt-2">
                  <div className="flex items-center gap-2 text-xs bg-white/5 py-1.5 px-3.5 rounded-xl border border-white/5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    <span>40 Curated Questions</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs bg-white/5 py-1.5 px-3.5 rounded-xl border border-white/5">
                    <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                    <span>100% Scope Accuracy</span>
                  </div>
                </div>
              </div>

              {/* Set differentiation Selector (PDF 1 or PDF 2) */}
              <div className={`p-6 rounded-3xl ${currentTheme.cardClass}`}>
                <h3 className="text-lg font-bold tracking-tight mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-indigo-400" />
                  Select Syllabus Module Material:
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  {/* Option 1: PDF 1 */}
                  <button
                    onClick={() => setSelectedPdfModule(1)}
                    id="module-select-pdf-1"
                    className={`p-5 rounded-2xl text-left border-2 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                      selectedPdfModule === 1
                        ? 'border-fuchsia-500 bg-fuchsia-950/20 shadow-lg shadow-fuchsia-500/10'
                        : 'border-white/5 bg-black/40 hover:bg-black/20 hover:border-white/10'
                    }`}
                  >
                    <div>
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-extrabold uppercase py-0.5 px-2 rounded bg-violet-500/20 text-violet-300">
                          Syllabus Document #1
                        </span>
                        {selectedPdfModule === 1 && (
                          <span className="w-2.5 h-2.5 rounded-full bg-fuchsia-500 animate-pulse"></span>
                        )}
                      </div>
                      <h4 className="font-bold text-base md:text-lg mt-3 leading-snug">
                        Violence & Environment Principles
                      </h4>
                      <p className="text-xs opacity-75 mt-1 leading-relaxed">
                        Covers Domestic and Intimate Partner Violence, Urban Conflict/GPI crime scales, Flooding hazards, Psychoactive stimulant classes, and basic pollution structures.
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono opacity-80">
                      <span>Questions: 20 Items</span>
                      <span className="text-fuchsia-400">Perfect Study Guide</span>
                    </div>
                  </button>

                  {/* Option 2: PDF 2 */}
                  <button
                    onClick={() => setSelectedPdfModule(2)}
                    id="module-select-pdf-2"
                    className={`p-5 rounded-2xl text-left border-2 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                      selectedPdfModule === 2
                        ? 'border-emerald-500 bg-emerald-950/20 shadow-lg shadow-emerald-500/10'
                        : 'border-white/5 bg-black/40 hover:bg-black/20 hover:border-white/10'
                    }`}
                  >
                    <div>
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-extrabold uppercase py-0.5 px-2 rounded bg-emerald-500/20 text-emerald-300">
                          Syllabus Document #2
                        </span>
                        {selectedPdfModule === 2 && (
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        )}
                      </div>
                      <h4 className="font-bold text-base md:text-lg mt-3 leading-snug">
                        Adolescent Health, STIs & Stress
                      </h4>
                      <p className="text-xs opacity-75 mt-1 leading-relaxed">
                        Covers biological hormonal transformations, male vs female adolescent health disputes, sexuality definitions, bacterial vs viral pathogens, stress causes, SMOG parameters, and safety solutions.
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono opacity-80">
                      <span>Questions: 20 Items</span>
                      <span className="text-emerald-400">Dr. T.A. Ola Syllabus</span>
                    </div>
                  </button>

                </div>
              </div>

              {/* Quiz Mode Selector & Action Launch. Responsive layout: stacks on phone */}
              <div className={`p-6 rounded-3xl ${currentTheme.cardClass}`}>
                <h3 className="text-lg font-bold tracking-tight mb-4 flex items-center gap-2">
                  <Compass className="w-5 h-5 text-indigo-400" />
                  Select Assessment Simulator Mode
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                  
                  {/* Practice Select */}
                  <button
                    onClick={() => setSelectedQuizMode('practice')}
                    id="mode-select-practice"
                    className={`p-4 rounded-xl text-left border transition-all cursor-pointer flex items-start gap-3 ${
                      selectedQuizMode === 'practice'
                        ? 'border-indigo-500 bg-indigo-500/10'
                        : 'border-white/5 bg-black/25 hover:bg-black/15'
                    }`}
                  >
                    <div className={`mt-0.5 w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                      selectedQuizMode === 'practice' ? 'border-indigo-400' : 'border-slate-500'
                    }`}>
                      {selectedQuizMode === 'practice' && <div className="w-2.5 h-2.5 rounded-full bg-indigo-400"></div>}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm">Practice / Learning Mode</h4>
                      <p className="text-xs opacity-75 mt-0.5">
                        Infinite time, instant feedback with correct/incorrect highlights on each tap, complete with reference PDF page explanations.
                      </p>
                    </div>
                  </button>

                  {/* Exam mode Select */}
                  <button
                    onClick={() => setSelectedQuizMode('exam')}
                    id="mode-select-exam"
                    className={`p-4 rounded-xl text-left border transition-all cursor-pointer flex items-start gap-3 ${
                      selectedQuizMode === 'exam'
                        ? 'border-rose-500 bg-rose-500/10'
                        : 'border-white/5 bg-black/25 hover:bg-black/15'
                    }`}
                  >
                    <div className={`mt-0.5 w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                      selectedQuizMode === 'exam' ? 'border-rose-400' : 'border-slate-500'
                    }`}>
                      {selectedQuizMode === 'exam' && <div className="w-2.5 h-2.5 rounded-full bg-rose-400"></div>}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm">Strict CBT Exam Simulator</h4>
                      <p className="text-xs opacity-75 mt-0.5">
                        Timed clock of 12 minutes total. No immediate correct options shown. Final evaluation is processed together at submission.
                      </p>
                    </div>
                  </button>

                </div>

                {/* Launch Button. Full width on mobile, stack block */}
                <button
                  onClick={() => setActiveTab('quiz')}
                  id="quiz-launch-button"
                  className="w-full py-4 px-6 rounded-2xl cursor-pointer text-center text-base font-extrabold uppercase tracking-wider text-black bg-gradient-to-r from-fuchsia-400 via-purple-400 to-indigo-400 hover:brightness-110 active:scale-[0.99] transition-all shadow-xl shadow-fuchsia-500/20"
                >
                  Launch Quiz Evaluation Study
                </button>
              </div>

            </div>

            {/* Right Sidebar: Theme Ambiance selector & statistics cards */}
            <div className="flex flex-col gap-6">
              
              {/* Theme Settings block */}
              <ThemeSelector 
                currentTheme={currentTheme} 
                onThemeChange={handleThemeChange} 
              />

              {/* General study summary metrics */}
              <div className={`p-5 rounded-2xl ${currentTheme.cardClass}`}>
                <h4 className="text-xs uppercase tracking-widest font-extrabold text-indigo-400 mb-3 flex items-center gap-1.5">
                  <History className="w-4.5 h-4.5" />
                  Your Study Progress
                </h4>
                
                {attempts.length === 0 ? (
                  <p className="text-xs opacity-75 leading-relaxed">
                    No session logs found yet. Choose a study module above and take your first assessment!
                  </p>
                ) : (
                  <div className="flex flex-col gap-3">
                    <div className="flex justify-between items-center text-xs">
                      <span className="opacity-75">Quizzes Taken:</span>
                      <strong className="font-mono">{attempts.length} attempts</strong>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="opacity-75">Incorrect Logs:</span>
                      <strong className="text-rose-400 font-mono">{incorrectRecords.length} items to review</strong>
                    </div>
                    <button
                      onClick={() => setActiveTab('progress')}
                      className="text-xs font-bold text-fuchsia-400 hover:underline text-left mt-1 cursor-pointer"
                    >
                      View elaborate graphical charts →
                    </button>
                  </div>
                )}
              </div>

              {/* Custom branding notice */}
              <div className="p-4 rounded-xl bg-black/20 border border-white/5 text-[11px] opacity-75 leading-relaxed">
                <p>
                  This portal has been customized as <strong>OlamGeorg</strong> for the second-semester HEE117 university target scope. For complaints or issues, contact support.
                </p>
              </div>

            </div>

          </div>
        )}

        {/* TAB 2: Dynamic Quiz execution mode */}
        {activeTab === 'quiz' && (
          <div className="animate-fade-in text-slate-100">
            <QuizRunner
              pdfModule={selectedPdfModule}
              mode={selectedQuizMode}
              theme={currentTheme}
              onBackToDashboard={() => setActiveTab('home')}
              onQuizComplete={handleQuizComplete}
            />
          </div>
        )}

        {/* TAB 3: Incorrect Answer records review */}
        {activeTab === 'review' && (
          <div className="animate-fade-in text-slate-100">
            <ReviewCenter
              incorrectRecords={incorrectRecords}
              onRemoveRecord={handleRemoveIncorrectRecord}
              onClearAllRecords={handleClearAllIncorrectRecords}
              theme={currentTheme}
            />
          </div>
        )}

        {/* TAB 4: Elaborated logs progress statistics */}
        {activeTab === 'progress' && (
          <div className="animate-fade-in text-slate-100">
            <ProgressTracker
              attempts={attempts}
              onResetProgress={handleResetProgress}
              theme={currentTheme}
            />
          </div>
        )}

        {/* TAB 5: Core Syllabus Reference Summarized briefs */}
        {activeTab === 'notes' && (
          <div className="animate-fade-in flex flex-col gap-6 text-slate-100">
            
            <div className={`p-6 rounded-3xl ${currentTheme.cardClass}`}>
              <h2 className="text-xl md:text-2xl font-extrabold tracking-tight mb-2">
                HEE117 Core Printed Material - Quick Study References
              </h2>
              <p className="text-xs opacity-75 leading-relaxed">
                Review key definitions, statistics, and classifications that are highly tested in HEE117 university computer-based examinations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* PDF 1 Briefs */}
              <div className={`p-5 rounded-3xl ${currentTheme.cardClass} flex flex-col gap-4 border border-violet-500/20`}>
                <span className="py-1 px-2.5 rounded bg-violet-500/20 text-violet-300 font-bold text-[10px] uppercase block tracking-wider self-start">
                  Syllabus Document #1 Reference Points
                </span>
                
                <div className="space-y-4 text-xs md:text-sm">
                  <div>
                    <h4 className="font-bold text-slate-200">1. WHO Domestic Violence Stats (2018)</h4>
                    <p className="opacity-75 mt-0.5 leading-relaxed text-xs">
                      Nearly <strong>1 in 3 (or 30%)</strong> of women worldwide have been subjected to physical and/or sexual violence.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-200">2. Nigeria Intimate Partner Violence Ranges</h4>
                    <ul className="list-disc pl-4 opacity-75 text-xs space-y-1 mt-1 leading-relaxed">
                      <li><strong>Psychological/Emotional:</strong> 31% to 61% rate. Highest in Oyo State (67.2% by Ajibola).</li>
                      <li><strong>Sexual IPV:</strong> 20% to 31% rate.</li>
                      <li><strong>Physical IPV:</strong> 7% to 31% rate.</li>
                      <li><strong>Aggregate perpetration:</strong> 74% of men list committing some form in surveys.</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-200">3. Global Homicides & Demographics</h4>
                    <p className="opacity-75 mt-0.5 leading-relaxed text-xs">
                      Nearly <strong>1.6 million</strong> violence-related deaths in 2000 (leading cause for ages <strong>15-44</strong>). Overall global homicides total 520,000 (rate of <strong>8.8 per 100,000</strong>). Colombia and El Salvador top index at <strong>30 per 100,000</strong>.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-200">4. Psychoactive Category List</h4>
                    <p className="opacity-75 mt-0.5 leading-relaxed text-xs">
                      They cross the blood-brain barrier to impact the Central Nervous System. Categories are: <br />
                      • <strong>Stimulants:</strong> Caffeine, Nicotine, Amphetamines. <br />
                      • <strong>Depressants:</strong> Alcohol, Benzodiazepines, Barbiturates. <br />
                      • <strong>Hallucinogens:</strong> LSD, Psilocybin, Ketamine, MDMA.
                    </p>
                  </div>
                </div>
              </div>

              {/* PDF 2 Briefs */}
              <div className={`p-5 rounded-3xl ${currentTheme.cardClass} flex flex-col gap-4 border border-emerald-500/20`}>
                <span className="py-1 px-2.5 rounded bg-emerald-500/20 text-emerald-300 font-bold text-[10px] uppercase block tracking-wider self-start">
                  Syllabus Document #2 (Dr. T.A. Ola)
                </span>
                
                <div className="space-y-4 text-xs md:text-sm">
                  <div>
                    <h4 className="font-bold text-slate-200">1. Adolescence Etymology & Puberty</h4>
                    <p className="opacity-75 mt-0.5 leading-relaxed text-xs">
                      Coined from Latin <strong>"adolescere"</strong> ("to grow into maturity"). Spans ages <strong>13 to 19 years</strong>. Structural change driven by <strong>oestrogen and androgen</strong> hormones.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-200">2. STI Pathogens Categorization</h4>
                    <ul className="list-disc pl-4 opacity-75 text-xs space-y-1 mt-1 leading-relaxed">
                      <li><strong>Bacteria:</strong> Gonorrhoea (caused by Gonococcus bacterium called <i>Neisseria Gonorrhoea</i>).</li>
                      <li><strong>Virus:</strong> HIV/AIDS.</li>
                      <li><strong>Fungi:</strong> Candidiasis.</li>
                      <li><strong>Protozoa:</strong> Trichomoniasis ( vaginal itch, groin swelling, odor liquid).</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-200">3. Stress Definitions & Demands</h4>
                    <p className="opacity-75 mt-0.5 leading-relaxed text-xs">
                      Defined as any stimulus that disrupts the biological or psychological equilibrium of an organism. Categorized as Individual (conflicts, perspective) or Environmental (pollution, jobs, societal blocks).
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-200">4. Smog & Global Temperature</h4>
                    <p className="opacity-75 mt-0.5 leading-relaxed text-xs">
                      <strong>Smog</strong> is smoke plus fog, driven primarily by <strong>VOCs and Nitrogen Oxides (NOx)</strong>. Air particulates account for 16% of deaths globally (9 million total in GBD 2019 report). The Earth's surface warmed by <strong>1° Fahrenheit</strong> in the last 140 yrs. Limit of Carbon Monoride (CO) in occupational settings is <strong>50ppm</strong>.
                    </p>
                  </div>
                </div>
              </div>

            </div>

          </div>
        )}

      </main>

      {/* Footer info banner */}
      <footer className="mt-12 text-center text-[11px] opacity-65 flex flex-col gap-1 items-center max-w-md mx-auto">
        <p>© 2026 HEE117 Study Portal x OlamGeorg. Clean offline-first localStorage engine.</p>
        <p className="font-mono text-fuchsia-400">Perfect Study Companion. Authorized Link: OlamGeorg</p>
      </footer>

    </div>
  );
}
