import React, { useRef, useState } from "react"
import { StyleSheet, Text, View } from "react-native"
import { useTranslation } from "react-i18next"
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps"
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete"
import DateTimePickerModal from "react-native-modal-datetime-picker"
import CustomButton from "../../../../components/CustomButton" // https://www.npmjs.com/package/react-native-modal-datetime-picker

navigator.geolocation = require("react-native-geolocation-service")

const SearchMap = () => {
	const { t } = useTranslation()
	const [selectedPlace, setSelectedPlace] = useState(null)
	const mapRef = useRef(null)

	const [isDatePickerVisible, setDatePickerVisibility] = useState(false)
	const [date, setDate] = useState(new Date())

	const options = {
		weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric",
		hour: "numeric",
		minute: "numeric",
	}

	const showDatePicker = () => {
		setDatePickerVisibility(true)
	}

	const hideDatePicker = () => {
		setDatePickerVisibility(false)
	}

	const handleConfirm = (date) => {
		setDate(date)
		hideDatePicker()
	}


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
			  styles={styles.searchBar}
			  currentLocation={true}
			  currentLocationLabel="Current location"
			/>
		</View>
		<View style={styles.detailsBox}>
			<Text>Details</Text>

			<View>
				<CustomButton
				  text={Intl.DateTimeFormat("fr-FR", options).format(date).charAt(0).toUpperCase() + Intl.DateTimeFormat("fr-FR", options).format(date).slice(1)}
				  onPress={showDatePicker}
				bgColor={"#ffdba1"}
				fgColor={"black"}/>
				<DateTimePickerModal
				  isVisible={isDatePickerVisible}
				  mode="datetime"
				  onConfirm={handleConfirm}
				  onCancel={hideDatePicker}
				  date={date}
				/>
			</View>

			<CustomButton
			  text={t("common.next")}
			  bgColor={"#ff8000"}
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
	searchBar: {
		container: {
			position: "absolute",
			top: 50,
			left: 10,
			right: 10,
			borderRadius: 20,
			shadowColor: "#000",
			elevation: 10,
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
	},
	detailsBox: {
		position: "absolute",
		bottom: 0,
		left: 0,
		right: 0,
		height: "60%",
		backgroundColor: "white",
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		padding: 25,
		display: "flex",
		justifyContent: "space-between",
	},
})

export default SearchMap
