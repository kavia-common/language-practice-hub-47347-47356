export type Lesson = {
  id: string | number;
  title: string;
  level: number;
  description: string;
  vocabulary?: string[];
};

export type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
};

export type ProgressSnapshot = {
  completedLessons: number;
  streak: number;
  accuracy: number;
  recentActivity: string[];
};
