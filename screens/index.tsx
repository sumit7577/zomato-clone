import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import Navigator from '../navigation'
import { AppBottomSheet } from '../components'

export default function Main() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Navigator />
        </GestureHandlerRootView>

    )
}