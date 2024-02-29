import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Block } from 'galio-framework'
import HeroIcon from './HeroIcon'
import { Theme } from '../Utils'

interface QuantityProps {
    quants: number,
    setQuant: React.Dispatch<React.SetStateAction<number>>
}

const Quantity = (props: QuantityProps) => {
    const { quants, setQuant } = props;
    return (
        <Block row middle gap={14} style={styles.container}>
            <HeroIcon name="minus" family="AntDesign" style={{ color: Theme.COLORS.ACTIVE }}
                onClick={() => {
                    quants > 1 && setQuant((prev) => quants - 1)
                }} />
            <Text style={styles.text}>{quants}</Text>
            <HeroIcon name="plus" family="Entypo" size={5} style={{ color: Theme.COLORS.ACTIVE }} onClick={() => {
                setQuant(quants + 1)
            }} />
        </Block>
    )
}

const styles = StyleSheet.create({
    text: {
        fontFamily: Theme.FONTFAMILY.BOLD,
        color: Theme.COLORS.BLACK,
        fontSize: 18
    },
    container: {
        borderWidth: 1,
        borderColor: Theme.COLORS.ACTIVE,
        borderRadius: 10,
        padding: "3%",
        backgroundColor: Theme.COLORS.BG
    }
})

export default Quantity