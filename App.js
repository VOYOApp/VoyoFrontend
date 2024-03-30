import React, { useEffect, useState } from "react"
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet } from "react-native";
import { ApplicationProvider } from "@ui-kitten/components";
import * as eva from '@eva-design/eva';
import i18n from './i18n';
import Navigation from "./src/navigation";
import AsyncStorage from "@react-native-async-storage/async-storage"
import "core-js/stable/atob";
import LoadVoyo from "./src/screens/LoadVoyo"
import { NavigationContainer } from "@react-navigation/native"

const App = () => {
	const [isLoggedIn, setLoggedIn] = useState(false);
	const [isLoading, setLoading] = useState(true); // Ajoutez un état pour gérer le chargement initial

	useEffect(() => {
		const tokenChangeInterval = setInterval(async () => {
			try {
				const token = await AsyncStorage.getItem('token');
				if (token && !isLoggedIn) {
					setTimeout(() => {
						setLoggedIn(true);
						setLoading(false);
					}, 1000);

				} else if (!token && isLoggedIn) {
					setTimeout(() => {
						setLoggedIn(false);
						setLoading(false);
					}, 1000);
				} else {
					setLoading(false);
				}
			} catch (error) {
				console.error('Erreur lors de la récupération du token :', error);
			}
		}, 1000);

		return () => {
			clearInterval(tokenChangeInterval);
		};
	}, [isLoggedIn]);

	if (isLoading) {
		return (<NavigationContainer><LoadVoyo/></NavigationContainer>); // Rendre l'écran de chargement s'il est en cours de chargement
	}

	return (
		  <ApplicationProvider {...eva} theme={eva.light}>
			  <SafeAreaView style={styles.root}>
				  <Navigation isLoggedIn={isLoggedIn}/>
				  <StatusBar style="auto" />
			  </SafeAreaView>
		  </ApplicationProvider>
	);
};

const styles = StyleSheet.create({
	root: {
		flex: 1,
	},
});

export default App;
