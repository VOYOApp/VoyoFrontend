import React, { useEffect } from "react"
import { ScrollView, StyleSheet, useWindowDimensions, View } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useTranslation } from "react-i18next"
import HomeStats from "../../../../components/HomeStats"
import HeaderHome from "../../../../components/HeaderHome"
import CustomFooter from "../../../../components/CustomFooter"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import CardListHomeProspect from "../CardListHomeProspect"
import { getGlobal } from "../../../../context/AuthContext"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../../../../firebaseConfig"

const ProspectHome = () => {
	const { t } = useTranslation()
	const Tab = createMaterialTopTabNavigator()

	const [firstname, setFirstname] = React.useState("")
	const [icon, setIcon] = React.useState("https://gravatar.com/avatar/94d45dbdba988afacf30d916e7aaad69?s=200&d=mp&r=x")

	const { height } = useWindowDimensions()
	const navigation = useNavigation()
	const onBtnPressed = () => {
		// console.warn('Sign in pressed')
		navigation.navigate("SignInScreen")
	}

	useEffect(() => {
		function firebaseCnx(email, pswd) {
			if (email) {
				signInWithEmailAndPassword(auth, email, pswd)
				.then((userCredential) => {
					console.log("Connection firebase successful !")
				})
				.catch((error) => {
					console.log(error.code)
					console.log(error.message)
				})
			}
		}
	}, [])

	useEffect(() => {
		// setTimeout(() => {
		getGlobal("user_details").then((data) => {
			setFirstname(data?.first_name)
			setIcon(data?.profile_picture)
		})
		// }, 500)
	}, [firstname, icon])

	return (<View style={styles.root}>
		<HeaderHome name={firstname} profilePicture={icon} />

		<ScrollView style={{ width: "100%" }}
		            showsVerticalScrollIndicator={false}
		            showsHorizontalScrollIndicator={false}
		  // ref={scrollViewRef}
		  // onContentSizeChange={() => {
		  //     scrollViewRef.current?.scrollToEnd()
		  // }}
		>
			<HomeStats />
			{/*<ScrollView style={{ width: "100%" }}*/}
			{/*            showsVerticalScrollIndicator={false}*/}
			{/*            showsHorizontalScrollIndicator={false}*/}
			{/*>*/}
			<Tab.Navigator
			  style={{ height: 20000 }}
			  screenOptions={{
				  tabBarStyle: {
					  backgroundColor: "#f4f3f4",
				  }, tabBarIndicatorStyle: {
					  backgroundColor: "#FE881B",
				  },
			  }}
			>
				<Tab.Screen name={t("prospect.programmed_visits")}>
					{() => <CardListHomeProspect />}
				</Tab.Screen>
				<Tab.Screen name={t("prospect.passed_visits")}>
					{() => <CardListHomeProspect type={"PASSED"} />}
				</Tab.Screen>
			</Tab.Navigator
>
			{/*</ScrollView>*/}
		</ScrollView>


		<CustomFooter currentOption={"home"} />
	</View>)
}


const styles = StyleSheet.create({
	root: {
		padding: 20, alignItems: "center",
	},
})

export default ProspectHome