import React, { useState } from "react"
import { ScrollView, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import CriteriaCard from "../../../../components/CriteriaCard"
import { Icon } from "react-native-paper"
import Images from "../../../../../assets"
import { useTranslation } from "react-i18next"

const CriteriaScreen = () => {
	const { t } = useTranslation()
	const Tab = createMaterialTopTabNavigator()

	const { height } = useWindowDimensions()
	const navigation = useNavigation()
	const [criteriaList, setCriteriaList] = useState([{ id: 1, text: "Criteria 1" }, {
		id: 2,
		text: "Criteria 2",
	}, // Add more initial criteria as needed
	])

	const addCriteriaCard = () => {
		const newCriteriaList = [...criteriaList, { id: Date.now(), text: "New Criteria" }]
		setCriteriaList(newCriteriaList)
	}

	const removeCriteriaCard = (id) => {
		const updatedCriteriaList = criteriaList.filter((criteria) => criteria.id !== id)
		setCriteriaList(updatedCriteriaList)
	}

	return (<View style={styles.root}>
		  <View style={styles.headTitles}>
			  <Text style={styles.title}>Envoi de demande</Text>
			  <Text>
				  Afin de débloquer l’accès au chat, veillez envoyer une demande. Si cette dernière est refusée, vous
				  serez remboursé
			  </Text>
		  </View>

		  <ScrollView
			style={styles.scrollView}
			showsVerticalScrollIndicator={false}
			showsHorizontalScrollIndicator={false}
		  >
			  {/* Render CriteriaCard components based on the criteriaList state */}
			  {criteriaList.map((criteria) => (<CriteriaCard key={criteria.id} text={criteria.text}
			                                                 onDelete={() => removeCriteriaCard(criteria.id)} />))}
		  </ScrollView>

		  <TouchableOpacity style={styles.plusBtn} onPress={addCriteriaCard}>
			  <View style={styles.icon}>
				  {/* Include your Icon component here */}
				  <Icon source={Images.add} size={25} />
			  </View>
			  <Text>Ajouter un critère</Text>
		  </TouchableOpacity>
	  </View>)
}


const styles = StyleSheet.create({
	root: {
		paddingTop: 10,
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
		backgroundColor: "rgba(0,0,0,0.06)",
		borderRadius: 18,
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "row",
		paddingLeft: 10,
		paddingRight: 10,
	}, icon: {
		marginRight: 10,
	},
})

export default CriteriaScreen