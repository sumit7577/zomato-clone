import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { Theme } from '../Utils'
import { Button } from 'galio-framework'
import { connect } from 'react-redux'
import { initialState, userState } from '../store/user/reducer'
import { UserAction, userLogin } from '../store/user/action'
import AppStorge from '../Utils/storage'

type LoginProps = {
    userLogin: (data: typeof initialState.userData) => void,
} & typeof initialState

const Login = (props: LoginProps) => {
    const loginUser = () => {
        AppStorge.setMapAsync("user", { username: "sumit", phone: "919117517898" })
    }
    return (
        <View style={styles.container}>
            <Text style={styles.text}>I am Login Screen</Text>
            <Button title='Login' onPress={loginUser} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        fontSize: 20,
        fontFamily: Theme.FONTFAMILY.BOLD
    }
})

const mapStateToProps = (state: { userReducer: typeof initialState }) => {
    return state;
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        userLogin: (data: any) => dispatch({ type: UserAction.LOGIN, data: data })
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Login);