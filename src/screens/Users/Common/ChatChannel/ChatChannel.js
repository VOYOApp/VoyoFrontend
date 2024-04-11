import React, { useCallback, useState, useLayoutEffect, useEffect } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView, ScrollView } from "react-native"
import { Avatar } from "react-native-elements"
import { auth, db } from '../../../../../firebaseConfig';
import { collection, addDoc, getDocs, query, orderBy, onSnapshot, where } from "firebase/firestore"
import CustomListItem from "../../../../components/CustomListItem"
import BackButton from "../../../../components/BackButton"
import { getGlobal } from "../../../../context/AuthContext"
const ChatChannel = ({navigation}) => {
	const [userDetails, setUserDetails] = useState(null);
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
						let chatName = "";
						let chatAvatar = "";

						// Trouver l'utilisateur actuel dans les membres du chat
						const currentUserIndex = chat.members.findIndex(member => member === auth.currentUser.email);

						if (currentUserIndex !== -1) {
							// Utilisateur actuel trouvé, utiliser l'autre membre du chat comme nom du chat
							const otherMemberIndex = currentUserIndex === 0 ? 1 : 0;
							chatName = chat.users[otherMemberIndex].name;
							chatAvatar = chat.users[otherMemberIndex].avatar;
						}

						return {
							id: doc.id,
							data: { ...chat, chatName, chatAvatar }, // Ajoutez le chatName à la donnée du chat
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

	useEffect(() => {
		const fetchUserDetails = async () => {
			try {
				const userDetails = await getGlobal("user_details");
				setUserDetails(userDetails);
			} catch (error) {
				// Handle error
				console.error("Error fetching user details:", error);
			}
		};

		fetchUserDetails();
	}, []);

	useEffect(() => {
		if (!userDetails) return;

		navigation.setOptions({
			title: (auth?.currentUser?.displayName || userDetails.first_name) ?? "Chat",
			headerTitleStyle: { fontSize: 18 },
			headerLeft: () => (
			  <View className={'flex-row items-center ml-4'}>
				  <BackButton navigation={navigation}/>
				  <TouchableOpacity className={'ml-4'} onPress={() => navigation.navigate("HomeProspect", { screen: "UserPage" })}>
					  <Avatar
						rounded
						source={{
							uri: (auth?.currentUser?.photoURL || userDetails.profile_picture) ?? "https://gravatar.com/avatar/94d45dbdba988afacf30d916e7aaad69?s=200&d=mp&r=x",
						}}
						size={"small"}
					  />
				  </TouchableOpacity>
			  </View>
			),
		});
	}, [navigation, userDetails]);

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