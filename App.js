import React, { useEffect } from "react"
import { StatusBar } from "expo-status-bar"
import { SafeAreaView, StyleSheet } from "react-native"
import { useTranslation } from "react-i18next" // Import the useTranslation hook
import Navigation from "./src/navigation"
import { ApplicationProvider } from "@ui-kitten/components"
import * as eva from '@eva-design/eva';
import i18n from './i18n'; // Import your i18n configuration file

const App = () => {
	useEffect(() => {
	}, [])


	return (
	  <ApplicationProvider {...eva} theme={eva.light}>
		  <SafeAreaView style={styles.root}>
			  <Navigation />
			  <StatusBar style="auto" />
		  </SafeAreaView>
	  </ApplicationProvider>
	)
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
	}, box: {
		width: "100%", height: "100%",
	},
})

export default App
