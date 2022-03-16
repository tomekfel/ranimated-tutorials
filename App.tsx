import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useRef } from 'react';
import {
  Dimensions,
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
} from 'react-native';
import {
  GestureHandlerRootView,
  TapGestureHandler,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import DoubleTap from './src/components/DoubleTap';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <DoubleTap />
      <StatusBar style='dark' />
    </GestureHandlerRootView>
  );
}
