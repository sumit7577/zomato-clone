import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import VoiceTest from '../components/VoiceApi'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withDecay, withRepeat, withSpring, withTiming } from 'react-native-reanimated'
import { Block } from 'galio-framework'
import { Constant, Theme } from '../Utils'

export default function Dining() {
  const height = useSharedValue(100)


  const pan = Gesture.Pan().onChange((e) => {
    height.value -= e.changeY;
  }).onFinalize((e) => {
    height.value = withSpring(height.value+20)
  })

  const blockStyle = useAnimatedStyle(() => ({
    height: height.value
  }))
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <GestureDetector gesture={pan}>
        <View style={styles.container}>
          <View>
            <Block>
              <Text> i am back screen</Text>
            </Block>
          </View>
          <Animated.View style={[blockStyle, styles.sheet]}>
            <Text>i am bottom sheet</Text>
          </Animated.View>
        </View>
      </GestureDetector>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  square: {
    borderRadius: 8,
    backgroundColor: Theme.COLORS.WHITE,
    height: 80,
    width: 80,
    elevation: 4
  },
  sheet: {
    position: "absolute",
    bottom: 0,
    zIndex: 2,
    backgroundColor: Theme.COLORS.WHITE,
    flex: 1,
    width: "100%",
    alignItems: "center",
    elevation: 4,
    padding: "4%",
    borderRadius: 8
  },
  container: {
    flex: 1,
    backgroundColor: Theme.COLORS.BG,
  }
})