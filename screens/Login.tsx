import { View, Text, StyleSheet, Image } from 'react-native'
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
import auth from "@react-native-firebase/auth"
import { GoogleSignin, User } from '@react-native-google-signin/google-signin'
import { LoginScreenProps } from '../navigation'


type LoginProps = LoginScreenProps<"Login"> & {
    userLogin: (data: typeof initialState.userData) => void,
} & typeof initialState


const Login = (props: LoginProps) => {
    const [showPhone, setShowPhone] = useState<boolean>(false);
    const [code, setCode] = useState<{ flag: string, code: string }>({ flag: "🇮🇳", code: "+91" })
    const [phone, setPhone] = useState<string | null>(null);
    const loginUser = (data: User) => {
        AppStorge.setMapAsync("user", data)
    }
    async function signInWithPhoneNumber() {
        try {
            const confirmation = await auth().signInWithPhoneNumber(`${code.code}${phone}`);
            if (confirmation) {
                props.navigation.navigate("Otp", {
                    confirm: confirmation,
                    phone: phone,
                    code: code.code
                });
            }
        }
        catch (erro) {
            console.log(erro)
        }
    }

    const googleSignIn = async () => {
        try {
            const code = await GoogleSignin.hasPlayServices();
            if (code) {
                const userInfo = await GoogleSignin.signIn();
                loginUser(userInfo)
            }
        }
        catch (error) {
            console.log(error)
        }
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
                    <Block style={{ borderBottomEndRadius: 35, borderBottomStartRadius: 35, overflow: "hidden" }}>
                        <Image source={{ uri: "https://cdn.dummyjson.com/recipe-images/1.webp" }}
                            style={{ width: Constant.width, height: Constant.height / 5 }} />
                    </Block>

                </View>
                <View style={styles.body}>
                    <Block middle gap={8}>
                        <Text style={[styles.text, { color: Theme.COLORS.BLACK, fontSize: 25, textAlign: "center" }]}>
                            India`s #1 Food Delivery and Dining App</Text>
                        <Text style={[styles.text]}>Log in or sign up</Text>
                    </Block>

                    <Block row middle gap={8} style={{ marginTop: "4%" }}>
                        <TouchableOpacity
                            style={{ backgroundColor: Theme.COLORS.WHITE, elevation: 4, borderRadius: 6 }}
                            onPress={() => {
                                setShowPhone(() => !showPhone)
                            }}>
                            <Block row middle gap={2} style={{ padding: 16, borderWidth: 1, borderRadius: 6, borderColor: Theme.COLORS.MUTED }}>
                                <Text style={styles.text}>{code.flag}</Text>
                                <Icon name="down" family="AntDesign" />
                            </Block>
                        </TouchableOpacity>
                        <Block row gap={2} style={{ backgroundColor: Theme.COLORS.WHITE, borderWidth: 1, borderColor: Theme.COLORS.MUTED, borderRadius: 8, alignItems: "center", elevation: 4 }}>
                            <Text style={[styles.text, { color: Theme.COLORS.BLACK, fontSize: 16, paddingLeft: "4%" }]}>{code.code}</Text>
                            <Input
                                onChangeText={(data) => {
                                    setPhone(() => data);

                                }}
                                style={{ width: Constant.width / 1.8, borderWidth: 0 }}
                                placeholder='Enter Mobile Number'
                                type="decimal-pad" maxLength={10}
                                textInputStyle={{ fontFamily: Theme.FONTFAMILY.MEDIUM, fontSize: 16, color: Theme.COLORS.BLACK }} />
                        </Block>

                    </Block>

                    <Block middle style={{ marginTop: "4%" }}>
                        <Button size={"large"} style={{ height: 55, borderRadius: 8 }}
                            onPress={signInWithPhoneNumber}>
                            <Text style={[styles.text, { color: Theme.COLORS.WHITE }]}>Continue</Text>
                        </Button>
                    </Block>


                </View>
                <View style={styles.footer}>
                    <Block center style={{ marginBottom: "4%" }}>
                        <Text style={styles.text}>Or</Text>
                    </Block>

                    <Block row middle gap={70}>
                        <TouchableOpacity style={styles.login} onPress={googleSignIn}>
                            <Icon name="google" family="AntDesign" size={30} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.login}>
                            <Icon name="email" family="Fontisto" size={30} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.login}>
                            <Icon name="more-horizontal" family="Feather" size={30} />
                        </TouchableOpacity>
                    </Block>

                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Theme.COLORS.WHITE
    },
    text: {
        fontSize: 20,
        fontFamily: Theme.FONTFAMILY.BOLD
    },
    header: {
        flex: 1

    },
    body: {
        flex: 1,

    },
    footer: {
        flex: 1,
        marginTop: "4%"
    },
    login: {
        borderWidth: 1, alignItems: "center",
        borderRadius: 8,
        padding: 10,
        backgroundColor: Theme.COLORS.WHITE,
        borderColor: Theme.COLORS.MUTED
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