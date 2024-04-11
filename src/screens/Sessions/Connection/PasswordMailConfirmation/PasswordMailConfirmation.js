import React, { useState } from "react"
import { StyleSheet, Text, useWindowDimensions, View } from "react-native"
import CustomInput from "../../../../components/CustomInput"
import CustomButton from "../../../../components/CustomButton"
import BackButton from "../../../../components/BackButton"
import { useNavigation } from "@react-navigation/native"
import { useTranslation } from "react-i18next"

const PasswordMailConfirmation = () => {
	const { t } = useTranslation()
	const [password, setPassword] = useState("")
	const navigation = useNavigation()
	const { height } = useWindowDimensions()

	const onSignInPressed = () => {
		navigation.navigate("Prospect", { screen: "UserPage" })
	}

	const onForgotPasswordPressed = () => {
		console.warn("Forgot password pressed")
	}

	return (
	  <View style={styles.root}>
		  <BackButton />
		  <View style={{ width: "100%" }}>
			  <Text style={[styles.title, { marginTop: 20 }]}>Connexion à VOYO</Text>

			  <CustomInput placeHolder="Mot de passe"
			               value={password}
			               setValue={setPassword}
			               secureTextEntry
			  />

			  <View className={"flex-row justify-between w-full mb-2"}>
				  <Text style={styles.error}>{t("common.incorrect_password")}</Text>
				  <Text onPress={onForgotPasswordPressed} style={styles.link}>{t("common.forgot_password")}</Text>
			  </View>

			  <CustomButton text="Se connecter" onPress={onSignInPressed} bgColor={"black"} />
		  </View>
	  </View>
	)
}


const styles = StyleSheet.create({
	root: {
		backgroundColor: "white",
		padding: 30,
		marginTop: 10,
		width: "100%",
		height: "100%",
	},
	title: {
		fontSize: 30,
		marginBottom: 10,
	},
	link: {
		color: "#FE881B",
		marginBottom: 10,
	},
	error: {
		color: "red",
		fontWeight: "bold",
		marginBottom: 10,
	},
})

export default PasswordMailConfirmation