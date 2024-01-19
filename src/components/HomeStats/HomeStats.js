import React from "react"
import { StyleSheet, View } from "react-native"
import { useTranslation } from "react-i18next"
import CustomStatCard from "../CustomStatCard"

const HomeStats = ({ StatsType }) => {

	const { t } = useTranslation()

	let indicator1 = 0
	let indicator2 = 0
	let indicator3 = 0
	let indicator4 = 0
	let indicator1TranslationKey = ""
	let indicator2TranslationKey = ""
	let indicator3TranslationKey = ""
	let indicator4TranslationKey = ""

	if (StatsType == "prospect") {
		indicator1 = 1
		indicator1TranslationKey = indicator1 === 1
		  ? "prospect.programmed_visite.one"
		  : "prospect.programmed_visite.other"

		indicator2 = 2
		indicator2TranslationKey = indicator2 === 1
		  ? "common.unread_messages.one"
		  : "common.unread_messages.other"

		indicator3 = 3
		indicator3TranslationKey = indicator3 === 1
		  ? "prospect.number_of_visits.one"
		  : "prospect.number_of_visits.other"

		indicator4 = 4
		indicator4TranslationKey = indicator4 === 1
		  ? "prospect.feedback_waiting.one"
		  : "prospect.feedback_waiting.other"

	} else if (StatsType == "visitor") {
		indicator1 = 1
		indicator1TranslationKey = indicator1 === 1
		  ? "common.unread_messages.one"
		  : "common.unread_messages.other"

		indicator2 = 2
		indicator2TranslationKey = indicator2 === 1
		  ? "visitor.upcoming_visits.one"
		  : "visitor.upcoming_visits.other"

		indicator3 = 3
		indicator3TranslationKey = indicator3 === 1
		  ? "visitor.upcoming_visits.one"
		  : "visitor.upcoming_visits.other"

		indicator4 = 4
		indicator4TranslationKey = indicator4 === 1
		  ? "visitor.upcoming_visits.one"
		  : "visitor.upcoming_visits.other"
	}

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