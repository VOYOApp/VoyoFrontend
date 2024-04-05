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
import { Icon } from "react-native-paper"


const TarificationVisitor = () => {
	const { t } = useTranslation()
	const [btnDisabled, setBtnDisabled] = useState(true)
	const [pricing, setPricing] = useState('')

	const { height } = useWindowDimensions()
	const navigation = useNavigation()
	const route = useRoute()
	const user = route.params?.user

	const onNextPressed = () => {
		setBtnDisabled(true);
		try {
			navigation.navigate("SignUp", {
				screen: "VisitorVerification",
				params: {
					user: {
						...user,
						pricing: pricing,
					},
				},
			})
		} catch (error) {
			setBtnDisabled(false);
			alert("An error has occurred: "+error);
			console.log("An error has occurred: "+error);
		}
	}

	const handlePricing = () => {

	}

	return (
	  <View style={styles.root}>
		  <BackButton />
		  <View className={"w-full h-full"}>
			  <Text style={styles.title}>{t("common.register_to_voyo")}</Text>
			  <Text style={{ marginBottom: 10 }}>{t("common.other_information")}</Text>

			  <View className={"h-full w-full"}>
				  <View className={"h-full w-full items-center"}>
					  <View className={"w-full rounded-3xl bg-gray-200 items-center"}>
						  <Text style={styles.subtitle}>{t("common.pricing")}</Text>
						  <Text
							className={"text-justify text-xs p-3 leading-4"}>{t("common.pricing_description")}</Text>

							  <View className={"w-[95%] h-1/4 items-center"}>

								  <View className={"bg-green-700 p-3 my-3 rounded-md flex-row items-center w-[95%]"}>
									  <Icon source={Images.dollar} size={25} />
									  <TextInput onChangeText={(value) => {
										  setPricing(value)
										  value ? setBtnDisabled(false) : setBtnDisabled(true)
									  }}
									             value={pricing}
									             keyboardType={"number-pad"} className={"ml-2 text-white"} placeholderTextColor={"white"}
									             placeholder={t("common.pricing") + " : " + t("common.select_pricing")}></TextInput>
								  </View>

								  <View className={'bg-orange-400 p-3 rounded-md flex-row items-center w-[95%]'}>
									  <Icon source={Images.platform_tarification} size={25} />
									  <TextInput editable={false} className={"ml-2"} placeholderTextColor={"white"}
									             placeholder={t("common.platform_costs", { price: "0.50 €" })}></TextInput>
								  </View>
							  </View>

					  </View>

					  <View className={"h-full w-[80%] mt-4"}>
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
})

export default TarificationVisitor