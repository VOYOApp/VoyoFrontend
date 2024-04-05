import React from "react"
import { ScrollView, StyleSheet, useWindowDimensions, View, Text } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useTranslation } from "react-i18next"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import HeaderHome from "../../../../../components/HeaderHome"
import HomeStats from "../../../../../components/HomeStats"
import BackButton from "../../../../../components/BackButton"
import ValidationListAdmin from "../../ValidationListAdmin/ValidationListAdmin"
import ListUsers from "../../ListUsers"
import ReportListAdmin from "../../ReportListAdmin/ReportListAdmin"

const SearchUser = () => {
	const { t } = useTranslation()
	const Tab = createMaterialTopTabNavigator()


	const { height } = useWindowDimensions()
	const navigation = useNavigation()


	return (
	<View style={styles.root}>
		<BackButton />
        <Text style={[styles.title]}>{t("admin.search_user")}</Text>

			<ScrollView style={{ width: "100%" }}
			            showsVerticalScrollIndicator={false}
			            showsHorizontalScrollIndicator={false}
			>
					
				<Tab.Navigator style={{
					height: 2000
				}} screenOptions={{
					tabBarStyle: {
						backgroundColor: "#f4f3f4",
					}, tabBarIndicatorStyle: {
						backgroundColor: "#FE881B",
					},
				}}>
					<Tab.Screen name={t("admin.clients_and_visitors")} component={() => <ListUsers/>} />
				</Tab.Navigator>

			</ScrollView>


						

	</View>)
}


const styles = StyleSheet.create({
    root: {
		backgroundColor: "white",
		padding: 20,
		width: "100%",
		height: "100%",
		marginTop: 10,
	},
	title: {
		fontSize: 30,
		marginBottom: 10,
		marginTop: 10,
	},
	link: {
		color: "#FE881B",
		marginTop: 10,
	},
	body: {
		padding: 20,
	},
	title: {
		fontSize: 28,
		// fontWeight: 'bold',
		marginBottom: 10,
	},
	passwordValidation: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
	},
	gradientBackground: {
		...StyleSheet.absoluteFillObject,
	},
})

export default SearchUser