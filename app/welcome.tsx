import { useState } from 'react';
import { StyleSheet, View, Text, Image, Pressable } from 'react-native';
import { router } from 'expo-router';
import { colors } from '@/constants/Colors';
import { Button } from '@/components/common/Button';
import Animated, { FadeInRight, FadeOutLeft } from 'react-native-reanimated';

const WELCOME_SCREENS = [
  {
    title: 'Welcome to BabyTracker',
    description: 'Your complete solution for tracking your baby\'s daily activities, growth, and milestones.',
    image: 'https://images.pexels.com/photos/3875225/pexels-photo-3875225.jpeg',
  },
  {
    title: 'Easy Daily Tracking',
    description: 'Track feedings, sleep, diapers, and more with just a few taps. Get insights into your baby\'s patterns.',
    image: 'https://images.pexels.com/photos/3662667/pexels-photo-3662667.jpeg',
  },
  {
    title: 'Stay Connected',
    description: 'Share updates with family and caregivers. Never miss an important moment in your baby\'s development.',
    image: 'https://images.pexels.com/photos/3875098/pexels-photo-3875098.jpeg',
  },
];

export default function Welcome() {
  const [currentScreen, setCurrentScreen] = useState(0);
  
  const handleNext = () => {
    if (currentScreen < WELCOME_SCREENS.length - 1) {
      setCurrentScreen(prev => prev + 1);
    } else {
      router.replace('/auth');
    }
  };
  
  const handleSkip = () => {
    router.replace('/auth');
  };
  
  const screen = WELCOME_SCREENS[currentScreen];
  
  return (
    <View style={styles.container}>
      <Animated.View 
        entering={FadeInRight}
        exiting={FadeOutLeft}
        key={currentScreen}
        style={styles.content}
      >
        <Image
          source={{ uri: screen.image }}
          style={styles.image}
        />
        
        <View style={styles.textContainer}>
          <Text style={styles.title}>{screen.title}</Text>
          <Text style={styles.description}>{screen.description}</Text>
        </View>
      </Animated.View>
      
      <View style={styles.footer}>
        <View style={styles.dots}>
          {WELCOME_SCREENS.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                currentScreen === index && styles.activeDot,
              ]}
            />
          ))}
        </View>
        
        <View style={styles.buttons}>
          <Pressable onPress={handleSkip}>
            <Text style={styles.skipText}>Skip</Text>
          </Pressable>
          
          <Button
            title={currentScreen === WELCOME_SCREENS.length - 1 ? "Get Started" : "Next"}
            onPress={handleNext}
            style={styles.nextButton}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 16,
    marginBottom: 48,
  },
  textContainer: {
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  footer: {
    padding: 32,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 32,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.inputBorder,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: colors.primary,
    width: 24,
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  skipText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: colors.textSecondary,
  },
  nextButton: {
    minWidth: 120,
  },
});