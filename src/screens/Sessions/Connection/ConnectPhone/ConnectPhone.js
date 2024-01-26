import React, { useState } from "react"
import { StyleSheet, Text, useWindowDimensions, View } from "react-native"
import CustomPhoneNumber from "../../../../components/CustomPhoneNumber"
import CustomButton from "../../../../components/CustomButton"
import BackButton from "../../../../components/BackButton"
import { useNavigation } from "@react-navigation/native"
import { useTranslation } from "react-i18next"

const ConnectPhone = () => {
	const { t } = useTranslation()
	const [phoneNumber, setPhoneNumber] = useState("")
	const [btnDisabled, setBtnDisabled] = useState(true)

	const { height } = useWindowDimensions()
	const navigation = useNavigation()

	const formattedPhoneNumber = (numero) => {
		const cleanedInput = numero.replace(/\D/g, "")
		let formattedNumber = cleanedInput.startsWith("0") ? cleanedInput.slice(1) : cleanedInput
		formattedNumber = formattedNumber.replace(/(\d{1})(\d{2})(\d{2})(\d{2})(\d{2})/, "$1 $2 $3 $4 $5")
		return formattedNumber
	}

	const handleNumChange = (num) => {
		const phoneFormatRegex = /^[6|7]{1,2}\s\d{2}\s\d{2}\s\d{2}\s\d{2}$/

		const numeroFormate = formattedPhoneNumber(num)
		setPhoneNumber(numeroFormate)

		setBtnDisabled(!phoneFormatRegex.test(numeroFormate) || numeroFormate.replace(/\s/g, "").length !== 9)
	}

	const gotToConnectEmail = () => {
		navigation.navigate("SignIn", { screen: "ConnectEmail" })
	}

	const goToPwdVerification = (phoneNumber) => {
		navigation.navigate("SignIn", { screen: "ConnectPWD", params: { numberPhone: phoneNumber } })
		// TODO: send phone number to API for get OTP code
	}

	return (
	  <View style={styles.root}>

		  <BackButton />

		  <View className={'w-full mb-3'}>
			  <Text style={[styles.title]}>{t("common.connection_to_voyo")}</Text>

			  <CustomPhoneNumber placeHolder={t("common.cell_phone_number")}
			                     value={phoneNumber}
			                     setValue={handleNumChange}
			  />
		  </View>

		  <CustomButton text="Suivant" onPress={() => goToPwdVerification(phoneNumber)} bgColor={"black"}
		                deactivated={btnDisabled} />

		  <View className={'w-full flex-row items-center justify-around mt-4'}>
			  <View className="border-b-black border-b-[1px] w-1/3" />
			  <Text>ou</Text>
			  <View className="border-b-black border-b-[1px] w-1/3" />
		  </View>

		  <View className={'w-full flex-row items-center justify-center mt-4'}>

		  </View>
		  <CustomButton text={t('common.continue_with_email')} onPress={() => gotToConnectEmail()} bgColor={"#FE881B"}/>
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


export default ConnectPhone