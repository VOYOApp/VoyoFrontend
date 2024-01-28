import { Image, StyleSheet, TouchableOpacity } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { Avatar, ListItem } from "react-native-elements"
import React from "react"

const CustomListItem = ({id, chatName, enterChat}) => {
	//TODO AFFICHER L'IMAGE DE L'UTILISATEUR SI ELLE EXISTE
	const navigation = useNavigation()

	return (
	  <ListItem onPress={() => enterChat(id, chatName)} key={id} bottomDivider>
		  <Avatar
		    rounded
		    source={require("../../../assets/avatar.png")}
		  />
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

const styles = StyleSheet.create({})

export default CustomListItem