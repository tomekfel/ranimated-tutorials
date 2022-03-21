import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Picker from './Picker';
import React from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

const COLORS = [
  'red',
  'purple',
  'blue',
  'cyan',
  'green',
  'yellow',
  'orange',
  'black',
  'white',
];

const BACKGROUND_COLOR = 'rgba(0,0,0,0.9)';

const { width } = Dimensions.get('window');

const CIRCLE_SIZE = width * 0.8;
const PICKER_WIDTH = width * 0.9;

const ColorPicker = () => {
  const pickedColor = useSharedValue<number | string>(COLORS[0]);

  const rStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: pickedColor.value,
    };
  });

  const handleColorChange = (color: string | number) => {
    'worklet';
    pickedColor.value = color;
  };

  return (
    <>
      <View style={styles.topContainer}>
        <Animated.View style={[styles.circle, rStyle]}></Animated.View>
      </View>
      <View style={styles.bottomContainer}>
        <Picker
          colors={COLORS}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradient}
          maxWidth={PICKER_WIDTH}
          onColorChanged={handleColorChange}
        />
      </View>
    </>
  );
};

export default ColorPicker;

const styles = StyleSheet.create({
  topContainer: {
    flex: 3,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradient: {
    height: 40,
    width: PICKER_WIDTH,
    borderRadius: 20,
  },
  circle: {
    height: CIRCLE_SIZE,
    width: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
  },
});
