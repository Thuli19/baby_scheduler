import { useState, useEffect } from 'react';
import { ScheduleItem, TodoItem } from '@/types';
import { addMinutes, generateScheduleFromWakeTime, generateTodosFromSchedule } from '@/utils/scheduleUtils';

export function useSchedule() {
  const [wakeTime, setWakeTime] = useState<Date | null>(null);
  const [schedule, setSchedule] = useState<ScheduleItem[]>([]);
  const [todoItems, setTodoItems] = useState<TodoItem[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  
  // Generate schedule when wake time changes
  useEffect(() => {
    if (wakeTime) {
      const newSchedule = generateScheduleFromWakeTime(wakeTime);
      setSchedule(newSchedule);
      
      const newTodos = generateTodosFromSchedule(newSchedule);
      setTodoItems(newTodos);
    } else {
      setSchedule([]);
      setTodoItems([]);
    }
  }, [wakeTime]);
  
  const toggleTodoItem = (id: string) => {
    setTodoItems((prev) => 
      prev.map((item) => 
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };
  
  return {
    wakeTime,
    setWakeTime,
    schedule,
    todoItems,
    toggleTodoItem,
    selectedDate,
    setSelectedDate,
  };
}