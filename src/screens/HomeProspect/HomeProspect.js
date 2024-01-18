import React, { useState } from "react"
import { View, Text, Image, StyleSheet, useWindowDimensions } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useTranslation } from "react-i18next"
import HomeStats from "../../components/HomeStats"

const HomeProspect = () => {
	const { t } = useTranslation()


	const { height } = useWindowDimensions()
	const navigation = useNavigation()
	const onBtnPressed = () => {
		// console.warn('Sign in pressed')
		navigation.navigate("SignInScreen")
	}


	return (
	  <View style={styles.root}>
		  <View style={styles.header}>
			  <Image source={require("../../../assets/avatar.png")}
			         style={[styles.logo, { height: height }]}
			         resizeMode="contain" />
			  <Text style={styles.title}>{t("common.greetings_name", { name: "Yohann" })}</Text>
		  </View>

		  <HomeStats StatsType={"prospect"} />
	  </View>
	)
}


const styles = StyleSheet.create({
	header:{
		marginTop: 20,
		marginBottom: 20,
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
		flexDirection: "row-reverse",
		width: "100%",
	},
	root: {
		padding: 20,
		alignItems: "center",
	},
	logo: {
		width: "100%",
		maxWidth: 45,
		maxHeight: 45,
		marginBottom: 10,
		borderRadius: 100,
	},
	title: {
		fontSize: 30,
		marginBottom: 10,
	},
})

export default HomeProspect