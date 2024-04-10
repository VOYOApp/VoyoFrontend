import { Image, StyleSheet, Text, View } from "react-native"
import CustomInput from "../CustomInput"
import React, { useState } from "react"

const Password = ({ setPasswordConfirmation, setPassword, setIsValidPwd}) => {
	const [pwd, setPwd] = useState("")
	const [pwdConfirmation, setPwdConfirmation] = useState("")

	const [isLengthValid, setIsLengthValid] = useState(false)
	const [hasSpecialChar, setHasSpecialChar] = useState(false)
	const [hasNumber, setHasNumber] = useState(false)
	const [hasUpperCase, setHasUpperCase] = useState(false)

	const checkPswIsValid = (pswd, confirm_pswd) => {
		let passwordMatch = pswd === confirm_pswd
		let passwordIsNotEmpty = pswd !== ""
		let isLengthValid = pswd.length >= 8
		let hasSpecialChar = /[!@#$%^&*()_+={}\[\]:;<>,.?/~`"'\-|\\]/.test(pswd)
		let hasNumber = /\d/.test(pswd)
		let hasUpperCase = /[A-Z]/.test(pswd)
		let isPasswordValid = passwordMatch && passwordIsNotEmpty && isLengthValid && hasSpecialChar && hasNumber && hasUpperCase

		setIsLengthValid(isLengthValid)
		setHasSpecialChar(hasSpecialChar)
		setHasNumber(hasNumber)
		setHasUpperCase(hasUpperCase)

		setIsValidPwd(isPasswordValid)
	}

	const handlePasswordChange = (text) => {
		setPassword(text)
		setPwd(text)
		checkPswIsValid(text, pwdConfirmation)
	}

	const handlePasswordConfirmationChange = (text) => {
		setPasswordConfirmation(text)
		setPwdConfirmation(text)
		checkPswIsValid(pwd, text)
	}

	return(<View>
	  <View>
		<CustomInput placeHolder="Mot de passe"
		             value={pwd}
		             setValue={handlePasswordChange}
		             secureTextEntry={true}
		             inputype="password"
		/>
		<View style={{ display: "flex", flexDirection: "row", alignItems: "center", marginTop: 5 }}>
			<Image
			  source={require("../../../assets/check-mark-validate.png")}
			  style={{
				  width: 12,
				  height: 12,
				  marginRight: 5,
				  tintColor: isLengthValid ? "green" : "grey",
			  }}
			/>
			<Text style={{ color: isLengthValid ? "green" : "grey" }}>8 caractères ou plus</Text>
		</View>
		<View style={{ display: "flex", flexDirection: "row", alignItems: "center", marginTop: 5 }}>
			<Image
			  source={require("../../../assets/check-mark-validate.png")}
			  style={{
				  width: 12,
				  height: 12,
				  marginRight: 5,
				  tintColor: hasSpecialChar ? "green" : "grey",
			  }}
			/>
			<Text style={{ color: hasSpecialChar ? "green" : "grey" }}>Charactères spéciaux</Text>
		</View>
		<View style={{ display: "flex", flexDirection: "row", alignItems: "center", marginTop: 5 }}>
			<Image
			  source={require("../../../assets/check-mark-validate.png")}
			  style={{ width: 12, height: 12, marginRight: 5, tintColor: hasNumber ? "green" : "grey" }}
			/>
			<Text style={{ color: hasNumber ? "green" : "grey" }}>Chiffres</Text>
		</View>
		<View style={{ display: "flex", flexDirection: "row", alignItems: "center", marginTop: 5 }}>
			<Image
			  source={require("../../../assets/check-mark-validate.png")}
			  style={{
				  width: 12,
				  height: 12,
				  marginRight: 5,
				  tintColor: hasUpperCase ? "green" : "grey",
			  }}
			/>
			<Text style={{ color: hasUpperCase ? "green" : "grey" }}>Majuscules</Text>
		</View>

		<CustomInput placeHolder="Confirmer le mot de passe"
		             value={pwdConfirmation}
		             setValue={handlePasswordConfirmationChange}
		             secureTextEntry
		/>
	</View>
	</View>)
}

const styles = StyleSheet.create({
})

export default Password