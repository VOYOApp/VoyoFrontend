import React from "react"
import { Image, StyleSheet, Text, View } from "react-native"
import CustomButton from "../CustomButton"
import { useTranslation } from "react-i18next"
import { useNavigation } from "@react-navigation/native"

const SearchResultPerson = (data) => {
	const { t } = useTranslation()
	const navigation = useNavigation()
	data = data.data

	// Screen width
	const width = window.innerWidth
	styles.rowWithImage.maxWidth = width - (styles.profilePicture.width + styles.btn.marginRight + 80 + 20 + 10 + 10)

	const goToProfilePage = () => {
		navigation.navigate("HomeProspect", { params: {data}, screen: "DetailsVisitor" })
	}

	return (
	  <View style={styles.card}>

		  <Image
			src={data.profilePicture}
			style={[styles.profilePicture]}
			resizeMode="contain" />


		  <View>
			  <View style={styles.rowWithImage}>
				  <Image source={require("../../../assets/icons/010-user.png")} style={styles.logo} />
				  <Text>{data.name}</Text>
			  </View>
			  <View style={styles.rowWithImage}>
				  <Image source={require("../../../assets/icons/star.png")} style={styles.logoBigger} />
				  <Text>{data.note}/5</Text>
			  </View>
			  <View style={styles.rowWithImage}>
				  <Image source={require("../../../assets/icons/long-distance.png")} style={styles.logoBigger} />
				  <Text>{data.distance}</Text>
			  </View>
			  <View style={styles.rowWithImage}>
				  <Image source={require("../../../assets/icons/008-dollar.png")} style={styles.logo} />
				  <Text>{data.price}€/h</Text>
			  </View>
		  </View>

		  <View style={styles.btn}>
			  <CustomButton text={"RDV"} widthBtn={80} heightBtn={40} onPress={goToProfilePage}/>
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
	},
	card: {
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
	},
	rowWithImage: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 3,
		marginTop: 3,
		marginLeft: 7,
		maxWidth: 150,
	},
	logo: {
		maxWidth: 20,
		maxHeight: 20,
		marginRight: 12,
	},
	logoBigger: {
		maxWidth: 25,
		maxHeight: 25,
		marginLeft: -2,
		marginRight: 10,
	},
	btn: {
		marginRight: 20,
	},
})

export default SearchResultPerson