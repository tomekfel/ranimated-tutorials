import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableWithoutFeedback,
} from 'react-native';
import React from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

const Box = () => {
  const progress = useSharedValue(1);
  const scale = useSharedValue(1);

  const handleRotation = (progress: Animated.SharedValue<number>) => {
    'worklet';
    return `${progress.value * 2 * Math.PI}rad`;
  };

  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: progress.value,
      transform: [{ scale: scale.value }, { rotate: handleRotation(progress) }],
      borderRadius: progress.value * 50,
    };
  }, []);

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback
        onPress={() => {
          progress.value = withTiming(Math.random(), { duration: 1000 });
          scale.value = withRepeat(withSpring(0.5 + Math.random()), 3, true);
        }}
      >
        <Animated.View style={[styles.box, reanimatedStyle]} />
      </TouchableWithoutFeedback>
      <View style={{ marginTop: 50 }}>
        <Button
          onPress={() => {
            progress.value = withTiming(Math.random(), { duration: 1000 });
            scale.value = withRepeat(withSpring(Math.random() * 3), 1, true);
          }}
          title='Opacity'
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    height: 100,
    width: 100,
    backgroundColor: 'blue',
  },
});

export default Box;
