import { Block, Icon, IconFamilyType } from "galio-framework"
import { StyleSheet, Text } from "react-native"
import { Theme } from "../Utils";

interface CardProps {
    text: string,
    icon?: string,
    fontFamily?: IconFamilyType
}


const Card = (props: CardProps) => {
    const { text, icon, fontFamily } = props;
    return (
        <Block style={styles.block} middle>
            {icon && <Icon name={icon} family={fontFamily} />}
            <Text style={styles.text}>{text}</Text>
        </Block >
    )
}

const styles = StyleSheet.create({
    text: {
        fontFamily: Theme.FONTFAMILY.BOLD,
        color: Theme.COLORS.BLACK,
        fontSize: 12
    },
    block: {
        borderWidth: 1,
        borderColor: Theme.COLORS.BORDER,
        borderRadius: 4,
        padding: "2%",
        backgroundColor: Theme.COLORS.WHITE,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        textAlign:"center",
        elevation: 2,
    }
})
export default Card