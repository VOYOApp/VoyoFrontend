import React from "react"
import { Image, StyleSheet, Text, View } from "react-native"
import CustomButton from "../CustomButton"
import { useTranslation } from "react-i18next"
import { useNavigation } from "@react-navigation/native"

const AdminHomeListUsers = ({data}) => {
	const { t } = useTranslation()

	const opt_date_title = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
	const opt_date = { year: 'numeric', month: 'long', day: 'numeric' };
	const navigation = useNavigation()
	
	const onBtnPressed = () => {
		// Open user details
		let isValidation = false
		navigation.navigate("AdminSearch", { screen: "ValidateRequest", params: {data, isValidation} })
	}

	return (
		<View>

		<View style={styles.card}>
			<View>
				<View>
					<View style={styles.rowWithImage}>
					<Image src={data.profile_picture}
									style={{ width: 40, height: 40, marginRight: 20, borderRadius:100 }} />
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