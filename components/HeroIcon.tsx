import { View, Text, StyleSheet, StyleProp, TextStyle, ViewStyle } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Icon, IconFamilyType, IconProps } from 'galio-framework'
import { Theme } from '../Utils';


interface HeroIconsProps extends IconProps {
    onPress?: () => void,
    text?: string,
    left?: boolean,
    right?: boolean,
    textStyle?: StyleProp<TextStyle>,
    containerStyle?: StyleProp<ViewStyle>
}

export default function HeroIcon(props: HeroIconsProps) {
    const { onPress, left, right, text, textStyle, containerStyle } = props;
    const textStyls = [
        styles.text,
        textStyle && textStyle
    ]
    const blockStyle = [
        styles.touchable,
        containerStyle && containerStyle

    ]
    return (
        <TouchableOpacity onPress={onPress && onPress} style={blockStyle}>
            {left && <Text style={textStyls}>{text}</Text>}
            <Icon  {...props} size={25} color={Theme.COLORS.BLACK} />
            {right && <Text style={textStyls}>{text}</Text>}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    touchable: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 4
    },
    text: {
        fontFamily: Theme.FONTFAMILY.MEDIUM,
        color: Theme.COLORS.BLACK
    }
})