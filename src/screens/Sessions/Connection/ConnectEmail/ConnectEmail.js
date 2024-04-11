import React, { useState } from "react"
import { StyleSheet, Text, useWindowDimensions, View } from "react-native"
import CustomButton from "../../../../components/CustomButton"
import BackButton from "../../../../components/BackButton"
import { useNavigation } from "@react-navigation/native"
import { useTranslation } from "react-i18next"
import CustomInput from "../../../../components/CustomInput"

const ConnectEmail = () => {
	const { t } = useTranslation()
	const [email, setEmail] = useState("")
	const [btnDisabled, setBtnDisabled] = useState(true)

	const { height } = useWindowDimensions()
	const navigation = useNavigation()

	const handleMailChange = (mail) => {
		const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{1,}$/
		setEmail(mail)
		setBtnDisabled(prevState => !emailRegex.test(mail))
	}

	const gotToConnectPhone = () => {
		navigation.navigate("SignIn", { screen: "ConnectPhone" })
	}

	const goToPwdVerification = (mail) => {
		navigation.navigate("SignIn", { screen: "ConnectPWD", params: { email: mail } })
	}

	return (
	  <View style={styles.root}>

		  <BackButton />

		  <View className={"w-full mb-3"}>
			  <Text style={[styles.title]}>{t("common.connection_to_voyo")}</Text>

			  <CustomInput placeHolder={t("common.enter_your_email")}
			               value={email}
			               setValue={handleMailChange}
			               editabled={false}
			               inputype={"emailAddress"}
			  />
		  </View>

		  <CustomButton text="Suivant" onPress={() => goToPwdVerification(email)} bgColor={"black"}
		                deactivated={btnDisabled} />

		  <View className={"w-full flex-row items-center justify-around mt-4"}>
			  <View className="border-b-black border-b-[1px] w-1/3" />
			  <Text>ou</Text>
			  <View className="border-b-black border-b-[1px] w-1/3" />
		  </View>

		  <View className={"w-full flex-row items-center justify-center mt-4"}>

		  </View>
		  <CustomButton text={t("common.continue_with_phone")} onPress={() => gotToConnectPhone()}
		                bgColor={"#FE881B"} />
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
})

export default ConnectEmail