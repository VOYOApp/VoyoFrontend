import { useWindowDimensions } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { Avatar, ListItem } from "react-native-elements"
import React from "react"

const CustomListItem = ({ id, chatName, chatAvatar, enterChat }) => {
	const navigation = useNavigation()
	const { height } = useWindowDimensions()
	return (
	  <ListItem onPress={() => enterChat(id, chatName, chatAvatar)} key={id} bottomDivider>
		  <Avatar
			rounded
			size="medium"
			source={{
				uri: chatAvatar || require("../../../assets/avatar.png"),
			}}
		  />
		  <ListItem.Content>
			  <ListItem.Title className={"font-bold"}>
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

export default CustomListItem