import React, { useRef, useState } from "react"
import { ScrollView, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import CriteriaCard from "../../../../components/CriteriaCard"
import { Icon } from "react-native-paper"
import Images from "../../../../../assets"
import { useTranslation } from "react-i18next"
import CustomButton from "../../../../components/CustomButton"

const CriteriaScreen = () => {
	const { t } = useTranslation()
	const Tab = createMaterialTopTabNavigator()

	const { height } = useWindowDimensions()
	const navigation = useNavigation()
	const [criteriaList, setCriteriaList] = useState([{
		id: 1, text: "Criteria 1",
	}, {
		id: 2, text: "Criteria 2",
	}])

	const addCriteriaCard = () => {
		const newCriteriaList = [...criteriaList, { id: Date.now(), text: "New Criteria" }]
		setCriteriaList(newCriteriaList)
	}

	const removeCriteriaCard = (id) => {
		if (criteriaList.length === 1) return
		const updatedCriteriaList = criteriaList.filter((criteria) => criteria.id !== id)
		setCriteriaList(updatedCriteriaList)
	}

	const scrollViewRef = useRef(null)

	return (<View style={styles.root}>
		<View style={styles.headTitles}>
			<Text style={styles.title}>{t("prospect.send_request")}</Text>
			<Text>
				{t("prospect.send_request_description")}
			</Text>
			<View style={styles.subTitle}>
				<Icon source={Images.list} size={33} />
				<Text style={styles.subTitleText}>Liste des critères</Text>
			</View>
		</View>

		<ScrollView
		  style={styles.scrollView}
		  showsVerticalScrollIndicator={false}
		  showsHorizontalScrollIndicator={false}
		  ref={scrollViewRef}
		  onContentSizeChange={() => {
			  scrollViewRef.current?.scrollToEnd()
		  }}
		>
			{criteriaList.map((criteria) => (<CriteriaCard key={criteria.id}
			                                               text={criteria.text}
			                                               onDelete={() => removeCriteriaCard(criteria.id)} />))}

			<View style={styles.iAmABlankSpace} />
		</ScrollView>

		<View style={styles.bottomButtons}>
			<TouchableOpacity style={styles.plusBtn} onPress={addCriteriaCard}>
				<View style={styles.icon}>
					<Icon source={Images.add} size={25} />
				</View>
				<Text>{t("prospect.add_criteria")}</Text>
			</TouchableOpacity>

			<CustomButton text={t("common.next")}
			              onPress={() => navigation.navigate("ProspectHome")}
			              bgColor={"magenta"} widthBtn={"90%"}
			              heightBtn={43} />
		</View>

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
		width: "100%", alignItems: "center", backgroundColor: "rgba(0,0,0,0.00)", position: "absolute", bottom: 10,
	},
	iAmABlankSpace: {
		height: 140,
	},
	subTitle: {
		alignItems: "center",
		flexDirection: "row",
		marginTop: 15,
		marginBottom: 0,
		padding: 0,
	},
	subTitleText: {
		fontSize: 20,
		marginLeft: 10,
	},
})

export default CriteriaScreen