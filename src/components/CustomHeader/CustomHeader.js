import React from "react"
import { View, Text, TextInput, StyleSheet, Image, Dimensions} from "react-native"
import { useNavigation } from "@react-navigation/native"


const CustomHeader = () => {
    const appWidth = Dimensions.get('window').width;
    const appHeight = Dimensions.get('window').height;
	const navigation = useNavigation()
	const goBack = () => {
		//  TODO : Get back to previous page
		console.warn("Going back");
	}

	const logout = () => {
		//  TODO : Back / Déconnexion
		console.warn("Logging out");
	}
	return (
	<View style={{display: "flex",
	flexDirection: "row",
	alignItems: "center",

	backgroundColor: "rgba(92, 56, 11, 0.71)",
	paddingLeft: 20,
	paddingRight: 20,
	paddingTop: 40,
	paddingBottom: 12,
	top:0,
	width:appWidth}}>
		<View style={{flexDirection: "row", alignItems: "center", width: appWidth/2}}>
			<Image style={{ width: 25, height: 25 }}
			       source={require("../../../assets/back.png")}></Image>
			<Text style={{ marginLeft: 25, fontFamily: "Roboto", fontSize: 15 }}>
				Mon compte</Text>
		</View>
		<View style={{flexDirection: "row", alignItems: "center", position: "absolute", top: 0, paddingTop:40, left:appWidth-50}} >
			<Image style={{ width: 25, height: 25, right:0}}
			       source={require("../../../assets/logout.png")}></Image>
		</View>
	</View>)
}

export default CustomHeader