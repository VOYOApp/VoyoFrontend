import React, { useState, Fragment } from "react"
import { SafeAreaView, Text, StyleSheet, View, Image, Button } from "react-native"
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from "react-native-confirmation-code-field"
import { useNavigation } from "@react-navigation/native"
import CustomButton from "../CustomButton"
import { useTranslation } from "react-i18next"

const HomeVisitCard = () => {
	const { t } = useTranslation()

	return (
	  <View style={styles.card}>
		  <View>
			  <View style={styles.rowWithImage}>
				  <Image source={require("../../../assets/icons/010-user.png")} style={styles.logo} />
				  <Text>Bernard</Text>
			  </View>
			  <View style={styles.rowWithImage}>
				  <Image source={require("../../../assets/icons/013-clock.png")} style={styles.logo} />
				  <Text>Bernard</Text>
			  </View>
			  <View style={styles.rowWithImage}>
				  <Image source={require("../../../assets/icons/016-hourglass-1.png")} style={styles.logoBigger} />
				  <Text>Bernard</Text>
			  </View>
			  <View style={styles.rowWithImage}>
				  <Image source={require("../../../assets/icons/014-check.png")} style={styles.logo} />
				  <Text>Bernard</Text>
			  </View>
		  </View>
		  <View>
			  <CustomButton text={t("common.details")} widthBtn={80} heightBtn={40} />
		  </View>
	  </View>

	)
}

const styles = StyleSheet.create({
	card: {
		width: "100%",
		backgroundColor: "rgba(0,0,0,0.21)",
		borderRadius: 10,
		marginBottom: 10,
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		paddingTop: 10,
		paddingBottom: 10,
		paddingLeft: 5,
	},
	rowWithImage: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 5,
		marginTop: 5,
		width: "90%",
		maxWidth: 270,
	},
	logo: {
		maxWidth: 23,
		maxHeight: 23,
		marginLeft: 10,
		marginRight: 12,
	},
	logoBigger: {
		maxWidth: 27,
		maxHeight: 27,
		marginLeft: 9,
		marginRight: 10,
	},
})

export default HomeVisitCard