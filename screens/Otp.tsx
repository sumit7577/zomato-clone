import { View, Text, StyleSheet, TextInput, Alert } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Block, Icon, Input } from 'galio-framework'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Constant, Theme } from '../Utils'
import { LoginScreenProps } from '../navigation'
import AppStorge from '../Utils/storage'

type OtpProps = LoginScreenProps<"Otp">;

const OtpInput = ({ setOtp, index }: { setOtp: React.Dispatch<React.SetStateAction<string>>, index: number }) => {
    const inputRef = useRef<TextInput>(null)
    if (index)
        return (
            <Input style={{ width: Constant.width / 8 }}
                textInputStyle={{ fontFamily: Theme.FONTFAMILY.MEDIUM, fontSize: 14, padding: 0, textAlign: "center", color: Theme.COLORS.BLACK }}
                type="decimal-pad"
                maxLength={1}
                onChangeText={(text) => {
                    if (text === "") {
                        setOtp((prev) => {
                            return prev.slice(0, index) + prev.slice(prev.length)
                        })
                    }
                    else {
                        setOtp((prev) => prev + text)
                    }
                }}
                ref={inputRef} />
        )
}

const Otp = (props: OtpProps) => {
    const { confirm, phone, code } = props.route.params
    const [otp, setOtp] = useState<string>("");
    const confirmOtp = async () => {
        try {
            const isAutheticated = await confirm.confirm(otp);
            if (isAutheticated) {
                AppStorge.setMapAsync("user", isAutheticated)
            }
        }
        catch (error) {
            Alert.alert("Otp Error", `Otp Expired!`)
        }
    }
    useEffect(() => {
        if (otp.length === 6) {
            confirmOtp()
        }
    }, [otp])
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Block row space='between' style={{ alignItems: "center" }}>
                        <TouchableOpacity onPress={() => {
                            props.navigation.goBack()
                        }}>
                            <Icon name="arrow-back" family="Ionicons" size={25} color={Theme.COLORS.BLACK} />
                        </TouchableOpacity>

                        <Text style={styles.text}>OTP Verfication</Text>
                        <Text style={[styles.text, { fontSize: 14 }]}>Skip</Text>
                    </Block>
                </View>
                <View style={styles.body}>
                    <Block middle>
                        <Text style={[styles.text, { fontSize: 18, color: Theme.COLORS.MUTED, textAlign: "center" }]}>We have sent a verification code to
                            <Text style={[styles.text, { fontFamily: Theme.FONTFAMILY.BOLD, fontSize: 16 }]}> {code}-{phone}</Text></Text>
                    </Block>

                    <Block row middle space='between' style={{ marginTop: "4%" }}>
                        {Array.from({ length: 7 }, (i, v) => i).map((item, index) => (
                            <OtpInput key={index} setOtp={setOtp} index={index} />
                        ))}

                    </Block>

                    <Block middle style={{ marginTop: "8%" }}>
                        <Text style={[styles.text, { fontSize: 14 }]}>Didn`t get the OTP? Resend SMS</Text>
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
        padding: "4%",
        backgroundColor: Theme.COLORS.WHITE
    },
    header: {
        flex: 1,
    },
    body: {
        flex: 6
    },
    footer: {
        flex: 3
    },
    text: {
        fontFamily: Theme.FONTFAMILY.MEDIUM,
        color: Theme.COLORS.BLACK,
        fontSize: 18
    }
})

export default Otp