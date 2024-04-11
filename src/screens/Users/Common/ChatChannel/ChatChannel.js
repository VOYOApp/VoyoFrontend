import React, { useCallback, useState, useLayoutEffect, useEffect } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView, ScrollView } from "react-native"
import { Avatar } from "react-native-elements"
import { auth, db } from '../../../../../firebaseConfig';
import { collection, addDoc, getDocs, query, orderBy, onSnapshot, where } from "firebase/firestore"
import CustomListItem from "../../../../components/CustomListItem"
import BackButton from "../../../../components/BackButton"
import { getGlobal } from "../../../../context/AuthContext"
const ChatChannel = ({navigation}) => {
	const [chats, setChats] = useState([])

	useEffect(() => {
		const fetchChats = async () => {
			try {
				const q = query(
				  collection(db, "chats"),
				  where("members", "array-contains", auth.currentUser.email),
				  orderBy("lastActivity", "desc")
				);
				const unsubscribe = onSnapshot(q, (snapshot) => {
					const chatData = snapshot.docs.map((doc) => {
						const chat = doc.data();
						console.log(chat.members)
						console.log(chat.members[0])
						const firstMembers =  chat.members[0]

						// Utilisez le nom du second membre s'il a un email vide, sinon utilisez celui du premier membre
						const chatName = chat.members[0].name;
						const chatAvatar = chat.members[0].avatar;

						return {
							id: doc.id,
							data: { ...chat, chatName, chatAvatar}, // Ajoutez le chatName à la donnée du chat
						};
					});
					setChats(chatData);
				});

				return unsubscribe;
			} catch (error) {
				console.error("Error fetching chats:", error);
			}
		};

		fetchChats();
	}, []);

	useLayoutEffect(async () => {
		let user_details = await getGlobal("user_details");

		navigation.setOptions({
			title: (auth?.currentUser?.displayName || user_details?.first_name) ?? "Chat",
			headerTitleStyle: { fontSize: 18 },
			headerLeft: () => (
			  <View className={'flex-row items-center ml-4'}>
				  <BackButton navigation={navigation}/>
				  <TouchableOpacity className={'ml-4'} onPress={() => navigation.navigate("HomeProspect", { screen: "UserPage" })}>
					  <Avatar
					    rounded
					    source={{
						    uri: (auth?.currentUser?.photoURL || user_details?.profile_picture) ?? "https://gravatar.com/avatar/94d45dbdba988afacf30d916e7aaad69?s=200&d=mp&r=x",
					    }}
					  />
				  </TouchableOpacity>
			  </View>
			),
		})
	}, [navigation]);

	const enterChat = (id, chatName, chatAvatar) => {
		navigation.navigate("Common", { params: {id, chatName, chatAvatar}, screen: "Chat" })
	}

	return (
	  <SafeAreaView>
		  <ScrollView>
			  {chats.map(({ id, data: { chatName, chatAvatar } }) => (
				<CustomListItem key={id} id={id} chatName={chatName} chatAvatar={chatAvatar} enterChat={enterChat}/>
			  ))}
		  </ScrollView>
	  </SafeAreaView>
	)
}

export default ChatChannel