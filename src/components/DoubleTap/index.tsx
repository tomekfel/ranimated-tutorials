import {
  StyleSheet,
  View,
  Image,
  ImageBackground,
  Dimensions,
} from 'react-native';
import React, { useCallback, useRef } from 'react';
import { TapGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

const AnimatedImage = Animated.createAnimatedComponent(Image);

const DoubleTap = () => {
  console.log('DoubleTap');

  const scale = useSharedValue(0);
  const opacity = useSharedValue(1);
  const doubleTapRef = useRef();

  const onDoubleTap = () => {
    scale.value = withSpring(1, undefined, (isFinished) => {
      if (isFinished) {
        scale.value = withDelay(500, withSpring(0));
      }
    });
  };

  const onSingleTap = useCallback(() => {
    opacity.value = withTiming(0, undefined, (isFinished) => {
      if (isFinished) {
        opacity.value = withDelay(500, withTiming(1));
      }
    });
  }, []);

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: Math.max(scale.value, 0) }],
    };
  });

  const rTextStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  return (
    <View style={styles.container}>
      <TapGestureHandler waitFor={doubleTapRef} onActivated={onSingleTap}>
        <TapGestureHandler
          maxDelayMs={250}
          ref={doubleTapRef}
          numberOfTaps={2}
          onActivated={onDoubleTap}
        >
          <View>
            <ImageBackground
              style={styles.image}
              source={require('../../../assets/image.jpeg')}
            >
              <AnimatedImage
                style={[styles.heartImage, rStyle]}
                source={require('../../../assets/heart.png')}
              ></AnimatedImage>
            </ImageBackground>
          </View>
        </TapGestureHandler>
      </TapGestureHandler>

      <Animated.Text style={[styles.turtles, rTextStyle]}>
        🐢🐢🐢🐢
      </Animated.Text>
    </View>
  );
};

export default DoubleTap;

const { width: SIZE } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: SIZE,
    height: '90%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heartImage: {
    height: 250,
    width: 250,
  },
  turtles: {
    fontSize: 40,
    textAlign: 'center',
    marginTop: 0,
  },
});
