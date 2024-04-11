import React, { useState } from "react"
import { ScrollView, StyleSheet, Text, TextInput, useWindowDimensions, View } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useTranslation } from "react-i18next"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import BackButton from "../../../../../components/BackButton"
import ListUsers from "../../ListUsers"

const SearchUser = () => {
	const { t } = useTranslation()
	const Tab = createMaterialTopTabNavigator()


	const { height } = useWindowDimensions()
	const navigation = useNavigation()
	const [searchValue, setSearchValue] = useState("")

	const handleSearch = (text) => {
		setSearchValue(text)
	}

	return (
	  <View style={styles.root}>
		  <BackButton />
		  <Text style={[styles.title]}>{t("admin.search_user")}</Text>
		  <TextInput
			style={{ height: 40, borderColor: "gray", borderWidth: 1, marginBottom: 10, padding: 10 }}
			placeholder={t("admin.research")}
			onChangeText={handleSearch}
			value={searchValue}
		  />
		  <ScrollView style={{ width: "100%" }}
		              showsVerticalScrollIndicator={false}
		              showsHorizontalScrollIndicator={false}
		  >
			  <ListUsers searchValue={searchValue} />

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