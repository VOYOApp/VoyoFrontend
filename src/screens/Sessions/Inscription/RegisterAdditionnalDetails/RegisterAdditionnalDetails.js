import React, { useState } from "react"
import {
	Image,
	KeyboardAvoidingView,
	Platform,
	StyleSheet,
	Switch,
	Text,
	TextInput,
	useWindowDimensions,
	View,
} from "react-native"
import { useNavigation, useRoute } from "@react-navigation/native"
import CustomInput from "../../../../components/CustomInput"
import CustomButton from "../../../../components/CustomButton"
import BackButton from "../../../../components/BackButton"
import { auth } from "../../../../../firebaseConfig"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import axios from "axios"
import { useTranslation } from "react-i18next"
import { storeGlobal, storeToken } from "../../../../context/AuthContext"
import { jwtDecode } from "jwt-decode"
import Password from "../../../../components/Password"

const RegisterAdditionnalDetails = () => {
	const { t } = useTranslation()
	const route = useRoute()
	const user = route.params?.user

	const [avatar, setAvatar] = useState("https://gravatar.com/avatar/94d45dbdba988afacf30d916e7aaad69?s=200&d=mp&r=x")
	const [lastName, setLastName] = useState("")
	const [firstName, setFirstName] = useState("")
	const [bio, setBio] = useState("")
	const [phoneNumber, setPhoneNumber] = useState("+33 " + user.number || "")
	const [email, setEmail] = useState(user.email || "")
	const [password, setPassword] = useState("")
	const [passwordConfirmation, setPasswordConfirmation] = useState("")
	const [isValidPwd, setIsValidPwd] = useState(false)

	const [isEnabled, setIsEnabled] = useState(false)
	const [btnDisabled, setBtnDisabled] = useState(true)

	const [isLengthValid, setIsLengthValid] = useState(false)
	const [hasSpecialChar, setHasSpecialChar] = useState(false)
	const [hasNumber, setHasNumber] = useState(false)
	const [hasUpperCase, setHasUpperCase] = useState(false)

	const { height } = useWindowDimensions()
	const navigation = useNavigation()

	const allCriteriaIsValid = (fn, ls, description, vpsw) => {
		let isValid = vpsw && ls !== "" && fn !== "" && description !== ""
		setBtnDisabled(!isValid)
	}
	const handleLastNameChange = (text) => {
		setLastName(text)
		allCriteriaIsValid(firstName, text, bio, isValidPwd)
	}
	const handleFirstNameChange = (text) => {
		setFirstName(text)
		allCriteriaIsValid(text, lastName, bio, isValidPwd)
	}

	const handleBioChange = (text) => {
		setBio(text)
		allCriteriaIsValid(firstName, lastName, text, isValidPwd)
	}

	const toggleSwitch = () => setIsEnabled(previousState => !previousState)

	const onRegisterPressed = async () => {
		try {
			setBtnDisabled(true)

			const response = await axios.post(`${process.env.BASE_URL}/api/user`, {
				"phone_number": phoneNumber.replaceAll(" ", ""),
				"first_name": firstName,
				"last_name": lastName,
				"email": email,
				"password": password,
				"role_id": 2,
				"biography": bio,
				"profile_picture": avatar,
				"pricing": null,
				"address_id": null,
				"radius": null,
			})

			if (response.status === 201) {
				console.log(`Your account has been created: ${JSON.stringify(response.data)}`)
				await storeToken(response.data.token).then(setTimeout(async () => {

					try {
						const decodedToken = jwtDecode(response.data.token)
						// console.log(decodedToken?.phone_number)

						const user_info = await axios.get(`${process.env.BASE_URL}/api/user`, {
							headers: { Authorization: `Bearer ${response.data.token}` },
							// params: {
							// 	id: decodedToken?.phone_number,
							// },
						})
						if (user_info.status === 200) {
							const result = {
								"first_name": user_info.data?.first_name,
								"last_name": user_info.data?.last_name,
								"email": user_info.data?.email,
								"biography": user_info.data?.biography,
								"profile_picture": user_info.data?.profile_picture,
								"pricing": user_info.data?.pricing,
								"radius": user_info.data?.radius,
								"x": user_info.data?.x,
								"y": user_info.data?.y,
								"password": password,
							}
							await storeGlobal("user_details", JSON.stringify(result)).then(() => {
								try {
									createUserWithEmailAndPassword(auth, result.email, result.password)
									.then((userCredential) => {
										// Registered
										const user = userCredential.user

										// Mettez à jour le profil de l'utilisateur avec le nom et l'avatar
										updateProfile(user, {
											displayName: result.first_name + " " + result.last_name,
											photoURL: result.profile_picture ? result.profile_picture : "https://gravatar.com/avatar/94d45dbdba988afacf30d916e7aaad69?s=200&d=mp&r=x",
										})
										.then(() => {
											// Enregistrement réussi, mettez à jour le numéro de téléphone
											user.phoneNumber = decodedToken?.phone_number

											// Mettez à jour l'objet utilisateur dans Firebase
											auth.updateCurrentUser(user)
											.then(() => {
												// Numéro de téléphone mis à jour avec succès
												// console.log("Numéro de téléphone mis à jour avec succès :", user)
												navigation.navigate("Prospect", { screen: "ProspectHome" })
											})
											.catch((error) => {
												// Gérez les erreurs liées à la mise à jour du numéro de téléphone
												console.log(error.message)
											})
										})
										.catch((error) => {
											// Gérez les erreurs liées à la mise à jour du profil
											console.log(error.message)
										})
									})
									.catch((error) => {
										// Gérez les erreurs liées à la création de l'utilisateur avec e-mail et mot de passe
										console.log(error.code)
										console.log(error.message)
									})
								} catch (e) {
									console.log("An error has occurred: " + e)
								}
							})
						}
					} catch (error) {
						console.log("An error has occurred: " + error)
						setBtnDisabled(false)
					}
				}, 1000))
			}
		} catch (error) {
			setBtnDisabled(false)
			alert("An error has occurred: " + error)
			console.log("An error has occurred: " + error)
		}
	}

	const onNextPressed = () => {
		navigation.navigate("SignUp", {
			screen: "AdditionalDetailsVisitor",
			params: {
				user: {
					phone_number: phoneNumber.replaceAll(" ", ""),
					first_name: firstName,
					last_name: lastName,
					email: email,
					password: password,
					role_id: 1,
					biography: bio,
					profile_picture: avatar,
				},
			},
		})
	}

	const renderButton = () => {
		if (isEnabled) {
			return (
			  <CustomButton text={t("common.next")} onPress={onNextPressed} bgColor={"#FE881B"}
			                deactivated={btnDisabled} />
			)
		} else {
			return (
			  <CustomButton text={t("common.register")} onPress={onRegisterPressed} bgColor={"black"}
			                deactivated={btnDisabled} />
			)
		}
	}

	return (
	  <KeyboardAvoidingView style={styles.bottomContainer} behavior={Platform.OS === "ios" ? "padding" : "height"}>
		  <View style={styles.root}>
			  <BackButton />

			  <Text style={styles.title}>Inscription à VOYO</Text>
			  <Text style={{ fontSize: 12, fontWeight: "300" }}>fin de finaliser votre inscription, nous
				  avons besoin d’informations supplémentaires.</Text>

			  <View style={{ display: "flex", flexDirection: "row", width: "100%" }}>
				  <View style={{ display: "flex", justifyContent: "center", width: "30%" }}>
					  <Image source={require("../../../../../assets/avatar.png")}
					         style={{ width: 100, height: 100, marginRight: 20 }} />
				  </View>
				  <View style={{ width: "70%" }}>
					  <CustomInput placeHolder="First Name"
					               value={firstName}
					               setValue={handleFirstNameChange}
					               inputype="name"
					  />
					  <CustomInput placeHolder="Last Name"
					               value={lastName}
					               setValue={handleLastNameChange}
					               inputype="familyName"
					  />
				  </View>
			  </View>

			  <View style={{
				  borderBottomColor: "black",
				  borderBottomWidth: 1,
				  width: 40,
				  marginBottom: 5,
				  marginTop: 5,
				  alignSelf: "center",
			  }} />


			  <View>
				  <TextInput
					multiline={true}
					placeholder="Bio"
					value={bio}
					onChangeText={handleBioChange}
					maxLength={400}
					style={{
						backgroundColor: "#f0f0f0",
						height: 50,
						borderRadius: 18,
						padding: 10,
					}}
				  />

				  <View style={{
					  borderBottomColor: "black",
					  borderBottomWidth: 1,
					  width: 40,
					  marginBottom: 5,
					  marginTop: 5,
					  alignSelf: "center",
				  }} />

				  <CustomInput placeHolder="Phone Number"
				               value={phoneNumber}
				               setValue={setPhoneNumber}
				               editable={false}
				  />
				  <CustomInput placeHolder="Email"
				               value={email}
				               setValue={setEmail}
				               editable={false}
				  />

				  <View style={{
					  borderBottomColor: "black",
					  borderBottomWidth: 1,
					  width: 40,
					  marginBottom: 5,
					  marginTop: 5,
					  alignSelf: "center",
				  }} />

				  <Password setIsValidPwd={(isValidPwd) => {
					  setIsValidPwd(isValidPwd)
					  allCriteriaIsValid(firstName, lastName, bio, isValidPwd)
				  }} setPassword={(password) => {
					  setPassword(password)
				  }} setPasswordConfirmation={(passwordConfirmation) => {
					  setPasswordConfirmation(passwordConfirmation)
				  }}></Password>
			  </View>

			  <View style={{
				  borderBottomColor: "black",
				  borderBottomWidth: 1,
				  width: 40,
				  marginBottom: 5,
				  marginTop: 5,
				  alignSelf: "center",
			  }} />

			  <View style={{
				  display: "flex",
				  alignItems: "center",
				  justifyContent: "center",
				  flexDirection: "row",
				  marginBottom: 10,
				  width: "100%",
			  }}>
				  <Text style={{ textAlign: "center", width: "45%" }}>{t("common.create_prospect_account")}</Text>
				  <Switch
					style={{ marginLeft: 10, marginRight: 10 }}
					trackColor={{ false: "#767577", true: "#FE881B" }}
					thumbColor={isEnabled ? "#D9D9D9" : "#f4f3f4"}
					ios_backgroundColor="#3e3e3e"
					onValueChange={toggleSwitch}
					value={isEnabled}
				  />
				  <Text style={{ textAlign: "center", width: "45%" }}>{t("common.create_visitor_account")}</Text>
			  </View>

			  {renderButton()}

		  </View>
	  </KeyboardAvoidingView>
	)
}


const styles = StyleSheet.create({
	root: {
		backgroundColor: "white",
		marginTop: 10,
		justifyContent: "center",
		padding: 30,
		// width: "100%",
		// height: "100%",
	},
	bottomContainer: {
		width: "100%",
	},
	title: {
		fontSize: 28,
		// marginBottom: 10,
		// marginTop: 10,
	},
	passwordValidation: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
	},
})

export default RegisterAdditionnalDetails