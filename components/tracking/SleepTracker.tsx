import { StyleSheet, View, Text } from 'react-native';
import { colors } from '@/constants/Colors';
import { Card } from '@/components/common/Card';
import { SleepChart } from '@/components/tracking/SleepChart';
import { SleepSummary } from '@/components/tracking/SleepSummary';
import { useState } from 'react';

export function SleepTracker() {
  // Dummy sleep data for demo purposes
  const [sleepData] = useState([
    { day: 'Mon', sleepHours: 14.5, targetHours: 16 },
    { day: 'Tue', sleepHours: 15, targetHours: 16 },
    { day: 'Wed', sleepHours: 13, targetHours: 16 },
    { day: 'Thu', sleepHours: 14, targetHours: 16 },
    { day: 'Fri', sleepHours: 15.5, targetHours: 16 },
    { day: 'Sat', sleepHours: 16, targetHours: 16 },
    { day: 'Sun', sleepHours: 15, targetHours: 16 },
  ]);
  
  const todaySleepData = sleepData[sleepData.length - 1];
  
  return (
    <View style={styles.container}>
      <SleepSummary 
        totalHours={todaySleepData.sleepHours}
        targetHours={todaySleepData.targetHours}
      />
      
      <Text style={styles.sectionTitle}>Weekly Sleep</Text>
      
      <Card style={styles.chartCard}>
        <SleepChart data={sleepData} />
      </Card>
      
      <Text style={styles.sectionTitle}>Recent Sleep</Text>
      
      <Card style={styles.recentCard}>
        <View style={styles.recentItem}>
          <View style={styles.recentItemHeader}>
            <Text style={styles.recentItemTime}>9:30 AM - 11:00 AM</Text>
            <Text style={styles.recentItemDuration}>1h 30m</Text>
          </View>
          <Text style={styles.recentItemLabel}>Morning Nap</Text>
        </View>
        
        <View style={styles.divider} />
        
        <View style={styles.recentItem}>
          <View style={styles.recentItemHeader}>
            <Text style={styles.recentItemTime}>2:00 PM - 3:30 PM</Text>
            <Text style={styles.recentItemDuration}>1h 30m</Text>
          </View>
          <Text style={styles.recentItemLabel}>Afternoon Nap</Text>
        </View>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: colors.textPrimary,
    marginTop: 24,
    marginBottom: 12,
  },
  chartCard: {
    padding: 16,
  },
  recentCard: {
    padding: 16,
  },
  recentItem: {
    paddingVertical: 12,
  },
  recentItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  recentItemTime: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: colors.textPrimary,
  },
  recentItemDuration: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: colors.success,
  },
  recentItemLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: colors.textSecondary,
  },
  divider: {
    height: 1,
    backgroundColor: colors.divider,
  },
});