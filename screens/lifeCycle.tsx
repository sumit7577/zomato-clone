import React, { useEffect, useState } from "react"
import { Text } from "react-native"

const LifeCycle = () => {
    const [changed, setChanged] = useState<number>(1);

    useEffect(() => {
    }, [])

    return (
        <Text>I am just for demo {changed}</Text>
    )
}

class Lifecycle extends React.Component {
    componentDidMount(): void {

    }
    componentDidUpdate(prevProps: Readonly<{}>, prevState: Readonly<{}>, snapshot?: any): void {


    }
    componentWillUnmount(): void {

    }
    render(): React.ReactNode {
        return (
            <Text>i am Class Componenet</Text>
        )
    }
}

export default LifeCycle