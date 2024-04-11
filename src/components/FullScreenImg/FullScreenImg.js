import React, { useEffect, useState } from "react"
import { Dimensions, Image, Modal, StyleSheet, TextInput, TouchableOpacity, View } from "react-native"
import { Icon } from "react-native-paper"
import Images from "../../../assets"

const FullScreenImg = ({ preivewWH, img  }) => {

	const [isFullScreen, setIsFullScreen] = React.useState(false)

	function toggleFullScreen() {
		setIsFullScreen(!isFullScreen)
	}

	const [imageSize, setImageSize] = useState({ width: 0, height: 0 });

	useEffect(() => {
		// Get screen width
		const screenWidth = Math.round(Dimensions.get("window").width);

		// Get image dimensions
		Image.getSize(img, (width, height) => {
			// Calculate new height while maintaining aspect ratio
			const newHeight = (screenWidth / width) * height;
			setImageSize({ width: screenWidth, height: newHeight });
		});
	}, [img]);

	return (
	  <>
		  <TouchableOpacity onPress={toggleFullScreen}>
			  <Image
			    source={{ uri: img }}
			    style={{ width: preivewWH, height: preivewWH, borderRadius: 10 }}
			    resizeMode="cover"
			  />
		  </TouchableOpacity>

		  <Modal visible={isFullScreen} transparent={true}>
			  <View style={styles.modalContainer}>
				  <TouchableOpacity style={styles.closeButton} onPress={toggleFullScreen}>
					  <Icon size={20} source={Images.close} />
				  </TouchableOpacity>
				  <Image
				    source={{ uri: img }}
				    style={{ width: imageSize.width, height: imageSize.height}}
				  />
			  </View>
		  </Modal>
	  </>
	)
}

const styles = StyleSheet.create({
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

export default FullScreenImg