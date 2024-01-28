import React, { useRef, useState } from "react"
import { Image, StyleSheet, Text, View } from "react-native"
import { useTranslation } from "react-i18next"
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps"
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete"
import DateTimePickerModal from "react-native-modal-datetime-picker"
import CustomButton from "../../../../components/CustomButton" // https://www.npmjs.com/package/react-native-modal-datetime-picker
import { RadioButton } from "react-native-paper"

navigator.geolocation = require("react-native-geolocation-service")

const SearchMap = () => {
	const { t } = useTranslation()
	const [selectedPlace, setSelectedPlace] = useState(null)
	const mapRef = useRef(null)
	const [next, setNext] = useState(false)

	const [isDatePickerVisible, setDatePickerVisibility] = useState(false)
	const [date, setDate] = useState(new Date())

	const options = {
		weekday: "long", year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric",
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
					latitude, longitude,
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


	const [selectedValue, setSelectedValue] = useState("")

	const radioItems = [
		{ label: t("prospect.visits_duration.studio"), value: "option1" },
		{ label: t("prospect.visits_duration.t2_to_t4"), value: "option2" },
		{ label: t("prospect.visits_duration.t5_and_more"), value: "option3" },
		{ label: t("prospect.visits_duration.house"), value: "option4" },
		{ label: t("prospect.visits_duration.villa"), value: "option5" },
		// { label: t("prospect.visits_duration.custom_duration"), value: "option6" },
	]


	return (<View style={styles.root}>
		<View style={styles.mapContainer}>
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
				  key: "AIzaSyBznSC8S1mPU-GPjsxuagQqnNK3a8xVOl4", language: "fr", components: "country:fr", // Limit the search to France
			  }}
			  nearbyPlacesAPI="GooglePlacesSearch"
			  debounce={400}
			  styles={styles.searchBar}
			  currentLocation={true}
			  currentLocationLabel="Current location"
			/>
		</View>

		{!next ? (<View style={styles.detailsBox}>
			<View>
				<View style={styles.titleWithImageContainer}>
					<Image source={require("../../../../../assets/icons/012-calendar.png")}
					       style={styles.titleWithImageIcon} />
					<Text style={styles.titleWithImageText}>{t("prospect.choose_a_date")}</Text>
				</View>
				<Text>
					{t("prospect.subtext_choose_a_date")}
				</Text>
			</View>

			<View>
				<CustomButton
				  text={Intl.DateTimeFormat("fr-FR", options).format(date).charAt(0).toUpperCase() + Intl.DateTimeFormat("fr-FR", options).format(date).slice(1)}
				  onPress={showDatePicker}
				  bgColor={"rgba(255,127,80,0.35)"}
				  fgColor={"black"} />
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
			  bgColor={"#FF7F50"}
			  onPress={() => setNext(!next)}
			/>
		</View>) : (<View style={styles.detailsBox}>
			<View>
				<View style={styles.titleWithImageContainer}>
					<Image source={require("../../../../../assets/icons/001-home.png")}
					       style={styles.titleWithImageIcon} />
					<Text style={styles.titleWithImageText}>{t("prospect.type_of_property")}</Text>
				</View>
				<Text style={styles.subtitle}>
					{t("prospect.subtext_type_of_property")}
				</Text>
			</View>

			<View>
				{radioItems.map((item) => (
				  <View key={item.value} style={{ flexDirection: "row", alignItems: "center" }}>
					  <RadioButton
						value={item.value}
						status={selectedValue === item.value ? "checked" : "unchecked"}
						onPress={() => setSelectedValue(item.value)}
						color={"#FF7F50"}
					  />
					  <Text>{item.label}</Text>
				  </View>
				))}
			</View>

			<CustomButton
			  text={t("common.search")}
			  bgColor={"#FF7F50"}
			  onPress={() => {
				  console.warn("TODO")
				  setNext(!next)
			  }}
			/>
		</View>)}


	</View>)
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
	}, mapContainer: {
		height: "100%", width: "100%", justifyContent: "flex-end", alignItems: "center",
	}, map: {
		...StyleSheet.absoluteFillObject,
	}, searchBar: {
		container: {
			position: "absolute", top: 50, left: 10, right: 10, borderRadius: 20, shadowColor: "#000", elevation: 10,
		}, textInputContainer: {
			width: "100%", borderRadius: 20,
		}, textInput: {
			borderRadius: 100,
		}, poweredContainer: {
			display: "none",
		}, listView: {
			borderRadius: 20, backgroundColor: "#f5d4c6",
		}, row: {
			backgroundColor: "#f5d4c6", padding: 13, height: 50, flexDirection: "row", borderRadius: 20,
		}, separator: {
			height: 0.5, backgroundColor: "#3400fd",
		},
	}, detailsBox: {
		position: "absolute",
		bottom: 0,
		left: 0,
		right: 0,
		height: "60%",
		backgroundColor: "white",
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		paddingTop: 25,
		paddingLeft: 25,
		paddingRight: 25,
		paddingBottom: 10,
		display: "flex",
		justifyContent: "space-between",
	}, titleWithImageContainer: {
		display: "flex", flexDirection: "row", alignItems: "center",
	}, titleWithImageText: {
		fontSize: 17, fontWeight: "bold", marginLeft: 10,
	}, titleWithImageIcon: {
		width: 25, height: 25,
	}, subtitle: {
		marginTop: 7,
	},
})

export default SearchMap
