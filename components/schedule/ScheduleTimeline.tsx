import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { colors } from '@/constants/Colors';
import { Card } from '@/components/common/Card';
import { formatTime } from '@/utils/dateUtils';
import { Baby, Coffee, Moon, Utensils } from 'lucide-react-native';
import { ScheduleItem } from '@/types';

interface ScheduleTimelineProps {
  schedule: ScheduleItem[];
}

export function ScheduleTimeline({ schedule }: ScheduleTimelineProps) {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'feed':
        return <Utensils size={20} color={colors.primary} />;
      case 'nap':
        return <Moon size={20} color={colors.secondary} />;
      case 'play':
        return <Baby size={20} color={colors.accent} />;
      case 'wake':
        return <Coffee size={20} color={colors.success} />;
      default:
        return <Baby size={20} color={colors.primary} />;
    }
  };
  
  const getActivityColor = (type: string) => {
    switch (type) {
      case 'feed':
        return colors.primary;
      case 'nap':
        return colors.secondary;
      case 'play':
        return colors.accent;
      case 'wake':
        return colors.success;
      default:
        return colors.primary;
    }
  };
  
  return (
    <Card style={styles.container}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.timeline}>
          {schedule.map((item, index) => (
            <View 
              key={index}
              style={styles.timelineItem}
            >
              <View style={styles.timeContainer}>
                <Text style={styles.time}>{formatTime(item.time)}</Text>
              </View>
              
              <View style={styles.connector}>
                <View 
                  style={[
                    styles.dot, 
                    { backgroundColor: getActivityColor(item.type) }
                  ]} 
                />
                {index < schedule.length - 1 && (
                  <View style={styles.line} />
                )}
              </View>
              
              <View style={styles.activityContainer}>
                <View style={styles.activityIcon}>
                  {getActivityIcon(item.type)}
                </View>
                <View style={styles.activityInfo}>
                  <Text style={styles.activityTitle}>{item.title}</Text>
                  <Text style={styles.activityDescription}>{item.description}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    maxHeight: 400,
  },
  scrollContent: {
    padding: 16,
  },
  timeline: {
    flex: 1,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  timeContainer: {
    width: 70,
    paddingRight: 8,
    alignItems: 'flex-end',
  },
  time: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: colors.textPrimary,
  },
  connector: {
    width: 24,
    alignItems: 'center',
  },
  dot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: colors.primary,
    borderWidth: 2,
    borderColor: colors.cardBackground,
    zIndex: 1,
  },
  line: {
    position: 'absolute',
    top: 14,
    bottom: -20,
    width: 2,
    backgroundColor: colors.divider,
  },
  activityContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingLeft: 8,
  },
  activityIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.inputBackground,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  activityInfo: {
    flex: 1,
  },
  activityTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: colors.textPrimary,
    marginBottom: 2,
  },
  activityDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: colors.textSecondary,
  },
});