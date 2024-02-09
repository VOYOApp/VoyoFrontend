import React, { useCallback, useMemo, useRef, useState } from "react"
import { Dimensions, Image, ScrollView, StyleSheet, Text, View } from "react-native"
import { useTranslation } from "react-i18next"
import MapView, { Circle, Marker, PROVIDER_GOOGLE } from "react-native-maps"
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete"
import DateTimePickerModal from "react-native-modal-datetime-picker"
import CustomButton from "../../../../components/CustomButton" // https://www.npmjs.com/package/react-native-modal-datetime-picker
import { RadioButton } from "react-native-paper"
import { BottomSheetModal, BottomSheetModalProvider } from "@gorhom/bottom-sheet"
import SearchResultPerson from "../../../../components/SearchResultPerson"
import { IndexPath, Select, SelectItem } from "@ui-kitten/components"

navigator.geolocation = require("react-native-geolocation-service")

const SearchMap = () => {
	// ref
	const bottomSheetModalRef = useRef(null)

	// variables
	const snapPoints = useMemo(() => [130, 550], [])

	// callbacks
	const handlePresentModalPress = useCallback(() => {
		bottomSheetModalRef.current?.present()
	}, [])
	const handleSheetChanges = useCallback((index) => {
		console.log("handleSheetChanges", index)
	}, [])


	const { t } = useTranslation()
	const [selectedPlace, setSelectedPlace] = useState(null)
	const mapRef = useRef(null)

	const [isDatePickerVisible, setDatePickerVisibility] = useState(false)
	const [date, setDate] = useState(new Date())
	const [showResults, setShowResults] = useState(false)
	const [showDuration, setShowDuration] = useState(false)
	const [showDate, setShowDate] = useState(false)


	const [searchResults, setSearchResults] = useState([{
		profilePicture: "https://randomuser.me/api/portraits/women/69.jpg",
		name: "Marie K.",
		note: 3,
		distance: 5989,
		price: 8.8,
		map: {
			coordinates: { "latitude": 44.91689119999999, "longitude": 4.9328504 }, radius: 1000,
		},
		bio: "En tant que développeur Full Stack passionné, je façonne des expériences numériques novatrices. Expert en architectures\n" +
		  "\t\t\t\t\t\t  logicielles et en optimisation UX, je reste à la pointe des tendances technologiques. En\n" +
		  "\t\t\t\t\t\t  dehors du code, les sports extrêmes alimentent ma créativité, repoussant les limites du\n" +
		  "\t\t\t\t\t\t  développement. Suivez mon parcours digital, où chaque ligne de code contribue à une histoire\n" +
		  "\t\t\t\t\t\t  passionnante. 💻🚀",
		nbOfVisits: 5,
	}, {
		profilePicture: "https://randomuser.me/api/portraits/men/95.jpg",
		name: "Jean T.",
		note: 5,
		distance: 49,
		price: 12,
		map: {
			coordinates: { "latitude": 44.925527, "longitude": 4.92091 }, radius: 1500,
		},
		bio: "En tant que développeur Full Stack passionné, je façonne des expériences numériques novatrices. Expert en architectures\n" +
		  "\t\t\t\t\t\t  logicielles et en optimisation UX, je reste à la pointe des tendances technologiques. En\n" +
		  "\t\t\t\t\t\t  dehors du code, les sports extrêmes alimentent ma créativité, repoussant les limites du\n" +
		  "\t\t\t\t\t\t  développement. Suivez mon parcours digital, où chaque ligne de code contribue à une histoire\n" +
		  "\t\t\t\t\t\t  passionnante. 💻🚀",
		nbOfVisits: 5,
	}, {
		profilePicture: "https://randomuser.me/api/portraits/women/59.jpg",
		name: "Bertha F.",
		note: 4,
		distance: 489,
		price: 10,
		map: {
			coordinates: { "latitude": 44.933393, "longitude": 4.89236 }, radius: 2000,
		},
		bio: "En tant que développeur Full Stack passionné, je façonne des expériences numériques novatrices. Expert en architectures\n" +
		  "\t\t\t\t\t\t  logicielles et en optimisation UX, je reste à la pointe des tendances technologiques. En\n" +
		  "\t\t\t\t\t\t  dehors du code, les sports extrêmes alimentent ma créativité, repoussant les limites du\n" +
		  "\t\t\t\t\t\t  développement. Suivez mon parcours digital, où chaque ligne de code contribue à une histoire\n" +
		  "\t\t\t\t\t\t  passionnante. 💻🚀",
		nbOfVisits: 5,
	}, {
		profilePicture: "https://randomuser.me/api/portraits/women/59.jpg",
		name: "Bertha F.",
		note: 4,
		distance: 1,
		price: 10,
		map: {
			coordinates: { "latitude": 44.920177, "longitude": 4.899143 }, radius: 1700,
		},
		bio: "En tant que développeur Full Stack passionné, je façonne des expériences numériques novatrices. Expert en architectures\n" +
		  "\t\t\t\t\t\t  logicielles et en optimisation UX, je reste à la pointe des tendances technologiques. En\n" +
		  "\t\t\t\t\t\t  dehors du code, les sports extrêmes alimentent ma créativité, repoussant les limites du\n" +
		  "\t\t\t\t\t\t  développement. Suivez mon parcours digital, où chaque ligne de code contribue à une histoire\n" +
		  "\t\t\t\t\t\t  passionnante. 💻🚀",
		nbOfVisits: 5,
	}])

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
		setShowDate(true)
		setShowDuration(false)
		setShowResults(false)
		styles.map.height = "50%"
		handlePresentModalPress()

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

				// Get screen dimensions
				const { height } = Dimensions.get("window")

				// Calculate the offset based on screen height
				const offsetFactor = 0.000001 // Adjust this factor based on your preference
				const offset = offsetFactor * height

				latitude -= offset

				mapRef.current.animateToRegion({
					latitude, longitude, latitudeDelta: 0.0022, longitudeDelta: 0.0031,
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

	const radioItems = [{
		label: t("prospect.visits_duration.studio"), value: "option1",
	}, {
		label: t("prospect.visits_duration.t2_to_t4"), value: "option2",
	}, {
		label: t("prospect.visits_duration.t5_and_more"), value: "option3",
	}, { label: t("prospect.visits_duration.house"), value: "option4" }, {
		label: t("prospect.visits_duration.villa"), value: "option5",
	}, // { label: t("prospect.visits_duration.custom_duration"), value: "option6" },
	]

	const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0))
	const sortingChoices = [t("common.star.other"), t("common.price"), t("common.distance")]
	const displayValue = sortingChoices[selectedIndex.row]
	const sortResults = (index) => {
		let sortedResults = []

		if (index.row === 0) {
			sortedResults = [...searchResults].sort((a, b) => b.note - a.note)
		} else if (index.row === 1) {
			sortedResults = [...searchResults].sort((a, b) => a.price - b.price)
		} else if (index.row === 2) {
			sortedResults = [...searchResults].sort((a, b) => a.distance - b.distance)
		}

		setSearchResults(sortedResults)
	}


	return (<View style={styles.root}>
		<BottomSheetModalProvider>
			<View style={styles.container}>
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
						{searchResults.map((person, index) => (<Circle
						  key={index}
						  center={person.map.coordinates}
						  radius={person.map.radius}
						  strokeColor={"#FF7F50"}
						  fillColor={"rgba(255,127,80,0.35)"}
						/>))}
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


				<BottomSheetModal
				  ref={bottomSheetModalRef}
				  index={1}
				  snapPoints={snapPoints}
				  onChange={handleSheetChanges}
				  enableContentPanningGesture={true}
				>
					<View style={styles.contentContainer}>

						{showDate ? (<View style={styles.detailsBox}>
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
							  onPress={() => {
								  setShowDate(!showDate)
								  setShowDuration(!showDuration)
							  }}
							/>
						</View>) : null}


						{showDuration ? (<View style={styles.detailsBox}>
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
								  </View>))}
							</View>

							<CustomButton
							  text={t("common.search")}
							  bgColor={"#FF7F50"}
							  onPress={() => {
								  if (selectedValue === "") {
									  alert("Please select a value")
								  } else {
									  setShowDate(false)
									  setShowDuration(false)
									  setShowResults(true)
								  }
							  }}
							/>
						</View>) : null}


						{showResults ? (<View style={styles.detailsBox}>
							<View>
								<View style={styles.titleAndFilter}>
									<View style={styles.titleWithImageContainer}>
										<Image source={require("../../../../../assets/icons/005-invoice.png")}
										       style={styles.titleWithImageIcon} />
										<Text style={styles.titleWithImageText}>{t("common.result.other")}</Text>
									</View>

									<Select
									  selectedIndex={selectedIndex}
									  onSelect={(index) => {
										  setSelectedIndex(index)
										  sortResults(index)
									  }}
									  value={displayValue}
									  style={{
										  width: "100%", borderRadius: 20, maxWidth: 130, alignSelf: "center",
									  }}
									>
										<SelectItem title={t("common.star.other")} />
										<SelectItem title={t("common.price")} />
										<SelectItem title={t("common.distance")} />
									</Select>
								</View>


							</View>
							<ScrollView style={styles.searchResults} contentContainerStyle={{ flexGrow: 1 }}>
								{searchResults.map((person, index) => (<View key={index}>
									<SearchResultPerson data={person} />
								</View>))}
							</ScrollView>
						</View>) : null}
					</View>
				</BottomSheetModal>
			</View>
		</BottomSheetModalProvider>
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
		height: "100%",
		backgroundColor: "white",
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		paddingTop: 25,
		paddingLeft: 20,
		paddingRight: 20,
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
	}, container: {
		flex: 1, justifyContent: "center", backgroundColor: "grey",
	}, contentContainer: {
		flex: 1, alignItems: "center",
	},
	titleAndFilter:{
		display: "flex", flexDirection: "row", justifyContent: "space-between",
	}

})

export default SearchMap
