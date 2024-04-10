import { Image, StyleSheet, TouchableOpacity, useWindowDimensions } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { Avatar, ListItem } from "react-native-elements"
import React from "react"

const CustomListItem = ({id, chatName, chatAvatar, enterChat}) => {
	//TODO AFFICHER L'IMAGE DE L'UTILISATEUR SI ELLE EXISTE
	const navigation = useNavigation()
	const { height } = useWindowDimensions()
	return (
	  <ListItem onPress={() => enterChat(id, chatName, chatAvatar)} key={id} bottomDivider>
		  {/*<Avatar*/}
		  {/*  rounded*/}
		  {/*  source={require("../../../assets/avatar.png")}*/}
		  {/*/>*/}
		  <Image
		    style={[styles.profilePic, { height: height }]}
		    src={chatAvatar}
		    resizeMode="contain" />
		  <ListItem.Content>
			  <ListItem.Title className={'font-bold'}>
				  {chatName}
			  </ListItem.Title>
			  <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
				This is a test subtitle This is a test subtitle This is a test subtitle.
				  This is a test subtitle This is a test subtitle This is a test subtitle
			  </ListItem.Subtitle>
		  </ListItem.Content>
	  </ListItem>
	)
}

const styles = StyleSheet.create({
  profilePic: {
	width: "100%",
	  maxWidth: 45,
	  maxHeight: 45,
	  borderRadius: 100,
}
})

export default CustomListItem