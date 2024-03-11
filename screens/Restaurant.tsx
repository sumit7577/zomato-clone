import { View, Text, StyleSheet, TouchableOpacity, Image, TouchableHighlight } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Constant, Images, Theme } from '../Utils'
import { Block, Button, Icon, IconFamilyType } from 'galio-framework'
import HeroIcon from '../components/HeroIcon'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import { useMutation, useQuery } from '@tanstack/react-query'
import { addCart, addCartType, getRecipes } from '../networking/controller'
import { RecipesType } from '../networking/types'
import { DeliveryScreenProps } from '../navigation'
import { AppBottomSheet, AppLoader, AppQuantity } from '../components'
import { BottomSheetFlatList, BottomSheetScrollView } from '@gorhom/bottom-sheet'

const filters: { name: string, family: IconFamilyType, icon: string }[] = [
    { name: "Filters", icon: "filter", family: "FontAwesome5" },
    { name: "Veg", icon: "", family: "" },
    { name: "Egg", icon: "egg", family: "FontAwesome5" },
    { name: "Non-Veg", icon: "", family: "" },
    { name: "Top rated", icon: "", family: "" },
    { name: "spicy", icon: "", family: "" },
    { name: "kid`s choice", icon: "", family: "" }
]


const Foods = ({ data, setSheet, setCart, setQuant }: {
    data: RecipesType['recipes'][0], setSheet: React.Dispatch<React.SetStateAction<number>>,
    setCart: React.Dispatch<React.SetStateAction<RecipesType['recipes'][0]>>,
    setQuant: React.Dispatch<React.SetStateAction<number>>
}) => {
    return (
        <Block row space='between' middle style={{ maxHeight: Constant.height / 3, borderBottomWidth: 1, borderColor: Theme.COLORS.MUTED, paddingVertical: "10%" }}>
            <Block style={{ flex: 5 }} gap={4}>
                <Text style={[styles.text, { fontSize: 18 }]}>{data.name}</Text>
                <Text style={styles.text}>₹ 150</Text>
                <Text style={[styles.text, { color: Theme.COLORS.BEHANCE }]}>On Buy 1 Get 1</Text>
            </Block>
            <Block style={{ flex: 5 }}>
                <Block style={{ overflow: "hidden", borderRadius: 8 }}>
                    <Image source={{ uri: data.image }} style={{ height: "100%", width: "100%", resizeMode: "cover" }} />
                </Block>
                <Block center style={{ position: "absolute", bottom: -30 }}>
                    <Button size="small" color={Theme.COLORS.BG} style={{ borderWidth: 1, borderColor: Theme.COLORS.ACTIVE }}
                        onPress={() => {
                            setSheet(() => 0)
                            setCart(() => data)
                            setQuant(() => 1)
                        }}>
                        <Text style={[styles.text, { color: Theme.COLORS.ACTIVE, fontSize: 20 }]}>ADD</Text>
                    </Button>
                </Block>


            </Block>

        </Block>
    )
}

type RestaurantProps = DeliveryScreenProps<"Restaurant">

