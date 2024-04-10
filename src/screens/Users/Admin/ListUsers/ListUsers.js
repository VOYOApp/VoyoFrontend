import AdminHomeListUsers from "../../../../components/AdminHomeListUsers"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import React, { useEffect, useRef, useState } from "react"
import { ScrollView, StyleSheet, useWindowDimensions, View } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useTranslation } from "react-i18next"
import CustomButton from "../../../../components/CustomButton"
import AdminHomeValidationRequest from "../../../../components/AdminHomeValidationRequest/AdminHomeValidationRequest"
import { getGlobal, getToken } from "../../../../context/AuthContext"
import axios from "axios"
import { BASE_URL } from "@env"

const ListUsers = ({ type, searchValue }) => {
	const { t } = useTranslation()
	const Tab = createMaterialTopTabNavigator()
	
	const [listUsers, setListUsers] = useState([])


	const { height } = useWindowDimensions()
	const navigation = useNavigation()
	useEffect(() => {
		async function getListVisits () {
			try {
				const token = await getToken()
				const listVisits = await axios.get(`${BASE_URL}/api/user/search?q=${searchValue}`, {
					headers: { Authorization: `Bearer ${token}` },
					params: {
						type : type ?? ""
					}
				})

				if (listVisits.status === 200) {
					setListUsers(listVisits.data)
				}
			}catch (e) {
				console.log(e)
			}
		}

		if (searchValue !== "") {
			getListVisits();
		  } else {
			// Reset list when search value is empty
			setListUsers([]);
		  }
	}, [searchValue])

	const scrollViewRef = useRef(null)

  return (
	<View style={styles.root}>
		{listUsers != null ? (
		  <ScrollView style={{ width: "100%" }}
				  showsVerticalScrollIndicator={false}
				  showsHorizontalScrollIndicator={false}
				  ref={scrollViewRef}
				  onContentSizeChange={() => {
					  scrollViewRef.current?.scrollToEnd()
				  }}
	  >
		  {listUsers.map((visit) => (<AdminHomeListUsers key={visit.idVisit} data={visit}/>))}
	  </ScrollView>
	) : null}
	</View>
  )
};

const styles = StyleSheet.create({
	root: {
		paddingTop: 10,
		alignItems: "center",
		paddingLeft: 5,
		paddingRight: 5,
		backgroundColor: "rgba(0,0,0,0.05)",
	},
})

export default ListUsers;
