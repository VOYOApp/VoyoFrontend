import React, { useRef, useState } from "react"
import {
	Image,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	useWindowDimensions,
	View,
} from "react-native"
import BackButton from "../../../../components/BackButton"
import { useNavigation, useRoute } from "@react-navigation/native"
import { useTranslation } from "react-i18next"
import CustomButton from "../../../../components/CustomButton"
import Images from "../../../../../assets"
import GMapInscription from "../../../../components/GMapInscription"
import { Icon } from "react-native-paper"
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete"
import AvailabilityCard from "../../../../components/AvailabilityCard"
import CriteriaCard from "../../../../components/CriteriaCard"

const VisitorAvailability = () => {
	const { t } = useTranslation()
	const [btnDisabled, setBtnDisabled] = useState(false)
	const [criteriaList, setCriteriaList] = useState([])

	const { height } = useWindowDimensions()
	const navigation = useNavigation()
	const route = useRoute()
	const user = route.params?.user

	const onNextPressed = () => {
		navigation.navigate("SignUp", {
			screen: "TarificationVisitor",
			params: {
				user: {
					...user,
				},
				criteriaList,
			},
		})
	}

	const addCriteriaCard = () => {
		const newCriteriaList = [...criteriaList, {
			id: Math.random(),
			"availability": '',
			"duration": '',
			"repeat": '',
		}]
		setCriteriaList(newCriteriaList)
	}

	const removeCriteriaCard = (id) => {
		if (criteriaList.length === 1) return
		const updatedCriteriaList = criteriaList.filter((criteria) => criteria.id !== id)
		setCriteriaList(updatedCriteriaList)
	}

	const scrollViewRef = useRef(null)
	return (
	  <View style={styles.root}>
		  <BackButton />
		  <View className={"w-full h-full"}>
			  <Text style={styles.title}>{t("common.register_to_voyo")}</Text>
			  <Text style={{ marginBottom: 10 }}>{t("common.other_information")}</Text>

			  <View className={"h-full w-full"}>
				  <View className={"h-full w-full items-center"}>
					  <View className={"h-[70%] w-full rounded-3xl bg-gray-200 items-center"}>
						  <Text style={styles.subtitle}>{t("common.availability")}</Text>
						  <Text
							className={"text-justify text-xs p-3 leading-4"}>{t("common.availability_description")}</Text>

						  <ScrollView
							className={"w-[95%] rounded-2xl"}
							style={styles.scrollView}
							showsVerticalScrollIndicator={false}
							showsHorizontalScrollIndicator={false}
							ref={scrollViewRef}
							onContentSizeChange={() => {
								scrollViewRef.current?.scrollToEnd()
							}}
						  >
							  {criteriaList.map((criteria) => (<AvailabilityCard
								  key={criteria.id}
								  setAvailability={(availability) => {
									  // Update availability in the criteria list
									  criteria.availability = availability;
									  setCriteriaList([...criteriaList]);
								  }}
								  setDuration={(duration) => {
									  // Update duration in the criteria list
									  criteria.duration = duration;
									  setCriteriaList([...criteriaList]);
								  }}
								  setRepeat={(repeat) => {
									  // Update repeat in the criteria list
									  criteria.repeat = repeat;
									  setCriteriaList([...criteriaList]);
								  }}
								  onDelete={() => removeCriteriaCard(criteria.id)}
							    />
							  ))}

							  <View style={styles.iAmABlankSpace} />
						  </ScrollView>

					  </View>

					  <TouchableOpacity style={styles.plusBtn} onPress={addCriteriaCard}>
						  <View style={styles.icon}>
							  <Icon source={Images.add} size={25} />
						  </View>
						  <Text>{t("prospect.add_criteria")}</Text>
					  </TouchableOpacity>

					  <View className={"h-full w-[80%]"}>
						  <CustomButton text={t("common.next")} onPress={onNextPressed} bgColor={"orange"}
						                deactivated={btnDisabled} />
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
	}, scrollView: {
		width: "95%",
		padding: 10,
		backgroundColor: "white",
		marginBottom: 10,
	},
	iAmABlankSpace: {
		height: 10,
	}, plusBtn: {
		marginVertical: 5,
		height: 40,
		backgroundColor: "#f4f3f4",
		borderRadius: 100,
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "row",
		paddingHorizontal: 10,
		shadowColor: "#000",
		shadowOffset: {
			width: 0, height: 0,
		},
	}, icon: {
		marginRight: 10,
	},
})

export default VisitorAvailability