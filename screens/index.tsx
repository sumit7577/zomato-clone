import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { StackNavigator, BottomNavigator } from '../navigation'
import { AppBottomSheet } from '../components'
import { Constant } from '../Utils'
import { connect } from 'react-redux'
import { initialState, userState } from '../store/user/reducer'
import AppStorge from '../Utils/storage'
import { useMMKVStorage } from 'react-native-mmkv-storage'
import { UserAction } from '../store/user/action'


type MainProps = {
    userLogin: (data: typeof initialState.userData) => void,
} & typeof initialState

const Main = (props: MainProps) => {
    const { userData, isLoggedIn,userLogin } = props;
    const database = useMMKVStorage("user", AppStorge);
    console.log(database)
    if (database[0]) {
        return <BottomNavigator />
    }
    return <StackNavigator />
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        userLogin: (data: any) => dispatch({ type: UserAction.LOGIN, data: data })
    }
}

export default connect(userState, mapDispatchToProps)(Main);