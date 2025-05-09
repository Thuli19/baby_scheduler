import { StyleSheet, View, Text, Pressable } from 'react-native';
import { colors } from '@/constants/Colors';
import { Card } from '@/components/common/Card';
import { Check } from 'lucide-react-native';
import { TodoItem } from '@/types';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withTiming,
  interpolateColor 
} from 'react-native-reanimated';

interface TodoListProps {
  items: TodoItem[];
  onToggleItem: (id: string) => void;
}

export function TodoList({ items, onToggleItem }: TodoListProps) {
  return (
    <Card style={styles.container}>
      {items.length > 0 ? (
        <View style={styles.itemList}>
          {items.map((item) => (
            <TodoListItem 
              key={item.id} 
              item={item} 
              onToggle={onToggleItem} 
            />
          ))}
        </View>
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>
            No to-do items yet. They will appear based on your baby's schedule.
          </Text>
        </View>
      )}
    </Card>
  );
}

interface TodoListItemProps {
  item: TodoItem;
  onToggle: (id: string) => void;
}

function TodoListItem({ item, onToggle }: TodoListItemProps) {
  const isCompleted = item.completed;
  const checkboxProgress = useSharedValue(isCompleted ? 1 : 0);

  // Animate when completed status changes
  const checkboxStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      checkboxProgress.value,
      [0, 1],
      [colors.inputBackground, colors.primary]
    );
    
    const borderColor = interpolateColor(
      checkboxProgress.value,
      [0, 1],
      [colors.inputBorder, colors.primary]
    );
    
    return {
      backgroundColor,
      borderColor,
    };
  });
  
  const labelStyle = useAnimatedStyle(() => {
    const textColor = interpolateColor(
      checkboxProgress.value,
      [0, 1],
      [colors.textPrimary, colors.textSecondary]
    );
    
    return {
      color: textColor,
      textDecorationLine: checkboxProgress.value > 0.5 ? 'line-through' : 'none',
    };
  });
  
  const handlePress = () => {
    const newValue = !isCompleted;
    checkboxProgress.value = withTiming(newValue ? 1 : 0, { duration: 300 });
    onToggle(item.id);
  };
  
  return (
    <Pressable 
      style={styles.item}
      onPress={handlePress}
    >
      <Animated.View style={[styles.checkbox, checkboxStyle]}>
        {isCompleted && (
          <Check size={16} color={colors.white} />
        )}
      </Animated.View>
      
      <Animated.Text style={[styles.itemText, labelStyle]}>
        {item.text}
      </Animated.Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  itemList: {
    padding: 8,
  },
  emptyState: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyStateText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  itemText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    flex: 1,
  },
});