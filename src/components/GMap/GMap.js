import React, { useCallback, useRef, useState } from "react"
import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native"
import MapView, { Circle, Marker, PROVIDER_GOOGLE } from "react-native-maps"
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete"
import { useTranslation } from "react-i18next"
import { Icon } from "react-native-paper"
import Images from "../../../assets"
import Geolocation from "react-native-geolocation-service"
import { GOOGLE_MAPS_KEY } from "@env"

navigator.geolocation = Geolocation


const GMap = ({ hasSearch = false, marker, onData }) => {

	const { t } = useTranslation()

	const mapRef = useRef(null)

	const [selectedPlace, setSelectedPlace] = useState(null)

	const [hasBeenCalled, setHasBeenCalled] = useState(false)

	let searchResults = []

	const sendDataToParent = useCallback((dataToSend, details) => {
		onData(dataToSend, details)
	}, [])


	const handlePlaceSelected = (data, details) => {
		styles.map.height = "50%"

		let placeId = data.place_id

		if (marker == undefined) {
			sendDataToParent(data, details)
		}

		try {
			fetch(`https://maps.googleapis.com/maps/api/geocode/json?key=${GOOGLE_MAPS_KEY}&place_id=${placeId}`)
			.then((response) => response.json())
			.then((json) => {
				let latitude = json.results[0].geometry.location.lat
				let longitude = json.results[0].geometry.location.lng
				setSelectedPlace({
					latitude, longitude,
				})

				// Get screen dimensions
				const { height } = Dimensions.get("window")

				// Calculate the offset based on screen height
				let offsetFactor = 0.000001 // Adjust this factor based on your preference (the higher the upper)

				if (marker != undefined) {
					offsetFactor = -0.000001
				}


				const offset = offsetFactor * height

				latitude -= offset

				if (marker == undefined) {
					mapRef.current.animateToRegion({
						latitude, longitude, latitudeDelta: 0.0022, longitudeDelta: 0.0031,
					}, 2000)
				} else {
					mapRef.current.animateToRegion({
						latitude, longitude, latitudeDelta: 0.005, longitudeDelta: 0.006,
					}, 2000)
				}

			})
			.catch((error) => {
				console.error(error)
			})
		} catch (e) {
			console.error("Error: ", e)
		}
	}


	if (marker != undefined && !hasBeenCalled) {
		marker = {
			place_id: marker,
		}
		setHasBeenCalled(true)
		handlePlaceSelected(marker)
	}

	const ref = useRef()

	const emptySearch = () => {
		ref.current?.setAddressText("")

	}

	return (<View style={styles.mapContainer}>
		<MapView
		  ref={mapRef}
		  provider={PROVIDER_GOOGLE}
		  style={styles.map}
		  region={{
			  latitude: 44.933393, longitude: 4.892703, latitudeDelta: 0.0922, longitudeDelta: 0.0421,
		  }}
		  showUserLocation={true}
		  showsMyLocationButton={true}
		>
			{selectedPlace && (<Marker
			  coordinate={{
				  latitude: selectedPlace.latitude, longitude: selectedPlace.longitude,
			  }}
			/>)}
			{searchResults.map((person, index) => (<Circle
			  key={index}
			  center={person.map.coordinates}
			  radius={person.map.radius}
			  strokeColor={"#FF7F50"}
			  fillColor={"rgba(255,127,80,0.35)"}
			/>))}
		</MapView>

		{hasSearch ? (<GooglePlacesAutocomplete
		  minLength={2}
		  placeholder={t("common.searchMap.searchPlaceholder")}
		  onPress={handlePlaceSelected}
		  query={{
			  key: "AIzaSyBznSC8S1mPU-GPjsxuagQqnNK3a8xVOl4", language: "fr", components: "country:fr", // Limit the search to France
		  }}
		  ref={ref}
		  fetchDetails={true}
		  nearbyPlacesAPI="GooglePlacesSearch"
		  debounce={400}
		  styles={styles.searchBar}
		  currentLocation={false}
		  currentLocationLabel="Current location"
		  renderRightButton={() => (<TouchableOpacity
			onPress={() => {
				emptySearch()
			}}

			style={{
				position: "absolute", top: 7, right: 10, zIndex: 1000, padding: 5,
			}}
		  >
			  <Icon size={19} source={Images.close}  />
		  </TouchableOpacity>)}

		/>) : null}
	</View>)
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
	}, mapContainer: {
		height: "100%", width: "100%", justifyContent: "flex-end", alignItems: "center",
	}, map: {
		width: "100%", height: "100%", top: 0, left: 0, right: 0, bottom: 0, position: "absolute",
	}, searchBar: {
		container: {
			position: "absolute",
			top: 50,
			left: 10,
			right: 10,
			borderRadius: 25,
			shadowColor: "#000",
			elevation: 10,
			backgroundColor: "#fff9f7",
		}, textInputContainer: {
			width: "100%", borderRadius: 20, height: 44,
		}, textInput: {
			borderRadius: 100,
		}, poweredContainer: {
			display: "none",
		}, listView: {
			borderRadius: 20, backgroundColor: "#fff9f7",
		}, row: {
			backgroundColor: "#fff9f7", padding: 13, height: 50, flexDirection: "row", borderRadius: 20,
		}, separator: {
			height: 0.5, backgroundColor: "#3400fd",
		},
	},
})
export default GMap