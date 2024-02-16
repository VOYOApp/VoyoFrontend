import React from "react"
import { StyleSheet, Text, useWindowDimensions, View } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import { Icon } from "react-native-paper"
import Images from "../../../../../assets"
import { useTranslation } from "react-i18next"
import CustomButton from "../../../../components/CustomButton"

const RecapRequest = () => {
	const { t } = useTranslation()
	const Tab = createMaterialTopTabNavigator()

	const { height } = useWindowDimensions()
	const navigation = useNavigation()


	return (<View style={styles.root}>
		<View style={styles.headTitles}>
			<Text style={styles.title}>{t("prospect.send_request")}</Text>
			<Text>
				{t("prospect.send_request_description_2")}
			</Text>
		</View>


		<View style={styles.headTitles}>
			<View style={styles.subTitle}>
				<Icon source={Images.calendarOrange} size={27} />
				<Text style={styles.subTitleText}>Créneau de visite</Text>
			</View>

			<View style={styles.textDescription}>
				<Text>Mardi 21 novembre 2023 à 15h30</Text>
			</View>
		</View>


		<View style={styles.headTitles}>
			<View style={styles.subTitle}>
				<Icon source={Images.homeSmall} size={25} />
				<Text style={styles.subTitleText}>Type de bien</Text>
			</View>

			<View style={styles.textDescription}>
				<Text>Studio, T1 - 30 minutes de visite</Text>
			</View>
		</View>

		<View style={styles.headTitles}>
			<View style={styles.subTitle}>
				<Icon source={Images.dollar} size={27} />
				<Text style={styles.subTitleText}>Tarification horaire de Germaine T.</Text>
			</View>

			<View style={styles.textDescription}>
				<Text>Par heure : 7.5€</Text>
				<Text>Durée de la visite : 30 minutes</Text>
				<Text>Frais de plateforme : 0.50€</Text>
				<Text>Total à payer : 4.25€</Text>
			</View>
		</View>

		<View style={styles.bottomButtons}>
			<CustomButton text={"Payer 4.50€"}
			              onPress={() => navigation.navigate("ProspectHome")}
			              bgColor={"#FE881B"}
			              widthBtn={"90%"}
			              heightBtn={43} />
		</View>

	</View>)
}


const styles = StyleSheet.create({
	root: {
		paddingTop: 10,
		alignItems: "flex-start",
		paddingLeft: 10,
		paddingRight: 10,
		backgroundColor: "white",
		height: "100%",
		width: "100%",
	}, headTitles: {
		width: "100%", paddingLeft: 20, paddingRight: 20, paddingBottom: 10,
	}, title: {
		fontSize: 30, marginBottom: 10,
	}, scrollView: {
		width: "100%", padding: 20,
	}, plusBtn: {
		height: 40,
		backgroundColor: "#f4f3f4",
		borderRadius: 100,
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "row",
		paddingLeft: 10,
		paddingRight: 10,
		shadowColor: "#000",
		shadowOffset: {
			width: 0, height: 0,
		},
	}, icon: {
		marginRight: 10,
	}, bottomButtons: {
		width: "100%", alignItems: "center", backgroundColor: "rgba(0,0,0,0.00)", position: "absolute", bottom: 10,
	}, subTitle: {
		alignItems: "center", flexDirection: "row", marginTop: 15, marginBottom: 0, padding: 0,
	}, subTitleText: {
		fontSize: 20, marginLeft: 10,
	},
	textDescription: {
		padding: 15,
		backgroundColor: "rgba(0,0,0,0.07)",
		borderRadius: 18,
		paddingHorizontal: 40,
		fontSize: 15,
		marginTop: 10,
	},
})

export default RecapRequest