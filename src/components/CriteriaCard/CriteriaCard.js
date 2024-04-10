import React from "react"
import { Dimensions, Image, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { Checkbox, Icon } from "react-native-paper"
import Images from "../../../assets"
import { useTranslation } from "react-i18next"
import UploadButton from "../UploadButton"

const CriteriaCard = ({
	                      setCriteria,
	                      setIsPhotoRequired,
	                      setIsVideoRequired,
	                      setIsReusable,
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
	const [isFullScreen, setIsFullScreen] = React.useState(false)

	function toggleFullScreen() {
		setIsFullScreen(!isFullScreen)
	}

	const screenWidth = Dimensions.get("window").width

	// console.log(visitdetails)
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
						  onChangeText={setValue}
						  placeholder={t("visitor.criteria_answer")}
						  style={styles.input}
						  multiline={true}
						/>
						<UploadButton asCamera={true} asGallery={true} asRemove={true} displayImgWithModal={true} setImages={(img) => {
							setImage(img)
						}} />


						{/*{pic ? (*/}
						{/*  <View style={styles.containerImg}>*/}
						{/*	  <TouchableOpacity onPress={toggleFullScreen}>*/}
						{/*		  <Image*/}
						{/*		    source={{ uri: "data:image/jpeg;base64," + pic }}*/}
						{/*		    style={{ width: 50, height:50, borderRadius: 10}}*/}
						{/*		    resizeMode="cover"*/}
						{/*		  />*/}
						{/*	  </TouchableOpacity>*/}

						{/*	  <Modal visible={isFullScreen} transparent={true}>*/}
						{/*		  <View style={styles.modalContainer}>*/}
						{/*			  <TouchableOpacity style={styles.closeButton} onPress={toggleFullScreen}>*/}
						{/*				  <Icon size={20} source={Images.close} />*/}
						{/*			  </TouchableOpacity>*/}
						{/*			  <Image*/}
						{/*			    source={{ uri: "data:image/jpeg;base64," + pic }}*/}
						{/*				style={{ flex: 1, width: screenWidth - 20, height: "100%"}}*/}
						{/*			  />*/}
						{/*		  </View>*/}
						{/*	  </Modal>*/}
						{/*  </View>*/}
						{/*) : null}*/}
					</View>) : (<View>
						{data.criteria_answer ? (<Text style={styles.answer}>{data.criteria_answer}</Text>) :
						  <Text style={styles.answer}>{t("prospect.noAnswer")}</Text>}</View>)}

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
	}, modalContainer: {
		flex: 1, backgroundColor: "black", justifyContent: "center", alignItems: "center",
	}, closeButton: {
		position: "absolute", top: 10, right: 10,
		zIndex: 1000,
	}, answer: {
		fontSize: 15, padding: 5,
	}, containerImg: {
		flexDirection: "row", alignItems: "center", justifyContent: "center",
	}
})

export default CriteriaCard