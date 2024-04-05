import React from "react"
import { Image, StyleSheet, Text, View } from "react-native"
import CustomButton from "../CustomButton"
import { useTranslation } from "react-i18next"
import { useNavigation } from "@react-navigation/native"

const AdminHomeValidationRequest = ({data}) => {
	const { t } = useTranslation()

	const opt_date_title = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
	const opt_date = { year: 'numeric', month: 'long', day: 'numeric' };
	const navigation = useNavigation()
	
	const onBtnPressed = () => {
		console.log(data);
		// Open user details
		navigation.navigate("HomeAdmin", { screen: "ValidateRequest", params: {data} })
	}

	// console.log(data)

	return (
	  <View>
		  <View className={"bg-orange-300 h-10 justify-start items-center flex-row rounded-t-lg"}>
		  <Image source={require("../../../assets/icons/013-clock.png")} style={styles.logo} />
			  <Text>{t("admin.pending_request")}</Text>
		  </View>

		  <View style={styles.card}>
			  <View>
				  <View>
					  <View style={styles.rowWithImage}>
					  	  <Image source={require("../../../assets/icons/010-user.png")} style={styles.logo} />
						  <Text>{data.first_name + " " + data.last_name}</Text>
					  </View>
				  </View>
			  </View>
			  <View style={styles.btn}>
				  <CustomButton text={t("admin.consult")} widthBtn={80} heightBtn={40} onPress={onBtnPressed}/>
			  </View>
		  </View>
	  </View>

	)
}

const styles = StyleSheet.create({
	card: {
		width: "100%",
		backgroundColor: "#ecd7c0",
		borderBottomLeftRadius: 10,
		borderBottomRightRadius: 10,
		marginBottom: 10,
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		paddingTop: 10,
		paddingBottom: 10,
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
		marginRight: 10,
	},
})

export default AdminHomeValidationRequest