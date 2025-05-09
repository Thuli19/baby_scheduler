import { StyleSheet, View, Text, ScrollView, Image, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '@/components/common/Header';
import { Card } from '@/components/common/Card';
import { colors } from '@/constants/Colors';
import { Plus, CreditCard as Edit } from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useBaby } from '@/hooks/useBaby';

export default function BabyScreen() {
  const { baby } = useBaby();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header title="Baby Profile" />
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {baby ? (
          <>
            <Animated.View 
              entering={FadeInDown.delay(100).springify()}
              style={styles.profileContainer}
            >
              <View style={styles.profileHeader}>
                <View style={styles.profileImageContainer}>
                  {baby.photo ? (
                    <Image 
                      source={{ uri: baby.photo }} 
                      style={styles.profileImage} 
                    />
                  ) : (
                    <View style={styles.profileImagePlaceholder}>
                      <Text style={styles.profileImagePlaceholderText}>
                        {baby.name.charAt(0)}
                      </Text>
                    </View>
                  )}
                </View>

                <View style={styles.profileInfo}>
                  <Text style={styles.babyName}>{baby.name}</Text>
                  <Text style={styles.babyAge}>{baby.age}</Text>
                  
                  <Pressable style={styles.editButton}>
                    <Edit size={16} color={colors.textSecondary} />
                    <Text style={styles.editButtonText}>Edit Profile</Text>
                  </Pressable>
                </View>
              </View>
            </Animated.View>

            <Animated.View 
              entering={FadeInDown.delay(200).springify()}
              style={styles.sectionContainer}
            >
              <Text style={styles.sectionTitle}>Details</Text>
              
              <Card style={styles.detailsCard}>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Date of Birth</Text>
                  <Text style={styles.detailValue}>{baby.dob}</Text>
                </View>
                
                <View style={styles.divider} />
                
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Weight</Text>
                  <Text style={styles.detailValue}>{baby.weight}</Text>
                </View>
                
                <View style={styles.divider} />
                
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Height</Text>
                  <Text style={styles.detailValue}>{baby.height}</Text>
                </View>
              </Card>
            </Animated.View>

            <Animated.View 
              entering={FadeInDown.delay(300).springify()}
              style={styles.sectionContainer}
            >
              <Text style={styles.sectionTitle}>Preferences</Text>
              
              <Card style={styles.preferencesCard}>
                {baby.preferences.map((pref, index) => (
                  <View key={index}>
                    <View style={styles.preferenceRow}>
                      <Text style={styles.preferenceLabel}>{pref.label}</Text>
                      <Text style={styles.preferenceValue}>{pref.value}</Text>
                    </View>
                    {index < baby.preferences.length - 1 && <View style={styles.divider} />}
                  </View>
                ))}
              </Card>
            </Animated.View>
          </>
        ) : (
          <Animated.View 
            entering={FadeInDown.delay(100).springify()}
            style={styles.emptyState}
          >
            <Text style={styles.emptyStateTitle}>Add Your Baby's Profile</Text>
            <Text style={styles.emptyStateDescription}>
              Create your baby's profile to personalize their schedule
            </Text>
            
            <Pressable style={styles.addButton}>
              <Plus size={20} color={colors.white} />
              <Text style={styles.addButtonText}>Add Baby Profile</Text>
            </Pressable>
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
  profileContainer: {
    marginBottom: 24,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImageContainer: {
    marginRight: 16,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profileImagePlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImagePlaceholderText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 28,
    color: colors.white,
  },
  profileInfo: {
    flex: 1,
  },
  babyName: {
    fontFamily: 'Inter-Bold',
    fontSize: 22,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  babyAge: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: colors.textSecondary,
    marginLeft: 4,
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: colors.textPrimary,
    marginBottom: 12,
  },
  detailsCard: {
    padding: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  detailLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: colors.textSecondary,
  },
  detailValue: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: colors.textPrimary,
  },
  divider: {
    height: 1,
    backgroundColor: colors.divider,
  },
  preferencesCard: {
    padding: 16,
  },
  preferenceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  preferenceLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: colors.textSecondary,
  },
  preferenceValue: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
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
  emptyStateTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: colors.textPrimary,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyStateDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
  },
  addButton: {
    flexDirection: 'row',
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: colors.white,
    marginLeft: 8,
  },
});