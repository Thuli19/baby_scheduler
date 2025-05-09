import { ScheduleItem, TodoItem } from '@/types';
import { addHours, addMinutes } from './dateUtils';

export function generateScheduleFromWakeTime(wakeTime: Date): ScheduleItem[] {
  const schedule: ScheduleItem[] = [];
  
  // First wake time (provided by user)
  schedule.push({
    time: new Date(wakeTime),
    type: 'wake',
    title: 'Wake Up',
    description: 'First wake time of the day',
  });
  
  // Morning feed
  schedule.push({
    time: addMinutes(wakeTime, 30),
    type: 'feed',
    title: 'Morning Feed',
    description: 'Breakfast time',
  });
  
  // Morning playtime
  schedule.push({
    time: addMinutes(wakeTime, 90),
    type: 'play',
    title: 'Morning Activity',
    description: 'Tummy time and sensory play',
  });
  
  // Morning nap
  schedule.push({
    time: addHours(wakeTime, 2),
    type: 'nap',
    title: 'Morning Nap',
    description: 'First nap of the day',
  });
  
  // Mid-morning wake
  const midMorningWake = addHours(wakeTime, 3.5);
  schedule.push({
    time: midMorningWake,
    type: 'wake',
    title: 'Wake Up',
    description: 'End of morning nap',
  });
  
  // Mid-morning feed
  schedule.push({
    time: addMinutes(midMorningWake, 30),
    type: 'feed',
    title: 'Mid-Morning Feed',
    description: 'Second feed of the day',
  });
  
  // Mid-day play
  schedule.push({
    time: addMinutes(midMorningWake, 90),
    type: 'play',
    title: 'Mid-Day Activity',
    description: 'Reading and songs',
  });
  
  // Afternoon nap
  schedule.push({
    time: addHours(midMorningWake, 2),
    type: 'nap',
    title: 'Afternoon Nap',
    description: 'Second nap of the day',
  });
  
  // Afternoon wake
  const afternoonWake = addHours(midMorningWake, 3.5);
  schedule.push({
    time: afternoonWake,
    type: 'wake',
    title: 'Wake Up',
    description: 'End of afternoon nap',
  });
  
  // Afternoon feed
  schedule.push({
    time: addMinutes(afternoonWake, 30),
    type: 'feed',
    title: 'Afternoon Feed',
    description: 'Third feed of the day',
  });
  
  // Afternoon play
  schedule.push({
    time: addMinutes(afternoonWake, 90),
    type: 'play',
    title: 'Afternoon Activity',
    description: 'Outdoor time or bath',
  });
  
  // Evening feed
  schedule.push({
    time: addHours(afternoonWake, 2.5),
    type: 'feed',
    title: 'Evening Feed',
    description: 'Last feed before bedtime',
  });
  
  // Bedtime
  schedule.push({
    time: addHours(afternoonWake, 3),
    type: 'bedtime',
    title: 'Bedtime',
    description: 'Bedtime routine and sleep',
  });
  
  return schedule;
}

export function generateTodosFromSchedule(schedule: ScheduleItem[]): TodoItem[] {
  const todos: TodoItem[] = [];
  
  // Generate tasks based on the schedule
  todos.push({
    id: '1',
    text: 'Prepare bottles for the day',
    completed: false,
    scheduledTime: addMinutes(schedule[0].time, -30),
    category: 'preparation',
  });
  
  todos.push({
    id: '2',
    text: 'Set up morning activity',
    completed: false,
    scheduledTime: schedule[1].time,
    category: 'activity',
  });
  
  todos.push({
    id: '3',
    text: 'Sanitize bottles',
    completed: false,
    scheduledTime: schedule[3].time,
    category: 'cleaning',
  });
  
  todos.push({
    id: '4',
    text: 'Prepare diaper bag for afternoon',
    completed: false,
    scheduledTime: schedule[5].time,
    category: 'preparation',
  });
  
  todos.push({
    id: '5',
    text: 'Start bedtime routine',
    completed: false,
    scheduledTime: addMinutes(schedule[schedule.length - 1].time, -30),
    category: 'routine',
  });
  
  return todos;
}