export interface Baby {
  id: string;
  name: string;
  age: string;
  dob: string;
  photo?: string;
  weight: string;
  height: string;
  preferences: { label: string; value: string }[];
}

export interface ScheduleItem {
  time: Date;
  type: 'wake' | 'feed' | 'nap' | 'play' | 'bedtime';
  title: string;
  description: string;
}

export interface ScheduleTemplate {
  id: string;
  name: string;
  items: ScheduleItem[];
}

export interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
  scheduledTime?: Date;
  category?: string;
}