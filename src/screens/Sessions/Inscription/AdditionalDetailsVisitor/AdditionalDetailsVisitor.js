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

const AdditionalDetailsVisitor = () => {
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
	const user = route.params?.user
	const onNextPressed = () => {
		navigation.navigate("SignUp", {
			screen: "VisitorAvailability",
			params: {
				user: {
					...user,
					address_id: address,
					radius: radius,
				},
			},
		})
	}

	const callFunc = (data) => {
		setAddress(data.place_id)
		if (GMapInscriptionRef.current) {
			GMapInscriptionRef.current.handlePlaceSelected(data)
			setIsSearch(true)
			setBtnDisabled(false)
		} else {
			setIsSearch(false)
		}
	}

	const emptySearch = () => {
		ref.current?.setAddressText("")
	}

	return (
	  <View style={styles.root}>
		  <BackButton />
		  <View className={"w-full h-full"}>
			  <Text style={styles.title}>{t("common.register_to_voyo")}</Text>
			  <Text style={{ marginBottom: 20 }}>{t("common.other_information")}</Text>

			  <View className={"h-full w-full"}>
				  <View className={"h-full w-full items-center"}>
					  <View className={"h-1/2 w-full rounded-3xl bg-gray-200 items-center"}>
						  <Text style={styles.subtitle}>{t("common.reference_address")}</Text>
						  <Text className={"text-start text-sm leading-4 mb-2"}>{t("common.address_description")}</Text>
						  <View className={"w-full h-[80%]"}>
							  <View className={"items-start w-full h-full"}>
								  <View className={"flex-row p-2"}>
									  <Text className={"top-3"}>Adresse : </Text>

									  <GooglePlacesAutocomplete
										minLength={2}
										placeholder={t("common.searchMap.searchPlaceholder")}
										onPress={callFunc}
										query={{
											key: "AIzaSyBznSC8S1mPU-GPjsxuagQqnNK3a8xVOl4",
											language: "fr",
											components: "country:fr", // Limit the search to France
										}}
										ref={ref}
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
											<Icon name="close" size={20} source={Images.search} />
										</TouchableOpacity>)}

									  />
								  </View>

								  <View className={"flex-row items-center p-2"}>
									  <Text>Rayon : </Text>
									  <View className={"bg-[#F0F0F0] w-32 h-10 rounded-3xl p-3 flex-row items-center"}>
										  <Image className={"mr-2 w-4 h-4"} source={Images.target}></Image>
										  <TextInput
											value={radius.toString()}
											onChangeText={text => {
												const floatValue = parseFloat(text.replace(",", ".")) // Remplacer ',' par '.' pour permettre l'entrée de décimaux
												setRadius(isNaN(floatValue) ? "" : floatValue) // Vérifier si c'est un nombre, sinon laisser la chaîne vide
											}}
											placeholder="radius (km)"
											editable={true}
											maxLength={6}
											keyboardType="decimal-pad"
										  />
									  </View>
								  </View>
								  <View className={"h-full w-full mt-4"}>
									  <GMapInscription ref={GMapInscriptionRef} radius_visitor={radius}
									                   isSearch={isSearch}></GMapInscription>
								  </View>
							  </View>
						  </View>
					  </View>

					  <View className={"h-full w-[80%] mt-44"}>
						  <CustomButton text={t("common.next")} onPress={onNextPressed} bgColor={"black"}
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
		marginBottom: 5,
		fontWeight: "400",
		padding: 2,
	},
	link: {
		color: "#FE881B",
		marginTop: 10,
	}, searchBar: {
		container: {
			zIndex: 1000,
			// position: "absolute",
			// top: 50,
			// left: 10,
			// right: 10,
			borderRadius: 25,
			shadowColor: "#000",
			// elevation: 10,
			backgroundColor: "#F0F0F0",
		}, textInputContainer: {
			width: "100%", borderRadius: 20, height: 44,
		}, textInput: {
			borderRadius: 20, backgroundColor: "#F0F0F0",
		}, poweredContainer: {
			display: "none",
		}, listView: {
			borderRadius: 20, backgroundColor: "#F0F0F0",
		}, row: {
			backgroundColor: "#F0F0F0", padding: 10, height: 40, borderRadius: 20,
		}, separator: {
			height: 0.5, backgroundColor: "#F0F0F0",
		},
	},
})

export default AdditionalDetailsVisitor