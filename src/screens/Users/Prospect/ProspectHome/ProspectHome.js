import React, { useEffect, useState } from "react"
import { RefreshControl, ScrollView, StyleSheet, useWindowDimensions, View } from "react-native"
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

const Tab = createMaterialTopTabNavigator()

const ProspectHome = () => {
	const { t } = useTranslation()

	const [firstname, setFirstname] = React.useState("")
	const [icon, setIcon] = React.useState("https://gravatar.com/avatar/94d45dbdba988afacf30d916e7aaad69?s=200&d=mp&r=x")

	const [refreshing, setRefreshing] = useState(false)
	const [refreshKey, setRefreshKey] = useState(0)

	const onRefresh = () => {
		setRefreshing(true)
		// Set a new key to force re-render of components
		setRefreshKey(prevKey => prevKey + 1)
		// Simulate fetching data
		setTimeout(() => {
			setRefreshing(false)
		}, 1000)
	}

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
					console.log(error.code, " ", error.message)
				})
			}
		}

		getGlobal("user_details").then((data) => {
			firebaseCnx(data?.email, data?.password)
		})
	}, [])

	useEffect(() => {
		getGlobal("user_details").then((data) => {
			setFirstname(data?.first_name)
			setIcon(data?.profile_picture)
		})
	}, [firstname, icon])

	return (<View style={styles.root}>
		<HeaderHome name={firstname} profilePicture={icon} />

		<ScrollView style={{ width: "100%" }}
		            showsVerticalScrollIndicator={false}
		            showsHorizontalScrollIndicator={false}
		            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
		>
			<HomeStats key={refreshKey} />

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
					{() => <CardListHomeProspect key={refreshKey} />}
				</Tab.Screen>
				<Tab.Screen name={t("prospect.passed_visits")}>
					{() => <CardListHomeProspect type={"PASSED"} key={refreshKey} />}
				</Tab.Screen>
			</Tab.Navigator>
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