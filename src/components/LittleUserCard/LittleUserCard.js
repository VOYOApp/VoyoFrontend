import React from "react"
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { useTranslation } from "react-i18next"
import { useNavigation, useRoute } from "@react-navigation/native"

const LittleUserCard = ({ data, allPersons }) => {
	const { t } = useTranslation()
	const navigation = useNavigation()
	const route = useRoute()

	// const goToProfilePage = () => {
	// 	navigation.navigate("HomeProspect", { params: { data, allPersons }, screen: "DetailsVisitor" })
	// }
	const goToProfilePage = () => {
		navigation.navigate("DetailsVisitor", { data, allPersons })
	}

	return (
	  <TouchableOpacity onPress={goToProfilePage} activeOpacity={1}>
		  <View className={"bg-gray-200 rounded-2xl items-center justify-center h-[98%] w-32 ml-2 mr-2 p-1"}
		        style={styles.shadowProp}>
			  <View className={"flex-row w-full h-1/3 mt-4 ml-4 mb-2"}>
				  <Image
					src={data.profilePicture}
					className={"w-14 h-14 rounded-lg mr-2"}
					resizeMode="cover" />
			  </View>
			  <View className={"flex-row w-full h-1/3 items-start justify-around"}>
				  <View>
					  <Image source={require("../../../assets/icons/010-user.png")} style={styles.logo} />
					  <Text className={"text-sm"}>{data.firstName + " " + data.lastName}</Text>
				  </View>
				  <View>
					  <Image source={require("../../../assets/icons/star.png")} style={styles.logo} />
					  <Text>{data.noteAvg.Float64.toFixed(1)}/5</Text>
				  </View>
			  </View>
			  <View className={"flex-row w-full h-1/3 items-start justify-around"}>
				  <View>
					  <Image source={require("../../../assets/icons/long-distance.png")} style={styles.logo} />
					  <Text>{data.roundedDistance} m</Text>
				  </View>
				  <View>
					  <Image source={require("../../../assets/icons/008-dollar.png")} style={styles.logo} />
					  <Text>{data.pricing}€/h</Text>
				  </View>
			  </View>
		  </View>
	  </TouchableOpacity>
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
	},
})

export default LittleUserCard