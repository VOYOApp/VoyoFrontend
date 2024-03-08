import React, { useRef, useState } from "react"
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, useWindowDimensions, View } from "react-native"
import BackButton from "../../../../components/BackButton"
import { useNavigation, useRoute } from "@react-navigation/native"
import { useTranslation } from "react-i18next"
import CustomButton from "../../../../components/CustomButton"
import Images from "../../../../../assets"
import GMapInscription from "../../../../components/GMapInscription"
import { Icon } from "react-native-paper"
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete"
import AvailabilityCard from "../../../../components/AvailabilityCard"

const VisitorAvailability = () => {
	const { t } = useTranslation()
	const [btnDisabled, setBtnDisabled] = useState(true)
	const [address, setAddress] = useState("")
	const [radius, setRadius] = useState(100)
	const [isSearch, setIsSearch] = useState(false)

	const GMapInscriptionRef = useRef(null)
	const ref = useRef()

	const { height } = useWindowDimensions()
	const navigation = useNavigation()

	const route = useRoute()
	// const user = route.params?.user

	const onNextPressed = () => {
		// navigation.navigate()
	}

	return (
	  <View style={styles.root}>
		  <BackButton />
		  <View className={"w-full h-full"}>
			  <Text style={styles.title}>{t("common.register_to_voyo")}</Text>
			  <Text style={{ marginBottom: 20 }}>{t("common.other_information")}</Text>

			  <View className={"h-full w-full"}>
				  <View className={"h-full w-full items-center"}>
					  <View className={"h-[80%] w-full rounded-3xl bg-gray-200 items-center"}>
						  <Text style={styles.subtitle}>{t("common.availability")}</Text>
						  <Text className={"text-justify text-sm p-3 leading-4 mb-2"}>{t("common.availability_description")}</Text>
						  <View className={"w-full h-full"}>
							  <AvailabilityCard></AvailabilityCard>
						  </View>
					  </View>

					  <View className={'h-full w-[80%] mt-44'}>
						  <CustomButton text={t("common.next")} onPress={onNextPressed} bgColor={"black"} deactivated={btnDisabled} />
					  </View>
				  </View>
			  </View>

		  </View>

	  </View>
	)
}

const styles = StyleSheet.create({
	root: {
		backgroundColor: "white",
		padding: 20,
		marginTop: 10,
		width: "100%",
		height: "100%",
	},
	title: {
		fontSize: 30,
		marginBottom: 10,
		marginTop: 10,
	},
	subtitle: {
		fontSize: 18,
		fontWeight: "400",
		padding: 3,
	},
	link: {
		color: "#FE881B",
		marginTop: 10,
	}
})

export default VisitorAvailability