import React, { useEffect, useState } from "react"
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { useNavigation, useRoute } from "@react-navigation/native"
import { Icon } from "react-native-paper"
import Images from "../../../../../assets"
import GMap from "../../../../components/GMap"
import { getToken } from "../../../../context/AuthContext"
import axios from "axios"
import StarsNotation from "../../../../components/StarsNotation"
import CriteriaCard from "../../../../components/CriteriaCard"
import { padStart } from "lodash"
import { jwtDecode } from "jwt-decode"
import CodeConfirmation from "../../../../components/CodeConfirmation"
import { useTranslation } from "react-i18next"


const VisitDetails = () => {
	const route = useRoute()
	const id = route.params?.idVisit
	const { t } = useTranslation()

	const navigation = useNavigation()

	const [visitData, setVisitData] = useState(null)
	const [decodedToken, setDecodedToken] = useState(null)
	const [value, setValue] = useState("")
	const [criteriaList, setCriteriaList] = useState(null)
	const [bgColor, setBgColor] = useState("rgba(164,164,164,0.22)")

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
					setCriteriaList(response.data.visit.criterias)
				}
			} catch (error) {
				console.error("Error fetching visit details:", error)
			}
		}

		fetchVisitDetails().then(r => r).catch(e => e)
	}, [id])

	useEffect(() => {
		// Update criteria data when value state changes
		if (value >= 100000) {
			for (let i = 0; i < criteriaList.length; i++) {
				if (criteriaList[i].criteria_answer === null || ((criteriaList[i].photo === null || criteriaList[i].photo === "") && criteriaList[i].photo_required)) {
					alert("Veuillez remplir tous les critères avant de valider la visite.")

					return
				}
			}
			updateCriterias()
		}
	}, [value])

	async function changeVisitStatus(stats) {
		try {
			const token = await getToken()
			setDecodedToken(jwtDecode(token))
			const response = await axios.patch(`${process.env.BASE_URL}/api/visit?id=${id}`, { status: stats }, {
				headers: { Authorization: `Bearer ${token}` },
			})
			if (response.status === 204) {
				navigation.replace("VisitDetails", { idVisit: id })
			}
		} catch (error) {
			console.error("Error fetching visit details:", error)
		}
	}

	async function updateCriterias() {
		const token = await getToken()

		try {
			const res = await axios.post(`${process.env.BASE_URL}/api/visit/code?idVisit=${id}&code=${value}`, {}, {
				headers: { Authorization: `Bearer ${token}` },
			})

			if (res.status === 204) {
				criteriaList.map(async (criteria) => {
					try {
						const response = await axios.patch(`${process.env.BASE_URL}/api/criteria?id=${criteria.id}`, {
							criteria_answer: criteria.criteria_answer, photo: criteria.photo,
						}, {
							headers: { Authorization: `Bearer ${token}` },
						})
						if (response.status === 204) {
							try {
								const response = await axios.patch(`${process.env.BASE_URL}/api/visit?id=${id}`, { status: "DONE" }, {
									headers: { Authorization: `Bearer ${token}` },
								})
								if (response.status === 204) {
									setBgColor("rgba(76,175,80,0.51)")
									navigation.replace("VisitDetails", { idVisit: id })
								}
							} catch (error) {
								console.error("Error fetching visit details:", error)
								alert("Une erreur est survenue. Veuillez réessayer.")
								setBgColor("rgba(242,44,61,0.59)")
							}

						}
					} catch (error) {
						console.error("Error fetching visit details:", error)
						alert("Une erreur est survenue. Veuillez réessayer.")
					}
				})
			}

		} catch (e) {
			console.error("Error fetching visit details:", e)
			setBgColor("rgba(242,44,61,0.59)")
		}
	}


	return (<ScrollView style={styles.root}>
		{visitData ? (<View style={styles.container}>
			<Text style={styles.title}>{t("common.visit_details")}</Text>
			{/*Basic date & time details*/}
			<View style={styles.innerContainer}>
				<View style={styles.rowWithIcon}>
					<Icon size={20} source={Images.calendarOrange} />
					<Text style={styles.textdetails}>{t("common.date")}
						: {new Date(visitData.visit.details.date).toLocaleDateString()}</Text>
				</View>
				<View style={styles.rowWithIcon}>
					<Icon size={20} source={Images.clock} />
					<Text style={styles.textdetails}>{t("common.starttime")} :
						{t("common.from")} {visitData.visit.details.startTime} {t("common.to")} {visitData.visit.details.endTime}</Text>
				</View>
				<View style={styles.rowWithIcon}>
					<Icon size={23} source={Images.sablierOrange} />
					<Text style={styles.textdetailsless}>{t("common.duration")}
						: {new Date(visitData.visit.details.duration).getHours() - 1}h{padStart((new Date(visitData.visit.details.duration).getMinutes()), 2, 0)} </Text>
				</View>
			</View>

			{/*Notate the visit*/}
			{decodedToken.role === "PROSPECT" && visitData.visit.details.status === "DONE" ? (
			  <View style={styles.innerContainer}>
				  <Text>{t("common.note_visit")}</Text>
				  <StarsNotation visitID={id} />
			  </View>) : null}

			{/*Location map & details*/}
			<View style={styles.innerContainertest}>
				<View style={styles.rowWithIcontest}>
					<Icon size={23} source={Images.location} />
					<Text style={styles.textdetails}>{t("common.address")}
						: {visitData.visit.address.results[0].formatted_address}</Text>
				</View>
				<View style={styles.roundedCorners}>
					<GMap hasSearch={false} style={styles.map} marker={visitData.visit.address.idAddressGMap} />
				</View>
			</View>


			{/*Verification Code*/}
			{decodedToken.role === "PROSPECT" && (visitData.visit.details.status === "ACCEPTED" || visitData.visit.details.status === "DONE") ? (
			  <View style={styles.innerContainer}>
				  <View style={styles.rowWithIcon}>
					  <Icon size={23} source={Images.code} />
					  <Text style={styles.textdetails}>{t("common.verification_code")} :</Text>

				  </View>
				  <View style={{
					  flexDirection: "row",
				  }}>
					  {visitData.visit.details.code
					  .toString() // Convert number to string
					  .split("") // Split the string into individual digits
					  .map((digit, index) => (<React.Fragment key={index}>
						  <Text style={styles.cell}>{digit}</Text>
						  {/* Add separator after every two digits, except for the last pair */}
						  {(index + 1) % 2 === 0 && index !== visitData.visit.details.code.toString().length - 1 && (
							<Text style={styles.separator}>-</Text>)}
					  </React.Fragment>))}
				  </View>
			  </View>) : null}

			{/*Criterias*/}
			<View style={styles.innerContainer}>
				<Text style={{ paddingBottom: 10 }}>{t("common.criterias")}</Text>
				{visitData.visit.criterias ? (<View>
					{visitData.visit.criterias.map((criteria, index) => {
						return <CriteriaCard key={index}
						                     showData={true}
						                     data={criteria}
						                     visitdetails={true}
						                     decodedToken={decodedToken}
						                     visitStatus={visitData.visit.details.status}
						                     setCriteriaAnswer={(value) => {
							                     criteria.criteria_answer = value
							                     setCriteriaList([...criteriaList])
						                     }}
						                     setPhoto={(value) => {
							                     criteria.photo = value
							                     setCriteriaList([...criteriaList])
						                     }}
						/>
					})}
				</View>) : <Text>{t("common.nocriteriassent")}</Text>}
			</View>

			{/*Visitor details*/}
			{decodedToken.role === "PROSPECT" ? (<View style={styles.innerContainer}>
				<View style={styles.rowWithIcon}>
					<Icon size={23} source={Images.user} />
					<Text style={styles.textdetails}>{t("common.visitor")}
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
							<Text
							  style={styles.textdetails}>{visitData.visitor.visitCount} {t("common.visits_dones")}  </Text>
						</View>
					</View>
				</View>
			</View>) : null}

			{/*Visit status*/}
			{decodedToken.role === "PROSPECT" ? (<View style={styles.innerContainer}>
				{visitData.visit.details.status === "CANCELED" ? (<View style={styles.rowWithIcon}>
					<Icon size={20} source={Images.close} />
					<Text style={styles.textdetails}>{t("common.refused_visit")}</Text>
				</View>) : null}
				{visitData.visit.details.status === "PENDING" ? (<View style={styles.rowWithIcon}>
					<Icon size={20} source={Images.sablierOrange} />
					<Text style={styles.textdetails}>{t("common.waiting_validation")}</Text>
				</View>) : null}
				{visitData.visit.details.status === "ACCEPTED" ? (<View style={styles.rowWithIcon}>
					<Icon size={20} source={Images.calendarOrange} />
					<Text style={styles.textdetails}>{t("common.accepted_visit")}</Text>
				</View>) : null}
				{visitData.visit.details.status === "REFUSED" ? (<View style={styles.rowWithIcon}>
					<Icon size={20} source={Images.restricted} />
					<Text style={styles.textdetails}>{t("common.refused_visit")}</Text>
				</View>) : null}
				{visitData.visit.details.status === "DONE" ? (<View style={styles.rowWithIcon}>
					<Icon size={20} source={Images.check} />
					<Text style={styles.textdetails}>{t("common.visit_done")}</Text>
				</View>) : null}

				<View style={styles.rowWithIcon}>
					<Icon size={20} source={Images.check} />
					<Text
					  style={styles.textdetails}>{t("common.checkoutof")} {visitData.visit.details.price}€ {t("common.done")}</Text>
				</View>
				<View style={styles.rowWithIcon}>
					<Icon size={20} source={Images.check} />
					<Text style={styles.textdetails}>{t("common.criterias_sent")}</Text>
				</View>
			</View>) : null}

			{/*Accept the visit*/}
			{(decodedToken.role === "VISITOR" && visitData.visit.details.status === "PENDING") ? (
			  <View style={styles.bottomButtons}>
				  <TouchableOpacity style={[styles.plusBtn, styles.bgGreen]} onPress={() => {
					  changeVisitStatus("ACCEPTED")
				  }}>
					  <View style={styles.icon}>
						  <Icon source={Images.check} size={15} />
					  </View>
					  <Text>{t("common.accept_visit")}</Text>
				  </TouchableOpacity>
				  <TouchableOpacity style={[styles.plusBtn, styles.bgRed]} onPress={() => {
					  changeVisitStatus("REFUSED")
				  }}>
					  <View style={styles.icon}>
						  <Icon source={Images.close} size={15} />
					  </View>
					  <Text>{t("common.refuse_visit")}</Text>
				  </TouchableOpacity>
			  </View>) : null}

			{/*Cancel the visit*/}
			{(decodedToken.role === "PROSPECT" && visitData.visit.details.status === "PENDING") ? (
			  <View style={styles.bottomButtons}>
				  <TouchableOpacity style={styles.plusBtn} onPress={() => {
					  changeVisitStatus("CANCELED")
				  }}>
					  <View style={styles.icon}>
						  <Icon source={Images.close} size={15} />
					  </View>
					  <Text>{t("common.cancel_visit")}</Text>
				  </TouchableOpacity>
			  </View>) : null}

			{/*Validate the visit*/}
			{(decodedToken.role === "VISITOR" && visitData.visit.details.status === "ACCEPTED") ? (
			  <View style={[styles.innerContainer, { backgroundColor: bgColor }]}>
				  <View style={styles.rowWithIcon}>
					  <Text style={{ paddingBottom: 10 }}>{t("common.enter_validation_code")}</Text>
				  </View>
				  <CodeConfirmation value={value} setValue={setValue} redirect={false} widthInp={40} />
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
	}, bgGreen: {
		backgroundColor: "rgba(76,175,80,0.51)",
	}, bgRed: {
		backgroundColor: "rgba(208,113,113,0.38)",
	}, cell: {
		width: 40,
		height: 50,
		lineHeight: 48,
		fontSize: 24,
		borderWidth: 2,
		borderColor: "#00000030",
		backgroundColor: "#00000010",
		textAlign: "center",
		borderRadius: 18,
		marginLeft: 5,
	}, separator: {
		height: 2, width: 10, backgroundColor: "#00000030", alignSelf: "center", marginLeft: 5,
	},
})

export default VisitDetails
