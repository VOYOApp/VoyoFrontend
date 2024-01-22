import React from "react"
import { ScrollView, StyleSheet, useWindowDimensions, View } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useTranslation } from "react-i18next"
import HomeVisitCard from "../../../../components/HomeVisitCard"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"

const CardListHomeProspect = () => {
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
		  <ScrollView style={{ width: "100%" }}
		              showsVerticalScrollIndicator={false}
		              showsHorizontalScrollIndicator={false}

		  >
			  <HomeVisitCard />
			  <HomeVisitCard />
			  <HomeVisitCard />
			  <HomeVisitCard />
			  <HomeVisitCard />
			  <HomeVisitCard />
			  <HomeVisitCard />
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
})

export default CardListHomeProspect