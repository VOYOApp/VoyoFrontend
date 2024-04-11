import React, { useEffect, useState } from "react"
import { StyleSheet, View } from "react-native"
import { useTranslation } from "react-i18next"
import CustomStatCard from "../CustomStatCard"
import axios from "axios"
import { getToken } from "../../context/AuthContext"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { jwtDecode } from "jwt-decode"

const HomeStats = () => {
	const { t } = useTranslation()

	const [indicator1, setIndicator1] = useState(0)
	const [indicator2, setIndicator2] = useState(0)
	const [indicator3, setIndicator3] = useState(0)
	const [indicator4, setIndicator4] = useState(0)
	const [indicator1TranslationKey, setIndicator1TranslationKey] = useState("")
	const [indicator2TranslationKey, setIndicator2TranslationKey] = useState("")
	const [indicator3TranslationKey, setIndicator3TranslationKey] = useState("")
	const [indicator4TranslationKey, setIndicator4TranslationKey] = useState("")

	let StatsType = "prospect"

	useEffect(() => {


		async function getStats() {
			try {
				const token = await AsyncStorage.getItem("token")
				StatsType = jwtDecode(token).role.toLowerCase()

				return await axios.get(`${process.env.BASE_URL}/api/user/homeStats`, {
					headers: { Authorization: `Bearer ${await getToken()}` },
				})
			} catch (error) {
				console.log("An error has occurred: " + error)
			}
		}

		getStats().then(async r => {


			if (StatsType === "prospect") {
				setIndicator1(r.data["programmed_visits"])
				setIndicator1TranslationKey(indicator1 === 1
				  ? "prospect.programmed_visite.one"
				  : "prospect.programmed_visite.other")

				setIndicator2(r.data["unread_messages"])
				setIndicator2TranslationKey(indicator2 === 1
				  ? "common.unread_messages.one"
				  : "common.unread_messages.other")

				setIndicator3(r.data["visited_done"])
				setIndicator3TranslationKey(indicator3 === 1
				  ? "prospect.number_of_visits.one"
				  : "prospect.number_of_visits.other")

				setIndicator4(r.data["waiting_reviews"])
				setIndicator4TranslationKey(indicator4 === 1
				  ? "prospect.feedback_waiting.one"
				  : "prospect.feedback_waiting.other")

			} else if (StatsType === "visitor") {
				setIndicator1(r.data["upcoming_visits"])
				setIndicator1TranslationKey(indicator1 === 1
				  ? "visitor.upcoming_visits.one"
				  : "visitor.upcoming_visits.other")

				setIndicator2(r.data["unread_messages"])
				setIndicator2TranslationKey(indicator2 === 1
				  ? "common.unread_messages.one"
				  : "common.unread_messages.other")

				setIndicator3(r.data["awaiting_approval"])
				setIndicator3TranslationKey(indicator3 === 1
				  ? "visitor.pending_acceptance.one"
				  : "visitor.pending_acceptance.other")

				setIndicator4(r.data["waiting_reviews"])
				setIndicator4TranslationKey(indicator4 === 1
				  ? "visitor.review_pending.one"
				  : "visitor.review_pending.other")
			}
		})
	}, [])

	return (
	  <View style={styles.stats}>
		  <View style={styles.statsRow}>
			  <CustomStatCard value={indicator1} text={indicator1TranslationKey} isSmall={true} />
			  <CustomStatCard value={indicator2} text={indicator2TranslationKey}
			                  isSmall={false} />
		  </View>
		  <View style={styles.statsRow}>
			  <CustomStatCard value={indicator3} text={indicator3TranslationKey}
			                  isSmall={false} />
			  <CustomStatCard value={indicator4} text={indicator4TranslationKey} isSmall={true} />
		  </View>
	  </View>
	)
}

const styles = StyleSheet.create({
	container: {
		borderRadius: 18,
	},
	value: {
		fontSize: 50,
	},
	stats: {
		width: "100%",
	},
	statsRow: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 10,
	},
})

export default HomeStats