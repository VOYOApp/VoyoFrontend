import React, { useState } from "react"
import { View, Text, Image, StyleSheet, useWindowDimensions } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useTranslation } from "react-i18next"
import HomeStats from "../../components/HomeStats"
import HeaderHome from "../../components/HeaderHome"

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
		  <HeaderHome />
		  <HomeStats StatsType={"prospect"} />
	  </View>
	)
}


const styles = StyleSheet.create({
	root: {
		padding: 20,
		alignItems: "center",
	},
})

export default HomeProspect