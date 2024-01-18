import React from "react"
import { View, Text, StyleSheet } from "react-native"
import { useTranslation } from "react-i18next"

const CustomStatCard = ({ value, text, isSmall = true }) => {

	const { t } = useTranslation()
	const unreadMessagesCount = 1

	return (
	  <View style={styles.container}>
		  <View style={isSmall ? styles.smallCard : styles.bigCard}>
			  <Text style={styles.value}> {value}</Text>
			  <Text style={styles.text}> {t(text)} </Text>
		  </View>

	  </View>)
}

const styles = StyleSheet.create({
	container: {
		borderRadius: 18,
	},
	value: {
		fontSize: 50,
	},
	smallCard: {
		height: 120,
		borderRadius: 18,
		backgroundColor: "#dcdcdc",
		padding: 10,
		paddingTop: 8,
		paddingBottom: 15,
		width: 145,
	},
	bigCard: {
		height: 120,
		borderRadius: 18,
		backgroundColor: "#dcdcdc",
		padding: 10,
		paddingTop: 8,
		paddingBottom: 15,
		width: 205,
	},
	text:{
		fontSize: 15,
	}
})

export default CustomStatCard