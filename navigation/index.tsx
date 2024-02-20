import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator, BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { Icon } from "galio-framework";
import Dining from "../screens/dining";
import Grocery from "../screens/grocery";
import Delivery from "../screens/Delivery";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Login";

const Tab = createBottomTabNavigator();

const BottomNavigator = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator initialRouteName="Delivery" screenOptions={{
                headerShown: false
            }}>
                <Tab.Screen name="Delivery" component={Delivery} options={{
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


const Stack = createNativeStackNavigator();

const StackNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login" screenOptions={{
                headerShown: true
            }}>
                <Stack.Screen name="Login" component={Login} />
            </Stack.Navigator>
        </NavigationContainer>
    )

}


export { BottomNavigator, StackNavigator }