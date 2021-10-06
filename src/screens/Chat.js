import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native'
import { Avatar } from 'react-native-elements'
import { AntDesign, Ionicons, FontAwesome } from '@expo/vector-icons';
import { GiftedChat } from 'react-native-gifted-chat'
import firebase from '../firebase'

const ChatScreen = ({ navigation, route}) => {
    const id = route.params.id
    const chatName = route.params.chatName

    const [messages, setMessages] = useState([]);

    useEffect(() => {
        setMessages([
        {
            _id: 1,
            text: 'Hello developer',
            createdAt: new Date(),
            user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
            },
        },
        ])
    }, [])

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
        const { _id, text, createdAt, user } = messages[0];

        firebase.firestore().collection('chats').doc(id).collection('messages').add({
            _id,
            text,
            createdAt,
            user,
        })
    }, [])

    useLayoutEffect(() => {
        const unsubscribe = firebase
          .firestore()
          .collection('chats')
          .doc(id)
          .collection('messages')
          .orderBy('createdAt', 'desc')
          .onSnapshot((snapshot) => {
            setMessages(
              snapshot.docs.map((doc) => ({
                _id: doc.data()._id,
                text: doc.data().text,
                createdAt: doc.data().createdAt.toDate(),
                user: doc.data().user,
              }))
            );
          });
        return unsubscribe;
      }, []);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Chat",
            headerBackTitleVisible: false,
            headerTitleAlign: 'left',
            headerTitle: () => (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Avatar 
                    rounded 
                    source={{ uri: "https://www.urbanlaw.be/file/2016/01/no-image.png" }}
                    />
                    <Text style={{ color: '#fff', marginLeft: 10, fontWeight: '700' }}>{ chatName }</Text>
                </View>
            ),
            headerLeft: () => (
                <TouchableOpacity
                style={{ marginLeft: 10 }}
                onPress={ navigation.goBack }
                >
                    <AntDesign name="arrowleft" size={24} color="#fff" />
                </TouchableOpacity>
            ),
            headerRight: () => (<View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: 80,
                marginRight: 20 
                }}>
                <TouchableOpacity
                activeOpacity={0.5}
                >
                    <FontAwesome name="video-camera" size={24} color="#fff" />
                </TouchableOpacity>

                <TouchableOpacity
                activeOpacity={0.5}
                >
                    <Ionicons name="call" size={22} color="#fff" />
                </TouchableOpacity>
            </View>
            ),
        })
    }, [])

    const scrollToBottomComponent = () => {
        return <FontAwesome name="angle-double-down" size={22} color="#333" />;
      };

    return (
        <View style={styles.container}>
            <GiftedChat
            messages={messages}
            onSend={messages => onSend(messages)}
            user={{
                _id: firebase.auth()?.currentUser?.uid,
                name: firebase.auth()?.currentUser?.displayName,
                avatar: firebase.auth()?.currentUser?.photoURL,
            }}
            scrollToBottom
            scrollToBottomComponent={scrollToBottomComponent}
            />
        </View>
    )
}

export default ChatScreen

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
})
