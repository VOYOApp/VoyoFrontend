import React, { useEffect, useState } from "react"
import { StatusBar } from "expo-status-bar"
import { SafeAreaView, StyleSheet } from "react-native"
import { ApplicationProvider } from "@ui-kitten/components"
import * as eva from "@eva-design/eva"
import Navigation from "./src/navigation"
import AsyncStorage from "@react-native-async-storage/async-storage"
import "core-js/stable/atob"
import LoadVoyo from "./src/screens/LoadVoyo"
import { jwtDecode } from "jwt-decode"
import axios from "axios"
import i18n from './i18n';

const App = () => {
	const [isLoggedIn, setLoggedIn] = useState(false)
	const [status, setStatus] = useState("")
	const [role, setRole] = useState("")
	const [isLoading, setLoading] = useState(true)


	useEffect(() => {
		const tokenChangeInterval = setInterval(async () => {
			try {
				const token = await AsyncStorage.getItem("token")
				if (token && !isLoggedIn) {
					setLoading(true)
					setTimeout(async () => {
						const decodedToken = jwtDecode(token)
						await axios.get(`${process.env.BASE_URL}/api/user/status`, {
							headers: { Authorization: `Bearer ${token}` },
						}).then((response) => {
							setStatus(response.data.status)
							setRole(decodedToken.role)
							setLoggedIn(true)
							setLoading(false)
						})
					}, 1200)
				} else if (!token && isLoggedIn) {
					setLoggedIn(false)
					setLoading(false)
				} else {
					setLoading(false)
				}
			} catch (error) {
				console.log("Erreur lors de la récupération du token :", error)
			}
		}, 1000)

		return () => {
			clearInterval(tokenChangeInterval)
		}
	}, [isLoggedIn, status, role])

	return (
	  !isLoading ? (
		<ApplicationProvider {...eva} theme={eva.light}>
			<SafeAreaView style={styles.root}>
				<Navigation isLoggedIn={isLoggedIn} status={status} role={role} />
				<StatusBar style="auto" />
			</SafeAreaView>
		</ApplicationProvider>
	  ) : (
		<LoadVoyo />
	  )
	)
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
	},
})

export default App
