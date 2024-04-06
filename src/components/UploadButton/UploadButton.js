import React, { useEffect, useState } from "react"
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert, Modal, Pressable } from "react-native"
import * as ImagePicker from "expo-image-picker";
import { useTranslation } from "react-i18next"
import assets from "../../../assets"
import { Icon } from "react-native-paper"
import Images from "../../../assets"
import { MediaTypeOptions, UIImagePickerPresentationStyle } from "expo-image-picker"

const MAX_FILE_NAME_LENGTH = 10;

const UploadButton = ({asCamera, asGallery, asRemove}) => {
	const [modalVisible, setModalVisible] = useState(false);

	const [image, setImage] = useState(null);
	const [file, setFile] = useState(null);
	const [imageName, setImageName] = useState('');
	const [fileName, setFileName] = useState('');
	const [error, setError] = useState(null);

	const openCamera = async () => {
		try {
		const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
		if (permissionResult.granted === false) {
			alert("You've refused to allow this appp to access your camera!");
			return;
		}
		const result = await ImagePicker.launchCameraAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			quality: 0.8,
			base64: true,
			aspect: [1, 1],
			presentationStyle: UIImagePickerPresentationStyle.POPOVER
		});

		if (!result.canceled) {
			const uriParts = result.assets[0].uri.split('/');
			const imageName = uriParts[uriParts.length - 1];
			const croppedImageName = imageName.split('.')[0];
			const imageExtension = imageName.split('.').pop();
			const displayedImageName = croppedImageName.length > MAX_FILE_NAME_LENGTH ?
			  croppedImageName.substring(0, MAX_FILE_NAME_LENGTH) + '...' : croppedImageName;

			setImage(result.assets[0].base64);
			setImageName(displayedImageName + '...' + imageExtension);
			setModalVisible(false)
		}
		} catch (error) {
			console.log(error)
			setModalVisible(false)
		}
	}

	const pickImage = async () => {
		const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

		if (status !== "granted") {
			// If permission is denied, show an alert
			Alert.alert(
			  "Permission Denied",
			  `Sorry, we need camera  
                 roll permission to upload images.`
			);
		} else {
			// Launch the image library and get the selected image
			const result =
			  await ImagePicker.launchImageLibraryAsync({
				  mediaTypes: ImagePicker.MediaTypeOptions.All,
				  allowsEditing: true,
				  quality: 0.8,
				  base64: true,
				  aspect: [1, 1],
				  presentationStyle: UIImagePickerPresentationStyle.POPOVER
			  });

			console.log(result)
			if (!result.canceled) {
				const uriParts = result.assets[0].uri.split('/');
				const fileName = uriParts[uriParts.length - 1];
				const croppedFileName = fileName.split('.')[0];
				const fileExtension = fileName.split('.').pop();
				const displayedFileName = croppedFileName.length > MAX_FILE_NAME_LENGTH ?
				  croppedFileName.substring(0, MAX_FILE_NAME_LENGTH) + '...' : croppedFileName;

				setFile(result.assets[0].base64)
				setFileName(displayedFileName + '...' + fileExtension);
				setModalVisible(false)
				setError(null);
			}
		}
	};

	const uploadImage = async () => {

	}

	const deleteImage = async () => {
		setImage(null);
		setImageName('');
		setFile(null);
		setFileName('');
		setModalVisible(false);
	}

	return (
	  <View className={'h-16 w-[90%]'}>
		  <View className={'w-full h-full flex-row items-center'}>
			  <TouchableOpacity className={'w-32 h-12 bg-blue-500 rounded-xl items-center justify-center mr-4'}
			                    onPress={() => setModalVisible(true)}>
				  <Text style={styles.buttonText2}>
					  Upload image
				  </Text>
			  </TouchableOpacity>
			  <View>
				  {file && (
				    <View className={'flex-row items-center w-36'}>
					    {/*<Image*/}
					    {/*  source={{ uri: "data:image/jpeg;base64," + file}}*/}
					    {/*  style={{ width: 40, height: 40 }}*/}
					    {/*/>*/}
					    <Icon source={Images.rocket} size={25}></Icon>
					    <Text className={'text-sm ml-2'}>
						    {fileName}
					    </Text>
				    </View>
				  )}
				  {image && (
				    <View className={'flex-row items-center w-36'}>
					    {/*<Image*/}
					    {/*  source={{ uri: "data:image/jpeg;base64," + image}}*/}
					    {/*  style={{ width: 40, height: 40 }}*/}
					    {/*/>*/}
					    <Icon source={Images.rocket} size={25}></Icon>
					    <Text className={'text-sm ml-2'}>
						    {imageName}
					    </Text>
				    </View>
				  )}
			  </View>
		  </View>

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
						  <TouchableOpacity
						    onPress={() => setModalVisible(!modalVisible)}>
							  <View className={'flex-row'}>
								  <Text style={styles.header} className={'mr-2'}>Upload file</Text>
								  <Icon size={25} source={Images.cancel}></Icon>
							  </View>
						  </TouchableOpacity>

						  <View className={'flex-row items-center justify-center'}>
							  {asCamera ? (
							    <View className={'bg-gray-100 p-3 rounded-2xl items-center mr-2 h-24 w-24'}>
								    <Pressable
									  onPress={openCamera}>
									    <View className={'items-center justify-center'}>
										    <Icon source={Images.camera} size={40} />
										    <Text style={styles.buttonText}>Camera</Text>
									    </View>
								    </Pressable>
							    </View>
							  ) : (<View></View>)}
							  { asGallery ? (
							    <View className={'bg-gray-100 p-3 rounded-2xl items-center mr-2 h-24 w-24'}>
								    <TouchableOpacity
									  onPress={pickImage}>
									    <View className={'items-center justify-center'}>
										    <Icon source={Images.galery} size={40} />
										    <Text style={styles.buttonText}>Gallery</Text>
									    </View>
								    </TouchableOpacity>
							    </View>
							  ): (<View></View>)}
							  { asRemove ? (
							    <View className={'bg-gray-100 p-3 rounded-2xl items-center mr-2 h-24 w-24'}>
								    <TouchableOpacity
									  onPress={deleteImage}>
									    <View className={'items-center justify-center'}>
										    <Icon source={Images.trash_v2} color={'grey'} size={40} />
										    <Text style={styles.buttonText}>Remove</Text>
									    </View>
								    </TouchableOpacity>
							    </View>
							  ): (<View></View>)}
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