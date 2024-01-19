import React, { useState } from "react"
import { View, Text, Image, StyleSheet, useWindowDimensions, ScrollView } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useTranslation } from "react-i18next"
import HomeStats from "../../components/HomeStats"
import HeaderHome from "../../components/HeaderHome"
import CustomFooter from "../../components/CustomFooter"
import HomeVisitCard from "../../components/HomeVisitCard"
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MailConfirmation from "../MailConfirmation"
import UserPage from "../UserPage"

const HomeProspect = () => {
	const { t } = useTranslation()
	const Tab = createMaterialTopTabNavigator();


	const { height } = useWindowDimensions()
	const navigation = useNavigation()
	const onBtnPressed = () => {
		// console.warn('Sign in pressed')
		navigation.navigate("SignInScreen")
	}


	return (
	  <View style={styles.root}>
		  <HeaderHome />


		  <ScrollView style={{ width: "100%" }}>
			  <HomeStats StatsType={"prospect"} />

			  <ScrollView style={{ width: "100%", backgroundColor: "rgba(0,0,0,0.05)" }}>


				  <Tab.Navigator style={{ height: 500 }}>
					  <Tab.Screen name={t("prospect.programmed_visits")} component={MailConfirmation} />
					  <Tab.Screen name={t("prospect.passed_visits")} component={MailConfirmation} />
				  </Tab.Navigator>


				  <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
					  <Text>Visites passées</Text>
					  <Text>Visites à venir</Text>
				  </View>
				  <HomeVisitCard />
				  <HomeVisitCard />
				  <HomeVisitCard />
				  <HomeVisitCard />
				  <HomeVisitCard />
				  <HomeVisitCard />
				  <HomeVisitCard />
			  </ScrollView>
		  </ScrollView>


		  <CustomFooter currentOption={"home"} />
	  </View>
	)
}


const styles = StyleSheet.create({
	root: {
		padding: 20,
		alignItems: "center",
	},
})

export default HomeProspect