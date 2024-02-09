import React, { useState } from "react"
import { Image, StyleSheet, TextInput, useWindowDimensions, View, Text, Button, TouchableOpacity } from "react-native"
import CustomInput from "../../../../components/CustomInput"
import CustomButton from "../../../../components/CustomButton"
import BackButton from "../../../../components/BackButton"
import { useNavigation } from "@react-navigation/native"
import { useTranslation } from "react-i18next"


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

	const { height } = useWindowDimensions()
	// const navigation = useNavigation()

	return (
	  <View style={styles.root}>
		  <View className={"w-full h-full pl-4 pr-4"}>
			  <Text className={"ml-3 mb-1 text-lg font-medium text-gray-500 uppercase mt-10"}>Profile</Text>
			  <View className={"p-4 bg-white w-full h-[30%] rounded-2xl"} style={styles.shadowProp}>
				  <View className={"flex-row"}>
					  <Image
						source={require("../../../../../assets/icons/avartar2.jpg")}
						style={[styles.profilePic, { height: height }]}
						resizeMode="cover" />
					  <View className={"w-full ml-3"}>
						  <View className={"flex-row items-center"}>
							  <Text className={"text-2xl font-semibold mr-2"}>Yohann Chavanel</Text>
							  <BackButton />
						  </View>
						  <Text className={"text-sm font-light mb-2"}>yohann@proton.me</Text>
						  <View className={"flex-row"}>
							  <TouchableOpacity
								className={"bg-blue-400 w-[50%] h-8 items-center mr-2 flex-row rounded-3xl"}
								onPress={() => navigation.navigate("SignInScreen")}>
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
						  <Text className={"text-black text-xl"}>3/5⭐️</Text>
						  <Text className={"text-gray-400 text-sm w-3/4"}>Note moyenne sur 62</Text>
					  </View>

					  <View>
						  <Text className={"text-black text-xl"}>69</Text>
						  <Text className={"text-gray-400 text-sm w-3/4"}>Visites effectuées</Text>
					  </View>

					  <View>
						  <Text className={"text-black text-xl"}>10€/h</Text>
						  <Text className={"text-gray-400 text-sm w-full"}>Tarification</Text>
					  </View>
				  </View>
			  </View>
			  <View className={"mt-1 w-full h-full"}>
				  <Text className={"ml-3 mb-2 text-lg font-medium text-gray-500 uppercase"}>Bio</Text>
				  <View className={"bg-white rounded-2xl items-center h-1/4"} style={styles.shadowProp}>
					  <Text className={"text-sm text-justify font-light p-2"}>En tant que développeur Full Stack
						  passionné, je façonne des expériences numériques novatrices. Expert en architectures
						  logicielles et en optimisation UX, je reste à la pointe des tendances technologiques. En
						  dehors du code, les sports extrêmes alimentent ma créativité, repoussant les limites du
						  développement. Suivez mon parcours digital, où chaque ligne de code contribue à une histoire
						  passionnante. 💻🚀</Text>
				  </View>

				  <Text className={"ml-3 mb-2 mt-2 text-lg font-medium text-gray-500 uppercase"}>Autres choix possible</Text>
				  <View>
					  <View className={"bg-red-100 rounded-2xl items-center h-[45%] w-1/3"} style={styles.shadowProp}/>
				  </View>
			  </View>

		  </View>

		  {/*<View className={"bg-orange-400 w-full h-full pt-10 pl-6 pr-6"}>*/}
		  {/*  <BackButton />*/}

		  {/*  <View className={'flex-row items-center'}>*/}
		  {/*	  <Image*/}
		  {/*	    src={"https://2.bp.blogspot.com/-0rLFh_JbOzQ/VVTtjHV98DI/AAAAAAAAB6M/cOJ84R_cUpk/s1600/whatsappimages%2Bfunny%2Bdp%2B(9).jpg"}*/}
		  {/*	    style={[styles.profilePic, { height: height }]}*/}
		  {/*	    resizeMode="contain" />*/}
		  {/*	  <View>*/}
		  {/*		  <Text style={styles.title}>Yohann Chavanel</Text>*/}
		  {/*	  </View>*/}
		  {/*  </View>*/}
		  {/*  <Text>IHUFGEUEGUGEuhzgiueghziguzhe ugzh ugzhe uizhe iuzeh uizeh</Text>*/}
		  {/*</View>*/}
		  {/*<View className={'h-full w-full bg-white rounded-t-[25px] absolute top-[40%]'}>*/}
		  {/*</View>*/}
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
	},
})

export default DetailsVisitor