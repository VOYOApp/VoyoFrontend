import React, { useState } from "react"
import { StyleSheet, Text, useWindowDimensions, View } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useTranslation } from "react-i18next"
import BackButton from "../../components/BackButton"
import CustomInput from "../../components/CustomInput"
import CustomButton from "../../components/CustomButton"
import Password from "../../components/Password/Password"

const ResetPWD = () => {
	const { t } = useTranslation()
	const [password, setPassword] = useState("")
	const [btnDisabled, setBtnDisabled] = useState(true)
	const navigation = useNavigation()
	const { height } = useWindowDimensions()

	const onSignInPressed = () => {

	}

	const onForgotPasswordPressed = () => {
		console.warn("Forgot password pressed")
	}

	return (
	  <View style={styles.root}>
		  <BackButton />
		  <View style={{ width: "100%" }}>
			  <Text style={[styles.title, { marginTop: 20 }]}>Reinitialisation MDP</Text>

			  <Password></Password>

			  <CustomButton text="Se connecter" onPress={onSignInPressed} bgColor={"black"} deactivated={btnDisabled}/>
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
		marginBottom: 10
	},
	error: {
		color: "red",
		fontWeight: "bold",
		marginBottom: 10
	}
})

export default ResetPWD