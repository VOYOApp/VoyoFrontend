import React from "react"
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { Checkbox, Icon } from "react-native-paper"
import Images from "../../../assets"
import { useTranslation } from "react-i18next"
import UploadButton from "../UploadButton"
import FullScreenImg from "../FullScreenImg"

const CriteriaCard = ({
	                      setCriteria,
	                      setIsPhotoRequired,
	                      setIsVideoRequired,
	                      setIsReusable,
	                      setCriteriaAnswer,
	                      setPhoto,
	                      onDelete,
	                      showData,
	                      data,
	                      visitdetails,
	                      decodedToken,
	                      visitStatus,
                      }) => {
	const { t } = useTranslation()

	const [checkedPhoto, setCheckedPhoto] = React.useState(false)
	const [checkedVideo, setCheckedVideo] = React.useState(false)
	const [checkedReusable, setCheckedReusable] = React.useState(false)
	const [value, setValue] = React.useState("")
	const [pic, setImage] = React.useState(null)

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
						  color="orange"
						/>
						<Text>{t("common.photo.one")}</Text>
					</View>
					<View style={styles.checkbox}>
						<Checkbox
						  status={checkedVideo ? "checked" : "unchecked"}
						  onPress={() => {
							  setCheckedVideo(!checkedVideo)
						  }}
						  color="orange"
						  disabled={true}
						/>
						<Text>{t("common.video.one")}</Text>
					</View>
				</View>)}

				{showData && (<View>
					{decodedToken.role === "VISITOR" && visitStatus === "ACCEPTED" ? (<View>
						<TextInput
						  onChangeText={(t) => {
							  setValue(t)
							  setCriteriaAnswer(t)
						  }}
						  placeholder={t("visitor.criteria_answer")}
						  style={styles.input}
						  multiline={true}
						  value={data.criteria_answer ? data.criteria_answer : value}
						  // editable={!data.criteria_answer ? true : false}
						/>

						{!data.photo ? (
						  <View style={styles.backgroundImgUpload}>
							  {data.photo_required ? (<Text>Vous devez ajouter une photo</Text>) : null}

							  <UploadButton asCamera={true} asGallery={true} asRemove={true} displayImgWithModal={true}
							                setImages={(img) => {
								                setImage(img)
								                setPhoto(img)
							                }} />
						  </View>) : null}
					</View>) : (<View>
						{data.criteria_answer ? (<Text style={styles.answer}>{data.criteria_answer}</Text>) :
						  <Text style={styles.answer}>{t("prospect.noAnswer")}</Text>}</View>)}

					{data.photo ? (<View style={styles.containerImg}>
						<FullScreenImg preivewWH={80} img={data.photo} />
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
						  color="orange"
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
						  color="orange"
						  disabled={true}
						/>
						<Text className={"text-gray-500"}>{t("common.video.one")}</Text>
					</View>
					<View style={styles.checkbox}>
						<Checkbox
						  status={checkedReusable ? "checked" : "unchecked"}
						  onPress={() => {
							  setCheckedReusable(!checkedReusable)
							  setIsReusable(!checkedReusable)
						  }}
						  color="orange"
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
	}, input: {
		height: "auto", paddingHorizontal: 5, fontSize: 15, paddingVertical: 7,
	}, backgroundImgUpload: {
		backgroundColor: "rgba(0,0,0,0.1)",
		borderRadius: 18,
		fontSize: 15,
		padding: 5,
		justifyContent: "center",
		alignItems: "center",
		flex: 1,
		flexDirection: "column",
	},
})

export default CriteriaCard