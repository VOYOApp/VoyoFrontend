import React, { useState } from "react"
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert, Modal, Pressable } from "react-native"
import * as ImagePicker from "expo-image-picker";
import { useTranslation } from "react-i18next"
import assets from "../../../assets"
import { Icon } from "react-native-paper"
import Images from "../../../assets"
import { MediaTypeOptions, UIImagePickerPresentationStyle } from "expo-image-picker"

const UploadButton = () => {
	const [modalVisible, setModalVisible] = useState(false);

	const [image, setImage] = useState(null);

	// Stores the selected image URI
	const [file, setFile] = useState(null);

	// Stores any error message
	const [error, setError] = useState(null);


	const uploadImage = async () => {
		try {
			// await ImagePicker.requestCameraPermissionsAsync()
			// console.log(await ImagePicker.requestCameraPermissionsAsync())
			let result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: MediaTypeOptions.Images,
				selectionLimit: 1,
				allowsEditing: true,
				quality: 0.8,
				base64: true,
				aspect: [1, 1],
				presentationStyle: UIImagePickerPresentationStyle.POPOVER
			})
			if (!result.canceled){
				await saveImage(result.assets[0].uri)
			}
		} catch (error) {
			console.log(error)
			setModalVisible(false)
		}
	}

	const saveImage = async (image) => {
		try {
			setImage(image);
			setModalVisible(false)
		}catch (error){
			console.log(error)
		}
	}

	// Function to pick an image from
	//the device's media library
	const pickImage = async () => {
		const { status } = await ImagePicker.
		requestMediaLibraryPermissionsAsync();

		if (status !== "granted") {

			// If permission is denied, show an alert
			Alert.alert(
			  "Permission Denied",
			  `Sorry, we need camera  
                 roll permission to upload images.`
			);
		} else {

			// Launch the image library and get
			// the selected image
			const result =
			  await ImagePicker.launchImageLibraryAsync();

			if (!result.cancelled) {

				// If an image is selected (not cancelled),
				// update the file state variable
				setFile(result.uri);
				console.log(result);

				// Clear any previous errors
				setError(null);
			}
		}
	};

	return (
	  <View style={styles.container}>
		  <TouchableOpacity style={styles.button}
		                    onPress={() => setModalVisible(true)}>
			  <Text style={styles.buttonText2}>
				  Choose Image
			  </Text>
		  </TouchableOpacity>

		  <View style={styles.centeredView}>
			  <Modal
				animationType="slide"
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => {
					Alert.alert('Modal has been closed.');
					setModalVisible(!modalVisible);
				}}>
				  <View style={styles.centeredView}>
					  <View style={styles.modalView}>
						  <Text style={styles.header}>Upload file</Text>
						  <TouchableOpacity
						    onPress={() => setModalVisible(!modalVisible)}>
							  <View className={'absolute left-32 bottom-7'}>
								  <Icon size={25} source={Images.cancel}></Icon>
							  </View>
						  </TouchableOpacity>

						  <View className={'flex-row items-center justify-center'}>
							  <View className={'bg-gray-100 p-3 rounded-2xl items-center mr-2 h-24 w-24'}>
								  <Pressable
								    onPress={uploadImage}>
									  <View className={'items-center justify-center'}>
										  <Icon source={Images.camera} size={40} />
										  <Text style={styles.buttonText}>Camera</Text>
									  </View>
								  </Pressable>
							  </View>
							  <View className={'bg-gray-100 p-3 rounded-2xl items-center mr-2 h-24 w-24'}>
								  <TouchableOpacity
								    onPress={pickImage}>
									  <View className={'items-center justify-center'}>
										  <Icon source={Images.galery} size={40} />
										  <Text style={styles.buttonText}>Gallery</Text>
									  </View>
								  </TouchableOpacity>
							  </View>
							  <View className={'bg-gray-100 p-3 rounded-2xl items-center mr-2 h-24 w-24'}>
								  <TouchableOpacity
								    onPress={() => setModalVisible(!modalVisible)}>
									  <View className={'items-center justify-center'}>
										  <Icon source={Images.trash_v2} color={'grey'} size={40} />
										  <Text style={styles.buttonText}>Remove</Text>
									  </View>
								  </TouchableOpacity>
							  </View>
						  </View>
					  </View>
				  </View>
			  </Modal>
		  </View>
	  </View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 16,
	},
	header: {
		fontSize: 20,
		marginBottom: 16,
	},
	button: {
		backgroundColor: "#007AFF",
		padding: 10,
		borderRadius: 8,
		marginBottom: 16,
		shadowColor: "#000000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.4,
		shadowRadius: 4,
		elevation: 5,
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
		justifyContent: 'center',
		alignItems: 'center',
		// marginTop: 22,
	},
	modalView: {
		// margin: 20,
		backgroundColor: 'white',
		borderRadius: 20,
		padding: 20,
		alignItems: 'center',
		shadowColor: '#000',
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
		backgroundColor: '#F194FF',
	},
	buttonClose: {
		backgroundColor: '#2196F3',
	},
	textStyle: {
		color: 'white',
		fontWeight: 'bold',
		textAlign: 'center',
	},
	modalText: {
		marginBottom: 15,
		textAlign: 'center',
	},
});

export default UploadButton