export type ScreenType = 
  | 'home' 
  | 'math' 
  | 'language' 
  | 'biology' 
  | 'english' 
  | 'videos' 
  | 'challenges'
  | 'explore';

export interface UserProfile {
  name: string;
  avatar: string;
  level: number;
  xp: number;
  nextLevelXp: number;
  starGems: number;
  streakDays: number;
  soundEnabled: boolean;
  completedActivities: string[];
}

export interface SubjectModule {
  id: string;
  title: string;
  tag: string;
  description: string;
  icon: string;
  iconBg: string;
  iconColor: string;
  progress: number;
  buttonText: string;
  targetScreen: ScreenType;
  accentColor: string;
}
