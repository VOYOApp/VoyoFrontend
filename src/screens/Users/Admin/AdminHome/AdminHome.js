import React, { useEffect } from "react"
import { ScrollView, StyleSheet, useWindowDimensions, View } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useTranslation } from "react-i18next"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import HeaderHome from "../../../../components/HeaderHome"
import ValidationListAdmin from "../ValidationListAdmin/ValidationListAdmin"
import { getGlobal } from "../../../../context/AuthContext"

const ProspectHome = () => {
	const { t } = useTranslation()
	const Tab = createMaterialTopTabNavigator()

	const [firstname, setFirstname] = React.useState("")
	const [icon, setIcon] = React.useState("https://gravatar.com/avatar/94d45dbdba988afacf30d916e7aaad69?s=200&d=mp&r=x")

	const { height } = useWindowDimensions()
	const navigation = useNavigation()


	// useEffect(() => {
	// 	function firebaseCnx(email, pswd) {
	// 		if (email) {
	// 			signInWithEmailAndPassword(auth, email, pswd)
	// 			.then((userCredential) => {
	// 				console.log("Connection firebase successful !")
	// 			})
	// 			.catch((error) => {
	// 				console.log(error.code)
	// 				console.log(error.message)
	// 			});
	// 		}
	// 	}
	// }, [])

	useEffect(() => {
		// setTimeout(() => {
		getGlobal("user_details").then((data) => {
			setFirstname(data?.first_name)
			setIcon(data?.profile_picture)
		})
		// }, 500)
	}, [firstname, icon])

	return (
	  <View style={styles.root}>
		  <HeaderHome name={firstname} profilePicture={icon} isAdmin={true} />
		  <ScrollView style={{ width: "100%" }}
		              showsVerticalScrollIndicator={false}
		              showsHorizontalScrollIndicator={false}
		  >
			  <ValidationListAdmin />

		  </ScrollView>

	  </View>)
}


const styles = StyleSheet.create({
	root: {
		backgroundColor: "white",
		padding: 20,
		width: "100%",
		height: "100%",
		marginTop: 10,
	},
	title: {
		fontSize: 30,
		marginBottom: 10,
		marginTop: 10,
	},
	link: {
		color: "#FE881B",
		marginTop: 10,
	},
	body: {
		padding: 20,
	},
	passwordValidation: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
	},
	gradientBackground: {
		...StyleSheet.absoluteFillObject,
	},
})

export default ProspectHome