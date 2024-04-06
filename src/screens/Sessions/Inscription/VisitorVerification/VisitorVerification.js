import React, { useEffect, useRef, useState } from "react"
import {
	Image,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	useWindowDimensions,
	View,
} from "react-native"
import BackButton from "../../../../components/BackButton"
import { useNavigation, useRoute } from "@react-navigation/native"
import { useTranslation } from "react-i18next"
import CustomButton from "../../../../components/CustomButton"
import Images from "../../../../../assets"
import GMapInscription from "../../../../components/GMapInscription"
import { Icon } from "react-native-paper"
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete"
import AvailabilityCard from "../../../../components/AvailabilityCard"
import CriteriaCard from "../../../../components/CriteriaCard"
import DateTimePickerModal from "react-native-modal-datetime-picker"
import CustomInput from "../../../../components/CustomInput"
import UploadButton from "../../../../components/UploadButton"
import axios from "axios"
import { storeGlobal, storeToken } from "../../../../context/AuthContext"
import { jwtDecode } from "jwt-decode"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { auth } from "../../../../../firebaseConfig"
import { BASE_URL } from "@env"

const VisitorVerification = () => {
	const { t } = useTranslation()
	const [btnDisabled, setBtnDisabled] = useState(true)
	const [frontImage, setFrontImage] = useState(null);
	const [backImage, setBackImage] = useState(null);

	const { height } = useWindowDimensions()
	const navigation = useNavigation()
	const route = useRoute()
	const user = route.params?.user

	const onRegisterPressed = async () => {
		try {
			setBtnDisabled(true)

			const response = await axios.post(`${BASE_URL}/api/user`, {
				"phone_number": user.phone_number,
				"first_name": user.first_name,
				"last_name": user.last_name,
				"email": user.email,
				"password": user.password,
				"role_id": user.role_id,
				"biography": user.biography,
				"profile_picture": user.profile_picture,
				"pricing": parseFloat(user.pricing),
				"address_id": user.address_id,
				"radius": user.radius,
				"cni_front": frontImage,
				"cni_back": backImage,
			})

			if (response.status === 201) {
				console.log(`Your account has been created: ${JSON.stringify(response.data)}`)
				await storeToken(response.data.token).then(setTimeout(async () => {
					console.log("Token stored successfully")

					try {
						const decodedToken = jwtDecode(response.data.token)
						// console.log(decodedToken?.phone_number)

						const user_info = await axios.get(`${BASE_URL}/api/user`, {
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
								"profil_picture": user_info.data?.profile_picture,
								"pricing": user_info.data?.pricing,
								"radius": user_info.data?.radius,
								"x": user_info.data?.x,
								"y": user_info.data?.y,
								"password": password
							}
							await storeGlobal('user_details', JSON.stringify(result)).then(() => {
								console.log('User details stored successfully');
								console.log(result.email)
								try {
									createUserWithEmailAndPassword(auth, result.email, result.password)
									.then((userCredential) => {
										// Registered
										const user = userCredential.user

										// Mettez à jour le profil de l'utilisateur avec le nom et l'avatar
										updateProfile(user, {
											displayName: result.first_name + " " + result.last_name,
											photoURL: result.profil_picture ? result.profil_picture : "https://gravatar.com/avatar/94d45dbdba988afacf30d916e7aaad69?s=200&d=mp&r=x",
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
												console.error(error.message)
											})
										})
										.catch((error) => {
											// Gérez les erreurs liées à la mise à jour du profil
											console.error(error.message)
										})
									})
									.catch((error) => {
										// Gérez les erreurs liées à la création de l'utilisateur avec e-mail et mot de passe
										const errorCode = error.code
										const errorMessage = error.message
										console.log(errorCode)
										console.log(errorMessage)
									})
								}catch (e){
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

	const updateFrontImage = (image) => {
		setFrontImage(image);
	}

	const updateBackImage = (image) => {
		setBackImage(image);
	}

	useEffect(() => {
		if (frontImage !== null && backImage !== null) {
			setBtnDisabled(false);
		}else {
			setBtnDisabled(true);
		}
	}, [frontImage, backImage])

	return (
	  <View style={styles.root}>
		  <BackButton />
		  <View className={"w-full h-full"}>
			  <Text style={styles.title}>{t("common.register_to_voyo")}</Text>
			  <Text style={{ marginBottom: 10 }}>{t("common.other_information")}</Text>

			  <View className={"h-full w-full"}>
				  <View className={"h-full w-full"}>
					  <View className={"w-full h-1/2 rounded-3xl bg-gray-200"}>
						  <Text style={styles.subtitle}>{t("common.identity_card")}</Text>
						  <Text className={"text-justify text-xs p-3 leading-4"}>{t("common.identity_card_description")}</Text>

						  <View className={'p-3'}>
							  <Text className={"text-md font-semibold w-3/4 items-start"}>{t("common.identity_card_front")}</Text>
							  <UploadButton asGallery={true} asCamera={true} asRemove={true} setImages={updateFrontImage}></UploadButton>

							  <Text className={"text-md font-semibold w-3/4 items-start mt-6"}>{t("common.identity_card_back")}</Text>
							  <UploadButton asGallery={true} asCamera={true} asRemove={true} setImages={updateBackImage}></UploadButton>
						  </View>
					  </View>

					  <View className={"h-full w-full mt-4 items-center"}>
						  <View className={"w-2/3"}>
						    <CustomButton text={t("common.register")} onPress={onRegisterPressed} bgColor={"orange"}
						                deactivated={btnDisabled} />
						  </View>
					  </View>
				  </View>
			  </View>
		  </View>
	  </View>
	)
}

const styles = StyleSheet.create({
	root: {
		backgroundColor: "white",
		padding: 20,
		marginTop: 10,
		width: "100%",
		height: "100%",
	},
	title: {
		fontSize: 30,
		marginBottom: 10,
		marginTop: 10,
	},
	subtitle: {
		textAlign: "center",
		fontSize: 18,
		fontWeight: "400",
		padding: 3,
	},
})

export default VisitorVerification