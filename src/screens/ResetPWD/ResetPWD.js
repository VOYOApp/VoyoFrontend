import React, { useState } from "react"
import { StyleSheet, Text, useWindowDimensions, View } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useTranslation } from "react-i18next"
import BackButton from "../../components/BackButton"
import CustomButton from "../../components/CustomButton"
import Password from "../../components/Password/Password"

const ResetPWD = () => {
	const { t } = useTranslation()
	const navigation = useNavigation()
	const { height } = useWindowDimensions()

	const [password, setPassword] = useState("")
	const [passwordConfirmation, setPasswordConfirmation] = useState("")
	const [isValidPwd, setIsValidPwd] = useState(false)
	const [btnDisabled, setBtnDisabled] = useState(true)

	const onResetPwd = async () => {
		console.log("THIS FEATURE IS IN PROGRESS !")
	}

	return (
	  <View style={styles.root}>
		  <BackButton />
		  <View style={{ width: "100%" }}>
			  <Text style={[styles.title, { marginTop: 20 }]}>Reinitialisation MDP</Text>

			  <Password setIsValidPwd={(isValidPwd) => {
				  setIsValidPwd(isValidPwd)
			  }} setPassword={(password) => {
				  setPassword(password)
			  }} setPasswordConfirmation={(passwordConfirmation) => {
				  setPasswordConfirmation(passwordConfirmation)
			  }}></Password>

			  <CustomButton text={t("common.login")} onPress={onResetPwd} bgColor={"black"}
			                deactivated={btnDisabled && !isValidPwd} />
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

export default ResetPWD