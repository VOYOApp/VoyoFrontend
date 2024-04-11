import React, { useState } from "react"
import { Animated, SafeAreaView, StyleSheet, TouchableWithoutFeedback, View } from "react-native"
import { MaterialIcons } from "@expo/vector-icons"
import { getToken } from "../../context/AuthContext"
import axios from "axios"

const StarsNotation = ({ visitID }) => {
	const starRatingOptions = [1, 2, 3, 4, 5]

	const [starRating, setStarRating] = useState(null)

	const animatedButtonScale = new Animated.Value(1)

	const handlePressIn = () => {
		Animated.spring(animatedButtonScale, {
			toValue: 1.5, useNativeDriver: true, speed: 50, bounciness: 4,
		}).start()
	}

	const handlePressOut = () => {
		Animated.spring(animatedButtonScale, {
			toValue: 1, useNativeDriver: true, speed: 50, bounciness: 4,
		}).start()
	}

	const updateVisitNotation = async (option) => {


		let data = JSON.stringify({
			"note": option,
		})
		const token = await getToken()

		let config = {
			method: "patch", maxBodyLength: Infinity, url: `${process.env.BASE_URL}/api/visit?id=${visitID}`, headers: {
				"Content-Type": "application/json", "Authorization": `Bearer ${token}`,
			}, data: data,
		}

		axios.request(config)
		.then((response) => {
		})
		.catch((error) => {
			console.log(error)
		})
	}


	const animatedScaleStyle = {
		transform: [{ scale: animatedButtonScale }],
	}

	return (<SafeAreaView style={{ flex: 1 }}>
		<View style={styles.container}>
			<View style={styles.stars}>
				{starRatingOptions.map((option) => (<TouchableWithoutFeedback
				  onPressIn={() => handlePressIn(option)}
				  onPressOut={() => handlePressOut(option)}
				  onPress={() => {
					  setStarRating(option)
					  updateVisitNotation(option).then(r => r).catch(e => e)
				  }}
				  key={option}
				>
					<Animated.View style={animatedScaleStyle}>
						<MaterialIcons
						  name={starRating >= option ? "star" : "star-border"}
						  size={50}
						  style={starRating >= option ? styles.starSelected : styles.starUnselected}
						/>
					</Animated.View>
				</TouchableWithoutFeedback>))}
			</View>
		</View>
	</SafeAreaView>)
}

const styles = StyleSheet.create({
	container: {
		flex: 1, alignItems: "center", justifyContent: "center", padding: 10,
	}, heading: {
		fontSize: 24, fontWeight: "bold",
	}, stars: {
		display: "flex", flexDirection: "row",
	}, starUnselected: {
		color: "#aaa",
	}, starSelected: {
		color: "#ffb700",
	},
})

export default StarsNotation