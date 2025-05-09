import { StyleSheet, View, Text } from 'react-native';
import { colors } from '@/constants/Colors';
import { Card } from '@/components/common/Card';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming 
} from 'react-native-reanimated';
import { useEffect } from 'react';
import { Moon } from 'lucide-react-native';

interface SleepSummaryProps {
  totalHours: number;
  targetHours: number;
}

export function SleepSummary({ totalHours, targetHours }: SleepSummaryProps) {
  const percentage = (totalHours / targetHours) * 100;
  const progress = useSharedValue(0);
  
  useEffect(() => {
    progress.value = withTiming(percentage, { duration: 1000 });
  }, [totalHours, targetHours]);
  
  const progressStyle = useAnimatedStyle(() => {
    return {
      width: `${Math.min(100, progress.value)}%`,
    };
  });
  
  const getStatusText = () => {
    if (percentage >= 90) return 'Excellent';
    if (percentage >= 80) return 'Good';
    if (percentage >= 70) return 'Fair';
    return 'Needs improvement';
  };
  
  const getStatusColor = () => {
    if (percentage >= 90) return colors.success;
    if (percentage >= 80) return colors.primary;
    if (percentage >= 70) return colors.warning;
    return colors.error;
  };
  
  return (
    <Card style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Moon size={20} color={colors.secondary} />
          <Text style={styles.title}>Today's Sleep</Text>
        </View>
        <Text style={[styles.status, { color: getStatusColor() }]}>
          {getStatusText()}
        </Text>
      </View>
      
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <Animated.View 
            style={[
              styles.progressFill,
              progressStyle,
              { backgroundColor: getStatusColor() },
            ]}
          />
        </View>
        <View style={styles.hoursContainer}>
          <Text style={styles.hours}>{totalHours} hours</Text>
          <Text style={styles.target}>of {targetHours} hours target</Text>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: colors.textPrimary,
    marginLeft: 8,
  },
  status: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
  },
  progressContainer: {
    marginTop: 8,
  },
  progressBar: {
    height: 12,
    backgroundColor: colors.inputBackground,
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    borderRadius: 6,
  },
  hoursContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  hours: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: colors.textPrimary,
  },
  target: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: colors.textSecondary,
  },
});