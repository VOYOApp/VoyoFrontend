import React from "react"
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { Checkbox, Icon } from "react-native-paper"
import Images from "../../../assets"

const CriteriaCard = ({ text, onDelete }) => {
	const [checkedPhoto, setCheckedPhoto] = React.useState(false);
	const [checkedVideo, setCheckedVideo] = React.useState(false);

	return (
	  <View style={styles.container}>
		  <TextInput
			placeholder={'Votre critère'}
			style={styles.textArea}
			multiline={true}
			numberOfLines={2}
			maxLength={1000}
		  />

		  <View style={styles.underTheTextArea}>
			  <View style={styles.checkboxes}>
				  <View style={styles.checkbox}>
					  <Checkbox
						status={checkedPhoto ? 'checked' : 'unchecked'}
						onPress={() => {
							setCheckedPhoto(!checkedPhoto);
						}}
					  />
					  <Text>Photo</Text>
				  </View>
				  <View style={styles.checkbox}>
					  <Checkbox
						status={checkedVideo ? 'checked' : 'unchecked'}
						onPress={() => {
							setCheckedVideo(!checkedVideo);
						}}
					  />
					  <Text>Video</Text>
				  </View>
			  </View>

			  <TouchableOpacity style={styles.icon} onPress={onDelete}>
				  <Icon source={Images.trash} size={25} />
			  </TouchableOpacity>
		  </View>
	  </View>
	);
};


const styles = StyleSheet.create({
	container: {
		width: "100%",
		// backgroundColor: "white",
		marginTop: 10,
		borderRadius: 18,
		backgroundColor: "rgba(0,0,0,0.06)",
	},
	textArea: {
		backgroundColor: "rgba(0,0,0,0.1)",
		borderRadius: 18,
		paddingHorizontal: 10,
		fontSize: 15,
		padding: 5,
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "row",
	},
	checkboxes: {
		flexDirection: "column",
		justifyContent: "space-between",
	},
	checkbox: {
		flexDirection: "row",
		alignItems: "center",
	},
	underTheTextArea: {
		padding: 5,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "flex-end",
	},
	icon: {
		margin: 5,
	},
})

export default CriteriaCard