import React, { useEffect, useState } from "react"
import { RefreshControl, ScrollView, StyleSheet, useWindowDimensions, View } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useTranslation } from "react-i18next"
import HomeStats from "../../../../components/HomeStats"
import HeaderHome from "../../../../components/HeaderHome"
import CustomFooter from "../../../../components/CustomFooter"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import CardListHomeProspect from "../CardListHomeProspect"
import { getGlobal, getToken } from "../../../../context/AuthContext"
import { signInWithEmailAndPassword, updateProfile } from "firebase/auth"
import { auth } from "../../../../../firebaseConfig"
import { jwtDecode } from "jwt-decode"

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
		function firebaseCnx(user_data, token) {
				const decodedToken = jwtDecode(token)
					if (user_data?.email) {
						signInWithEmailAndPassword(auth, user_data?.email, user_data?.password)
						.then((userCredential) => {
							console.log("Firebase sign in success")
							const user = userCredential.user
							if (user.photoURL === null) {
								updateProfile(user,{
									photoURL: user_data?.profile_picture ? user_data?.profile_picture : "https://gravatar.com/avatar/94d45dbdba988afacf30d916e7aaad69?s=200&d=mp&r=x",
								})
								.then(() => {
									console.log("Avatar updated !")
								})
								.catch((error) => {
									console.error("Error update avatar : " + error.message)
								})
							}
							if (user.displayName === null) {
								updateProfile(user,{
									displayName: user_data.first_name + " " + user_data.last_name[0] + '.',
								})
								.then(() => {
									console.log("Display name updated !")
								})
								.catch((error) => {
									console.error("Error update display name : " + error.message)
								})
							}
							if (user.phoneNumber === null) {
								user.phoneNumber = decodedToken?.phone_number
								auth.updateCurrentUser(user)
								.then(() => {
									console.log("Phone number updated !");
								})
								.catch((error) => {
									console.error("Error phone number updated : " + error.message)
								})
							}
						})
					}
		}

		getToken().then((token) => {
			getGlobal("user_details").then((user) => {
				firebaseCnx(user, token)
				console.log(auth?.currentUser)
			}).catch((error) => {
				console.error('Error getGlobal data : '+error)
			})
		}).catch((error) => {
			console.error('Error get token : '+error)
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