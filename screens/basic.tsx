import { StyleSheet, Text, View } from "react-native";
import { useState } from "react";

function Basic(props:any) {


    return (
        <Text>{props.user}</Text>
    )

}



const Basics = () => {

    const [name, setName] = useState(1)

    setTimeout(() => {
        setName(() => 10)
    }, 2000)


    return (
        <Text style={styles.text}>{name}</Text>
    )
}


const styles = StyleSheet.create({
    text: {
        color: "red",
        fontSize: 20
    }
})

export { Basic, Basics };