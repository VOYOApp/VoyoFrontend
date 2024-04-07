import React, { useState } from "react"
import {
	Image,
	StyleSheet,
	TextInput,
	useWindowDimensions,
	View,
	Text,
	Button,
	TouchableOpacity,
	ScrollView,
} from "react-native"
import BackButton from "../../../../components/BackButton"
import { useNavigation, useRoute } from "@react-navigation/native"
import { useTranslation } from "react-i18next"
import LittleUserCard from "../../../../components/LittleUserCard"


const DetailsVisitor = () => {
	const { t } = useTranslation()
	const [lastName, setLastName] = useState("")
	const [firstName, setFirstName] = useState("")
	const [bio, setBio] = useState("")
	const [phoneNumber, setPhoneNumber] = useState("")
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [passwordConfirmation, setPasswordConfirmation] = useState("")
	const [isEnabled, setIsEnabled] = useState(false)
	const [isValidated, setIsValidated] = useState(false)
	const toggleSwitch = () => setIsEnabled(previousState => !previousState)
	const navigation = useNavigation()
	const route = useRoute()
	const dataVisitor = route.params?.data
	const allPersons = route.params?.allPersons ?? []

	const { height } = useWindowDimensions()
	// const navigation = useNavigation()

	const filteredPersons = allPersons.filter((person) => person.phoneNumber !== dataVisitor.phoneNumber) ?? []

	const goToRDV = () => {
		navigation.navigate("SearchProspect", { screen: "Criteria" })
	}

	return (
	  <View style={styles.root}>
		  <View className={"w-full h-full pl-4 pr-4"}>
			  <Text className={"ml-3 mb-1 text-lg font-medium text-gray-500 uppercase mt-10"}>Profile</Text>
			  <View className={"p-4 bg-white w-full h-[30%] rounded-2xl"} style={styles.shadowProp}>
				  <View className={"flex-row"}>
					  <Image
					    src={dataVisitor.profilePicture}
						style={[styles.profilePic, { height: height }]}
						resizeMode="cover" />
					  <View className={"w-full ml-3"}>
						  <View className={"flex-row items-center mb-2"}>
							  <Text className={"text-2xl font-semibold mr-2"}>{dataVisitor.firstName +" " + dataVisitor.lastName}</Text>
							  <BackButton />
						  </View>
						  {/*<Text className={"text-sm font-light mb-2"}>yohann@proton.me</Text>*/}
						  <View className={"flex-row"}>
							  <TouchableOpacity
								className={"bg-blue-400 w-[50%] h-8 items-center mr-2 flex-row rounded-3xl"}
								onPress={goToRDV}>
								  <Image className={"w-5 h-5 mx-3"}
								         source={require("../../../../../assets/icons/012-calendar.png")}></Image>
								  <Text className={"text-white text-lg"}>Prise de RDV</Text>
							  </TouchableOpacity>
							  {/*<TouchableOpacity className={'bg-orange-700 w-[35%] h-8 items-center mr-2 flex-row rounded-3xl'} onPress={() => navigation.navigate("SignInScreen")}>*/}
							  {/*  <Image className={'w-5 h-5 mx-2'} source={require("../../../../../assets/icons/011-chatting.png")}></Image>*/}
							  {/*  <Text className={'text-white text-sm'}>Message</Text>*/}
							  {/*</TouchableOpacity>*/}
						  </View>
					  </View>
				  </View>
				  <View className={"w-full h-full flex-row justify-between mt-4"}>
					  <View>
						  <Text className={"text-black text-xl"}>️{dataVisitor.noteAvg.Float64.toFixed(1)}/5⭐</Text>
						  <Text className={"text-gray-400 text-sm w-3/4"}>Note moyenne sur {dataVisitor.numberOfVisits}</Text>
					  </View>

					  <View>
						  <Text className={"text-black text-xl"}>{dataVisitor.numberOfVisits}</Text>
						  <Text className={"text-gray-400 text-sm w-3/4"}>Visites effectuées</Text>
					  </View>

					  <View>
						  <Text className={"text-black text-xl"}>{dataVisitor.pricing}€/h</Text>
						  <Text className={"text-gray-400 text-sm w-full"}>Tarification</Text>
					  </View>
				  </View>
			  </View>
			  <View className={"mt-1 w-full h-full"}>
				  <Text className={"ml-3 mb-2 text-lg font-medium text-gray-500 uppercase"}>Bio</Text>
				  <View className={"bg-white rounded-2xl h-1/4"} style={styles.shadowProp}>
					  <Text className={"text-sm text-justify font-light p-2"}>{dataVisitor.biography}</Text>
				  </View>

				  <Text className={"ml-3 mb-1 mt-2 text-lg font-medium text-gray-500 uppercase"}>Autres choix possible</Text>

				  <View className={"h-[24%] w-full"}>
					  <ScrollView horizontal={true} className={"h-full w-full"}>
						  {filteredPersons.map((person, index) => (<View key={index}>
							  <LittleUserCard data={person} allPersons={allPersons}/>
						  </View>))}
					  </ScrollView>
				  </View>

			  </View>
		  </View>
	  </View>
	)
}


const styles = StyleSheet.create({
	root: {
		backgroundColor: "white",
		width: "100%",
		height: "100%",
	},
	shadowProp: {
		shadowColor: "grey",
		shadowOpacity: 0.9,
		elevation: 20,
	},
	title: {
		fontSize: 24,
		marginBottom: 10,
		paddingLeft: 10,
	},
	profilePic: {
		width: "100%",
		maxWidth: 100,
		maxHeight: 120,
		borderRadius: 20,
	}, logo: {
		maxWidth: 20, maxHeight: 20, marginRight: 12,
	}
})

export default DetailsVisitor