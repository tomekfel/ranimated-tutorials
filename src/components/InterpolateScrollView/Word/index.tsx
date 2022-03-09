import { Dimensions, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

interface WordProps {
  word: string;
  index: number;
  translateX: Animated.SharedValue<number>;
}

const { width, height } = Dimensions.get('screen');
const SIZE = width * 0.7;

const Word: React.FC<WordProps> = ({ index, word, translateX }) => {
  const inputRange = [(index - 1) * width, index * width, (index + 1) * width];

  const reanimatedStyle = useAnimatedStyle(() => {
    const borderRadius = interpolate(
      translateX.value,
      inputRange,
      [0, SIZE / 2, 0],
      Extrapolate.CLAMP
    );

    const scale = interpolate(
      translateX.value,
      inputRange,
      [0, 1, 0],
      Extrapolate.CLAMP
    );

    return {
      borderRadius,
      transform: [{ scale: scale }],
    };
  });

  const reanimatedText = useAnimatedStyle(() => {
    const translateY = interpolate(
      translateX.value,
      inputRange,
      [height / 2, 0, -height / 2],
      Extrapolate.CLAMP
    );
    const opacity = interpolate(
      translateX.value,
      inputRange,
      [-2, 1, -2],
      Extrapolate.CLAMP
    );

    return {
      opacity,
      transform: [{ translateY }],
    };
  });

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: `rgba(0,0,256,0.${index + 2})` },
      ]}
    >
      <Animated.View style={[styles.square, reanimatedStyle]} />
      <Animated.View style={[{ position: 'absolute' }, reanimatedText]}>
        <Text style={styles.text}>{word}</Text>
      </Animated.View>
    </View>
  );
};

export default Word;

const styles = StyleSheet.create({
  container: {
    height,
    width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 70,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  square: {
    width: SIZE,
    height: SIZE,
    backgroundColor: 'rgba(0,0,255,0.4)',
    alignItems: 'center',
  },
});
