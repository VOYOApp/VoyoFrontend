import React from "react"
import { ScrollView, StyleSheet, Text, useWindowDimensions, View } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useTranslation } from "react-i18next"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import CriteriaCard from "../../../../components/CriteriaCard"

const CriteriaScreen = () => {
	const { t } = useTranslation()
	const Tab = createMaterialTopTabNavigator()


	const { height } = useWindowDimensions()
	const navigation = useNavigation()
	const onBtnPressed = () => {
		// console.warn('Sign in pressed')
		navigation.navigate("SignInScreen")
	}


	return (
	  <View style={styles.root}>
		  <Text>Envoi de demande</Text>
		  <Text>Afin de débloquer l’accès au chat, veillez envoyer une demande. Si cette dernière est refusée, vous
			  serez remboursé</Text>

		  <ScrollView style={styles.scrollView}>
			  <CriteriaCard />
			  <CriteriaCard />
			  <CriteriaCard />
			  <CriteriaCard />
			  <CriteriaCard />
			  <CriteriaCard />
			  <CriteriaCard />
			  <CriteriaCard />
			  <CriteriaCard />
			  <CriteriaCard />
			  <CriteriaCard />
			  <CriteriaCard />
			  <CriteriaCard />
			  <CriteriaCard />
			  <CriteriaCard />
			  <CriteriaCard />
			  <CriteriaCard />
		  </ScrollView>


	  </View>
	)
}


const styles = StyleSheet.create({
	root: {
		paddingTop: 10,
		alignItems: "center",
		paddingLeft: 5,
		paddingRight: 5,
		backgroundColor: "rgba(0,0,0,0.05)",
	},
	scrollView: {
		width: "100%",
		padding: 20,
	}
})

export default CriteriaScreen