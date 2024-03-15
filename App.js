import React, { useEffect, useState } from "react"
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet } from "react-native";
import { ApplicationProvider } from "@ui-kitten/components";
import * as eva from '@eva-design/eva';
import i18n from './i18n';
import Navigation from "./src/navigation";
import AsyncStorage from "@react-native-async-storage/async-storage"

const App = () => {
	const [isLoggedIn, setLoggedIn] = useState(false);

	useEffect(() => {
			const tokenChangeInterval = setInterval(async () => {
				try {
					const token = await AsyncStorage.getItem('token');
					console.log(token)
					if (token && !isLoggedIn) {
						setLoggedIn(true);
					} else if (!token && isLoggedIn) {
						setLoggedIn(false);
					}
				} catch (error) {
					console.error('Erreur lors de la récupération du token :', error);
				}
			}, 1000);

			return () => {
				clearInterval(tokenChangeInterval);
			};
	}, [isLoggedIn]);

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
