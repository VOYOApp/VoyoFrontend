import React, { useEffect, useRef, useState } from "react"
import { ScrollView, StyleSheet, Text, useWindowDimensions, View, ActivityIndicator } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useTranslation } from "react-i18next"
import Images from "../../../assets"
import { Icon } from "react-native-paper"
import AsyncStorage from "@react-native-async-storage/async-storage"
// import { getGlobal } from "../../../../context/AuthContext"

const LoadVoyo = () => {
	const { t } = useTranslation()
	const { height } = useWindowDimensions()

	return (
	  <View style={styles.root}>
		  <Icon source={Images.voyo_banner} size={550} />
		  <Text className={"absolute top-[60%] text-3xl text-orange-400 font-bold"}>Chargement</Text>
		  <ActivityIndicator className={"absolute top-[70%]"} size={100} color="orange" />
	  </View>
	)
}


const styles = StyleSheet.create({
	root: {
		padding: 20, alignItems: "center", justifyContent: "center", width: "100%", height: "100%",
	},
})

export default LoadVoyo