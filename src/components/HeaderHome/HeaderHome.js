import React from "react"
import { View, Text, Image, StyleSheet, useWindowDimensions } from "react-native"
import { useTranslation } from "react-i18next"

const HeaderHome = () => {

	const { height } = useWindowDimensions()
	const { t } = useTranslation()

	return (
	  <View style={styles.header}>
		  <Image
			src={"https://2.bp.blogspot.com/-0rLFh_JbOzQ/VVTtjHV98DI/AAAAAAAAB6M/cOJ84R_cUpk/s1600/whatsappimages%2Bfunny%2Bdp%2B(9).jpg"}
			style={[styles.profilePic, { height: height }]}
			resizeMode="contain" />
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