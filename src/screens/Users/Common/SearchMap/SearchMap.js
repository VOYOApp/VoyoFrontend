import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { Image, ScrollView, StyleSheet, Text, View } from "react-native"
import { useTranslation } from "react-i18next"
import DateTimePickerModal from "react-native-modal-datetime-picker"
import CustomButton from "../../../../components/CustomButton" // https://www.npmjs.com/package/react-native-modal-datetime-picker
import { RadioButton } from "react-native-paper"
import { BottomSheetModal, BottomSheetModalProvider } from "@gorhom/bottom-sheet"
import SearchResultPerson from "../../../../components/SearchResultPerson"
import { IndexPath, Select, SelectItem } from "@ui-kitten/components"
import GMap from "../../../../components/GMap"
import axios from "axios"
import { getToken } from "../../../../context/AuthContext"

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

	const [isDatePickerVisible, setDatePickerVisibility] = useState(false)
	const [date, setDate] = useState(new Date())
	const [showResults, setShowResults] = useState(false)
	const [showDuration, setShowDuration] = useState(false)
	const [showDate, setShowDate] = useState(false)
	const [address, setAddress] = useState('')
	const [x, setX] = useState(0.0)
	const [y, setY] = useState(0.0)

	const [searchResults, setSearchResults] = useState([])

	const options = {
		weekday: "long", year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric",
	}

	const options_search = new Intl.DateTimeFormat('en-US', {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
		fractionalSecondDigits: 6,
	});


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


	const [selectedValue, setSelectedValue] = useState("")

	const radioItems = [{
		label: t("prospect.visits_duration.studio"), value: 1,
	}, {
		label: t("prospect.visits_duration.t2_to_t4"), value: 2,
	}, {
		label: t("prospect.visits_duration.t5_and_more"), value: 3,
	}, { label: t("prospect.visits_duration.house"), value: 4 }, {
		label: t("prospect.visits_duration.villa"), value: 5,
	}, // { label: t("prospect.visits_duration.custom_duration"), value: "option6" },
	]


	const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0))
	const sortingChoices = [t("common.star.other"), t("common.price"), t("common.distance")]
	const displayValue = sortingChoices[selectedIndex.row]
	const sortResults = (index) => {
		let sortedResults = []

		if (index.row === 0) {
			sortedResults = [...searchResults].sort((a, b) => b.noteAvg.Float64 - a.noteAvg.Float64)
		} else if (index.row === 1) {
			sortedResults = [...searchResults].sort((a, b) => a.pricing - b.pricing)
		} else if (index.row === 2) {
			sortedResults = [...searchResults].sort((a, b) => a.roundedDistance - b.roundedDistance)
		}

		setSearchResults(sortedResults)
	}


	const [dataFromChild, setDataFromChild] = useState()
	const handleDataFromChild = useCallback((data, details) => {
		setDataFromChild(data)

		setAddress(data.place_id)
		setX(details["geometry"]["location"]["lat"])
		setY(details["geometry"]["location"]["lng"])

		setShowDate(true)
		setShowDuration(false)
		setShowResults(false)
		handlePresentModalPress()
	}, [])

	const getPersonWithSearch = async (x,y,date,id_type_real_estate) => {
		let dateFormatee = date.toISOString().slice(0, 19).replace('T', ' ')
		try {
			const token = await getToken()
			const listUsers = await axios.get(`${process.env.BASE_URL}/api/search`, {
				headers: { Authorization: `Bearer ${token}` },
				params: {
					x:x,
					y:y,
					date: dateFormatee,
					idTypeRealEstate: id_type_real_estate,
					address_id: 1,
				}
			})
			if (listUsers.status === 200){
				const updatedResults = listUsers.data.map(user => {
					return {
						...user,
						start_time: date,
						type_real_estate_id: id_type_real_estate,
						address_id: address,
					};
				});
				setSearchResults(updatedResults)
			}
		}catch (e) {
			console.log(e)
		}
	}

	return (<View style={styles.root}>
		<BottomSheetModalProvider>
			<View style={styles.container}>

				<GMap hasSearch={true}
				      onData={handleDataFromChild}
				/>

				<BottomSheetModal
				  ref={bottomSheetModalRef}
				  index={1}
				  snapPoints={snapPoints}
				  onChange={handleSheetChanges}
				  enableContentPanningGesture={true}
				  style={{
					  position: "absolute",
					  top: 50,
					  left: 10,
					  right: 10,
					  borderRadius: 20,
					  shadowColor: "#000",
					  elevation: 10,
				  }}
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
									  getPersonWithSearch(x,y,date, selectedValue)
									  setShowDate(false)
									  setShowDuration(false)
									  setShowResults(true)
								  }
							  }}
							/>
						</View>) : null}


						{showResults ? (
						  <View style={styles.detailsBox}>
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
									<SearchResultPerson data={person} allPersons={searchResults}/>
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
	titleAndFilter: {
		display: "flex", flexDirection: "row", justifyContent: "space-between",
	},

})

export default SearchMap
