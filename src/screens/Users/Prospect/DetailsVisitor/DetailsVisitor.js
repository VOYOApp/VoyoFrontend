import React, { useState } from "react"
import { Image, StyleSheet, TextInput, useWindowDimensions, View, Text } from "react-native"
import CustomInput from "../../../../components/CustomInput"
import CustomButton from "../../../../components/CustomButton"
import BackButton from "../../../../components/BackButton"
import { useNavigation } from "@react-navigation/native"
import { useTranslation } from "react-i18next"


const DetailsVisitor = () => {
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

	return (
	  <View style={styles.root}>
		  <View className={"bg-orange-400 w-full h-full pt-10 pl-6 pr-6"}>
			  <BackButton />

			  <View className={'flex-row items-center'}>
				  <Image
				    src={"https://2.bp.blogspot.com/-0rLFh_JbOzQ/VVTtjHV98DI/AAAAAAAAB6M/cOJ84R_cUpk/s1600/whatsappimages%2Bfunny%2Bdp%2B(9).jpg"}
				    style={[styles.profilePic, { height: height }]}
				    resizeMode="contain" />
				  <View>
					  <Text style={styles.title}>Yohann Chavanel</Text>
				  </View>
			  </View>
			  <Text>IHUFGEUEGUGEuhzgiueghziguzhe ugzh ugzhe uizhe iuzeh uizeh</Text>
		  </View>
		  <View className={'h-full w-full bg-white rounded-t-[25px] absolute top-[40%]'}>

		  </View>

	  </View>
	)
}


const styles = StyleSheet.create({
	root: {
		backgroundColor: "white",
		// padding: 30,
		// marginTop: 10,
		width: "100%",
		height: "100%",
	},
	title: {
		fontSize: 28,
		marginBottom: 10,
		paddingLeft: 10,
	},
	profilePic: {
		width: "100%",
		maxWidth: 90,
		maxHeight: 90,
		marginBottom: 10,
		borderRadius: 100,
	},
})

export default DetailsVisitor