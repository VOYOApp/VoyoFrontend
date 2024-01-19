import React from "react"
import { ScrollView, StyleSheet, useWindowDimensions, View } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useTranslation } from "react-i18next"
import HomeStats from "../../components/HomeStats"
import HeaderHome from "../../components/HeaderHome"
import CustomFooter from "../../components/CustomFooter"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import CardListHomeProspect from "../CardListHomeProspect"

const HomeProspect = () => {
	const { t } = useTranslation()
	const Tab = createMaterialTopTabNavigator()


	const { height } = useWindowDimensions()
	const navigation = useNavigation()
	const onBtnPressed = () => {
		// console.warn('Sign in pressed')
		navigation.navigate("SignInScreen")
	}


	return (<View style={styles.root}>
		<HeaderHome />


		<ScrollView style={{ width: "100%" }}
		            showsVerticalScrollIndicator={false}
		            showsHorizontalScrollIndicator={false}
		>
			<HomeStats StatsType={"prospect"} />

			<ScrollView style={{ width: "100%" }}
			            showsVerticalScrollIndicator={false}
			            showsHorizontalScrollIndicator={false}
			>

				<Tab.Navigator style={{
					height: 1000,
				}} screenOptions={{
					tabBarStyle: {
						backgroundColor: "#f4f3f4",
					}, tabBarIndicatorStyle: {
						backgroundColor: "#FE881B",
					},
				}}>
					<Tab.Screen name={t("prospect.programmed_visits")} component={CardListHomeProspect} />
					<Tab.Screen name={t("prospect.passed_visits")} component={CardListHomeProspect} />
				</Tab.Navigator>

			</ScrollView>
		</ScrollView>


		<CustomFooter currentOption={"home"} />
	</View>)
}


const styles = StyleSheet.create({
	root: {
		padding: 20, alignItems: "center",
	},
})

export default HomeProspect