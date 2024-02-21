import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { Constant, Theme } from '../Utils'
import { Block, Button, Icon, Input } from 'galio-framework'
import { connect } from 'react-redux'
import { initialState, userState } from '../store/user/reducer'
import { UserAction, userLogin } from '../store/user/action'
import AppStorge from '../Utils/storage'
import { SafeAreaView } from 'react-native-safe-area-context'
import { CountryItem, CountryPicker } from 'react-native-country-codes-picker'
import { TouchableOpacity } from 'react-native-gesture-handler'

type LoginProps = {
    userLogin: (data: typeof initialState.userData) => void,
} & typeof initialState

const Login = (props: LoginProps) => {
    const [showPhone, setShowPhone] = useState<boolean>(false);
    const [code, setCode] = useState<{ flag: string, code: string }>({ flag: "🇮🇳", code: "+91" })
    const loginUser = () => {
        AppStorge.setMapAsync("user", { username: "sumit", phone: "919117517898" })
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <CountryPicker
                    show={showPhone} pickerButtonOnPress={(item) => {
                        setCode({ flag: item.flag, code: item.dial_code })
                        setShowPhone(() => !showPhone)
                    }}
                    lang="en" style={{
                        modal: {
                            height: Constant.height / 1.8
                        },
                        textInput: {
                            fontFamily: Theme.FONTFAMILY.MEDIUM
                        },
                        flag: {
                            fontFamily: Theme.FONTFAMILY.MEDIUM,
                            fontSize: 22
                        },
                        dialCode: {
                            fontFamily: Theme.FONTFAMILY.BOLD
                        },
                        countryName: {
                            fontFamily: Theme.FONTFAMILY.BOLD
                        }
                    }}                  // when picker button press you will get the country object with dial code
                />
                <View style={styles.header}>

                </View>
                <View style={styles.body}>
                    <Block middle gap={8}>
                        <Text style={[styles.text, { color: Theme.COLORS.BLACK, fontSize: 25, textAlign: "center" }]}>
                            India`s #1 Food Delivery and Dining App</Text>
                        <Text style={[styles.text]}>Log in or sign up</Text>
                    </Block>

                    <Block>
                        <TouchableOpacity>
                            <Block row middle gap={2}>
                                <Text>{code.flag}</Text>
                                <Icon name="down" family="AntDesign" />
                            </Block>
                        </TouchableOpacity>
                        <Input />
                    </Block>


                </View>
                <View style={styles.footer}>

                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    text: {
        fontSize: 20,
        fontFamily: Theme.FONTFAMILY.BOLD
    },
    header: {
        flex: 1,

    },
    body: {
        flex: 1,

    },
    footer: {
        flex: 1,
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