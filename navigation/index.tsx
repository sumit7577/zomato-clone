import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from "../screens";
import { Icon } from "galio-framework";
import Dining from "../screens/dining";
import Grocery from "../screens/grocery";

const Tab = createBottomTabNavigator();

const Main = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator initialRouteName="Delivery" screenOptions={{
                headerShown: false
            }}>
                <Tab.Screen name="Delivery" component={HomeScreen} options={{
                    tabBarLabel: 'Delivery',
                    tabBarIcon: ({ color }) => (
                        <Icon name="delivery-dining" family="MaterialIcons" color={color} size={26} />
                    ),
                }} />
                <Tab.Screen name="Dining" component={Dining} options={{
                    tabBarLabel: 'Dining',
                    tabBarIcon: ({ color }) => (
                        <Icon name="dining" family="MaterialIcons" color={color} size={26} />
                    ),
                }} />
                <Tab.Screen name="Grocery" component={Grocery} options={{
                    tabBarLabel: 'Grocery',
                    tabBarIcon: ({ color }) => (
                        <Icon name="local-grocery-store" family="MaterialIcons" color={color} size={26} />
                    ),
                }} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}


export default Main;