const Restaurant = (props: RestaurantProps) => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['recipe'],
        queryFn: getRecipes
    })
    const [cart, setCart] = useState<RecipesType['recipes'][0] | null>(null);
    const [openSheet, setOpenSheet] = useState<number>(-1);
    const [quants, setQuants] = useState<number>(1);
    const [addCarts, setAddCart] = useState<addCartType | null>(null);

    const addToCartMutation = useMutation({
        mutationKey: ['cart'],
        mutationFn: (data: addCartType) => {
            return addCart(data)
        },
        onSuccess:(data)=>{
            //console.log("data",data)
        }
    })

    const addToCart = () => {
        const prevCarts = addCarts;
        if (cart !== null) {
            if (prevCarts !== null) {
                const item = { id: cart.id, quantity: quants }
                prevCarts.userId = 1;
                prevCarts.products.push(item)
                setAddCart(prevCarts)
                addCarts && addToCartMutation.mutate(addCarts)
                props.navigation.navigate("Cart");
            }
            else {
                setAddCart({ userId: 1, products: [{ id: cart.id, quantity: quants }] })
                addCarts && addToCartMutation.mutate(addCarts)
                props.navigation.navigate("Cart");
            }
            setOpenSheet(() => -1)
        }

    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <AppLoader show={addToCartMutation.isPending} />
            <View style={styles.container}>
                {openSheet !== -1 &&
                    <AppBottomSheet onChange={setOpenSheet}>
                        <View style={styles.sheetContainer}>
                            <View style={styles.sheetHeader}>
                                <Block row middle space='between'>
                                    <Block row middle flex={4} gap={10} style={{ maxWidth: "60%" }}>
                                        <Block style={{ borderRadius: 8, overflow: "hidden" }}>
                                            <Image source={{ uri: cart && cart.image || "" }} style={{ height: 50, width: 50, resizeMode: "cover" }} />
                                        </Block>
                                        <Text style={[styles.text, { fontSize: 18 }]}>{cart && cart.name}</Text>
                                    </Block>
                                    <Block row middle gap={10}>
                                        <HeroIcon name="hearto" family="AntDesign" containerStyle={{
                                            borderWidth: 1,
                                            borderRadius: 50,
                                            borderColor: Theme.COLORS.MUTED
                                        }} style={{ padding: 6, color: "red" }} />
                                        <HeroIcon name="share" family="FontAwesome5" containerStyle={{
                                            borderWidth: 1,
                                            borderRadius: 50,
                                            borderColor: Theme.COLORS.MUTED
                                        }} style={{ padding: 6, color: "red" }} />
                                    </Block>

                                </Block>
                            </View>
                            <View style={styles.sheetBody}>
                                <BottomSheetScrollView>
                                    <Text>i am middle part</Text>
                                </BottomSheetScrollView>

                            </View>
                            <View style={styles.sheetFooter}>
                                <Block row middle space='between'>
                                    <AppQuantity quants={quants} setQuant={setQuants} />
                                    <Button style={{ borderRadius: 10 }} onPress={addToCart}>
                                        <Text style={[styles.text, { color: Theme.COLORS.WHITE, padding: "4%" }]}>Add item - ₹{quants * 150}</Text>
                                    </Button>
                                </Block>
                            </View>
                        </View>
                    </AppBottomSheet>}
                <View style={styles.header}>
                    <Block row middle space='between'>
                        <Block>
                            <HeroIcon name="arrow-back" family="Ionicons" onPress={() => {
                                props.navigation.goBack();
                            }} />
                        </Block>
                        <Block row middle gap={14}>
                            <HeroIcon name="search1" family="AntDesign" />
                            <HeroIcon name="hearto" family="AntDesign" />
                            <HeroIcon name="share" family="Feather" />
                            <HeroIcon name="more-vertical" family="Feather" />
                        </Block>
                    </Block>
                </View>
                <View style={styles.body}>
                    <Block middle gap={8}>
                        <Text style={[styles.text, { fontSize: 26, textAlign: "center" }]}>The Royal Multicusion Restaurant</Text>
                        <Text style={[styles.text, { color: Theme.COLORS.MUTED }]}>Afghan {"\u2022"} Kebab {"\u2022"}  Chinese</Text>
                        <Block row middle gap={8}>
                            <Block row center gap={4} style={{ backgroundColor: Theme.COLORS.DARKGREEN, borderRadius: 4, padding: "1%" }}>
                                <Text style={[styles.text, { color: Theme.COLORS.WHITE, paddingRight: 0 }]}>3.5</Text>
                                <Icon name="star" family="MaterialIcons" color={Theme.COLORS.WHITE} />
                            </Block>
                            <Text style={[styles.text, { color: Theme.COLORS.MUTED }]}>45 ratings</Text>
                        </Block>
                    </Block>
                    <Block style={{ marginVertical: "8%" }}>
                        <ScrollView showsHorizontalScrollIndicator={false} horizontal>
                            <Block row middle gap={20}>
                                {filters.map((item, index) => (
                                    <HeroIcon name={item.icon} key={index} family={item.family} text={item.name} right
                                        textStyle={{ fontFamily: Theme.FONTFAMILY.BOLD }}
                                        containerStyle={styles.card} />
                                ))}

                            </Block>
                        </ScrollView>
                    </Block>
                    <FlatList
                        style={{ flex: 1 }}
                        showsVerticalScrollIndicator={false}
                        data={data && data.recipes}
                        renderItem={({ item, index, separators }) => (
                            <Foods data={item} key={item.id} setSheet={setOpenSheet} setCart={setCart} setQuant={setQuants} />
                        )}
                    />

                </View>

            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Theme.COLORS.WHITE,
        padding: "4%",
    },
    header: {
        flex: 1
    },
    body: {
        flex: 9,
    },
    text: {
        fontFamily: Theme.FONTFAMILY.BOLD,
        fontSize: 14,
        color: Theme.COLORS.BLACK
    },
    card: {
        borderWidth: 1,
        borderColor: Theme.COLORS.BORDER,
        borderRadius: 8,
        backgroundColor: Theme.COLORS.WHITE,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
        padding: 6,
        gap: 4
    },
    sheetContainer: {
        flex: 1,
        maxWidth: Constant.width,
        backgroundColor: Theme.COLORS.BG2
    },
    sheetHeader: {
        flex: 1,
        backgroundColor: Theme.COLORS.WHITE,
        elevation: 3,
        padding: "5%"
    },
    sheetBody: {
        flex: 7
    },
    sheetFooter: {
        flex: 2,
        backgroundColor: Theme.COLORS.WHITE,
        elevation: 4,
        padding: "4%",
    }
})

export default Restaurant