import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { Block, Icon } from 'galio-framework'
import { Constant, Images, Theme } from '../Utils'
import Card from './card'

export default function RestaurantCard() {
    return (
        <View style={styles.container}>
            <Block shadow style={styles.card}>
                <Image source={Images.user.profile} style={{ height: Constant.height / 3, width: Constant.width / 1.1, resizeMode: "cover" }} />
                <Block row style={{ padding: "2%" }}>
                    <Block gap={4} flex={10}>
                        <Text style={[styles.text, { color: Theme.COLORS.BLACK, fontSize: 22 }]}>Khandelwal Dhaba</Text>
                        <Text style={[styles.text]}>South Indian <Text style={{ textDecorationStyle: "dotted" }}>{"\u2022 Chinese"}</Text> <Text>{"\u2022 ₹150 for one"}</Text></Text>
                        <Text style={styles.text}>15-20 min <Text>{"\u2022 3.5 km"}<Text>{"\u2022 Free Delivery"}</Text></Text></Text>
                    </Block>

                    <Block row center gap={4} style={{ backgroundColor: Theme.COLORS.DARKGREEN, borderRadius: 4, padding: "2%" }}>
                        <Text style={[styles.text, { color: Theme.COLORS.WHITE, paddingRight: 0 }]}>4.0</Text>
                        <Icon name="star" family="MaterialIcons" color={Theme.COLORS.WHITE} />
                    </Block>
                </Block>
            </Block>

        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        marginTop: "5%",
    },
    card: {
        borderWidth: 1,
        borderColor: Theme.COLORS.BORDER,
        borderRadius: 20,
        backgroundColor: Theme.COLORS.WHITE,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 4,
    },
    text: {
        fontFamily: Theme.FONTFAMILY.BOLD,
        fontSize: 13,
        paddingRight: "20%",
        color: Theme.COLORS.MUTED
    }
})