import React, { useState } from "react"
import { Image, StyleSheet, TextInput, useWindowDimensions, View } from "react-native"
import CustomInput from "../../../components/CustomInput"
import CustomButton from "../../../components/CustomButton"
import CustomHeader from "../../../components/CustomHeader"
import CustomFooter from "../../../components/CustomFooter"
import { useNavigation } from "@react-navigation/native"
import { useTranslation } from "react-i18next"


const UserPage = () => {
	const { t } = useTranslation()
	const [lastName, setLastName] = useState("")
	const [firstName, setFirstName] = useState("")
	const [bio, setBio] = useState("")
	const [phoneNumber, setPhoneNumber] = useState("")
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [passwordConfirmation, setPasswordConfirmation] = useState("")
	const [isEnabled, setIsEnabled] = useState(false)
	const [isValidated, setIsValidated] = useState(false)
	const toggleSwitch = () => setIsEnabled(previousState => !previousState)
	const navigation = useNavigation()

	const { height } = useWindowDimensions()
	// const navigation = useNavigation()

	const applyChanges = () => {
		console.warn("Updated infos")
		// navigation.navigate('HomeScreen')
	}

	const handleBioChange = (text) => {
		setBio(text)
	}

	return (
	  <View style={styles.root}>
		  <CustomHeader />


		  <View style={styles.body}>
			  <View style={{ flexDirection: "row", width: "100%" }}>
				  <View style={{ justifyContent: "center", width: "30%" }}>
					  <Image source={require("../../../../assets/avatar.png")}
					         style={{ width: 100, height: 100, marginRight: 20 }} />
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
					editable={false}
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

				  <CustomInput placeHolder={t("common.cell_phone_number")}
				               value={phoneNumber}
				               setValue={setPhoneNumber}
				               showPen={true}
				  />
				  <CustomInput placeHolder={t("common.email")}
				               value={email}
				               setValue={setEmail}
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
					  <CustomInput placeHolder={t("common.password")}
					               value={password}
					               setValue={setPassword}
					               secureTextEntry
					               showPen={true}
					  />

					  <CustomInput placeHolder={t("common.confirm_password")}
					               value={passwordConfirmation}
					               setValue={setPasswordConfirmation}
					               secureTextEntry
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

			  {/* <View style={{ display: "flex", alignItems: "center", justifyContent:'center', flexDirection: "row", marginBottom: 10, width:'100%' }}>
            <Text style={{textAlign:'center', width: '30%'}}>Je souhaite visiter des biens immobiliers</Text>
            <Switch
              style={{marginLeft: 10, marginRight: 10}}
              trackColor={{ false: "#767577", true: "#FE881B" }}
              thumbColor={isEnabled ? "#D9D9D9" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
            <Text style={{textAlign:'center', width: '30%'}}>Je souhaite faire visiter des biens immobiliers</Text>
          </View> */}

			  <CustomButton text={t("common.apply_changes")} onPress={applyChanges} bgColor={"black"} />
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
	gradientBackground: {
		...StyleSheet.absoluteFillObject,
	},
})

export default UserPage