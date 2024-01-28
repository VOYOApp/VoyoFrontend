import React from "react";
import { StyleSheet, useWindowDimensions, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const SearchMap = () => {
	const { t } = useTranslation();
	const { height } = useWindowDimensions();
	const navigation = useNavigation();

	const handlePlaceSelected = (data, details) => {
		// Navigate to the selected result using the navigation prop
		// You can customize this part based on your navigation structure
		console.log(data, details);
	};

	return (
	  <View style={styles.root}>
		  <View style={styles.mapContainer}>
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
				showUserLocation={true}
			  >
				  <Marker
					coordinate={{
						latitude: 44.933393,
						longitude: 4.892703,
					}}
				  />
			  </MapView>

			  <GooglePlacesAutocomplete
				placeholder="Search"
				onPress={handlePlaceSelected}
				query={{
					key: "AIzaSyBznSC8S1mPU-GPjsxuagQqnNK3a8xVOl4",
					language: "fr",
				}}
				nearbyPlacesAPI="GooglePlacesSearch"
				debounce={400}
				styles={{
					container: {
						position: "absolute",
						top: 100,
						left: 0,
						right: 0,
					},
					textInputContainer: {
						width: "100%",
					},
				}}
			  />
		  </View>
	  </View>
	);
};

const styles = StyleSheet.create({
	root: {
		flex: 1,
	},
	mapContainer: {
		height: "100%",
		width: "100%",
		justifyContent: "flex-end",
		alignItems: "center",
	},
	map: {
		...StyleSheet.absoluteFillObject,
	},
});

export default SearchMap;
