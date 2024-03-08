import React, { useState } from "react"
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { Checkbox, Icon } from "react-native-paper"
import Images from "../../../assets"
import { useTranslation } from "react-i18next"
import DateTimePickerModal from "react-native-modal-datetime-picker"
import CustomButton from "../CustomButton"

const AvailabilityCard = ({ text, onDelete }) => {
	const { t } = useTranslation()

	const [date, setDate] = useState()
	const [time, setTime] = useState()
	const [dateIsSet, setDateIsSet] = useState(true)
	const [isDatePickerVisible, setDatePickerVisibility] = useState(false)
	const [isTimePickerVisibility, setTimePickerVisibility] = useState(false)
	const [checkedPhoto, setCheckedPhoto] = React.useState(false)
	const [checkedVideo, setCheckedVideo] = React.useState(false)

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
		setDateIsSet(false)
		hideDatePicker()
	}

	const showTimePicker = () => {
		setTimePickerVisibility(true)
	}

	const hideTimePicker = () => {
		setTimePickerVisibility(false)
	}
	const handleTimeChange = (date) => {
		const formattedTime = `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;
		setTime(formattedTime);
		hideDatePicker()
	}

	return (
	  <View style={styles.container}>
		  <View>
			  <TouchableOpacity onPress={showDatePicker} className={'bg-black p-3 mb-1 rounded-md flex-row items-center'}>
				  <Icon source={Images.calendarBlue} size={25} />
				  <Text className={'ml-2 text-white'}>{date ? 'Date : ' + Intl.DateTimeFormat("fr-FR", options).format(date).charAt(0).toUpperCase() + Intl.DateTimeFormat("fr-FR", options).format(date).slice(1): t("common.select_date")}</Text>
			  </TouchableOpacity>

			  <DateTimePickerModal
			    isVisible={isDatePickerVisible}
			    mode="datetime"
			    onConfirm={handleConfirm}
			    onCancel={hideDatePicker}
			    date={date}
			  />
		  </View>
		  <View>
			  <TouchableOpacity disabled={dateIsSet} onPress={showTimePicker} className={'bg-orange-700 p-3 rounded-md flex-row items-center'}>
				  <Icon source={Images.clock} size={25} />
				  <Text className={'ml-2 text-white'}>{time ? 'Durée : ' + time : t("common.select_time")}</Text>
			  </TouchableOpacity>

			  <DateTimePickerModal
			    date={date}
			    mode="time"
			    isVisible={isTimePickerVisibility}
			    is24Hour
			    onConfirm={handleTimeChange}
			    onCancel={hideTimePicker}
			  />
		  </View>

		  <View style={styles.underTheTextArea}>
			  <View style={styles.checkboxes}>
				  <View style={styles.checkbox}>
					  <Checkbox
						status={checkedPhoto ? "checked" : "unchecked"}
						onPress={() => {
							setCheckedPhoto(!checkedPhoto)
						}}
					  />
					  <Text>{t("common.photo.one")}</Text>
				  </View>
				  <View style={styles.checkbox}>
					  <Checkbox
						status={checkedVideo ? "checked" : "unchecked"}
						onPress={() => {
							setCheckedVideo(!checkedVideo)
						}}
					  />
					  <Text>{t("common.video.one")}</Text>
				  </View>
			  </View>

			  <TouchableOpacity style={styles.icon} onPress={onDelete}>
				  <Icon source={Images.trash} size={25} />
			  </TouchableOpacity>
		  </View>
	  </View>
	)
}


const styles = StyleSheet.create({
	container: {
		width: "100%",
		// backgroundColor: "white",
		marginBottom: 10,
		borderRadius: 18,
		backgroundColor: "rgba(0,0,0,0.06)",
	},
	textArea: {
		backgroundColor: "rgba(0,0,0,0.1)",
		borderRadius: 18,
		paddingHorizontal: 10,
		fontSize: 15,
		padding: 5,
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "row",
	},
	checkboxes: {
		flexDirection: "column",
		justifyContent: "space-between",
	},
	checkbox: {
		flexDirection: "row",
		alignItems: "center",
	},
	underTheTextArea: {
		padding: 5,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "flex-end",
	},
	icon: {
		margin: 5,
	},
})

export default AvailabilityCard