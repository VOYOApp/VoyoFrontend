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

		const q = query(collection(db, "chats"), where("members", "array-contains", auth.currentUser.email), orderBy("lastActivity", "desc"));
		const unsubscribe = onSnapshot(q, (snapshot) =>
		  setChats(
			snapshot.docs.map((doc) => ({
				id: doc.id,
				data: doc.data(),
			}))
		  )
		);

		return () => {
			unsubscribe();
		};
	}, []);


	useLayoutEffect(async () => {
		let user_details = await getGlobal("user_details");
		console.log(user_details)

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

	const enterChat = (id, chatName) => {
		navigation.navigate("Common", { params: {id, chatName}, screen: "Chat" })
	}

	return (
	  <SafeAreaView>
		  <ScrollView>
			  {chats.map(({ id, data: { chatName } }) => (
				<CustomListItem key={id} id={id} chatName={chatName} enterChat={enterChat}/>
			  ))}
		  </ScrollView>
	  </SafeAreaView>
	)
}

export default ChatChannel