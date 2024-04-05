import React, { useEffect, useRef, useState } from "react"
import { ScrollView, StyleSheet, useWindowDimensions, View } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useTranslation } from "react-i18next"
import CustomButton from "../../../../components/CustomButton"
import AdminHomeValidationRequest from "../../../../components/AdminHomeValidationRequest/AdminHomeValidationRequest"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import { getGlobal, getToken } from "../../../../context/AuthContext"
import axios from "axios"
import { BASE_URL } from "@env"

const ValidationListAdmin = ({type}) => {
	const { t } = useTranslation()
	const Tab = createMaterialTopTabNavigator()

	const { height } = useWindowDimensions()
	const navigation = useNavigation()

	const [listVisits, setListVisits] = useState([])

	const onBtnPressed = () => {
		// console.warn('Sign in pressed')
		navigation.navigate("SignInScreen")
	}

	useEffect(() => {
		async function getListVisits () {
			try {
				const token = await getToken()
				const listVisits = await axios.get(`${BASE_URL}/api/user/tbv`, {
					headers: { Authorization: `Bearer ${token}` },
					params: {
						type : type ?? ""
					}
				})

				if (listVisits.status === 200) {
					return listVisits.data
				}
			}catch (e) {
				console.log(e)
			}
		}

		 getListVisits().then((data) => {
			setListVisits(data)
		})
	}, [])

	const scrollViewRef = useRef(null)

	// console.log(listVisits)

	return (
	  <View style={styles.root}>
		  {listVisits != null ? (
		    <ScrollView style={{ width: "100%" }}
		                showsVerticalScrollIndicator={false}
		                showsHorizontalScrollIndicator={false}
		                ref={scrollViewRef}
		                onContentSizeChange={() => {
			                scrollViewRef.current?.scrollToEnd()
		                }}
		    >
			    {listVisits.map((visit) => (<AdminHomeValidationRequest key={visit.idVisit} data={visit}/>))}
		    </ScrollView>
		  ) : null}
	  </View>
	)
}


const styles = StyleSheet.create({
	root: {
		// height: "95%",
		paddingTop: 10,
		alignItems: "center",
		paddingLeft: 5,
		paddingRight: 5,
		backgroundColor: "rgba(0,0,0,0.05)",
	},

})

export default ValidationListAdmin