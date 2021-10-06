import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView } from 'react-native'
import { View, Text, StyleSheet, StatusBar } from 'react-native'
import { Image, Input, Button } from 'react-native-elements'
import firebase from '../firebase'

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {

        const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            navigation.replace("Home");
          } 
        });
        
        return unsubscribe;
    }, [])

    const signIn = () => {
      firebase.auth().signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error));
    }

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <StatusBar style="light" />
            <Image
                source={{ uri: 'https://products.containerize.com/live-chat/signalapp/menu_image.png'}}
                style={styles.logo}
            />
            <View>
                <Input
                containerStyle={styles.inputContainer}
                placeholder="Email"
                autoFocus
                keyboardType="email-address"
                value={email}
                onChangeText={(text) => setEmail(text)}
                />
                <Input
                containerStyle={styles.inputContainer}
                placeholder="Password"
                secureTextEntry
                keyboardType="default"
                value={password}
                onChangeText={(text) => setPassword(text)}
                onSubmitEditing={signIn}
                />
            </View>

            <Button containerStyle={styles.button} onPress={signIn} title="Login" />
            <Button containerStyle={styles.button} type="outline" onPress={() => navigation.navigate('Register')} title="Register" />
        </KeyboardAvoidingView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 10,
      backgroundColor: '#ffffff',
    },
    logo: {
      width: 200,
      height: 200,
    },
    inputContainer: {
      width: 300,
    },
    button: {
      width: 300,
    },
  });
