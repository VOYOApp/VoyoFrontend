import React, { useState } from "react"
import { StyleSheet, Text, useWindowDimensions, View, Image, TextInput, ScrollView } from "react-native"
import CustomButton from "../../../../../components/CustomButton"
import CustomInput from "../../../../../components/CustomInput"
import BackButton from "../../../../../components/BackButton"
import { useNavigation, useRoute } from "@react-navigation/native"
import { useTranslation } from "react-i18next"
import { getGlobal, getToken, removeGlobal } from "../../../../../context/AuthContext"
import axios from "axios"
import {BASE_URL} from '@env'

const ValidateRequest = () => {
	const { t } = useTranslation()
	const [btnDisabled, setBtnDisabled] = useState(true)
	const [lastName, setLastName] = useState("")
	const [firstName, setFirstName] = useState("")
	const [bio, setBio] = useState("")
	const [phoneNumber, setPhoneNumber] = useState("")
	const [email, setEmail] = useState("")
	const { height } = useWindowDimensions()
	const navigation = useNavigation()

	const route = useRoute()
	const data = route.params?.data;
	const isValidation = route.params?.isValidation
	let canBan = true;
	if (isValidation){
		canBan = false;
	}
	const StatusRefused = "REFUSED"
	async function acceptRequest(){
		try {
			const token = await getToken()
			let phoneNum = data.phone_number
			phoneNum = phoneNum.slice(1);
			phoneNum = "%2B"+phoneNum;
			const response = await axios.patch(
				`${BASE_URL}/api/user/update?id=${phoneNum}`,
				{ "status": "VALIDATED"},
				{ headers: { Authorization: `Bearer ${token}` } }
			)
			console.log(response.status);
			if (response.status === 200) {
				navigation.goBack()
			}
		} catch (e) {
			console.log(e)
		}
		
	}

	async function rejectRequest(){
		try {
			const token = await getToken()
			let phoneNum = data.phone_number
			phoneNum = phoneNum.slice(1);
			phoneNum = "%2B"+phoneNum;
			const response = await axios.patch(
				`${BASE_URL}/api/user/update?id=${phoneNum}`,
				{ "status": "BANNED"},
				{ headers: { Authorization: `Bearer ${token}` } }
			)
			console.log(response.status);
			if (response.status === 200) {
				navigation.goBack()
			}
		} catch (e) {
			console.log(e)
		}
		
	}

	return (
	  <View style={styles.root}>

		  <BackButton />
		  		{ isValidation &&<Text style={[styles.title]}>{t("admin.validation_request")}</Text>}
				<ScrollView style={{ width: "100%" }}>
					<View style={{ flexDirection: "row", width: "100%" }}>
						<View style={{ justifyContent: "center", width: "30%" }}>
							<Image src={data.profile_picture}
									style={{ width: 100, height: 100, marginRight: 20, borderRadius:100 }} />
						</View>
						<View style={{ marginLeft: 10, width: "65%" }}>
							<TextInput
										value={data.first_name}
										editable={false}
										style={{
											backgroundColor: "#f0f0f0",
											height: 60,
											borderRadius: 18,
											padding: 10,
											color:"black"
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
								<TextInput 
										value={data.last_name}
										editable={false}
										style={{
											backgroundColor: "#f0f0f0",
											height: 60,
											borderRadius: 18,
											padding: 10,
											color:"black"
										}}
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
							value={data.biography}
							maxLength={200}
							editable={false}
							style={{
								backgroundColor: "#f0f0f0",
								height: 60,
								borderRadius: 18,
								padding: 10,
								color:"black"
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

						<TextInput
									value={data.phone_number}
									editable={false}
									style={{
										backgroundColor: "#f0f0f0",
										height: 60,
										borderRadius: 18,
										padding: 10,
										color: "black"
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
						<TextInput
									value={data.email}
									editable={false}
									style={{
										backgroundColor: "#f0f0f0",
										height: 60,
										borderRadius: 18,
										padding: 10,
										color:"black"
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
							<ScrollView horizontal={true} style={{ width: "100%" }}>
								<Image src={data.cni_front}/>
							</ScrollView>
							<ScrollView horizontal={true} style={{ width: "100%" }}>
							<Image src={data.cni_back}/>
							</ScrollView>

							{ isValidation &&<View style={{
							borderBottomColor: "black",
							borderBottomWidth: 1,
							width: 40,
							marginBottom: 5,
							marginTop: 5,
							alignSelf: "center",
						}} />}
					</View>

					{ isValidation &&<CustomButton text={t('admin.accept_request')} onPress={() => acceptRequest()} bgColor={"#FE881B"}/>}
					{ isValidation &&<CustomButton text={t('admin.reject_request')} onPress={() => rejectRequest()}/>}
					{ canBan &&<CustomButton text={t('admin.ban_user')} onPress={() => rejectRequest()}/>}
			  </ScrollView>
		  </View>
	)
}

const styles = StyleSheet.create({
	root: {
		backgroundColor: "white",
		padding: 30,
		width: "100%",
		height: "100%",
		marginTop: 10,
	},
	title: {
		fontSize: 30,
		marginBottom: 10,
		marginTop: 10,
	},
	link: {
		color: "#FE881B",
		marginTop: 10,
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


export default ValidateRequest