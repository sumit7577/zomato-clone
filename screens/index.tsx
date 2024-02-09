import { useState } from "react"
import { SafeAreaView, StyleSheet, View, Text, Dimensions, Button, Image } from "react-native"
import { Constant, Images,Theme } from "../Utils";
import { Block, Icon,Input } from "galio-framework";

const Main = () => {
    const [counter, setCounter] = useState(0);
    return (
        <SafeAreaView>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Block row space="between">
                        <Block row>
                            <Block>
                                <Icon name="location" family="EvilIcons" color="red" size={40} />
                            </Block>
                            <Block>
                                <Text style={[styles.text, { fontWeight: "bold" }]}>My Place</Text>
                                <Text style={[styles.text, { fontSize: 10 }]}>Kings Cafe Restaurant, Near Tiger FItness Gym</Text>
                            </Block>
                        </Block>

                        <Block row center style={{ gap: 8 }}>
                            <Block shadow>
                                <Icon name="language" family="Entypo" color="black" size={25} />
                            </Block>
                            <Block style={{ height: 45, width: 45, borderRadius: 45 / 2, borderWidth: 1, borderColor: "red", overflow: "hidden" }}>
                                <Image source={Images.user.profile} style={styles.image} />
                            </Block>
                        </Block>
                    </Block>

                    <Input
                        placeholder='Search "Pizza"'
                        right
                        icon="microphone"
                        family="Foundation"
                        iconSize={20}
                        iconColor="red"
                    />
                </View>

                <View style={styles.body}>

                </View>
                <View style={styles.footer}>

                </View>
            </View>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        display: "flex",
        height: Constant.height,
        paddingHorizontal: "5%",
        paddingVertical: "5%"
    },
    text: {
        color: "black",
        fontSize: 15,
        fontFamily:Theme.FONTFAMILY.BOLD
    },
    header: {

    },
    body: {

    },
    footer: {

    },
    image: {
        height: 50,
        width: 50,
        resizeMode: "contain"
    }
})

export default Main;