import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSchedule } from '@/hooks/useSchedule';
import { WakeTimeInput } from '@/components/schedule/WakeTimeInput';
import { ScheduleTimeline } from '@/components/schedule/ScheduleTimeline';
import { TodoList } from '@/components/schedule/TodoList';
import { Header } from '@/components/common/Header';
import { Button } from '@/components/common/Button';
import { colors } from '@/constants/Colors';
import { ChevronRight } from 'lucide-react-native';
import { formatDate } from '@/utils/dateUtils';
import Animated, { FadeInDown } from 'react-native-reanimated';

export default function ScheduleScreen() {
  const { 
    wakeTime, 
    setWakeTime, 
    schedule, 
    todoItems,
    toggleTodoItem,
    selectedDate,
    setSelectedDate
  } = useSchedule();

  const today = formatDate(new Date());

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header title="Daily Schedule" />
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View 
          entering={FadeInDown.delay(100).springify()}
          style={styles.dateContainer}
        >
          <Text style={styles.dateLabel}>Today, {today}</Text>
          
          <Pressable style={styles.dateSelector}>
            <Text style={styles.dateText}>Change Date</Text>
            <ChevronRight size={16} color={colors.primary} />
          </Pressable>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(200).springify()}>
          <WakeTimeInput 
            wakeTime={wakeTime}
            onChangeWakeTime={setWakeTime}
          />
        </Animated.View>

        {wakeTime ? (
          <>
            <Animated.View 
              entering={FadeInDown.delay(300).springify()}
              style={styles.sectionContainer}
            >
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Daily Timeline</Text>
                <Button 
                  title="Adjust" 
                  variant="text" 
                  size="small"
                  onPress={() => {}} 
                />
              </View>
              <ScheduleTimeline schedule={schedule} />
            </Animated.View>

            <Animated.View 
              entering={FadeInDown.delay(400).springify()}
              style={styles.sectionContainer}
            >
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>To-Do List</Text>
                <Button 
                  title="Add Task" 
                  variant="text" 
                  size="small"
                  onPress={() => {}} 
                />
              </View>
              <TodoList 
                items={todoItems} 
                onToggleItem={toggleTodoItem} 
              />
            </Animated.View>
          </>
        ) : (
          <Animated.View 
            entering={FadeInDown.delay(300).springify()}
            style={styles.emptyState}
          >
            <Text style={styles.emptyStateText}>
              Enter your baby's first wake time to generate your daily schedule
            </Text>
          </Animated.View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  dateLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: colors.textPrimary,
  },
  dateSelector: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: colors.primary,
    marginRight: 4,
  },
  sectionContainer: {
    marginTop: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: colors.textPrimary,
  },
  emptyState: {
    marginTop: 48,
    padding: 24,
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyStateText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
});