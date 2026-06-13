export type QuizMode = 'practice' | 'exam';

export interface Question {
  id: number;
  pdfModule: 1 | 2; // 1 for Domestic/Urban/Flooding/Substances/Pollution, 2 for Adolescent Health/STIs/Stress/Pollution-Health
  text: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
  pdfSection: string;
}

export interface QuizAttempt {
  id: string;
  timestamp: string;
  pdfModule: 1 | 2;
  score: number;
  totalQuestions: number;
  mode: QuizMode;
  incorrectQuestionsIndices: number[]; // Store index map for review
}

export interface IncorrectAnswerRecord {
  questionId: number;
  userAnswerIndex: number;
  timestamp: string;
}

export interface BackgroundTheme {
  id: string;
  name: string;
  bgClass: string;
  cardClass: string;
  accentClass: string;
  buttonClass: string;
  textColor: string;
}
