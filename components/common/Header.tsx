import { StyleSheet, View, Text, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '@/constants/Colors';
import { BellDot } from 'lucide-react-native';

interface HeaderProps {
  title: string;
  showNotification?: boolean;
  onNotificationPress?: () => void;
}

export function Header({ 
  title, 
  showNotification = true,
  onNotificationPress 
}: HeaderProps) {
  const insets = useSafeAreaInsets();
  
  return (
    <View style={[styles.container, { paddingTop: insets.top > 0 ? 16 : 16 }]}>
      <Text style={styles.title}>{title}</Text>
      
      {showNotification && (
        <Pressable 
          style={styles.notificationButton} 
          onPress={onNotificationPress}
        >
          <BellDot size={24} color={colors.textPrimary} />
          <View style={styles.notificationBadge} />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: colors.background,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: colors.textPrimary,
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.cardBackground,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.accent,
    borderWidth: 2,
    borderColor: colors.cardBackground,
  },
});