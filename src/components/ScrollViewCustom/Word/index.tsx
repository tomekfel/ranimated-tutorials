import { Dimensions, StatusBar, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';

interface WordProps {
  index: number;
  title: string;
  translateX: Animated.SharedValue<number>;
}

export const { width: PAGE_WIDTH } = Dimensions.get('window');

const Word: React.FC<WordProps> = ({ index, title, translateX }) => {
  const pageOffset = PAGE_WIDTH * index;

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value + pageOffset }],
    };
  });

  return (
    <Animated.View
      style={[
        styles.container,
        { backgroundColor: `rgba(0,0,255,0.${index + 2})` },
        rStyle,
      ]}
    >
      <Text style={[styles.text, { marginTop: StatusBar.currentHeight || 0 }]}>
        {title}
      </Text>
    </Animated.View>
  );
};

export default Word;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 75,
    color: 'white',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
});
