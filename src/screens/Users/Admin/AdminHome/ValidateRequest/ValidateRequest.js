import React, { useState } from "react"
import { StyleSheet, Text, useWindowDimensions, View, Image, TextInput, ScrollView } from "react-native"
import CustomButton from "../../../../../components/CustomButton"
import CustomInput from "../../../../../components/CustomInput"
import BackButton from "../../../../../components/BackButton"
import { useNavigation } from "@react-navigation/native"
import { useTranslation } from "react-i18next"

const ConnectPhone = () => {
	const { t } = useTranslation()
	const [btnDisabled, setBtnDisabled] = useState(true)
	const [lastName, setLastName] = useState("")
	const [firstName, setFirstName] = useState("")
	const [bio, setBio] = useState("")
	const [phoneNumber, setPhoneNumber] = useState("")
	const [email, setEmail] = useState("")
	const { height } = useWindowDimensions()
	const navigation = useNavigation()

	function acceptRequest(){
		// TODO : Pass the user status to "validate"
		navigation.goBack()
	}

	function rejectRequest(){
		// TODO : Pass the user status to "refused"
		navigation.goBack()
	}

	return (
	  <View style={styles.root}>

		  <BackButton />
				<Text style={[styles.title]}>{t("admin.validation_request")}</Text>
				<ScrollView style={{ width: "100%" }}>
					<View style={{ flexDirection: "row", width: "100%" }}>
						<View style={{ justifyContent: "center", width: "30%" }}>
							<Image source={require("../../../../../../assets/avatar.png")}
									style={{ width: 100, height: 100, marginRight: 20 }} />
						</View>
						<View style={{ marginLeft: 10, width: "65%" }}>
							<TextInput
										value={firstName}
										setValue={setFirstName}
										placeholder={t("common.first_name")}
										editable={false}
										style={{
											backgroundColor: "#f0f0f0",
											height: 60,
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
								<TextInput 
										value={lastName}
										placeholder={t("common.last_name")}
										setValue={setLastName}
										editable={false}
										style={{
											backgroundColor: "#f0f0f0",
											height: 60,
											borderRadius: 18,
											padding: 10,
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
							placeholder={t("common.bio")}
							value={bio}
							maxLength={200}
							editable={false}
							style={{
								backgroundColor: "#f0f0f0",
								height: 60,
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

						<TextInput
									value={phoneNumber}
									placeholder={t("common.cell_phone_number")}
									setValue={setPhoneNumber}
									editable={false}
									style={{
										backgroundColor: "#f0f0f0",
										height: 60,
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
						<TextInput
									value={email}
									setValue={setEmail}
									editable={false}
									placeholder={t("common.email")}
									style={{
										backgroundColor: "#f0f0f0",
										height: 60,
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
							<ScrollView horizontal={true} style={{ width: "100%" }}>
								<Image source={require("../../../../../../assets/id_recto_template.png")}/>
							</ScrollView>
							<ScrollView horizontal={true} style={{ width: "100%" }}>
								<Image source={require("../../../../../../assets/id_verso_template.png")}/>
							</ScrollView>

						<View style={{
							borderBottomColor: "black",
							borderBottomWidth: 1,
							width: 40,
							marginBottom: 5,
							marginTop: 5,
							alignSelf: "center",
						}} />
					</View>

					<CustomButton text={t('admin.accept_request')} onPress={() => acceptRequest()} bgColor={"#FE881B"}/>
					<CustomButton text={t('admin.reject_request')} onPress={() => rejectRequest()}/>
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


export default ConnectPhone