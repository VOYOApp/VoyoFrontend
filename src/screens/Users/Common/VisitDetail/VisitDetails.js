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
import CriteriaCard from "../../../../components/CriteriaCard"
import { padStart } from "lodash"


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
					setVisitData(response.data)
				}
			} catch (error) {
				console.error("Error fetching visit details:", error)
			}
		}

		fetchVisitDetails().then(r => r).catch(e => e)
	}, [id])

	return (<ScrollView style={styles.root}>
		{visitData ? (<View style={styles.container}>
			<Text style={styles.title}>Visit Details</Text>
			{/*Basic date & time details*/}
			<View style={styles.innerContainer}>
				<View style={styles.rowWithIcon}>
					<Icon size={20} source={Images.calendarOrange} />
					<Text style={styles.textdetails}>Date
						: {new Date(visitData.visit.details.date).toLocaleDateString()}</Text>
				</View>
				<View style={styles.rowWithIcon}>
					<Icon size={20} source={Images.clock} />
					<Text style={styles.textdetails}>Horaire :
						de {visitData.visit.details.startTime} à {visitData.visit.details.endTime}</Text>
				</View>
				<View style={styles.rowWithIcon}>
					<Icon size={23} source={Images.sablierOrange} />
					<Text style={styles.textdetailsless}>Durée
						: {new Date(visitData.visit.details.duration).getHours()-1}h{padStart((new Date(visitData.visit.details.duration).getMinutes()), 2, 0)} </Text>
				</View>
			</View>

			{/*Notate the visit*/}
			<View style={styles.innerContainer}>
				<Text>Noter la prestation</Text>
				<StarsNotation visitID={id} />
			</View>

			{/*Location map & details TODO: make the map corners rounded*/}
			<View style={styles.innerContainertest}>
				<View style={styles.rowWithIcontest}>
					<Icon size={23} source={Images.location} />
					<Text style={styles.textdetails}>Adresse
						: {visitData.visit.address.results[0].formatted_address}</Text>
				</View>
				<GMap hasSearch={false} style={styles.map} marker={visitData.visit.address.idAddressGMap} />
			</View>

			{/*Criterias*/}
			<View style={styles.innerContainer}>
				<Text style={{ paddingBottom: 10 }}>Criterias</Text>

				{visitData.visit.criterias.map((criteria, index) => {
					return <CriteriaCard key={index} showData={true} data={criteria} />
				})}
			</View>

			{/*Visitor details*/}
			<View style={styles.innerContainer}>
				<View style={styles.rowWithIcon}>
					<Icon size={23} source={Images.location} />
					<Text style={styles.textdetails}>Visiteur
						: {visitData.visitor.firstName + " " + visitData.visitor.lastName}</Text>
				</View>
				<View style={styles.visitorcontainer}>
					<Image
					  src={visitData.visitor.profilePicture}
					  style={{ width: 80, height: 80, borderRadius: 20 }}
					  resizeMode="cover"
					/>
					<View style={styles.visitordetails}>
						<View style={styles.rowWithIcon}>
							<Icon size={23} source={Images.etoile} />
							<Text style={styles.textdetails}>{visitData.visitor.noteAVG}/5</Text>
						</View>
						{/*TOTO: RECUPERER LA DISTANCE AU BIEN EGALEMENT*/}
						<View style={styles.rowWithIcon}>
							<Icon size={23} source={Images.distance} />
							<Text style={styles.textdetails}>m</Text>
						</View>
						<View style={styles.rowWithIcon}>
							<Icon size={23} source={Images.rocket} />
							<Text style={styles.textdetails}>{visitData.visitor.visitCount} visites effectuées </Text>
						</View>
					</View>
				</View>
			</View>

			{/*Visit status*/}
			<View style={styles.innerContainer}>
				<View style={styles.rowWithIcon}>
					<Icon size={20} source={Images.check} />
					<Text style={styles.textdetails}>Rendez-vous accepté</Text>
				</View>
				<View style={styles.rowWithIcon}>
					<Icon size={20} source={Images.check} />
					<Text style={styles.textdetails}>Paiement de {} effectué</Text>
				</View>
				<View style={styles.rowWithIcon}>
					<Icon size={20} source={Images.check} />
					<Text style={styles.textdetails}>Critères envoyés</Text>
				</View>
			</View>


			<View style={{ height: 100 }} />
			<View style={{ height: 100 }} />
		</View>) : null}
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
		height: 280,
		paddingBottom: 84,
	}, rowWithIcontest: {
		paddingLeft: 18, paddingTop: 18, paddingBottom: 8, display: "flex", flexDirection: "row", alignItems: "center",
	}, visitorcontainer: {
		display: "flex", flexDirection: "row", alignItems: "center", marginBottom: 7,
	}, visitordetails: {
		marginLeft: 10,
	},
})

export default VisitDetails
