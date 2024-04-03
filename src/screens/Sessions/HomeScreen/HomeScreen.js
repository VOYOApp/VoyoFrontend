import React from "react"
import { Image, StyleSheet, Text, useWindowDimensions, View } from "react-native"
import CustomButton from "../../../components/CustomButton"
import { useNavigation } from "@react-navigation/native"
import { useTranslation } from "react-i18next"

const HomeScreen = () => {
	const { t } = useTranslation()


	const { height } = useWindowDimensions()
	const navigation = useNavigation()
	const onSignInPressed = () => {
		// console.warn('Sign in pressed')
		navigation.navigate("SignIn")
	}

	const onRegisterPressed = () => {
		// console.warn('Forgot password pressed')
		navigation.navigate("SignUp")
	}

	const onHomeProspectPressed = () => {
		// console.warn('Forgot password pressed')
		navigation.navigate("Prospect", { screen: "ProspectHome" })
	}

	const onHomeAdminPressed = () => {
		navigation.navigate("Admin", { screen: "HomeAdmin" })
	}

	return (<View style={styles.root}>

		  <Image source={require("../../../../assets/logos/banner-voyo.png")} style={[styles.logo, { height: height }]}
		         resizeMode="contain" />
		  <Text style={styles.title}>{t("common.greetings")}</Text>


		  <View className="w-full items-center flex-row justify-around">
			  <CustomButton text={t("common.login")} onPress={onSignInPressed} bgColor={"black"} widthBtn={"40%"} />
			  <CustomButton text={t("common.register")} onPress={onRegisterPressed} bgColor={"orange"}
			                widthBtn={"40%"} />
		  </View>
		  <View className="w-full items-center flex-row justify-around">
				<CustomButton text="HomeProspect" onPress={onHomeProspectPressed} bgColor={"magenta"} widthBtn={"40%"} />
				<CustomButton text="HomeAdmin" onPress={onHomeAdminPressed} bgColor={"red"} widthBtn={"40%"} />
		  </View>
		  
	  </View>)
}


const styles = StyleSheet.create({
	root: {
		padding: 20, alignItems: "center",
	}, logo: {
		width: "400%", maxWidth: 300, maxHeight: 400, marginBottom: 10,
	}, title: {
		fontSize: 30, marginBottom: 10,
	},
})

export default HomeScreen