import React, { useCallback, useState, useLayoutEffect } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Image, useWindowDimensions } from "react-native"
import { Avatar } from "react-native-elements"
import { auth, db } from '../../../../../firebaseConfig';
import { signOut } from "firebase/auth"
import { collection, addDoc, doc, updateDoc, serverTimestamp, getDocs, query, orderBy, onSnapshot } from "firebase/firestore"
import { GiftedChat } from "react-native-gifted-chat"
import BackButton from "../../../../components/BackButton"
import { removeGlobal, removeToken } from "../../../../context/AuthContext"

const Chat = ({ navigation, route }) => {
	const { height } = useWindowDimensions()
	const [messages, setMessages] = useState([])
	const { chatName, id, chatAvatar } = route.params
	const signOutNow = async () => {
		await removeGlobal("user_details")
		await removeToken();
		await signOut(auth)
	}
	useLayoutEffect(() => {
		navigation.setOptions({
			title: chatName || "Chat",
			headerTitleStyle: { fontSize: 18 },
			headerLeft: () => (
			  <View className={'flex-row items-center ml-4'}>
				  <BackButton navigation={navigation}/>
				  <View className={'ml-4'}>
					  <Avatar
					    rounded
					    source={{
						    uri: chatAvatar || require("../../../../../assets/avatar.png"),
					    }}
					  />
				  </View>
			  </View>
			),
			headerRight: () => (
			  <TouchableOpacity onPress={signOutNow}>
				  <Image style={{ width: 25, height: 25, right: 15 }}
				         source={require("../../../../../assets/logout.png")}></Image>
			  </TouchableOpacity>
			),
		})
		const q = query(collection(db, `chats/${id}/messages`), orderBy("createdAt", "desc"));
		const unsubscribe = onSnapshot(q, (snapshot) => setMessages(
		  snapshot.docs.map(doc => ({
			  _id: doc.data()._id,
			  createdAt: doc.data().createdAt.toDate(),
			  text: doc.data().text,
			  user: doc.data().user,
		  })),
		));

		return () => {
			unsubscribe();
		};
	}, [navigation, id, chatName]);

	const onSend = useCallback((messages = []) => {
		const { _id, createdAt, text, user } = messages[0];
		const chatId = id;

		// Ajoutez le message à la collection "messages" spécifique au chat
		addDoc(collection(db, `chats/${chatId}/messages`), { _id, createdAt, text, user });

		// Mettez à jour la propriété "lastActivity" du chat
		updateDoc(doc(db, `chats/${chatId}`), { lastActivity: serverTimestamp() });
	}, [id]);


	return (
	  <GiftedChat
		messages={messages}
		showAvatarForEveryMessage={true}
		onSend={messages => onSend(messages)}
		renderUsernameOnMessage={true}
		user={{
			_id: auth?.currentUser?.email,
			name: auth?.currentUser?.displayName,
			avatar: auth?.currentUser?.photoURL,
		}}
	  />
	)
}

export default Chat