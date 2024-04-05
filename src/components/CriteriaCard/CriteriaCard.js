import React, { useState } from "react"
import { Image, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { Checkbox, Icon } from "react-native-paper"
import Images from "../../../assets"
import { useTranslation } from "react-i18next"


const CriteriaCard = ({ text, onDelete, showData, data }) => {
	const { t } = useTranslation()


	const [checkedPhoto, setCheckedPhoto] = React.useState(false)
	const [checkedVideo, setCheckedVideo] = React.useState(false)


	const [isFullScreen, setIsFullScreen] = useState(false)

	const toggleFullScreen = () => {
		setIsFullScreen(!isFullScreen)
	}


	return (<View style={styles.container}>
		<TextInput
		  placeholder={data.criteria || t("prospect.criteria")}
		  style={styles.textArea}
		  multiline={true}
		  numberOfLines={2}
		  maxLength={1000}
		  editable={!showData}
		/>
		<View style={styles.underTheTextArea}>
			{!showData && (<View style={styles.checkboxes}>
				<View style={styles.checkbox}>
					<Checkbox
					  status={checkedPhoto ? "checked" : "unchecked"}
					  onPress={() => {
						  setCheckedPhoto(!checkedPhoto)
					  }}
					/>
					<Text>{t("common.photo.one")}</Text>
				</View>
				<View style={styles.checkbox}>
					<Checkbox
					  status={checkedVideo ? "checked" : "unchecked"}
					  onPress={() => {
						  // setCheckedVideo(!checkedVideo)
					  }}
					  disabled={true}
					/>
					<Text>{t("common.video.one")}</Text>
				</View>
			</View>)}

			{showData && (<View>
				{data.criteria_answer ? (<Text style={styles.answer}>{data.criteria_answer}</Text>) :
				  <Text style={styles.answer}>{t("prospect.noAnswer")}</Text>}

				{data.photo ? (<View style={styles.containerImg}>
					<TouchableOpacity onPress={toggleFullScreen}>
						<Image
						  source={{ uri: data.photo }}
						  style={{ width: 80, height: 80, borderRadius: 20 }}
						  resizeMode="cover"
						/>
					</TouchableOpacity>

					<Modal visible={isFullScreen} transparent={true}>
						<View style={styles.modalContainer}>
							<TouchableOpacity style={styles.closeButton} onPress={toggleFullScreen}>
								<Icon size={20} source={Images.close} />
							</TouchableOpacity>
							<Image
							  source={{ uri: data.image }}
							  style={{ flex: 1, width: "100%", height: "100%" }}
							/>
						</View>
					</Modal>
				</View>) : null}
			</View>)}

			{!showData && (<TouchableOpacity style={styles.icon} onPress={onDelete}>
				<Icon source={Images.trash} size={25} />
			</TouchableOpacity>)}
		</View>
	</View>)
}


const styles = StyleSheet.create({
	container: {
		width: "100%", // backgroundColor: "white",
		marginBottom: 10, borderRadius: 18, backgroundColor: "rgba(0,0,0,0.06)",
	}, textArea: {
		backgroundColor: "rgba(0,0,0,0.1)",
		borderRadius: 18,
		paddingHorizontal: 10,
		fontSize: 15,
		padding: 5,
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "row",
	}, checkboxes: {
		flexDirection: "column", justifyContent: "space-between",
	}, checkbox: {
		flexDirection: "row", alignItems: "center",
	}, underTheTextArea: {
		padding: 5, flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end",
	}, icon: {
		margin: 5,
	}, answer: {
		padding: 5, flex: 1,
	}, containerImg: {
		flex: 1, alignItems: "flex-start", justifyContent: "center",
	}, modalContainer: {
		flex: 1, backgroundColor: "black", justifyContent: "center", alignItems: "center",
	}, closeButton: {
		position: "absolute", top: 20, right: 20, zIndex: 1,
	}, closeButtonText: {
		color: "white", fontSize: 16,
	},
})

export default CriteriaCard