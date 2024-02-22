import React, { useState } from "react"
import { StyleSheet, Text, TextInput, useWindowDimensions, View } from "react-native"
import CodeConfirmation from "../../../../components/CodeConfirmation"
import BackButton from "../../../../components/BackButton"
import { useNavigation, useRoute } from "@react-navigation/native"
import { useTranslation } from "react-i18next"
import CustomButton from "../../../../components/CustomButton"
import CustomInput from "../../../../components/CustomInput"

const AdditionalDetailsVisitor = () => {
	const { t } = useTranslation()
	const [btnDisabled, setBtnDisabled] = useState(false)
	const [address, setAddress] = useState("")
	const [radius, setRadius] = useState(100)

	const { height } = useWindowDimensions()
	const navigation = useNavigation()

	const route = useRoute()
	// const user = route.params?.user

	const onRegisterPressed = () => {
		// TODO: resend phone number to API for get OTP code
	}

	const goToOtpVerification = () => {
		// navigation.navigate('RegisterAdditionnalDetails', {numberPhone: phoneNumber, mail:user.mail})
		//navigation.navigate('RegisterAdditionnalDetails')
		// TODO: send phone number to API for get OTP code
	}

	return (
	  <View style={styles.root}>
		  <BackButton />
		  <View className={'w-full h-full'}>
			  <Text style={styles.title}>{t("common.register_to_voyo")}</Text>
			  <Text style={{ marginBottom: 20 }}>{t("common.other_information")}</Text>

			  <View className={'h-full'}>
				  <View className={'h-1/2 w-full rounded-3xl bg-gray-200 p-2 items-center mb-40'}>
					  <Text style={styles.subtitle}>{t("common.reference_address")}</Text>
					  <Text className={'text-start text-sm leading-4 mb-2'}>{t("common.address_description")}</Text>
					  <View className={'h-full w-full'}>
						  <View className={'items-start w-full h-full'}>
							  <View className={'flex-row items-center mb-2'}>
								  <Text>Adresse : </Text>
								  <TextInput value={address}
								             onChangeText={setAddress}
								             placeholder="adresse"
								             editable={true}
								             className={'bg-[#F0F0F0] w-60 h-10 p-3 rounded-3xl'}>
								  </TextInput>
							  </View>

							  <View className={'flex-row items-center'}>
								  <Text>Rayon : </Text>
								  <TextInput value={radius}
								             onChangeText={setRadius}
								             placeholder="radius"
								             editable={true}
								             maxLength={6}
								             keyboardType="decimal-pad"
								             className={'bg-[#F0F0F0] w-20 h-10 p-3 rounded-3xl'}>
								  </TextInput>
							  </View>

						  </View>
					  </View>
				  </View>
				  <View>
					  <CustomButton text={t("common.register")} onPress={onRegisterPressed} bgColor={"black"} deactivated={btnDisabled} />
				  </View>
			  </View>

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
	subtitle: {
		fontSize: 18,
		marginBottom: 5,
		fontWeight:"400",
	},
	link: {
		color: "#FE881B",
		marginTop: 10,
	},
})

export default AdditionalDetailsVisitor