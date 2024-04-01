import React from "react"
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import CustomButton from "../CustomButton"
import { useTranslation } from "react-i18next"
import { useNavigation } from "@react-navigation/native"

const SearchResultPerson = ({data, allPersons}) => {
	const { t } = useTranslation()
	const navigation = useNavigation()

	// Screen width
	const width = window.innerWidth
	styles.rowWithImage.maxWidth = width - (styles.profilePicture.width + styles.btn.marginRight + 80 + 20 + 10 + 10)

	const goToProfilePage = () => {
		navigation.navigate("HomeProspect", { params: { data, allPersons }, screen: "DetailsVisitor" })
	}

	const goToRDV = () => {
		navigation.navigate("SearchProspect", { screen: "Criteria" })
	}

	return (<View style={styles.card}>

		  <TouchableOpacity
			onPress={goToProfilePage}>
			  <Image
				src={data.profilePicture}
				style={[styles.profilePicture]}
				resizeMode="contain" />
		  </TouchableOpacity>


		  <View>
			  <View style={styles.rowWithImage}>
				  <Image source={require("../../../assets/icons/010-user.png")} style={styles.logo} />
				  <Text>{data.firstName +" " + data.lastName}</Text>
			  </View>
			  <View style={styles.rowWithImage}>
				  <Image source={require("../../../assets/icons/star.png")} style={styles.logoBigger} />
				  <Text>{data.noteAvg.Float64.toFixed(1)}/5</Text>
			  </View>
			  <View style={styles.rowWithImage}>
				  <Image source={require("../../../assets/icons/long-distance.png")} style={styles.logoBigger} />
				  <Text>{data.roundedDistance} m</Text>
			  </View>
			  <View style={styles.rowWithImage}>
				  <Image source={require("../../../assets/icons/008-dollar.png")} style={styles.logo} />
				  <Text>{data.pricing}€/h</Text>
			  </View>
		  </View>

		  <View style={styles.btn}>
			  <CustomButton text={"RDV"} widthBtn={80} heightBtn={40} onPress={goToRDV} />
		  </View>
	  </View>

	)
}

const styles = StyleSheet.create({
	profilePicture: {
		width: 70,
		height: 70,
		borderRadius: 15,
		backgroundColor: "rgba(0,0,0,0.1)",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		marginLeft: 5,
		marginRight: 5,
	}, card: {
		width: "100%",
		backgroundColor: "rgba(0,0,0,0.05)",
		borderRadius: 10,
		marginBottom: 10,
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		paddingTop: 10,
		paddingBottom: 10,
		paddingLeft: 5,
		justifyContent: "space-between",
	}, rowWithImage: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 3,
		marginTop: 3,
		marginLeft: 7,
		maxWidth: 150,
	}, logo: {
		maxWidth: 20, maxHeight: 20, marginRight: 12,
	}, logoBigger: {
		maxWidth: 25, maxHeight: 25, marginLeft: -2, marginRight: 10,
	}, btn: {
		marginRight: 20,
	},
})

export default SearchResultPerson