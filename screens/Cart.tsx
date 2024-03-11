import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Theme } from '../Utils'
import { DeliveryScreenProps } from '../navigation'
import { Block, Button, Icon } from 'galio-framework'
import HeroIcon from '../components/HeroIcon'
import { FlatList } from 'react-native-gesture-handler'
import { useQuery } from '@tanstack/react-query'
import { getCart, getRecipes } from '../networking/controller'
import { AppQuantity, RestaurantCard } from '../components'
import { CartsType } from '../networking/types'
import { TouchableOpacity } from '@gorhom/bottom-sheet'

type CartScreenProps = DeliveryScreenProps<"Cart">

const CartItems = ({ data }: { data: CartsType["carts"][0]["products"][0] }) => {
    const [quants, setQuants] = React.useState<number>(data.quantity);
    return (
        <Block row space="between" style={{ elevation: 2, borderRadius: 8, backgroundColor: Theme.COLORS.WHITE, padding: "4%", marginBottom: "4%" }}>
            <Block gap={4} style={{ maxWidth: "50%" }}>
                <Text style={styles.text}>{data.title}</Text>
                <Text style={styles.text}>₹{data.price}</Text>
            </Block>
            <Block gap={8}>
                <AppQuantity quants={quants} setQuant={setQuants} />
                <Text style={styles.text}>₹{quants * data.price}</Text>

            </Block>
        </Block>
    )
}

const Cart = (props: CartScreenProps) => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['carts'],
        queryFn: () => { return getCart(1) }
    })
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Block row space='between' middle>
                        <Block row middle gap={10}>
                            <HeroIcon name="arrow-back" family="Ionicons" onPress={() => {
                                props.navigation.goBack();
                            }} />
                            <Text style={styles.text}>La Pino`z Pizza</Text>
                        </Block>
                        <HeroIcon name="share" family="Feather" />
                    </Block>
                </View>
                <View style={styles.body}>
                    <FlatList
                        style={{ flex: 1 }}
                        showsVerticalScrollIndicator={false}
                        data={data && data.carts[0].products}
                        renderItem={({ item, index, separators }) => (
                            <CartItems data={item} />
                        )}
                    />

                </View>
                <View style={styles.footer}>
                    <Block row space='between' flex={1}>
                        <Block middle>
                            <Text> pay</Text>
                        </Block>
                        <Block middle>
                            <TouchableOpacity
                                onPress={() => {
                                    props.navigation.navigate("Payment")
                                }}
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    gap: 30,
                                    paddingHorizontal: "6%",
                                    paddingVertical: "2%",
                                    backgroundColor: Theme.COLORS.YOUTUBE,
                                    borderRadius: 10
                                }}>
                                <Block>
                                    <Text style={[styles.text, { color: Theme.COLORS.WHITE }]}>₹ {data?.carts[0].total}</Text>
                                    <Text style={[styles.text, { color: Theme.COLORS.WHITE }]}>Total</Text>
                                </Block>
                                <Block row middle>
                                    <Text style={[styles.text, { color: Theme.COLORS.WHITE, fontSize: 20 }]}>Place Order</Text>
                                    <Icon name="caretright" family="AntDesign" color={Theme.COLORS.WHITE} />
                                </Block>

                            </TouchableOpacity>
                        </Block>
                    </Block>
                </View>

            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Theme.COLORS.BG2,
    },
    header: {
        flex: 0.5,
        backgroundColor: Theme.COLORS.WHITE,
        elevation: 2,
        padding: "4%"
    },
    body: {
        flex: 9,
        padding: "3%"
    },
    footer: {
        flex: 1.2,
        backgroundColor: Theme.COLORS.WHITE,
        elevation: 4,
    },
    text: {
        fontFamily: Theme.FONTFAMILY.MEDIUM,
        color: Theme.COLORS.BLACK,
        fontSize: 16
    },
    text2: {
        fontFamily: Theme.FONTFAMILY.BOLD,
        color: Theme.COLORS.BLACK,
        fontSize: 16
    }
})

export default Cart