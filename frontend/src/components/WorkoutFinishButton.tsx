import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Alert, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { WorkoutNavigationProp } from '../navigation/HomeNavigation';

const WorkoutFinishButton = () => {
    const navigation = useNavigation<WorkoutNavigationProp>();
  
    const handleBackPress = () => {
      Alert.alert(
        'Confirmation',
        'Are you sure you want to finish workout?',
        [
          { text: 'No', style: 'cancel' },
          {
            text: 'Yes',
            onPress: () => {
              navigation.goBack();
            },
          },
        ],
        { cancelable: false }
      );
      return true; 
    };
  
    return <BackButton onPress={handleBackPress} />;
  };
  export default WorkoutFinishButton;

  interface BackButtonProps extends TouchableOpacityProps {
    onPress: () => void;
  }
  
  const BackButton: React.FC<BackButtonProps> = ({ onPress, ...props }) => {
    return (
      <TouchableOpacity onPress={onPress} {...props}>
        <Text>Finish</Text>
      </TouchableOpacity>
    );
  };