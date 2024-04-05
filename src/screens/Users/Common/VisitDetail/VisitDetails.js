import React, { useEffect, useState } from "react"
import { Image, ScrollView, StyleSheet, Text, View } from "react-native"
import { useRoute } from "@react-navigation/native"
import { Icon } from "react-native-paper"
import Images from "../../../../../assets"
import GMap from "../../../../components/GMap"
import { getToken } from "../../../../context/AuthContext"
import axios from "axios"
import { BASE_URL } from "@env"
import StarsNotation from "../../../../components/StarsNotation"


const VisitDetails = () => {
	const route = useRoute()
	const id = route.params?.idVisit

	const [visitData, setVisitData] = useState(null)

	useEffect(() => {
		const fetchVisitDetails = async () => {
			try {
				const token = await getToken()
				const response = await axios.get(`${BASE_URL}/api/visit?id=${id}`, {
					headers: { Authorization: `Bearer ${token}` },
				})
				if (response.status === 200) {
					setVisitData(response.data.visit)
				}
			} catch (error) {
				console.error("Error fetching visit details:", error)
			}
		}

		fetchVisitDetails().then(r => r).catch(e => e)
	}, [id])

	console.log("vd2" + visitData)
	return (<ScrollView style={styles.root}>
		<View style={styles.container}>
			<Text style={styles.title}>Visit Details</Text>

			{/*Basic date & time details*/}
			<View style={styles.innerContainer}>
				<View style={styles.rowWithIcon}>
					<Icon size={20} source={Images.calendarOrange} />
					<Text style={styles.textdetails}>Date : </Text>
				</View>
				<View style={styles.rowWithIcon}>
					<Icon size={20} source={Images.clock} />
					<Text style={styles.textdetails}>Horaire : </Text>
				</View>
				<View style={styles.rowWithIcon}>
					<Icon size={23} source={Images.sablierOrange} />
					<Text style={styles.textdetailsless}>Durée : </Text>
				</View>
			</View>

			{/*Notate the visit*/}
			<View style={styles.innerContainer}>
				<StarsNotation visitID={id} />
			</View>

			{/*Location map & details TODO: make the map corners rounded*/}
			<View style={styles.innerContainertest}>
				<View style={styles.rowWithIcontest}>
					<Icon size={23} source={Images.location} />
					<Text style={styles.textdetails}>Emplacement : </Text>
				</View>
				<GMap hasSearch={false} style={styles.map} />
			</View>

			{/*Visitor details*/}
			<View style={styles.innerContainer}>
				<View style={styles.rowWithIcon}>
					<Icon size={23} source={Images.location} />
					<Text style={styles.textdetails}>Visiteur : </Text>
				</View>
				<View style={styles.visitorcontainer}>
					<Image
					  src={"https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.leawo.com%2Fblog%2Fwp-content%2Fuploads%2F2009%2F12%2Favatar10.jpg&f=1&nofb=1&ipt=cef93da117e39f2b91cc9a535db7e6c3712d2b24e87b1c00afe1551b5f0aafac&ipo=images"}
					  style={{ width: 80, height: 80, borderRadius: 20, resizeMode: "cover" }}
					  resizeMode="contain" />
					<View style={styles.visitordetails}>
						<View style={styles.rowWithIcon}>
							<Icon size={23} source={Images.etoile} />
							<Text style={styles.textdetails}>/5</Text>
						</View>
						<View style={styles.rowWithIcon}>
							<Icon size={23} source={Images.distance} />
							<Text style={styles.textdetails}>m</Text>
						</View>
						<View style={styles.rowWithIcon}>
							<Icon size={23} source={Images.rocket} />
							<Text style={styles.textdetails}>visites effectuées </Text>
						</View>
					</View>
				</View>
			</View>


			<View style={styles.innerContainer}>
				<View style={styles.rowWithIcon}>
					<Icon size={20} source={Images.search} />
					<Text style={styles.textdetails}>Date : </Text>
				</View>
				<View style={styles.rowWithIcon}>

					<Text style={styles.textdetails}>Horaire : </Text>
				</View>
				<View style={styles.rowWithIcon}>

					<Text style={styles.textdetails}>Durée : </Text>
				</View>

			</View>

		</View>
	</ScrollView>)
}

const styles = StyleSheet.create({
	root: {
		flex: 1, paddingTop: 100, paddingLeft: 20, paddingRight: 20,
	}, container: {
		flex: 1, backgroundColor: "rgba(164,164,164,0.22)", borderRadius: 30,
	}, innerContainer: {
		flex: 1, backgroundColor: "rgba(164,164,164,0.2)", borderRadius: 30, padding: 18, marginBottom: 10,
	}, title: {
		fontSize: 18, marginLeft: 15, marginTop: 20, marginBottom: 20, fontWeight: "bold",
	}, rowWithIcon: {
		display: "flex", flexDirection: "row", alignItems: "center", marginBottom: 7,
	}, textdetails: {
		marginLeft: 10,
	}, textdetailsless: {
		marginLeft: 8,
	}, innerContainertest: {
		flex: 1,
		backgroundColor: "rgba(164,164,164,0.27)",
		borderRadius: 30,
		marginBottom: 10,
		height: 270,
		paddingBottom: 76,
	}, rowWithIcontest: {
		paddingLeft: 18, paddingTop: 18, paddingBottom: 8, display: "flex", flexDirection: "row", alignItems: "center",
	}, visitorcontainer: {
		display: "flex", flexDirection: "row", alignItems: "center", marginBottom: 7,
	}, visitordetails: {
		marginLeft: 10,
	},
})

export default VisitDetails
