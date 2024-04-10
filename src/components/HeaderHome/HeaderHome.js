import React, { useEffect } from "react"
import { Image, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from "react-native"
import { useTranslation } from "react-i18next"
import { useNavigation } from "@react-navigation/native"

const HeaderHome = ({ name, profilePicture }) => {

	const { height } = useWindowDimensions()
	const { t } = useTranslation()
	const navigation = useNavigation()

	return (
	  <View style={styles.header}>
		  <TouchableOpacity style={styles.img_container} onPress={() => navigation.navigate("HomeAdmin", { screen: "UserPage" })} >
			  <Image
			    src={profilePicture}
			    style={[styles.profilePic, { height: height }]}
			    resizeMode="contain" />
		  </TouchableOpacity>
		  <Text style={styles.title}>{t("common.greetings_name", { name: name })}</Text>
	  </View>)
}

const styles = StyleSheet.create({
	header: {
		marginTop: 20,
		marginBottom: 20,
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
		flexDirection: "row-reverse",
		width: "100%",
	},
	img_container: {
		flexDirection: "row-reverse",
		width: "25%",
	},
	title: {
		fontSize: 30,
		marginBottom: 10,
	},
	profilePic: {
		width: "100%",
		maxWidth: 45,
		maxHeight: 45,
		marginBottom: 10,
		borderRadius: 100,
	},
})

export default HeaderHome