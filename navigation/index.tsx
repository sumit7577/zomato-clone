import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator, BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { Icon } from "galio-framework";
import Dining from "../screens/dining";
import Grocery from "../screens/grocery";
import Delivery from "../screens/Delivery";
import { NativeStackScreenProps, createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Login";
import Otp from "../screens/Otp";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import Restaurant from "../screens/Restaurant";
import Cart from "../screens/Cart";
import Payment from "../screens/Payment";


type DeliveryStackParamList = {
    DeliveryStack: undefined,
    Restaurant: undefined,
    Cart: undefined,
    Payment:undefined
};

const Delievery = createNativeStackNavigator<DeliveryStackParamList>()
export type DeliveryScreenProps<T extends keyof DeliveryStackParamList> = NativeStackScreenProps<DeliveryStackParamList, T>;

const DeliveryNavigator = () => {
    return (
        <NavigationContainer independent={true}>
            <Delievery.Navigator initialRouteName="DeliveryStack" screenOptions={{
                headerShown: false
            }}>
                <Delievery.Screen name="DeliveryStack" component={Delivery} />
                <Delievery.Screen name="Restaurant" component={Restaurant} />
                <Delievery.Screen name="Cart" component={Cart} />
                <Delievery.Screen name="Payment" component={Payment} />
            </Delievery.Navigator>
        </NavigationContainer>

    )
}


const Tab = createBottomTabNavigator();

const BottomNavigator = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator initialRouteName="Delivery" screenOptions={{
                headerShown: false
            }}>
                <Tab.Screen name="Delivery" component={DeliveryNavigator} options={{
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

type RootStackParamList = {
    Login: undefined;
    Otp: { confirm: FirebaseAuthTypes.ConfirmationResult, phone: string | null, code: string }
};


const Stack = createNativeStackNavigator<RootStackParamList>();
export type LoginScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<RootStackParamList, T>;

const StackNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login" screenOptions={{
                headerShown: false
            }}>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Otp" component={Otp} />
            </Stack.Navigator>
        </NavigationContainer>
    )

}


export { BottomNavigator, StackNavigator }