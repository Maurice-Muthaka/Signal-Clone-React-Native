import React, { useEffect, useState } from 'react'
import { Avatar, ListItem } from 'react-native-elements'
import firebase from '../firebase'

const CustomListComponent = ({ id, chatName, openChat}) => {
    const [chatMessages, setChatMessages] = useState([])

    useEffect(() => {
        const unsubscribe = firebase.firestore()
        .collection('chats')
        .doc(id).collection('messages')
        .orderBy('createdAt', 'desc')
        .onSnapshot(snapshot => (
            setChatMessages(
                snapshot.docs.map((doc) => doc.data())
            )
        ))
        return unsubscribe;
    }, [])

    return (
        <ListItem
            key={id}
            bottomDivider
            onPress={() => openChat(id, chatName)}
        >
            <Avatar
            rounded
            source={{ uri: chatMessages?.[0]?.user.avatar ||
                 "https://www.urbanlaw.be/file/2016/01/no-image.png" }}
            />
            <ListItem.Content>
                <ListItem.Title style={{ fontWeight: '700' }}>
                    {chatName}
                </ListItem.Title>
                <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
                    {chatMessages?.[0]?.text}
                </ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    )
}

export default CustomListComponent
