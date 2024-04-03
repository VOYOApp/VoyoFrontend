import React from "react"
import { ScrollView, StyleSheet, useWindowDimensions, View } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useTranslation } from "react-i18next"
import AdminHomeListUsers from "../../../../components/AdminHomeListUsers"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"

const ListUsers = () => {
	const { t } = useTranslation()
	const Tab = createMaterialTopTabNavigator()


	const { height } = useWindowDimensions()
	const navigation = useNavigation()


	return (
	  <View style={styles.root}>
		  <ScrollView style={{ width: "100%" }}
		              showsVerticalScrollIndicator={false}
		              showsHorizontalScrollIndicator={false}

		  >
			  <AdminHomeListUsers />
			  <AdminHomeListUsers />
			  <AdminHomeListUsers />
			  <AdminHomeListUsers />
			  <AdminHomeListUsers />
			  <AdminHomeListUsers />
			  <AdminHomeListUsers />
              <AdminHomeListUsers />
			  <AdminHomeListUsers />
			  <AdminHomeListUsers />
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

export default ListUsers