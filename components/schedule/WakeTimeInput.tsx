import { StyleSheet, View, Text, Pressable } from 'react-native';
import { colors } from '@/constants/Colors';
import { Card } from '@/components/common/Card';
import { AlarmClock, Calendar } from 'lucide-react-native';
import { TimePickerModal } from '@/components/schedule/TimePickerModal';
import { useState } from 'react';
import { formatTime } from '@/utils/dateUtils';

interface WakeTimeInputProps {
  wakeTime: Date | null;
  onChangeWakeTime: (time: Date | null) => void;
}

export function WakeTimeInput({ wakeTime, onChangeWakeTime }: WakeTimeInputProps) {
  const [timePickerVisible, setTimePickerVisible] = useState(false);
  
  const handleOpenTimePicker = () => {
    setTimePickerVisible(true);
  };
  
  const handleCloseTimePicker = () => {
    setTimePickerVisible(false);
  };
  
  const handleTimeChange = (time: Date) => {
    onChangeWakeTime(time);
    setTimePickerVisible(false);
  };
  
  return (
    <Card style={styles.container}>
      <View style={styles.header}>
        <AlarmClock size={24} color={colors.primary} />
        <Text style={styles.title}>Baby's First Wake Time</Text>
      </View>
      
      <Text style={styles.description}>
        Enter the time your baby woke up today to generate their daily schedule
      </Text>
      
      <Pressable 
        style={styles.timeButton}
        onPress={handleOpenTimePicker}
      >
        <Calendar size={20} color={colors.textSecondary} />
        <Text style={styles.timeText}>
          {wakeTime ? formatTime(wakeTime) : 'Select time'}
        </Text>
      </Pressable>
      
      <TimePickerModal
        visible={timePickerVisible}
        onClose={handleCloseTimePicker}
        onTimeSelected={handleTimeChange}
        initialTime={wakeTime}
      />
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: colors.textPrimary,
    marginLeft: 12,
  },
  description: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 16,
    lineHeight: 20,
  },
  timeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.inputBackground,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: colors.inputBorder,
  },
  timeText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: colors.textPrimary,
    marginLeft: 8,
  },
});