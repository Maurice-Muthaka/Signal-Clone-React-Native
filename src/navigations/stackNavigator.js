import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import LoginScreen from '../screens/Login';
import RegisterScreen from '../screens/Register';
import HomeScreen from '../screens/Home';
import AddChatScreen from '../screens/AddChat';
import ChatScreen from '../screens/Chat';

const Stack = createStackNavigator();
const globalScreenOptions = {
    headerStyle: {
        backgroundColor: '#2C6BED'
    },
    headerTitleStyle: {
        color: '#FFFFFF'
    },
    headerTintColor: '#FFFFFF',
}

const StackNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="Home" screenOptions={globalScreenOptions}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="AddChat" component={AddChatScreen} />
            <Stack.Screen name="Chat" component={ChatScreen} />
        </Stack.Navigator>
    )
}

export default StackNavigator;
