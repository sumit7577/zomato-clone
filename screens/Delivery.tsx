import { useEffect, useRef, useState } from "react"
import { SafeAreaView, StyleSheet, View, Text, Dimensions, Button, Image, ScrollView, TouchableOpacity, FlatList, Platform, TouchableHighlight } from "react-native"
import { Constant, Images, Theme } from "../Utils";
import { Block, Icon, Input } from "galio-framework";
import { AppCard, RestaurantCard, AppBottomSheet } from "../components";
import Card from "../components/card";
import { getRecipes } from "../networking/controller";
import { useQuery } from "@tanstack/react-query";
import { useMMKVStorage } from "react-native-mmkv-storage";
import AppStorge from "../Utils/storage";
import { initialState } from "../store/user/reducer";
import { User } from "@react-native-google-signin/google-signin";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { DeliveryScreenProps } from "../navigation";

const filters = ["Nearest", "Previously Ordered", "Pure Veg", "Cusines", "Rating 4.0+"]

type DeliveryProps = DeliveryScreenProps<"DeliveryStack">;

const Delivery = (props: DeliveryProps) => {
    const userData = useMMKVStorage<undefined | User | FirebaseAuthTypes.UserCredential>("user", AppStorge);
    const [selected, setSelected] = useState<"Recommended" | "Favourites">("Recommended");
    const { data, isLoading, isError } = useQuery({
        queryKey: ['recipe'],
        queryFn: getRecipes
    })

    if (isLoading) {
        return (
            <SafeAreaView style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Text style={styles.text}>is Loading...</Text>
            </SafeAreaView>
        )
    }
    return (
        <SafeAreaView>
            <View style={styles.container}>
                <View style={styles.header}>

                    <Block row space="between">
                        <TouchableOpacity onPress={() => {
                            console.log("clicked")
                        }}>
                            <Block row>
                                <Block>
                                    <Icon name="location" family="EvilIcons" color="red" size={40} />
                                </Block>
                                <Block style={{ maxWidth: "80%" }}>
                                    <Block row style={{ alignItems: "center" }} gap={2}>
                                        <Text style={[styles.text]}>{userData[0]?.user.email || userData[0]?.user?.phoneNumber}</Text>
                                        <Icon name="down" family="AntDesign" size={12} />
                                    </Block>

                                    <Text style={[styles.text, { fontSize: 10 }]}>Kings Cafe Restaurant, Near Tiger FItness Gym</Text>
                                </Block>
                            </Block>
                        </TouchableOpacity>

                        <Block row center style={{ gap: 8 }}>
                            <Block shadow>
                                <Icon name="language" family="Entypo" color="black" size={25} />
                            </Block>
                            <Block style={{ height: 45, width: 45, borderRadius: 45 / 2, borderWidth: 1, borderColor: "red", overflow: "hidden" }}>
                                <Image source={{ uri: userData[0]?.user.photo }} style={styles.image} />
                            </Block>
                        </Block>
                    </Block>

                    <Input
                        placeholder='Search "Pizza"'
                        right
                        icon="search"
                        family="Feather"
                        iconSize={20}
                        iconColor="red"
                    />
                    <ScrollView horizontal style={{ flex: 0 }} showsHorizontalScrollIndicator={false}>
                        <Block gap={8} row>
                            {filters.map((item, index) => {
                                return (
                                    <AppCard text={item} key={index} />
                                )
                            }
                            )}
                        </Block>
                    </ScrollView>

                </View>

                <View style={styles.body}>

                    <Block row center style={{ borderWidth: 1.5, borderRadius: 8, borderColor: Theme.COLORS.MUTED, width: Constant.width / 1.3 }}>
                        <TouchableOpacity style={[styles.touchable, { backgroundColor: selected === "Recommended" ? Theme.COLORS.PRICE_COLOR : Theme.COLORS.WHITE }]} onPress={() => {
                            setSelected(() => "Recommended")
                        }}>
                            <Block middle >
                                <Text style={[styles.text, { fontFamily: Theme.FONTFAMILY.MEDIUM }]}>Recommended</Text>
                            </Block>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.touchable, { backgroundColor: selected === "Favourites" ? Theme.COLORS.PRICE_COLOR : Theme.COLORS.WHITE }]} onPress={() => {
                            setSelected(() => "Favourites")
                        }}>
                            <Block row gap={8}>
                                <Icon name={selected === "Favourites" ? "heart" : "hearto"} family="AntDesign" color={Theme.COLORS.PINTEREST} size={20} />
                                <Text style={[styles.text, { fontFamily: Theme.FONTFAMILY.MEDIUM }]}>Favourites</Text>
                            </Block>
                        </TouchableOpacity>

                    </Block>

                    <View style={{ marginTop: "5%" }}>
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            data={data && data.recipes}
                            renderItem={({ item, index, separators }) => (
                                <TouchableHighlight
                                    onPress={(e) => {
                                        props.navigation.navigate("Restaurant")
                                    }}
                                    key={item.id}
                                    onShowUnderlay={separators.highlight}
                                    onHideUnderlay={separators.unhighlight}>
                                    <RestaurantCard data={item} />
                                </TouchableHighlight>
                            )}
                        />
                    </View>

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
        paddingVertical: "5%",
        backgroundColor: Theme.COLORS.WHITE
    },
    text: {
        color: Theme.COLORS.BLACK,
        fontSize: 15,
        fontFamily: Theme.FONTFAMILY.BOLD
    },
    header: {
    },
    body: {
        marginTop: "8%",
    },
    footer: {
    },
    image: {
        height: 50,
        width: 50,
        resizeMode: "contain"
    },
    touchable: {
        padding: "3%",
        display: "flex",
        flex: 1,
        borderRadius: 8
    }
})

export default Delivery;