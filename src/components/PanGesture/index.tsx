import { Dimensions, StyleSheet, View } from 'react-native';
import React from 'react';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {
  GestureHandlerRootView,
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';

const screen = {
  width: Dimensions.get('screen').width,
  height: Dimensions.get('screen').height,
};

const SIZE = 100;
// const CIRCLE_RADIUS = SIZE * 2;
const CIRCLE_RADIUS = screen.width / 2.5;

type ContextType = {
  translateX: number;
  translateY: number;
};

const PanGesture = () => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const panGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    ContextType
  >({
    onStart: (event, context: ContextType) => {
      context.translateX = translateX.value;
      context.translateY = translateY.value;
    },
    onActive: (event, context) => {
      translateX.value = event.translationX + context.translateX;
      translateY.value = event.translationY + context.translateY;
    },
    onEnd: () => {
      const distance = Math.sqrt(
        Math.pow(translateX.value, 2) + Math.pow(translateY.value, 2)
      );

      if (distance < CIRCLE_RADIUS + SIZE / 2) {
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
      }
    },
  });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
        { translateY: translateY.value },
      ],
    };
  });

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.circle}>
          <PanGestureHandler onGestureEvent={panGestureEvent}>
            <Animated.View style={[styles.square, rStyle]} />
          </PanGestureHandler>
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

export default PanGesture;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: screen.height,
    width: screen.width,
  },
  square: {
    width: SIZE,
    height: SIZE,
    backgroundColor: 'rgba(0, 0, 256, 0.5)',
    borderRadius: 0.2 * SIZE,
  },
  circle: {
    width: CIRCLE_RADIUS * 2,
    height: CIRCLE_RADIUS * 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: CIRCLE_RADIUS,
    borderWidth: 5,
    borderColor: 'rgba(0, 0, 256, 0.5)',
  },
});
