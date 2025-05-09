import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Baby, ScheduleTemplate, TodoItem } from '@/types';

interface AppContextType {
  baby: Baby | null;
  setBaby: (baby: Baby) => void;
  scheduleTemplates: ScheduleTemplate[];
  addScheduleTemplate: (template: ScheduleTemplate) => void;
  updateScheduleTemplate: (id: string, template: Partial<ScheduleTemplate>) => void;
  removeScheduleTemplate: (id: string) => void;
  todos: TodoItem[];
  addTodo: (todo: Omit<TodoItem, 'id'>) => void;
  updateTodo: (id: string, todo: Partial<TodoItem>) => void;
  removeTodo: (id: string) => void;
  isLoading: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  const [baby, setBaby] = useState<Baby | null>(null);
  const [scheduleTemplates, setScheduleTemplates] = useState<ScheduleTemplate[]>([]);
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Load data from AsyncStorage on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const babyData = await AsyncStorage.getItem('baby');
        const templatesData = await AsyncStorage.getItem('scheduleTemplates');
        const todosData = await AsyncStorage.getItem('todos');
        
        if (babyData) setBaby(JSON.parse(babyData));
        if (templatesData) setScheduleTemplates(JSON.parse(templatesData));
        if (todosData) setTodos(JSON.parse(todosData));
      } catch (error) {
        console.error('Error loading data from AsyncStorage:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, []);
  
  // Save baby data to AsyncStorage when it changes
  useEffect(() => {
    if (baby) {
      AsyncStorage.setItem('baby', JSON.stringify(baby));
    }
  }, [baby]);
  
  // Save templates to AsyncStorage when they change
  useEffect(() => {
    AsyncStorage.setItem('scheduleTemplates', JSON.stringify(scheduleTemplates));
  }, [scheduleTemplates]);
  
  // Save todos to AsyncStorage when they change
  useEffect(() => {
    AsyncStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);
  
  const setBabyData = (babyData: Baby) => {
    setBaby(babyData);
  };
  
  const addScheduleTemplate = (template: ScheduleTemplate) => {
    setScheduleTemplates((prev) => [...prev, template]);
  };
  
  const updateScheduleTemplate = (id: string, template: Partial<ScheduleTemplate>) => {
    setScheduleTemplates((prev) => 
      prev.map((t) => (t.id === id ? { ...t, ...template } : t))
    );
  };
  
  const removeScheduleTemplate = (id: string) => {
    setScheduleTemplates((prev) => prev.filter((t) => t.id !== id));
  };
  
  const addTodo = (todo: Omit<TodoItem, 'id'>) => {
    const newTodo: TodoItem = {
      ...todo,
      id: Date.now().toString(),
    };
    setTodos((prev) => [...prev, newTodo]);
  };
  
  const updateTodo = (id: string, todo: Partial<TodoItem>) => {
    setTodos((prev) => 
      prev.map((t) => (t.id === id ? { ...t, ...todo } : t))
    );
  };
  
  const removeTodo = (id: string) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };
  
  const value = {
    baby,
    setBaby: setBabyData,
    scheduleTemplates,
    addScheduleTemplate,
    updateScheduleTemplate,
    removeScheduleTemplate,
    todos,
    addTodo,
    updateTodo,
    removeTodo,
    isLoading,
  };
  
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}