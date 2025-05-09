import { StyleSheet, View, Text, Pressable, ScrollView } from 'react-native';
import { colors } from '@/constants/Colors';
import Animated, { 
  useAnimatedStyle, 
  withSpring, 
  useSharedValue, 
  withTiming 
} from 'react-native-reanimated';
import { useEffect } from 'react';

interface Tab {
  key: string;
  label: string;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabKey: string) => void;
}

export function Tabs({ tabs, activeTab, onTabChange }: TabsProps) {
  const activeIndex = tabs.findIndex(tab => tab.key === activeTab);
  const indicatorPosition = useSharedValue(0);
  const indicatorWidth = useSharedValue(0);
  
  // Update indicator position when active tab changes
  useEffect(() => {
    const newPosition = 16 + (activeIndex * 100);
    indicatorPosition.value = withSpring(newPosition, {
      damping: 20,
      stiffness: 120,
    });
    
    // Approximate width based on tab label length
    const labelLength = tabs[activeIndex]?.label.length || 0;
    indicatorWidth.value = withTiming(Math.max(40, labelLength * 8));
  }, [activeTab, activeIndex, tabs]);
  
  const indicatorStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: indicatorPosition.value }],
      width: indicatorWidth.value,
    };
  });
  
  return (
    <View style={styles.container}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        contentContainerStyle={styles.scrollContent}
      >
        {tabs.map((tab) => (
          <Pressable
            key={tab.key}
            style={[
              styles.tab,
              activeTab === tab.key && styles.activeTab,
            ]}
            onPress={() => onTabChange(tab.key)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab.key && styles.activeTabText,
              ]}
            >
              {tab.label}
            </Text>
          </Pressable>
        ))}
        
        <Animated.View style={[styles.indicator, indicatorStyle]} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 48,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  scrollContent: {
    paddingHorizontal: 12,
  },
  tab: {
    paddingHorizontal: 16,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTab: {},
  tabText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: colors.textSecondary,
  },
  activeTabText: {
    fontFamily: 'Inter-SemiBold',
    color: colors.primary,
  },
  indicator: {
    position: 'absolute',
    bottom: 0,
    height: 3,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    backgroundColor: colors.primary,
  },
});