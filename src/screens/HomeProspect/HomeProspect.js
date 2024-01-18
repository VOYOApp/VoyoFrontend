import React, { useState } from "react"
import { View, Text, Image, StyleSheet, useWindowDimensions } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useTranslation } from "react-i18next"
import CustomStatCard from "../../components/CustomStatCard"

const HomeProspect = () => {
	const { t } = useTranslation()


	const { height } = useWindowDimensions()
	const navigation = useNavigation()
	const onBtnPressed = () => {
		// console.warn('Sign in pressed')
		navigation.navigate("SignInScreen")
	}

	const unreadMessagesCount = 1
	const unreadMessagesCountTranslationKey = unreadMessagesCount === 1
	  ? "common.unread_messages.one"
	  : "common.unread_messages.other"

	const uncomingVisits = 1
	const uncomingVisitsTranslationKey = unreadMessagesCount === 1
	  ? "visitor.upcoming_visits.one"
	  : "visitor.upcoming_visits.other"


	return (
	  <View style={styles.root}>

		  <Image source={require("../../../assets/avatar.png")}
		         style={[styles.logo, { height: height }]}
		         resizeMode="contain" />
		  <Text style={styles.title}>{t("common.greetings_name", { name: "toto" })}</Text>

		  <View style={styles.stats}>
			  <View style={styles.statsRow}>
				  <CustomStatCard value={uncomingVisits} text={uncomingVisitsTranslationKey} isSmall={true} />
				  <CustomStatCard value={unreadMessagesCount} text={unreadMessagesCountTranslationKey}
				                  isSmall={false} />
			  </View>
			  <View style={styles.statsRow}>
				  <CustomStatCard value={unreadMessagesCount} text={unreadMessagesCountTranslationKey}
				                  isSmall={false} />
				  <CustomStatCard value={uncomingVisits} text={uncomingVisitsTranslationKey} isSmall={true} />
			  </View>
		  </View>


		  <View style={{
			  width: "100%",
			  display: "flex",
			  alignItems: "center",
			  flexDirection: "row",
			  justifyContent: "space-around",
		  }}>
		  </View>
	  </View>
	)
}


const styles = StyleSheet.create({
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
	stats:{
		width: "100%",
	},
	statsRow: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 10,
	},
})

export default HomeProspect