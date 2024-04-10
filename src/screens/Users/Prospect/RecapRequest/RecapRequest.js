import React, { useEffect, useState } from "react"
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, useWindowDimensions, View } from "react-native"
import { useNavigation, useRoute } from "@react-navigation/native"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import { Icon } from "react-native-paper"
import Images from "../../../../../assets"
import { useTranslation } from "react-i18next"
import CustomButton from "../../../../components/CustomButton"
import axios from "axios"
import { getGlobal, getToken } from "../../../../context/AuthContext"
import { addDoc, collection, onSnapshot, query, serverTimestamp } from "firebase/firestore"
import { db } from "../../../../../firebaseConfig"

const RecapRequest = () => {
	const { t } = useTranslation()
	const Tab = createMaterialTopTabNavigator()

	const { height } = useWindowDimensions()
	const navigation = useNavigation()
	const route = useRoute()
	const visit = route.params
	const [labelRealEstate, setLabelRealEstate] = useState("")
	const [durationRealEstate, setDurationRealEstate] = useState("")
	const [platformCost, setPlatformCost] = useState(0.50)

	const [chatName, setChatName] = useState("TEST");
	const [members, setMembers] = useState([]);
	const [firstEmail, setFirstEmail] = useState('');

	function formatDateTime(date) {
		const options = {
			weekday: "long", // Nom complet du jour de la semaine
			year: "numeric", // Année au format numérique
			month: "long", // Nom complet du mois
			day: "numeric", // Jour du mois au format numérique
			hour: "numeric", // Heure au format numérique
			minute: "numeric", // Minutes au format numérique
		};
		let formattedDate = new Intl.DateTimeFormat("fr-FR", options).format(date);
		formattedDate.replace(":", "h");
		return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1)
	}

	const formatDuration = (date) => {
		return `${String(date.getHours()).padStart(2, '0')}h : ${String(date.getMinutes()).padStart(2, '0')}m : ${String(date.getSeconds()).padStart(2, '0')}s`;
	}

	const createVisit = async () => {
		const token = await getToken()
		let data = JSON.stringify(visit);

		let config = {
			method: 'post',
			maxBodyLength: Infinity,
			url: `${process.env.BASE_URL}/api/visit`,
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
			},
			data : data
		};

		// console.log(config)

		axios.request(config)
		.then((response) => {
			console.log(JSON.stringify(response.data));

		})
		.catch((error) => {
			console.log(error);
		});

	}

	useEffect(() => {
		// console.log(visit)
		axios.get(`${process.env.BASE_URL}/api/typerealestate`, {
			params: {
				id: visit.type_real_estate_id,
			}
		}).then((response) => {
			setLabelRealEstate(response.data.label)
			setDurationRealEstate(formatDuration(new Date(response.data.duration)))
		}).catch((error) => {
			console.error(error)
		})
	})

	useEffect(() => {
		getGlobal("user_details").then((data) => {
			setFirstEmail(data?.email)
			setMembers([{
				email:data?.email,
				avatar:data?.profile_picture,
				name: data?.first_name + " " +data?.last_name
			},{
				email:"",
				avatar:visit?.profile_picture,
				name: visit?.first_name + " " + visit?.last_name
			}
			])
		})
	}, []);

	const createChat = async () => {
		const chatData = {
			members: members.map((user) => ({
				email:user.email,
				avatar: user.avatar,
				name: user.name,
			})),
			admin: "admin@example.com",
			firstMemberEmail: firstEmail,
			lastActivity: serverTimestamp(),
		};

		// Ajouter le document chat à Firestore
		const chatRef = await addDoc(collection(db, "chats"), chatData);

		// Récupérer l'ID du document créé
		const chatId = chatRef.id;

		// Rediriger vers l'écran de chat avec le nouvel ID de chat
		navigation.navigate("Common", { params: { id: chatId, chatName }, screen: "Chat" });
	};


	// console.log(visit)
	return (<View style={styles.root}>
		<View style={styles.headTitles}>
			<Text style={styles.title}>{t("prospect.send_request")}</Text>
			<Text>
				{t("prospect.send_request_description_2")}
			</Text>
		</View>


		<View style={styles.headTitles}>
			<View style={styles.subTitle}>
				<Icon source={Images.calendarOrange} size={27} />
				<Text style={styles.subTitleText}>Créneau de visite</Text>
			</View>

			<View style={styles.textDescription}>
				<Text>{formatDateTime(visit.startTime)}</Text>
			</View>
		</View>


		<View style={styles.headTitles}>
			<View style={styles.subTitle}>
				<Icon source={Images.homeSmall} size={25} />
				<Text style={styles.subTitleText}>Type de bien</Text>
			</View>

			<View style={styles.textDescription}>
				<Text>{labelRealEstate} - {durationRealEstate} de visite</Text>
			</View>
		</View>

		<View style={styles.headTitles}>
			<View style={styles.subTitle}>
				<Icon source={Images.dollar} size={27} />
				<Text style={styles.subTitleText}>Tarification horaire de {visit?.first_name+" "+visit?.last_name}</Text>
			</View>

			<View style={styles.textDescription}>
				<Text>Par heure : {visit.price}€</Text>
				<Text>Durée de la visite : {durationRealEstate}</Text>
				<Text>Frais de plateforme : {platformCost}€</Text>
				<Text>Total à payer : {visit.price + platformCost}€</Text>
			</View>
		</View>

		<View style={styles.bottomButtons}>
			<CustomButton text={"Payer "+ (visit.price + platformCost) +"€"}
			              onPress={createChat}
			              bgColor={"#FE881B"}
			              widthBtn={"90%"}
			              heightBtn={43} />
		</View>
	</View>)
}


