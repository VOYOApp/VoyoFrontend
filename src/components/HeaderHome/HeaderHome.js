import React from "react"
import { Image, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from "react-native"
import { useTranslation } from "react-i18next"
import { useNavigation } from "@react-navigation/native"

const HeaderHome = () => {

	const { height } = useWindowDimensions()
	const { t } = useTranslation()
	const navigation = useNavigation()

	return (
	  <View style={styles.header}>
		  <TouchableOpacity style={styles.img_container} onPress={() => navigation.navigate("HomeProspect", { screen: "UserPage" })} >
			  <Image
			    src={"https://2.bp.blogspot.com/-0rLFh_JbOzQ/VVTtjHV98DI/AAAAAAAAB6M/cOJ84R_cUpk/s1600/whatsappimages%2Bfunny%2Bdp%2B(9).jpg"}
			    style={[styles.profilePic, { height: height }]}
			    resizeMode="contain" />
		  </TouchableOpacity>
		  <Text style={styles.title}>{t("common.greetings_name", { name: "Yohann" })}</Text>
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