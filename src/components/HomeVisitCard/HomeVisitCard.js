import React from "react"
import { Image, StyleSheet, Text, View } from "react-native"
import CustomButton from "../CustomButton"
import { useTranslation } from "react-i18next"
import { useNavigation } from "@react-navigation/native"

const HomeVisitCard = ({ data }) => {
	const { t } = useTranslation()
	const navigation = useNavigation()

	const opt_date_title = { weekday: "long", year: "numeric", month: "long", day: "numeric" }
	const opt_date = { year: "numeric", month: "long", day: "numeric" }

	// console.log(data)

	return (
	  <View>
		  <View className={"bg-orange-300 h-10 justify-start items-center flex-row rounded-t-lg"}>
			  <Image source={require("../../../assets/icons/calendarorange.png")} style={styles.logo} />
			  <Text>{new Intl.DateTimeFormat("fr-FR", opt_date_title).format(new Date(data.startTime))}</Text>
		  </View>

		  <View style={styles.card}>
			  <View>
				  <View>
					  <View style={styles.rowWithImage}>
						  <Image source={require("../../../assets/icons/010-user.png")} style={styles.logo} />
						  <Text>{data.firstName + " " + data.lastName}</Text>
					  </View>
					  <View style={styles.rowWithImage}>
						  <Image source={require("../../../assets/icons/013-clock.png")} style={styles.logo} />
						  <Text>{new Intl.DateTimeFormat("fr-FR", opt_date).format(new Date(data.startTime))}</Text>
					  </View>
					  <View style={styles.rowWithImage}>
						  <Image source={require("../../../assets/icons/009-location.png")} style={styles.logoBigger} />
						  <Text>{data.address}</Text>
					  </View>
					  {data.status === "ACCEPTED" ? (
						<View style={styles.rowWithImage}>
							<Image source={require("../../../assets/icons/014-check.png")} style={styles.logo} />
							<Text>{t("common.accepted_visit")}</Text>
						</View>) : data.status === "PENDING" ? (
						<View style={styles.rowWithImage}>
							<Image source={require("../../../assets/icons/015-hourglass.png")} style={styles.logo} />
							<Text>{t("common.waiting_validation")}</Text>
						</View>) : data.status === "REFUSED" ? (
						<View style={styles.rowWithImage}>
							<Image source={require("../../../assets/icons/021-refused.png")} style={styles.logo} />
							<Text>{t("common.refused_visit")}</Text>
						</View>) : data.status === "CANCELED" ? (
						<View style={styles.rowWithImage}>
							<Image source={require("../../../assets/icons/022-cancel.png")} style={styles.logo} />
							<Text>{t("common.cancelled_visit")}</Text>
						</View>) : data.status === "DONE" ? (
						<View style={styles.rowWithImage}>
							<Image source={require("../../../assets/icons/014-check.png")} style={styles.logo} />
							<Text>{t("common.visit_done")}</Text>
						</View>) : null}
				  </View>
			  </View>
			  <View style={styles.btn} onTouchEnd={
				  () => {
					  navigation.navigate("HomeProspect", {
						  screen: "VisitDetails",
						  params: {
							  idVisit: data.idVisit,
						  },
					  })
				  }

			  }>
				  <CustomButton text={t("common.details")} widthBtn={80} heightBtn={40} />
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

export default HomeVisitCard