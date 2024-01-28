import React, { useRef, useState } from "react"
import { StyleSheet, View } from "react-native"
import { useTranslation } from "react-i18next"
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps"
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete" // Doc: https://github.com/FaridSafi/react-native-google-places-autocomplete#readme
// navigator.geolocation = require('@react-native-community/geolocation');
navigator.geolocation = require("react-native-geolocation-service")

const SearchMap = () => {
	const { t } = useTranslation()
	const [selectedPlace, setSelectedPlace] = useState(null)
	const mapRef = useRef(null)

	const handlePlaceSelected = (data) => {
		let placeId = data.place_id

		try {
			fetch(`https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyBznSC8S1mPU-GPjsxuagQqnNK3a8xVOl4&place_id=${placeId}`)
			.then((response) => response.json())
			.then((json) => {
				let latitude = json.results[0].geometry.location.lat
				let longitude = json.results[0].geometry.location.lng
				setSelectedPlace({
					latitude,
					longitude,
				})

				mapRef.current.animateToRegion({
					latitude, longitude, latitudeDelta: 0.0022, longitudeDelta: 0.0021,
				}, 2000)
			})
			.catch((error) => {
				console.error(error)
			})
		} catch (e) {
			console.error("Error: ", e)
		}
	}


	return (<View style={styles.root}>
		<View style={styles.mapContainer}>
			<MapView
			  ref={mapRef}
			  provider={PROVIDER_GOOGLE}
			  style={styles.map}
			  region={{
				  latitude: 44.933393,
				  longitude: 4.892703,
				  latitudeDelta: 0.0922,
				  longitudeDelta: 0.0421,
			  }}
			  showUserLocation={true}
			  showsMyLocationButton={true}
			>
				{selectedPlace && (<Marker
					coordinate={{
						latitude: selectedPlace.latitude,
						longitude: selectedPlace.longitude,
					}}
				  />)}
				{/*<Circle center={{*/}
				{/*	latitude: 44.933393, longitude: 4.892703,*/}
				{/*}}*/}
				{/*        radius={500}*/}
				{/*        fillColor="rgba(255, 0, 0, 0.1)"*/}
				{/*        strokeColor="rgba(255, 0, 0, 0.1)"*/}
				{/*        strokeWidth={1}*/}
				{/*/>*/}
			</MapView>

			<GooglePlacesAutocomplete
			  placeholder={t("common.searchMap.searchPlaceholder")}
			  onPress={handlePlaceSelected}
			  query={{
				  key: "AIzaSyBznSC8S1mPU-GPjsxuagQqnNK3a8xVOl4",
				  language: "fr",
				  components: "country:fr", // Limit the search to France
			  }}
			  nearbyPlacesAPI="GooglePlacesSearch"
			  debounce={400}
			  styles={{
				  container: {
					  position: "absolute", top: 100, left: 10, right: 10, borderRadius: 20,
				  }, textInputContainer: {
					  width: "100%", borderRadius: 20,
				  }, textInput: {
					  borderRadius: 100,
				  }, poweredContainer: {
					  display: "none",
				  }, listView: {
					  borderRadius: 20, backgroundColor: "#ffc9a8",
				  }, row: {
					  backgroundColor: "#ffc9a8", padding: 13, height: 50, flexDirection: "row", borderRadius: 20,
				  }, separator: {
					  height: 0.5, backgroundColor: "#3400fd",
				  },
			  }}
			  currentLocation={true}
			  currentLocationLabel="Current location"
			/>
		</View>
	</View>)
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
	}, mapContainer: {
		height: "100%", width: "100%", justifyContent: "flex-end", alignItems: "center",
	}, map: {
		...StyleSheet.absoluteFillObject,
	},
})

export default SearchMap
