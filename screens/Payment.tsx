import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import WebView from 'react-native-webview'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AppLoader } from '../components'
import { Block } from 'galio-framework'
import HeroIcon from '../components/HeroIcon'
import { DeliveryScreenProps } from '../navigation'
import { Theme } from '../Utils'

type PaymentScreenProps = DeliveryScreenProps<"Payment">;

export default function Payment(props: PaymentScreenProps) {
    const [loading, setLoading] = useState<boolean>(true);
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <AppLoader show={loading} />
                <View style={styles.header}>
                    <Block row space='between' middle style={{ paddingHorizontal: 5 }}>
                        <Block row middle gap={30}>
                            <HeroIcon name="arrow-back" family="Ionicons" onPress={() => {
                                props.navigation.goBack();
                            }} />
                            <Text style={styles.text}>Complete Payment</Text>
                        </Block>
                    </Block>
                </View>
                <View style={styles.body}>
                    <WebView
                        source={{
                            uri: "https://api.majoringlearn.com/checkout/1",
                            headers: {
                                Authorization: "Token 68deb78f3db4f3d8ec6e898c802360a1ce26685e"
                            }
                        }}
                        onLoad={() => {
                            setLoading(() => !loading)
                        }}
                    />
                </View>

            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        flex: 0.8,
        justifyContent: "center"
    },
    body: {
        flex: 9
    },
    text: {
        fontFamily: Theme.FONTFAMILY.MEDIUM,
        color: Theme.COLORS.BLACK,
        fontSize: 16
    }
})