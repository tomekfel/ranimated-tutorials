import { StyleSheet, View } from 'react-native';
import React from 'react';
import Word from './Word';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';

const WORDS = ["What's", 'up', 'mobile', 'devs'];

const InterpolateScrollView = () => {
  const translateX = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    translateX.value = event.contentOffset.x;
  });

  return (
    <Animated.ScrollView
      pagingEnabled
      onScroll={scrollHandler}
      scrollEventThrottle={16}
      horizontal
      style={styles.container}
    >
      {WORDS.map((word, index) => {
        return (
          <Word key={index} index={index} word={word} translateX={translateX} />
        );
      })}
    </Animated.ScrollView>
  );
};

export default InterpolateScrollView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
