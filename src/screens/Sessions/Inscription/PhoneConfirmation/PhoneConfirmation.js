import React, { useState } from "react"
import { StyleSheet, Text, useWindowDimensions, View } from "react-native"
import CodeConfirmation from "../../../../components/CodeConfirmation"
import BackButton from "../../../../components/BackButton"
import { useNavigation, useRoute } from "@react-navigation/native"
import { useTranslation } from "react-i18next"

const PhoneConfirmation = () => {
	const { t } = useTranslation()
	const [codeVerification, setCodeVerification] = useState("")

	const { height } = useWindowDimensions()
	const navigation = useNavigation()

	const route = useRoute()
	const numberPhone = route.params?.numberPhone

	const resentCode = () => {
		// TODO: resend phone number to API for get OTP code
	}

	const goToOtpVerification = () => {
		navigation.navigate("PhoneConfirmation")
		// TODO: send phone number to API for get OTP code
	}

	return (
	  <View style={styles.root}>
		  <BackButton />
		  <View style={{ width: "100%" }}>
			  <Text style={styles.title}>{t("common.register_to_voyo")}</Text>
			  <Text style={{
				  marginBottom: 20,
				  width: "75%",
			  }}>{t("common.verification_code_sent", { phone: "+33 " + numberPhone })}</Text>

			  <CodeConfirmation placeHolder={t("common.cell_phone_number")}
			                    value={codeVerification}
			                    setValue={setCodeVerification}
			                    navigated={"RegisterMail"}
			                    params={{ numberPhone: numberPhone }}
			  />
			  <Text onPress={resentCode} style={styles.link}>{t("common.resend_code")}</Text>
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
		marginTop: 10,
	},
	link: {
		color: "#FE881B",
		marginTop: 10,
	},
})

export default PhoneConfirmation