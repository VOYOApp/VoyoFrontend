import React, { useState } from "react"
import { Alert, Dimensions, Image, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import * as ImagePicker from "expo-image-picker"
import { UIImagePickerPresentationStyle } from "expo-image-picker"
import Images from "../../../assets"
import { Icon } from "react-native-paper"
import FullScreenImg from "../FullScreenImg"

const MAX_FILE_NAME_LENGTH = 10

const UploadButton = ({ asCamera, asGallery, asRemove, setImages, displayImgWithModal }) => {
	const [modalVisible, setModalVisible] = useState(false)
	const [image, setImage] = useState(null)
	const [imageName, setImageName] = useState("")
	const [error, setError] = useState(null)

	const openCamera = async () => {
		try {
			const permissionResult = await ImagePicker.requestCameraPermissionsAsync()
			if (permissionResult.granted === false) {
				alert("You've refused to allow this appp to access your camera!")
				return
			}
			const result = await ImagePicker.launchCameraAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.Images,
				allowsEditing: true,
				quality: 0.8,
				base64: true,
				aspect: [1, 1],
				presentationStyle: UIImagePickerPresentationStyle.POPOVER,
			})

			if (!result.canceled) {
				const uriParts = result.assets[0].uri.split("/")
				const imageName = uriParts[uriParts.length - 1]
				const croppedImageName = imageName.split(".")[0]
				const imageExtension = imageName.split(".").pop()
				const displayedImageName = croppedImageName.length > MAX_FILE_NAME_LENGTH ?
				  croppedImageName.substring(0, MAX_FILE_NAME_LENGTH) + "..." : croppedImageName

				setImage("data:image/jpeg;base64," + result.assets[0].base64)
				setImageName(displayedImageName + "..." + imageExtension)

				setImages("data:image/jpeg;base64," + result.assets[0].base64)
				setModalVisible(false)
			}
		} catch (error) {
			console.log(error)
			setModalVisible(false)
		}
	}

	const pickImage = async () => {
		const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()

		if (status !== "granted") {
			// If permission is denied, show an alert
			Alert.alert(
			  "Permission Denied",
			  `Sorry, we need camera  
                 roll permission to upload images.`,
			)
		} else {
			// Launch the image library and get the selected image
			const result =
			  await ImagePicker.launchImageLibraryAsync({
				  mediaTypes: ImagePicker.MediaTypeOptions.All,
				  allowsEditing: true,
				  quality: 0.8,
				  base64: true,
				  aspect: [1, 1],
				  presentationStyle: UIImagePickerPresentationStyle.POPOVER,
			  })

			if (!result.canceled) {
				const uriParts = result.assets[0].uri.split("/")
				const galleryName = uriParts[uriParts.length - 1]
				const croppedFileName = galleryName.split(".")[0]
				const imageExtension = galleryName.split(".").pop()
				const displayedImageName = croppedFileName.length > MAX_FILE_NAME_LENGTH ?
				  croppedFileName.substring(0, MAX_FILE_NAME_LENGTH) + "..." : croppedFileName

				setImage("data:image/jpeg;base64," + result.assets[0].base64)
				setImageName(displayedImageName + "..." + imageExtension)
				setImages("data:image/jpeg;base64," + result.assets[0].base64)

				setModalVisible(false)
				setError(null)
			}
		}
	}

	const uploadImage = async () => {

	}

	const deleteImage = async () => {
		setImage(null)
		setImageName("")
		setModalVisible(false)
	}


	const [isFullScreen, setIsFullScreen] = React.useState(false)

	function toggleFullScreen() {
		setIsFullScreen(!isFullScreen)
	}

	const screenWidth = Math.round(Dimensions.get("window").width)

	return (
	  <View className={"h-16 w-[90%]"}>
		  <View className={"w-full h-full flex-row items-center"}>
			  <TouchableOpacity className={"w-32 h-12 bg-blue-500 rounded-xl items-center justify-center mr-4"}
			                    onPress={() => setModalVisible(true)}>
				  <Text style={styles.buttonText2}>
					  Upload image
				  </Text>
			  </TouchableOpacity>
			  {displayImgWithModal && image ? (<View style={styles.containerImg}>
				  <FullScreenImg preivewWH={50} img={image}/>
			  </View>) : (
				<View>
					{image ? (
					  <View className={"flex-row items-center w-36"}>
						  <Icon source={Images.rocket} size={25}></Icon>
						  <Text className={"text-sm ml-2"}>
							  {imageName}
						  </Text>
					  </View>) : null}
				</View>
			  )}
		  </View>

		  <View style={styles.centeredView}>
			  <Modal
				animationType="slide"
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => {
					Alert.alert("Modal has been closed.")
					setModalVisible(!modalVisible)
				}}>
				  <View style={styles.centeredView}>
					  <View style={styles.modalView}>
						  <TouchableOpacity
							onPress={() => setModalVisible(!modalVisible)}>
							  <View className={"flex-row"}>
								  <Text style={styles.header} className={"mr-2"}>Upload gallery</Text>
								  <Icon size={25} source={Images.cancel}></Icon>
							  </View>
						  </TouchableOpacity>

						  <View className={"flex-row items-center justify-center"}>
							  {asCamera ? (
								<View className={"bg-gray-100 p-3 rounded-2xl items-center mr-2 h-24 w-24"}>
									<Pressable
									  onPress={openCamera}>
										<View className={"items-center justify-center"}>
											<Icon source={Images.camera} size={40} />
											<Text style={styles.buttonText}>Camera</Text>
										</View>
									</Pressable>
								</View>
							  ) : (<View></View>)}
							  {asGallery ? (
								<View className={"bg-gray-100 p-3 rounded-2xl items-center mr-2 h-24 w-24"}>
									<TouchableOpacity
									  onPress={pickImage}>
										<View className={"items-center justify-center"}>
											<Icon source={Images.gallery} size={40} />
											<Text style={styles.buttonText}>Gallery</Text>
										</View>
									</TouchableOpacity>
								</View>
							  ) : (<View></View>)}
							  {asRemove ? (
								<View className={"bg-gray-100 p-3 rounded-2xl items-center mr-2 h-24 w-24"}>
									<TouchableOpacity
									  onPress={deleteImage}>
										<View className={"items-center justify-center"}>
											<Icon source={Images.trash_v2} color={"grey"} size={40} />
											<Text style={styles.buttonText}>Remove</Text>
										</View>
									</TouchableOpacity>
								</View>
							  ) : (<View></View>)}
						  </View>
					  </View>
				  </View>
			  </Modal>
		  </View>
	  </View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 5,
		width: "90%",
		height: 10,
	},
	header: {
		fontSize: 20,
		marginBottom: 16,
	},
	button: {
		backgroundColor: "#007AFF",
		padding: 10,
		borderRadius: 8,
		shadowColor: "#000000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.4,
		shadowRadius: 4,
		elevation: 5,
		width: 140,
		height: 40,
		justifyContent: "center",
		alignItems: "center",
	},
	buttonText: {
		color: "grey",
		fontSize: 16,
		fontWeight: "bold",
	},
	buttonText2: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "bold",
		textAlign: "center",
	},
	imageContainer: {
		borderRadius: 8,
		marginBottom: 16,
		shadowColor: "#000000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.4,
		shadowRadius: 4,
		elevation: 5,
	},
	image: {
		width: 200,
		height: 200,
		borderRadius: 8,
	},
	errorText: {
		color: "red",
		marginTop: 16,
	},


	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		// marginTop: 22,
	},
	modalView: {
		// margin: 20,
		backgroundColor: "white",
		borderRadius: 20,
		padding: 20,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	button2: {
		borderRadius: 20,
		padding: 10,
		elevation: 2,
	},
	buttonOpen: {
		backgroundColor: "#F194FF",
	},
	buttonClose: {
		backgroundColor: "#2196F3",
	},
	textStyle: {
		color: "white",
		fontWeight: "bold",
		textAlign: "center",
	},
	modalText: {
		marginBottom: 15,
		textAlign: "center",
	}, modalContainer: {
		flex: 1, backgroundColor: "black", justifyContent: "center", alignItems: "center",
	}, closeButton: {
		position: "absolute", top: 10, right: 10,
		zIndex: 1000,
	}, answer: {
		fontSize: 15, padding: 5,
	}, containerImg: {
		flexDirection: "row", alignItems: "center", justifyContent: "center",
	},
})

export default UploadButton