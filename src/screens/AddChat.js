import React, { useLayoutEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Button, Input } from 'react-native-elements'
import { SimpleLineIcons } from '@expo/vector-icons';
import firebase from '../firebase'

const AddChatScreen = ({ navigation }) => {
    const [input, setInput] = useState("");

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Add new chat",
            headerBackTitle: 'Chats',
        })
    }, [])

    const createChat = async () => {
        await firebase.firestore().collection('chats').add({
            chatName: input,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        }).then(() => {
            navigation.goBack();
        })
        .catch((error) => alert(error))
    }

    return (
        <View style={styles.container}>
            <Input
            placeholder="Enter a chat name"
            value={input}
            onChangeText={(text) => setInput(text)}
            onSubmitEditing={createChat}
            leftIcon={
                <SimpleLineIcons name="pencil" size={22} color="#000" />
            }
            />
            <Button onPress={createChat} title="Save new chat" />
        </View>
    )
}

export default AddChatScreen

const styles = StyleSheet.create({
    container: {
      padding: 30,
      backgroundColor: '#ffffff',
      height: '100%',
    },
  });
