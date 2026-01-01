// Learning Path Types
export interface LearningPath {
  id: string;
  title: string;
  description: string;
  category: 'frontend' | 'backend' | 'fullstack' | 'mobile' | 'data-science' | 'devops';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedHours: number;
  prerequisites: string[];
  skills: string[];
  progress: number; // 0-100
  modules: LearningModule[];
  tags: string[];
  rating: number;
  enrolled: boolean;
}

export interface LearningModule {
  id: string;
  title: string;
  description: string;
  type: 'video' | 'article' | 'tutorial' | 'practice' | 'quiz';
  duration: number; // in minutes
  completed: boolean;
  resources: Resource[];
  order: number;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  url: string;
  type: 'youtube' | 'mdn' | 'article' | 'documentation' | 'github';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration?: number;
  rating: number;
  tags: string[];
  thumbnail?: string;
  author?: string;
  publishDate?: string;
}

// User Types
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  preferences: UserPreferences;
  progress: UserProgress;
  achievements: Achievement[];
  joinDate: string;
}

export interface UserPreferences {
  preferredTopics: string[];
  learningStyle: 'visual' | 'auditory' | 'reading' | 'kinesthetic';
  difficultyLevel: 'beginner' | 'intermediate' | 'advanced';
  timeAvailability: number; // hours per week
  notifications: boolean;
  darkMode: boolean;
}

export interface UserProgress {
  totalHoursLearned: number;
  currentStreak: number;
  longestStreak: number;
  completedPaths: string[];
  inProgressPaths: string[];
  skillLevels: { [skill: string]: number }; // 0-100
  weeklyGoal: number;
  weeklyProgress: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: string;
  category: 'learning' | 'streak' | 'skill' | 'community';
}

// Dashboard Types
export interface DashboardStats {
  totalLearningPaths: number;
  completedPaths: number;
  hoursLearned: number;
  currentStreak: number;
  weeklyProgress: number;
  weeklyGoal: number;
}

export interface RecommendedContent {
  learningPaths: LearningPath[];
  resources: Resource[];
  reasons: string[];
}

// Search and Filter Types
export interface SearchFilters {
  query: string;
  categories: string[];
  difficulty: string[];
  types: string[];
  duration: [number, number]; // min, max hours
  rating: number;
  tags: string[];
}

export interface SearchResult {
  type: 'path' | 'resource';
  item: LearningPath | Resource;
  relevanceScore: number;
  matchedFields: string[];
}

// API Types
export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  viewCount: string;
  likeCount: string;
  publishedAt: string;
  channelTitle: string;
  channelId: string;
}

export interface MDNResource {
  title: string;
  url: string;
  summary: string;
  tags: string[];
  difficulty: string;
  lastModified: string;
}

// Chart and Analytics Types
export interface LearningAnalytics {
  weeklyHours: number[];
  skillProgress: { skill: string; progress: number }[];
  completionRate: number;
  averageRating: number;
  learningVelocity: number; // paths completed per month
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string;
    borderColor?: string;
    borderWidth?: number;
  }[];
}