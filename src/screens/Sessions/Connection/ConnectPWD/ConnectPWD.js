import React, { useState } from "react"
import { StyleSheet, Text, useWindowDimensions, View } from "react-native"
import CustomInput from "../../../../components/CustomInput"
import CustomButton from "../../../../components/CustomButton"
import BackButton from "../../../../components/BackButton"
import { useNavigation, useRoute } from "@react-navigation/native"
import { useTranslation } from "react-i18next"
import { auth } from '../../../../../firebaseConfig';
import { signInWithEmailAndPassword, signInWithPhoneNumber, RecaptchaVerifier } from 'firebase/auth';
import axios from 'axios';
import {BASE_URL} from '@env'

const ConnectPWD = () => {
	const { t } = useTranslation()
	const navigation = useNavigation()
	const route = useRoute()
	const [phoneNumber, setPhoneNumber] = useState("+33 " + route.params?.numberPhone || "")
	const [email, setEmail] = useState(route.params?.email || "")
	const [password, setPassword] = useState("")
	const { height } = useWindowDimensions()

	const onSignInPressed = () => {
	// 	try {
	// 		if (email !== ""){
	// 		} else if (phoneNumber !== ""){
	//
	// 		}
	// 		const response = await axios.post(`${BASE_URL}/user`, {
	// 			"phone_number": phoneNumber,
	// 			"first_name": firstName,
	// 			"last_name": lastName,
	// 			"email": email,
	// 			"description": null,
	// 			"password": password,
	// 			"role_id": 2,
	// 			"biography": bio,
	// 			"profile_picture": null,
	// 			"pricing": 0.0,
	// 			"address_id": null,
	// 			"radius": null,
	// 		});
	//
	// 		if (response.status === 201) {
	// 			console.log(`Your account has been created: ${JSON.stringify(response.data)}`);
	// 		}
	// 	} catch (error) {
	// 		console.log("An error has occurred: "+error);
	// 	}
	// };

		if (email) {
			signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				navigation.navigate('Prospect', {screen: 'HomeScreen'})
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				alert(errorMessage);
			});
		}
		// else if (phoneNumber) {
			// const recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
			// 	'size': 'invisible',
			// 	'callback': (response) => {
			// 		// This callback will be called after reCAPTCHA verification
			// 	},
			// });
			//
			// signInWithPhoneNumber(auth, numberPhone, recaptchaVerifier)
			// .then((userCredential) => {
			// 	navigation.navigate('Prospect', {screen: 'HomeScreen'})
			// 	console.warn(userCredential)
			// })
			// .catch((error) => {
			// 	const errorCode = error.code;
			// 	const errorMessage = error.message;
			// 	console.log(errorMessage)
			// 	alert(errorMessage);
			// });
		// }
	}

	const onForgotPasswordPressed = () => {
		navigation.navigate('SignIn', { screen: "PasswordMailConfirmation" })
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

			  <View className={'flex-row justify-between w-full mb-2'}>
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
		marginBottom: 10
	},
	error: {
		color: "red",
		fontWeight: "bold",
		marginBottom: 10
	}
})

export default ConnectPWD