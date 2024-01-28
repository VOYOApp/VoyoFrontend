import React, { useCallback, useState, useLayoutEffect, useEffect } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView, ScrollView } from "react-native"
import { Avatar } from "react-native-elements"
import { auth, db } from '../../../../../firebaseConfig';
import { collection, addDoc, getDocs, query, orderBy, onSnapshot, where } from "firebase/firestore"
import CustomListItem from "../../../../components/CustomListItem"
import BackButton from "../../../../components/BackButton"
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


	useLayoutEffect(() => {
		navigation.setOptions({
			title: auth?.currentUser?.displayName || "Chat",
			headerTitleStyle: { fontSize: 18 },
			headerLeft: () => (
			  <View className={'flex-row items-center ml-4'}>
				  <BackButton navigation={navigation}/>
				  <TouchableOpacity className={'ml-4'} onPress={() => navigation.navigate("HomeProspect", { screen: "UserPage" })}>
					  <Avatar
					    rounded
					    source={{
						    uri: auth?.currentUser?.photoURL || require("../../../../../assets/avatar.png"),
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