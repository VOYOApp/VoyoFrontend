import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet } from "react-native";
import { ApplicationProvider } from "@ui-kitten/components";
import * as eva from '@eva-design/eva';
import i18n from './i18n';
import Navigation from "./src/navigation";
import axios from 'axios';
import { BASE_URL } from '@env';
import { getToken, removeToken } from "./src/context/AuthContext"

const App = () => {
	const checkTokenValidity = async () => {
		try {
			if (await getToken() !== null){
				// If a token exists, check its validity
				const response = await axios.get(`${BASE_URL}/api/security`, {
					headers: {
						Authorization: `Bearer ${await getToken()}`,
					},
				});

				if (response.status === 200) {
					// Token is valid, redirect to the homepage
					// You may want to update the navigation logic based on your app's structure
					// For example, if you're using React Navigation, you can use navigation.navigate('Home')
					console.log('Token is valid. Redirecting to the homepage.');
				}
			} else {
				// No token exists, redirect to the welcome page
				// You may want to update the navigation logic based on your app's structure
				// For example, if you're using React Navigation, you can use navigation.navigate('Welcome')
				console.log('No token found. Redirecting to the welcome page.');
			}
		} catch (error) {
			// Token is invalid or some other error occurred, redirect to the login page
			// You may want to update the navigation logic based on your app's structure
			// For example, if you're using React Navigation, you can use navigation.navigate('Login')
			console.log('Token is invalid or an error occurred. Redirecting to the login page.');
			console.error('Error:', error);
			// await removeToken(); // Clear the invalid token from the context
		}
	};

	useEffect(() => {
		// Every second, check the token's validity
		const interval = setInterval(checkTokenValidity, 1000);
		return () => clearInterval(interval);

	}, []);



	return (
		  <ApplicationProvider {...eva} theme={eva.light}>
			  <SafeAreaView style={styles.root}>
				  <Navigation />
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
