import { StyleSheet, View, Text, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '@/components/common/Header';
import { Tabs } from '@/components/common/Tabs';
import { SleepTracker } from '@/components/tracking/SleepTracker';
import { colors } from '@/constants/Colors';
import { Plus } from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useState } from 'react';

const TABS = [
  { key: 'sleep', label: 'Sleep' },
  { key: 'feeding', label: 'Feeding' },
  { key: 'diaper', label: 'Diaper' },
  { key: 'growth', label: 'Growth' },
];

export default function TrackingScreen() {
  const [activeTab, setActiveTab] = useState('sleep');

  const renderContent = () => {
    switch (activeTab) {
      case 'sleep':
        return <SleepTracker />;
      case 'feeding':
        return (
          <View style={styles.comingSoon}>
            <Text style={styles.comingSoonText}>Feeding tracking coming soon</Text>
          </View>
        );
      case 'diaper':
        return (
          <View style={styles.comingSoon}>
            <Text style={styles.comingSoonText}>Diaper tracking coming soon</Text>
          </View>
        );
      case 'growth':
        return (
          <View style={styles.comingSoon}>
            <Text style={styles.comingSoonText}>Growth tracking coming soon</Text>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header title="Tracking" />
      
      <Animated.View entering={FadeInDown.delay(100).springify()}>
        <Tabs 
          tabs={TABS} 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
        />
      </Animated.View>
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View entering={FadeInDown.delay(200).springify()}>
          {renderContent()}
        </Animated.View>
      </ScrollView>
      
      <Pressable style={styles.fabButton}>
        <Plus size={24} color={colors.white} />
      </Pressable>
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
  comingSoon: {
    marginTop: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  comingSoonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: colors.textSecondary,
  },
  fabButton: {
    position: 'absolute',
    bottom: 100,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
});