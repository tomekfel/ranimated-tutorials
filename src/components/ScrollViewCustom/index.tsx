import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Word, { PAGE_WIDTH } from './Word';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  cancelAnimation,
  useAnimatedGestureHandler,
  useDerivedValue,
  useSharedValue,
  withDecay,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

const WORDS = ["What's", 'up', 'mobile', 'devs'];
const MAX_TRANSLATE_X = -PAGE_WIDTH * (WORDS.length - 1);

type ContextType = {
  translateX: number;
};

const ScrollViewCustom = () => {
  const translateX = useSharedValue(0);

  const clampedTranslateX = useDerivedValue(() => {
    // console.log(translateX.value);
    return Math.max(Math.min(translateX.value, 0), MAX_TRANSLATE_X);
  });

  const panGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    ContextType
  >({
    onStart: (event, context: ContextType) => {
      context.translateX = clampedTranslateX.value;
      cancelAnimation(translateX);
    },
    onActive: (event, context) => {
      translateX.value = Math.max(
        Math.min(event.translationX + context.translateX, 0),
        MAX_TRANSLATE_X
      );
    },
    onEnd: (event) => {
      translateX.value = withDecay({ velocity: event.velocityX });
    },
  });
  return (
    <View style={styles.container}>
      <PanGestureHandler onGestureEvent={panGestureEvent}>
        <Animated.View style={{ flex: 1, flexDirection: 'row' }}>
          {WORDS.map((title, index) => {
            return (
              <Word
                key={index.toString()}
                title={title}
                index={index}
                translateX={clampedTranslateX}
              />
            );
          })}
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

export default ScrollViewCustom;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