const styles = StyleSheet.create({
	root: {
		paddingTop: 60,
		alignItems: "flex-start",
		paddingLeft: 10,
		paddingRight: 10,
		backgroundColor: "white",
		height: "100%",
		width: "100%",
	}, headTitles: {
		width: "100%", paddingLeft: 20, paddingRight: 20, paddingBottom: 10,
	}, title: {
		fontSize: 30, marginBottom: 10,
	}, scrollView: {
		width: "100%", padding: 20,
	}, plusBtn: {
		height: 40,
		backgroundColor: "#f4f3f4",
		borderRadius: 100,
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "row",
		paddingLeft: 10,
		paddingRight: 10,
		shadowColor: "#000",
		shadowOffset: {
			width: 0, height: 0,
		},
	}, icon: {
		marginRight: 10,
	}, bottomButtons: {
		width: "100%", alignItems: "center", backgroundColor: "rgba(0,0,0,0.00)", marginTop: 100
	}, subTitle: {
		alignItems: "center", flexDirection: "row", marginTop: 15, marginBottom: 0, padding: 0,
	}, subTitleText: {
		fontSize: 20, marginLeft: 10,
	},
	textDescription: {
		padding: 15,
		backgroundColor: "rgba(0,0,0,0.07)",
		borderRadius: 18,
		paddingHorizontal: 40,
		fontSize: 15,
		marginTop: 10,
	},


  members: {
	maxHeight: 200,
	  borderColor: "#ccc",
	  borderWidth: 1,
	  borderRadius: 5,
	  marginTop: 10,
},
member: {
	padding: 10,
	  borderColor: "#ccc",
	  borderBottomWidth: 1,
	  flexDirection: "row",
	  alignItems: "center",
},
avatar: {
	width: 30,
	  height: 30,
	  borderRadius: 15,
	  marginRight: 10,
},
memberText: {
	fontSize: 16,
},
selected: {
	fontSize: 12,
	  color: "#000",
	  backgroundColor: "#ddd",
	  padding: 5,
	  borderRadius: 5,
	  marginLeft: "auto",
}
})

export default RecapRequest