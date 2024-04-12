import React, { useEffect, useState } from "react"
import { Image, StyleSheet, Switch, Text, TextInput, TouchableOpacity, useWindowDimensions, View } from "react-native"
import CustomInput from "../../../components/CustomInput"
import CustomButton from "../../../components/CustomButton"
import CustomHeader from "../../../components/CustomHeader"
import CustomFooter from "../../../components/CustomFooter"
import { useTranslation } from "react-i18next"
import { getGlobal, getToken, storeGlobal, storeToken } from "../../../context/AuthContext"
import { jwtDecode } from "jwt-decode"
import axios from "axios"

const UserPage = ({ navigation }) => {
	const { t } = useTranslation()
	const { height } = useWindowDimensions()

	const [avatar, setAvatar] = useState("https://gravatar.com/avatar/94d45dbdba988afacf30d916e7aaad69?s=200&d=mp&r=x")
	const [lastName, setLastName] = useState("")
	const [firstName, setFirstName] = useState("")
	const [bio, setBio] = useState("")
	const [phoneNumber, setPhoneNumber] = useState("")
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [passwordConfirmation, setPasswordConfirmation] = useState("")
	const [isEnabled, setIsEnabled] = useState(false)
	const [btnDisabled, setBtnDisabled] = useState(false)
	const [switchDisabled, setSwitchDisabled] = useState(false)
	const [asVisitorAccount, setAsVisitorAccount] = useState(false)
	const [isValidated, setIsValidated] = useState(false)

	const applyChanges = async () => {
		try {
			setBtnDisabled(true)
			getGlobal("user_details").then(async (user) => {
				await getToken().then(async (token) => {
					let decodedToken = jwtDecode(token)
					const idRole = isEnabled === true ? 2 : 1
					await axios.put(`${process.env.BASE_URL}/api/user`, {
						"first_name": firstName,
						"last_name": lastName,
						"email": email,
						"biography": bio,
					}, {
						headers: { Authorization: `Bearer ${token}` },
					}).then(async (result) => {
						if (result.status === 204) {
							const result = {
								"first_name": firstName,
								"last_name": lastName,
								"email": user?.email,
								"biography": bio,
								"profile_picture": user?.profile_picture,
								"pricing": user?.pricing,
								"radius": user?.radius,
								"x": user?.x,
								"y": user?.y,
								"password": user?.password,
							}
							await storeGlobal("user_details", JSON.stringify(result)).then(async () => {
								idRole === 2 ? navigation.replace("Prospect", { screen: "HomeProspect" }) : navigation.replace("Visitor", { screen: "HomeProspect" })
							})
						}
					})
				})
			})
		} catch (e) {
			setBtnDisabled(false)
			console.log("Error update user : " + e)
		}
	}

	const handleBioChange = (text) => {
		setBio(text)
	}

	const goToResetPwd = () => {
		navigation.navigate("Common", { screen: "ResetPWD" })
	}


	const toggleSwitch = () => {
		setIsEnabled(previousState => !previousState)
		try {
			setSwitchDisabled(true)
			getGlobal("user_details").then(async (user) => {
				await getToken().then(async (token) => {
					let decodedToken = jwtDecode(token)
					const idRole = isEnabled === true ? 2 : 1
					await axios.put(`${process.env.BASE_URL}/api/user`, {
						"role_id": idRole,
					}, {
						headers: { Authorization: `Bearer ${token}` },
					}).then(async (result) => {
						if (result.status === 204) {
							await axios.get(`${process.env.BASE_URL}/api/user/login`, {
								params: {
									"phone_number": decodedToken?.phone_number || "",
									"password": user?.password || "",
								},
							}).then(async (newToken) => {
								await storeToken(newToken.data.token).then(setTimeout(() => {
									idRole === 2 ? navigation.replace("Prospect", { screen: "HomeProspect" }) : navigation.replace("Visitor", { screen: "HomeProspect" })
								}, 1000))
							})
						}
					})
				})
			})
		} catch (e) {
			setSwitchDisabled(false)
			console.log("Error update role user : " + e)
		}
	}

	useEffect(() => {
		getGlobal("user_details").then(async (user) => {
			await getToken().then((token) => {
				const decodedToken = jwtDecode(token)
				setLastName(user.last_name)
				setFirstName(user.first_name)
				setAvatar(user.profile_picture)
				setBio(user.biography)
				setEmail(user.email)
				setPhoneNumber(decodedToken.phone_number)

				user?.x === null || user?.y === null ? setAsVisitorAccount(false) : setAsVisitorAccount(true)
				decodedToken?.role === "VISITOR" ? setIsEnabled(true) : setIsEnabled(false)
			})
		})
	}, [])

	return (
	  <View style={styles.root}>
		  <CustomHeader />


		  <View style={styles.body}>
			  <View style={{ flexDirection: "row", width: "100%" }}>
				  <View style={{ justifyContent: "center", width: "30%" }}>
					  <Image src={avatar}
					         style={{ width: 100, height: 100, marginRight: 20, borderRadius: 100 }} />
				  </View>
				  <View style={{ marginLeft: 10, width: "65%" }}>
					  <CustomInput placeHolder={t("common.first_name")}
					               value={firstName}
					               setValue={setFirstName}
					               showPen={true}
					  />
					  <CustomInput placeHolder={t("common.last_name")}
					               value={lastName}
					               setValue={setLastName}
					               showPen={true}
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
					placeholder={t("common.bio")}
					value={bio}
					onChangeText={handleBioChange}
					maxLength={200}
					editable={true}
					style={{
						backgroundColor: "#f0f0f0",
						height: 60,
						borderRadius: 18,
						padding: 10,
					}}
					showPen={true}
				  />

				  <View style={{
					  borderBottomColor: "black",
					  borderBottomWidth: 1,
					  width: 40,
					  marginBottom: 5,
					  marginTop: 5,
					  alignSelf: "center",
				  }} />

				  <View>
					  <CustomInput placeHolder={t("common.cell_phone_number")}
					               value={phoneNumber}
					               setValue={setPhoneNumber}
					               showPen={true}
					               editable={false}
					  />
					  <CustomInput placeHolder={t("common.email")}
					               value={email}
					               setValue={setEmail}
					               showPen={true}
					               editable={false}
					  />

					  <TouchableOpacity className={"w-full mb-8 ml-2"}>
						  <Text onPress={goToResetPwd} style={styles.link}>{t("common.forgot_password")}</Text>
					  </TouchableOpacity>
				  </View>

			  <View style={{
				  borderBottomColor: "black",
				  borderBottomWidth: 1,
				  width: 40,
				  marginBottom: 5,
				  marginTop: 5,
				  alignSelf: "center",
			  }} />

				  {asVisitorAccount === true ? (
				    <View style={{
					    display: "flex",
					    alignItems: "center",
					    justifyContent: "center",
					    flexDirection: "row",
					    marginBottom: 10,
					    width: "100%",
				    }}>
					    <Text style={{ textAlign: "center", width: "45%" }}>{t("common.prospect")}</Text>
					    <Switch
						  style={{ marginLeft: 10, marginRight: 10 }}
						  trackColor={{ false: "#767577", true: "#FE881B" }}
						  thumbColor={isEnabled ? "#D9D9D9" : "#f4f3f4"}
						  ios_backgroundColor="#3e3e3e"
						  onValueChange={toggleSwitch}
						  value={isEnabled}
						  disabled={switchDisabled}
					    />
					    <Text style={{ textAlign: "center", width: "45%" }}>{t("common.visitor")}</Text>
				    </View>
				  ) : null}

			  </View>
			  <CustomButton deactivated={btnDisabled} text={t("common.apply_changes")} onPress={applyChanges}
			                bgColor={"black"} />
		  </View>

		  <CustomFooter currentOption={"home"} />
	  </View>
	)
}


const styles = StyleSheet.create({
	root: {
		width: "100%",
		height: "100%",
		// backgroundColor: "#100902"
	},
	body: {
		padding: 20,
	},
	title: {
		fontSize: 28,
		// fontWeight: 'bold',
		marginBottom: 10,
	},
	passwordValidation: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
	},
	link: {
		color: "#FE881B",
	},
})

export default UserPage