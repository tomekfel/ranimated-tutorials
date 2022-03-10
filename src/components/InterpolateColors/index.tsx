import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';
import React, { useState } from 'react';
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';

const Colors = {
  dark: {
    background: '#1E1E1E',
    circle: '#252525',
    text: '#F8F8F8',
  },
  light: {
    background: '#F8F8F8',
    circle: '#FFF',
    text: '#1E1E1E',
  },
};

const SWITCH_TRACK_COLOR = {
  true: 'rgba(256,0,256,0.2)',
  false: 'rgba(0,0,0,0.1)',
};

type Theme = 'light' | 'dark';

const InterpolateColors = () => {
  const [theme, setTheme] = useState<Theme>('light');

  const progress = useDerivedValue(() => {
    return theme === 'light' ? withTiming(0) : withTiming(1);
  }, [theme]);

  const rTextStyle = useAnimatedStyle(() => {
    const color = interpolateColor(
      progress.value,
      [0, 1],
      [Colors.light.text, Colors.dark.text]
    );

    return {
      color,
    };
  }, []);

  const rCircleStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [Colors.light.circle, Colors.dark.circle]
    );

    return {
      backgroundColor,
    };
  }, []);

  const rContainerStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [Colors.light.background, Colors.dark.background]
    );

    return {
      backgroundColor,
    };
  }, []);

  return (
    <Animated.View style={[styles.container, rContainerStyle]}>
      <Animated.Text style={[styles.text, rTextStyle]}>Theme</Animated.Text>
      <Animated.View style={[styles.circle, rCircleStyle]}>
        <Switch
          trackColor={{
            false: SWITCH_TRACK_COLOR.false,
            true: SWITCH_TRACK_COLOR.true,
          }}
          thumbColor={'violet'}
          onValueChange={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          value={theme === 'dark'}
        />
      </Animated.View>
    </Animated.View>
  );
};

export default InterpolateColors;

const SIZE = Dimensions.get('window').width * 0.7;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  text: {
    fontSize: 70,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 14,
  },
  circle: {
    height: SIZE,
    width: SIZE,
    borderRadius: SIZE / 2,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
  },
});
