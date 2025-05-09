import { StyleSheet, View, Text, ScrollView, Switch, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '@/components/common/Header';
import { Card } from '@/components/common/Card';
import { colors } from '@/constants/Colors';
import { ChevronRight, Bell, Share2, CircleHelp as HelpCircle, Moon } from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useState } from 'react';

export default function SettingsScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  const renderSettingItem = (
    icon: JSX.Element,
    title: string,
    hasSwitch = false,
    switchValue?: boolean,
    onSwitchChange?: (value: boolean) => void
  ) => {
    return (
      <Pressable style={styles.settingItem}>
        <View style={styles.settingItemLeft}>
          {icon}
          <Text style={styles.settingItemText}>{title}</Text>
        </View>
        
        {hasSwitch ? (
          <Switch
            value={switchValue}
            onValueChange={onSwitchChange}
            trackColor={{ false: colors.switchTrackOff, true: colors.switchTrackOn }}
            thumbColor={switchValue ? colors.primary : colors.switchThumbOff}
          />
        ) : (
          <ChevronRight size={20} color={colors.textTertiary} />
        )}
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header title="Settings" />
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View 
          entering={FadeInDown.delay(100).springify()}
          style={styles.section}
        >
          <Text style={styles.sectionTitle}>Preferences</Text>
          
          <Card>
            {renderSettingItem(
              <Bell size={20} color={colors.primary} />,
              'Notifications',
              true,
              notificationsEnabled,
              setNotificationsEnabled
            )}
            
            <View style={styles.divider} />
            
            {renderSettingItem(
              <Moon size={20} color={colors.primary} />,
              'Dark Mode',
              true,
              darkModeEnabled,
              setDarkModeEnabled
            )}
          </Card>
        </Animated.View>
        
        <Animated.View 
          entering={FadeInDown.delay(200).springify()}
          style={styles.section}
        >
          <Text style={styles.sectionTitle}>App</Text>
          
          <Card>
            {renderSettingItem(
              <Share2 size={20} color={colors.primary} />,
              'Share App'
            )}
            
            <View style={styles.divider} />
            
            {renderSettingItem(
              <HelpCircle size={20} color={colors.primary} />,
              'Help & Support'
            )}
          </Card>
        </Animated.View>
        
        <Animated.View 
          entering={FadeInDown.delay(300).springify()}
          style={styles.section}
        >
          <Text style={styles.versionText}>Version 1.0.0</Text>
        </Animated.View>
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
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: colors.textPrimary,
    marginBottom: 12,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  settingItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingItemText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: colors.textPrimary,
    marginLeft: 12,
  },
  divider: {
    height: 1,
    backgroundColor: colors.divider,
  },
  versionText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: colors.textTertiary,
    textAlign: 'center',
  },
});