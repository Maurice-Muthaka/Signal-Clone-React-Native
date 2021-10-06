import React, { useEffect, useLayoutEffect, useState } from 'react'
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import { Avatar } from 'react-native-elements'
import CustomListComponent from '../components/customList'
import firebase from '../firebase'
import { AntDesign, SimpleLineIcons } from '@expo/vector-icons';

const HomeScreen = ({ navigation }) => {
    const [chats, setChats] = useState([])

    useEffect(() => {
        const unsubscribe = firebase.firestore()
        .collection('chats')
        .orderBy('createdAt', 'desc')
        .onSnapshot(snapshot => (
            setChats(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data(),
                }))
            )
        ))
        
        return unsubscribe;
    }, [])
    
    const logout = () => {
        firebase.auth().signOut()
        .then(() => {
            navigation.replace('Login')
        })
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Signal",
            headerStyle: { backgroundColor: '#fff'},
            headerTitleStyle: { color: '#000' },
            headerTintColor: '#000',
            headerLeft: () => (<View style={{ marginLeft: 20 }}>
                <TouchableOpacity
                activeOpacity={0.5}
                onPress={logout}
                >
                    <Avatar 
                    rounded 
                    source={{
                        uri: firebase.auth()?.currentUser?.photoURL
                    }}
                    />
                </TouchableOpacity>
            </View>
            ),
            headerRight: () => (<View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: 80,
                marginRight: 20 
                }}>
                <TouchableOpacity
                activeOpacity={0.5}
                onPress={logout}
                >
                    <AntDesign name="camerao" size={24} color="#000" />
                </TouchableOpacity>

                <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => navigation.navigate('AddChat')}
                >
                    <SimpleLineIcons name="pencil" size={22} color="#000" />
                </TouchableOpacity>
            </View>
            )
        })
    }, [])

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
          if (!user) {
            navigation.replace("Login");
          } 
        });
        
        return unsubscribe;
    }, [])

    const openChat = (id, chatName) => {
        navigation.navigate('Chat', { id, chatName })
    }

    return (
        <SafeAreaView>
            <ScrollView style={styles.container}>
                {chats.map(({ id, data: { chatName }}) => (
                    <CustomListComponent key={id} id={id} chatName={chatName} openChat={openChat} />
                ))}
            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
      height: '100%',
    },
  });
