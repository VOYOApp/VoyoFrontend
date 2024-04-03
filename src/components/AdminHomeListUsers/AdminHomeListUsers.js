import React from "react"
import { Image, StyleSheet, Text, View } from "react-native"
import CustomButton from "../CustomButton"
import { useTranslation } from "react-i18next"
import { useNavigation } from "@react-navigation/native"

const AdminHomeListUsers = () => {
	const { t } = useTranslation()
	const navigation = useNavigation()

	const onBtnPressed = () => {
		// Open user details
		navigation.navigate("ValidateRequest")
	}

	return (
	  <View style={styles.card}>
		  <View>
			  <View style={styles.rowWithImage}>
                  <Text>{t("admin.validation_request")} </Text>
			  </View>
              <View style={styles.rowWithImage}>
			  		<Image source={require("../../../assets/icons/010-user.png")} style={styles.logo} />
                    <Text>Roger</Text>
			  </View>
			  <View style={styles.rowWithImage}>
			  		<Image source={require("../../../assets/icons/013-clock.png")} style={styles.logo} />
                    <Text>29 février 1492</Text>
			  </View>
		  </View>
		  <View style={styles.btn}>
			  <CustomButton text={t("common.details")} widthBtn={80} heightBtn={40} onPress={onBtnPressed}/>
		  </View>
	  </View>

	)
}

const styles = StyleSheet.create({
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
		marginBottom: 5,
		marginTop: 5,
		width: "90%",
		maxWidth: 220,
	},
	logo: {
		maxWidth: 23,
		maxHeight: 23,
		marginLeft: 10,
		marginRight: 12,
	},
	logoBigger: {
		maxWidth: 27,
		maxHeight: 27,
		marginLeft: 9,
		marginRight: 10,
	},
	btn: {
		marginRight: 20,
	},
})

export default AdminHomeListUsers