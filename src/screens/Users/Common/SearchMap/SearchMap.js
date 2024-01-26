import React from "react"
import { StyleSheet, useWindowDimensions, View } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useTranslation } from "react-i18next"
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps"

const SearchMap = () => {
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

	return (
	  <View style={styles.root}>
		  <View style={styles.mapcontainer}>
			  <MapView
				provider={PROVIDER_GOOGLE}
				style={styles.map}
				initialRegion={{
					// Valence France
					latitude: 44.933393,
					longitude: 4.892703,
					latitudeDelta: 0.0922,
					longitudeDelta: 0.0421,

				}}
				showUserLocation={true}>
				  <Marker coordinate={{
					  latitude: 44.933393,
					  longitude: 4.892703,
				  }} />
			  </MapView>
		  </View>
	  </View>
	)
}


const styles = StyleSheet.create({
	mapcontainer: {
		height: "100%",
		width: "100%",
		justifyContent: "flex-end",
		alignItems: "center",
	},
	map: {
		...StyleSheet.absoluteFillObject,
	},
})

export default SearchMap