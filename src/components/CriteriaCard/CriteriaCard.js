import React from "react"
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { Checkbox, Icon } from "react-native-paper"
import Images from "../../../assets"
import { useTranslation } from "react-i18next"

const CriteriaCard = ({
	                      setCriteria,
	                      setIsPhotoRequired,
	                      setIsVideoRequired,
	                      setIsReusable,
	                      onDelete,
	                      showData,
	                      data,
	                      visitdetails,
                      }) => {
	const { t } = useTranslation()

	const [checkedPhoto, setCheckedPhoto] = React.useState(false)
	const [checkedVideo, setCheckedVideo] = React.useState(false)
	const [checkedReusable, setCheckedReusable] = React.useState(false)

	return (<View style={styles.container}>
		{visitdetails ? (<>
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
		</>) : <>
			<TextInput
			  placeholder={t("prospect.criteria")}
			  style={styles.textArea}
			  multiline={true}
			  numberOfLines={2}
			  maxLength={1000}
			  onChangeText={(text) => setCriteria(text)}
			/>

			<View style={styles.underTheTextArea}>
				<View style={styles.checkboxes}>
					<View style={styles.checkbox}>
						<Checkbox
						  status={checkedPhoto ? "checked" : "unchecked"}
						  onPress={() => {
							  setCheckedPhoto(!checkedPhoto)
							  setIsPhotoRequired(!checkedPhoto)
						  }}
						/>
						<Text>{t("common.photo.one")}</Text>
					</View>
					<View style={styles.checkbox}>
						<Checkbox
						  status={checkedVideo ? "checked" : "unchecked"}
						  onPress={() => {
							  setCheckedVideo(!checkedVideo)
							  setIsVideoRequired(!checkedVideo)
						  }}
						/>
						<Text>{t("common.video.one")}</Text>
					</View>
					<View style={styles.checkbox}>
						<Checkbox
						  status={checkedReusable ? "checked" : "unchecked"}
						  onPress={() => {
							  setCheckedReusable(!checkedReusable)
							  setIsReusable(!checkedReusable)
						  }}
						/>
						<Text>{t("common.reusable")}</Text>
					</View>
				</View>

				<TouchableOpacity style={styles.icon} onPress={onDelete}>
					<Icon source={Images.trash} size={25} />
				</TouchableOpacity>
			</View>
		</>}
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
	},
})

export default CriteriaCard