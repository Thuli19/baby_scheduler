import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Modal, Pressable, Platform } from 'react-native';
import { colors } from '@/constants/Colors';
import { Button } from '@/components/common/Button';
import DateTimePicker from '@react-native-community/datetimepicker';

interface TimePickerModalProps {
  visible: boolean;
  onClose: () => void;
  onTimeSelected: (time: Date) => void;
  initialTime: Date | null;
}

export function TimePickerModal({ 
  visible, 
  onClose, 
  onTimeSelected, 
  initialTime 
}: TimePickerModalProps) {
  const [selectedTime, setSelectedTime] = useState(initialTime || new Date());
  
  // Update selected time when initialTime changes
  useEffect(() => {
    if (initialTime) {
      setSelectedTime(initialTime);
    }
  }, [initialTime]);
  
  const handleTimeChange = (_event: any, time?: Date) => {
    if (time) {
      setSelectedTime(time);
      
      if (Platform.OS === 'android') {
        onTimeSelected(time);
      }
    }
  };
  
  const handleConfirm = () => {
    onTimeSelected(selectedTime);
  };
  
  // For iOS, we render the picker within a modal
  // For Android, we show the native picker directly
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <View style={styles.container}>
          <Pressable style={styles.modalContent} onPress={e => e.stopPropagation()}>
            <Text style={styles.title}>Select Wake Time</Text>
            
            <View style={styles.pickerContainer}>
              <DateTimePicker
                value={selectedTime}
                mode="time"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={handleTimeChange}
              />
            </View>
            
            {Platform.OS === 'ios' && (
              <View style={styles.buttonContainer}>
                <Button 
                  title="Cancel" 
                  variant="outline" 
                  onPress={onClose} 
                  style={styles.button}
                />
                <Button 
                  title="Confirm" 
                  variant="primary" 
                  onPress={handleConfirm} 
                  style={styles.button}
                />
              </View>
            )}
          </Pressable>
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '90%',
    maxWidth: 400,
  },
  modalContent: {
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    padding: 20,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  title: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: colors.textPrimary,
    marginBottom: 16,
    textAlign: 'center',
  },
  pickerContainer: {
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    marginHorizontal: 8,
  },
});