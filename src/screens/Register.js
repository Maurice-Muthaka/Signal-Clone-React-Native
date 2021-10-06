import React, { useLayoutEffect, useState } from 'react'
import { KeyboardAvoidingView } from 'react-native'
import { View, StyleSheet, StatusBar } from 'react-native'
import { Image, Text, Input, Button } from 'react-native-elements'
import firebase from '../firebase'

const RegisterScreen = ({ navigation }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [imageUrl, setImageUrl] = useState(null)
    const [password, setPassword] = useState('')

    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitle: "Back to login",
        })
    }, [navigation])

    const signUp = () => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((authUser) => {
            authUser.user.updateProfile({
                displayName: name,
                photoURL: imageUrl || "https://www.urbanlaw.be/file/2016/01/no-image.png"
            })
        })
        .catch((error) => alert(error.message))
    }

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <StatusBar style="light" />
            <Text h3 style={styles.txt}>Create a Signal account</Text>

            <View>
                <Input
                containerStyle={styles.inputContainer}
                placeholder="Full name"
                autoFocus
                value={name}
                onChangeText={(text) => setName(text)}
                />
                <Input
                containerStyle={styles.inputContainer}
                placeholder="Email"
                keyboardType="email-address"
                value={email}
                onChangeText={(text) => setEmail(text)}
                />
                <Input
                containerStyle={styles.inputContainer}
                placeholder="Image Url"
                keyboardType="url"
                value={imageUrl}
                onChangeText={(text) => setImageUrl(text)}
                />
                <Input
                containerStyle={styles.inputContainer}
                placeholder="Password"
                secureTextEntry
                keyboardType="default"
                value={password}
                onChangeText={(text) => setPassword(text)}
                onSubmitEditing={signUp}
                />
            </View>

            <Button raised containerStyle={styles.button} onPress={signUp} title="Register" />
        </KeyboardAvoidingView>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 10,
      backgroundColor: '#ffffff',
    },
    txt: {
      marginBottom: 20,
    },
    inputContainer: {
      width: 300,
    },
    button: {
      width: 300,
      marginTop: 10,
    },
  });
