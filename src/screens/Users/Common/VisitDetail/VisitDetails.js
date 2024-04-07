import React, { useEffect, useState } from "react"
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
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
import { jwtDecode } from "jwt-decode"
import { t } from "i18next"


const VisitDetails = () => {
	const route = useRoute()
	const id = route.params?.idVisit

	const [visitData, setVisitData] = useState(null)
	const [decodedToken, setDecodedToken] = useState(null)

	useEffect(() => {
		const fetchVisitDetails = async () => {
			try {
				const token = await getToken()
				setDecodedToken(jwtDecode(token))
				const response = await axios.get(`${process.env.BASE_URL}/api/visit?id=${id}`, {
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

	return (

		<ScrollView style={styles.root}>
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
							: {new Date(visitData.visit.details.duration).getHours() - 1}h{padStart((new Date(visitData.visit.details.duration).getMinutes()), 2, 0)} </Text>
					</View>
				</View>

				{/*Notate the visit*/}
				{decodedToken.role === "PROSPECT" && visitData.visit.details.status === "DONE" ? (
					<View style={styles.innerContainer}>
						<Text>Noter la prestation</Text>
						<StarsNotation visitID={id} />
					</View>) : null}

				{/*Location map & details TODO: make the map corners rounded*/}
				<View style={styles.innerContainertest}>
					<View style={styles.rowWithIcontest}>
						<Icon size={23} source={Images.location} />
						<Text style={styles.textdetails}>Adresse
							: {visitData.visit.address.results[0].formatted_address}</Text>
					</View>
					<View style={styles.roundedCorners}>
						<GMap hasSearch={false} style={styles.map} marker={visitData.visit.address.idAddressGMap} />
					</View>
				</View>

				{/*Criterias*/}
				<View style={styles.innerContainer}>
					<Text style={{ paddingBottom: 10 }}>Criterias</Text>

					{visitData.visit.criterias.map((criteria, index) => {
						return <CriteriaCard key={index} showData={true} data={criteria} visitdetails={true} />
					})}
				</View>

				{/*Visitor details*/}
				{decodedToken.role === "PROSPECT" ? (<View style={styles.innerContainer}>
					<View style={styles.rowWithIcon}>
						<Icon size={23} source={Images.user} />
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
								<Text style={styles.textdetails}>{visitData.visitor.visitCount} visites
									effectuées </Text>
							</View>
						</View>
					</View>
				</View>) : null}

				{/*Visit status*/}
				<View style={styles.innerContainer}>
					{visitData.visit.details.status === "CANCELED" ? (<View style={styles.rowWithIcon}>
						<Icon size={20} source={Images.close} />
						<Text style={styles.textdetails}>Rendez-vous refusé</Text>
					</View>) : null}
					{visitData.visit.details.status === "PENDING" ? (<View style={styles.rowWithIcon}>
						<Icon size={20} source={Images.sablierOrange} />
						<Text style={styles.textdetails}>Rendez-vous en attente d'acceptation</Text>
					</View>) : null}
					{visitData.visit.details.status === "ACCEPTED" ? (<View style={styles.rowWithIcon}>
						<Icon size={20} source={Images.calendarOrange} />
						<Text style={styles.textdetails}>Rendez-vous accepté</Text>
					</View>) : null}
					{visitData.visit.details.status === "REFUSED" ? (<View style={styles.rowWithIcon}>
						<Icon size={20} source={Images.restricted} />
						<Text style={styles.textdetails}>Rendez-vous refusé</Text>
					</View>) : null}
					{visitData.visit.details.status === "DONE" ? (<View style={styles.rowWithIcon}>
						<Icon size={20} source={Images.check} />
						<Text style={styles.textdetails}>Rendez-vous effectué</Text>
					</View>) : null}

					<View style={styles.rowWithIcon}>
						<Icon size={20} source={Images.check} />
						<Text style={styles.textdetails}>Paiement de {visitData.visit.details.price}€ effectué</Text>
					</View>
					<View style={styles.rowWithIcon}>
						<Icon size={20} source={Images.check} />
						<Text style={styles.textdetails}>Critères envoyés</Text>
					</View>
				</View>

				{/*Cancel the visit*/}
				{(decodedToken.role === "PROSPECT" && visitData.visit.details.status === "PENDING") || (decodedToken.role === "VISITOR" && visitData.visit.details.status === "ACCEPTED") ? (
					<View style={styles.bottomButtons}>
						<TouchableOpacity style={styles.plusBtn} onPress={() => {
							console.log("Annuler la visite") // cancelVisit()
						}}>
							<View style={styles.icon}>
								<Icon source={Images.close} size={15} />
							</View>
							<Text>{t("common.cancel_visit")}</Text>
						</TouchableOpacity>
					</View>) : null}

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
		paddingBottom: 62,
	}, rowWithIcontest: {
		paddingLeft: 18, paddingTop: 18, paddingBottom: 8, display: "flex", flexDirection: "row", alignItems: "center",
	}, visitorcontainer: {
		display: "flex", flexDirection: "row", alignItems: "center", marginBottom: 7,
	}, visitordetails: {
		marginLeft: 10,
	}, plusBtn: {
		height: 40,
		backgroundColor: "rgba(26,0,0,0.18)",
		borderRadius: 100,
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "row",
		paddingLeft: 20,
		paddingRight: 20,
		shadowColor: "#000",
	}, bottomButtons: {
		width: "100%", alignItems: "center", backgroundColor: "rgba(0,0,0,0.00)",
	}, icon: {
		marginRight: 10,
	}, roundedCorners: {
		borderRadius: 20, overflow: "hidden",
	},
})

export default VisitDetails
