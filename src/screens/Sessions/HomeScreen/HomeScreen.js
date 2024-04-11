import React from "react"
import { Image, StyleSheet, Text, useWindowDimensions, View } from "react-native"
import CustomButton from "../../../components/CustomButton"
import { useNavigation } from "@react-navigation/native"
import { useTranslation } from "react-i18next"

const HomeScreen = () => {
	const { t } = useTranslation()


	const { height } = useWindowDimensions()
	const navigation = useNavigation()
	const onSignInPressed = () => {
		// console.warn('Sign in pressed')
		navigation.navigate("SignIn")
	}

	const onRegisterPressed = () => {
		// console.warn('Forgot password pressed')
		navigation.navigate("SignUp")
	}

	const onHomeProspectPressed = () => {
		// console.warn('Forgot password pressed')
		navigation.navigate("Prospect", { screen: "ProspectHome" })
	}

	const onHomeAdminPressed = () => {
		navigation.navigate("Admin", { screen: "HomeAdmin" })
	}

	return (<View style={styles.root}>
		<View style={styles.bgImg}>
			<View style={{
				position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
			}} />
			<Image source={require("../../../../assets/logos/banner-voyo.png")}
			       style={[styles.logo, { height: height }]}
			       resizeMode="contain" />

			<Text style={styles.title}>{t("common.greetings")}</Text>
			<View style={styles.citationCard}>
				<Text style={styles.citationText}>“{t("common.citation")}”</Text>
			</View>


			<View style={styles.btns}>
				<CustomButton text={t("common.login")} onPress={onSignInPressed} bgColor={"black"} widthBtn={"40%"} />
				<CustomButton text={t("common.register")} onPress={onRegisterPressed} bgColor={"orange"}
				              widthBtn={"40%"} />
			</View>
		</View>
	</View>)
}


const styles = StyleSheet.create({
	root: {
		height: "100%", flex: 1,
	}, logo: {
		width: "400%", maxWidth: 400, maxHeight: 400, position: "absolute", top: 0,
	}, title: {
		fontSize: 40, marginBottom: 10, color: "orange", textAlign: "center",
	}, btns: {
		width: "100%",
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-around",
		position: "absolute",
		bottom: 20,
	}, bgImg: {
		flex: 1, justifyContent: "center", padding: 20, alignItems: "center",
	}, citationCard: {
		backgroundColor: "rgba(0,0,0,0.3)", borderRadius: 10, padding: 20, margin: 15,
	}, citationText: {
		color: "white", fontSize: 18, textAlign: "center",
	},
})

export default HomeScreen