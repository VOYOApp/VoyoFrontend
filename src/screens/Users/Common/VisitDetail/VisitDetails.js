import React from "react"
import { StyleSheet, View } from "react-native"
import axios from "axios"
import { BASE_URL } from "@env"
import { getToken } from "../../../../context/AuthContext"
import { useRoute } from "@react-navigation/native"

const VisitDetails = ({ idVisit }) => {
	const route = useRoute()
	const id = route.params?.idVisit

	const visitDetails = async () => {
		const token = await getToken()
		let req = axios.get(`${BASE_URL}/api/visit?id=${id}`, { headers: { Authorization: `Bearer ${token}` } })
		let res = await req
		console.log(res.data)
	}

	visitDetails()

	return (<View style={styles.root}>

	</View>)
}

const styles = StyleSheet.create({})

export default VisitDetails
