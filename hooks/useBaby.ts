import { useAppContext } from '@/context/AppContext';
import { useEffect } from 'react';

export function useBaby() {
  const { baby, setBaby } = useAppContext();
  
  // Mock data for demo purposes
  const mockBaby = {
    id: '1',
    name: 'Emma',
    age: '6 months',
    dob: 'January 15, 2023',
    photo: 'https://images.pexels.com/photos/5759233/pexels-photo-5759233.jpeg?auto=compress&cs=tinysrgb&w=600',
    weight: '16 lbs 4 oz',
    height: '26 inches',
    preferences: [
      { label: 'Wake Window', value: '2-3 hours' },
      { label: 'Nap Duration', value: '1-2 hours' },
      { label: 'Feeding Interval', value: '3-4 hours' },
      { label: 'Bedtime', value: '7:00 PM' },
    ],
  };
  
  useEffect(() => {
    // If there's no baby data, use mock data
    if (!baby) {
      setBaby(mockBaby);
    }
  }, [baby, setBaby]);
  
  return { baby: baby || mockBaby };
}