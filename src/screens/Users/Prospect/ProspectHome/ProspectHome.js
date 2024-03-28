import React, { useEffect, useRef } from "react"
import { ScrollView, StyleSheet, useWindowDimensions, View } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useTranslation } from "react-i18next"
import HomeStats from "../../../../components/HomeStats"
import HeaderHome from "../../../../components/HeaderHome"
import CustomFooter from "../../../../components/CustomFooter"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import CardListHomeProspect from "../CardListHomeProspect"
import { getGlobal } from "../../../../context/AuthContext"

const ProspectHome = () => {
	const { t } = useTranslation()
	const Tab = createMaterialTopTabNavigator()

	const [firstname, setFirstname] = React.useState("")
	const [icon, setIcon] = React.useState("https://2.bp.blogspot.com/-0rLFh_JbOzQ/VVTtjHV98DI/AAAAAAAAB6M/cOJ84R_cUpk/s1600/whatsappimages%2Bfunny%2Bdp%2B(9).jpg")

	const { height } = useWindowDimensions()
	const navigation = useNavigation()
	const onBtnPressed = () => {
		// console.warn('Sign in pressed')
		navigation.navigate("SignInScreen")
	}

	useEffect(() => {
		getGlobal("user_details").then((data) => {
			setFirstname(data?.first_name)
			setIcon(data?.profile_picture)
		})
	}, [])
	const scrollViewRef = useRef(null)

	return (<View style={styles.root}>
		<HeaderHome name={firstname} profilePicture={icon}/>

		{/*<ScrollView style={{ width: "100%"}}*/}
		{/*            showsVerticalScrollIndicator={false}*/}
		{/*            showsHorizontalScrollIndicator={false}*/}
		{/*            ref={scrollViewRef}*/}
		{/*            onContentSizeChange={() => {*/}
		{/*	            scrollViewRef.current?.scrollToEnd()*/}
		{/*            }}*/}
		{/*>*/}
			<HomeStats StatsType={"prospect"} />
			{/*<CardListHomeProspect type={"PASSED"}></CardListHomeProspect>*/}
			<ScrollView style={{ width: "100%" }}
			            showsVerticalScrollIndicator={false}
			            showsHorizontalScrollIndicator={false}
			>
				<Tab.Navigator style={{
					height: height
				}} screenOptions={{
					tabBarStyle: {
						backgroundColor: "#f4f3f4",
					}, tabBarIndicatorStyle: {
						backgroundColor: "#FE881B",
					},
				}}>
					<Tab.Screen name={t("prospect.programmed_visits")} component={() => <CardListHomeProspect/>} />
					<Tab.Screen name={t("prospect.passed_visits")} component={() => <CardListHomeProspect type={"PASSED"}/>} />
				</Tab.Navigator>
			</ScrollView>
		{/*</ScrollView>*/}


		<CustomFooter currentOption={"home"} />
	</View>)
}


const styles = StyleSheet.create({
	root: {
		padding: 20, alignItems: "center",
	},
})

export default ProspectHome