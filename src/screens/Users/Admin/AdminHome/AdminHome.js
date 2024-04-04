import React from "react"
import { ScrollView, StyleSheet, useWindowDimensions, View } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useTranslation } from "react-i18next"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import HeaderHome from "../../../../components/HeaderHome"
import HomeStats from "../../../../components/HomeStats"
import ValidationListAdmin from "../ValidationListAdmin/ValidationListAdmin"
import ReportListAdmin from "../ReportListAdmin/ReportListAdmin"

const ProspectHome = () => {
	const { t } = useTranslation()
	const Tab = createMaterialTopTabNavigator()


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
				});
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

	if (firstname ==="") {
		console.log("firstname is empty")
	}

	return (
	<View style={styles.root}>
		<HeaderHome name={firstname} profilePicture={icon}/>
		<ScrollView style={{ width: "100%" }}
		            showsVerticalScrollIndicator={false}
		            showsHorizontalScrollIndicator={false}
		>

			<ScrollView style={{ width: "100%" }}
			            showsVerticalScrollIndicator={false}
			            showsHorizontalScrollIndicator={false}
			>

				<Tab.Navigator style={{
					height: 1000,
				}} screenOptions={{
					tabBarStyle: {
						backgroundColor: "#f4f3f4",
					}, tabBarIndicatorStyle: {
						backgroundColor: "#FE881B",
					},
				}}>
					<Tab.Screen name={t("admin.account_validation_request")} component={ValidationListAdmin} />
					<Tab.Screen name={t("admin.reported_users")} component={ReportListAdmin} />
				</Tab.Navigator>

			</ScrollView>
		</ScrollView>

						

	</View>)
}


const styles = StyleSheet.create({
	root: {
		padding: 20, alignItems: "center",
	},
})

export default ProspectHome