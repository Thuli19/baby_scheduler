import { StyleSheet, View, Text, Dimensions } from 'react-native';
import { colors } from '@/constants/Colors';
import Animated, { 
  useSharedValue,
  useAnimatedStyle,
  withTiming
} from 'react-native-reanimated';
import { useEffect } from 'react';

interface SleepChartProps {
  data: { day: string; sleepHours: number; targetHours: number }[];
}

export function SleepChart({ data }: SleepChartProps) {
  const maxHours = Math.max(...data.map(d => d.targetHours));
  const barHeights = data.map(() => useSharedValue(0));
  
  useEffect(() => {
    // Animate bars on mount
    data.forEach((item, index) => {
      const percentage = (item.sleepHours / maxHours) * 100;
      setTimeout(() => {
        barHeights[index].value = withTiming(percentage, { duration: 600 });
      }, index * 100);
    });
  }, []);
  
  return (
    <View style={styles.container}>
      <View style={styles.chartContainer}>
        {data.map((item, index) => {
          const animatedBarStyle = useAnimatedStyle(() => {
            return {
              height: `${barHeights[index].value}%`,
            };
          });
          
          const percentage = Math.round((item.sleepHours / item.targetHours) * 100);
          const barColor = getBarColor(percentage);
          
          return (
            <View key={index} style={styles.barContainer}>
              <View style={styles.barWrapper}>
                <Animated.View 
                  style={[
                    styles.bar,
                    animatedBarStyle,
                    { backgroundColor: barColor },
                  ]}
                />
              </View>
              <Text style={styles.dayLabel}>{item.day}</Text>
            </View>
          );
        })}
      </View>
      
      <View style={styles.legendContainer}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: colors.success }]} />
          <Text style={styles.legendText}>Optimal (90-100%)</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: colors.primary }]} />
          <Text style={styles.legendText}>Good (75-89%)</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: colors.warning }]} />
          <Text style={styles.legendText}>Low (below 75%)</Text>
        </View>
      </View>
    </View>
  );
}

function getBarColor(percentage: number): string {
  if (percentage >= 90) return colors.success;
  if (percentage >= 75) return colors.primary;
  return colors.warning;
}

const styles = StyleSheet.create({
  container: {
    height: 240,
  },
  chartContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingBottom: 8,
  },
  barContainer: {
    flex: 1,
    alignItems: 'center',
  },
  barWrapper: {
    width: 24,
    height: '90%',
    backgroundColor: colors.inputBackground,
    borderRadius: 12,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  bar: {
    width: '100%',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  dayLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
    flexWrap: 'wrap',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 8,
    marginBottom: 8,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 4,
  },
  legendText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: colors.textSecondary,
  },
});