import React, { useState } from "react"
import { ScrollView, StyleSheet, Text, View } from "react-native"
import { useRoute } from "@react-navigation/native"
import GMap from "../../../../components/GMap"
import { Icon } from "react-native-paper"
import Images from "../../../../../assets"

const VisitDetails = () => {
	const route = useRoute()
	const id = route.params?.idVisit

	const [visitData, setVisitData] = useState(null)

	// useEffect(() => {
	// 	const fetchVisitDetails = async () => {
	// 		try {
	// 			const token = await getToken()
	// 			const response = await axios.get(`${BASE_URL}/api/visit?id=${id}`, {
	// 				headers: { Authorization: `Bearer ${token}` },
	// 			})
	// 			if (response.status === 200) {
	// 				setVisitData(response.data.visit)
	// 			}
	// 		} catch (error) {
	// 			console.error("Error fetching visit details:", error)
	// 		}
	// 	}
	//
	// 	fetchVisitDetails()
	//
	// 	console.log("vd1" + visitData)
	// }, [id])

	console.log("vd2" + visitData)
	return (<ScrollView style={styles.root}>
		<View style={styles.container}>
			<Text style={styles.title}>Visit Details</Text>
			<View style={styles.innerContainer}>
				<View style={styles.rowWithIcon}>

					<Text>Date : </Text>
				</View>
				<View style={styles.rowWithIcon}>

					<Text>Horaire : </Text>
				</View>
				<View style={styles.rowWithIcon}>

					<Text>Durée : </Text>
				</View>
			</View>
			<View style={styles.innerContainer}>
				<View style={styles.rowWithIcon}>

					<Text>Date : </Text>
				</View>
				<View style={styles.rowWithIcon}>

					<Text>Horaire : </Text>
				</View>
				<View style={styles.rowWithIcon}>

					<Text>Durée : </Text>
				</View>
			</View>
			<View style={styles.innerContainer}>
				<View style={styles.rowWithIcon}>
					<Icon name="close" size={20} source={Images.search} />
					<Text>Date : </Text>
				</View>
				<View style={styles.rowWithIcon}>

					<Text>Horaire : </Text>
				</View>
				<View style={styles.rowWithIcon}>

					<Text>Durée : </Text>
				</View>

				<GMap hasSearch={false} style={styles.map} />
			</View>

		</View>
	</ScrollView>)
}

const styles = StyleSheet.create({
	root: {
		flex: 1, paddingTop: 100, paddingLeft: 20, paddingRight: 20,
	}, container: {
		flex: 1, backgroundColor: "rgba(164,164,164,0.35)", borderRadius: 30,
	}, innerContainer: {
		flex: 1, backgroundColor: "rgba(164,164,164,0.35)", borderRadius: 30,
		padding: 18,
		marginBottom: 10,
	}, title: {
		fontSize: 18, marginLeft: 15, marginTop: 20, marginBottom: 20, fontWeight: "bold",
	}, map:{
		height: 100, width: "100%", borderRadius: 20,
	}, rowWithIcon:{
		display: "flex", flexDirection: "row", alignItems: "center",
		marginBottom: 7,
	}
})

export default VisitDetails
