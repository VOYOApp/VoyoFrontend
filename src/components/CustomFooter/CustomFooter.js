import React from "react"
import { Dimensions, Image, StyleSheet, View } from "react-native"
import { useNavigation } from "@react-navigation/native"
import Images from "../../../assets/index.js"

const CustomFooter = ({ currentOption }) => {
	let home = Images.home_locked
	let search = Images.search_locked
	let chat = Images.chat_locked

	switch (currentOption) {
		case "home" :
			home = Images.home
			break

		case "search" :
			search = Images.search
			break

		case "chat" :
			chat = Images.chat
			break
	}

	const navigation = useNavigation()
	const goHome = () => {
		//  TODO : Get back to previous page
		console.warn("Going back")
	}

	const goSearch = () => {
		//  TODO : Search function
		console.warn("Search")
	}

	const goChat = () => {
		// TODO : chat
		console.warn("Chat")
	}

	return (
	  <View style={styles.navBar}>
		  <View>
			  <Image style={styles.icon} source={home} />
		  </View>
		  <View>
			  <Image style={styles.icon} source={search} onClick={() => goSearch()} />
		  </View>
		  <View>
			  <Image style={styles.icon} source={chat} onClick={() => goChat()} />
		  </View>
	  </View>)
}


const styles = StyleSheet.create({
	navBar: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		backgroundColor: "#292827",
		position: "absolute",
		paddingLeft: 40,
		paddingRight: 40,
		paddingTop: 15,
		paddingBottom: 15,
		marginBottom: 0,
		top: Dimensions.get("window").height - 20,
		width: Dimensions.get("window").width,
	},
	icon: {
		width: 25,
		height: 25,
	},
})
export default CustomFooter