import {  StyleSheet, Image, TouchableOpacity } from "react-native"
import { useNavigation } from '@react-navigation/native';

const BackButton = () => {
	const navigation = useNavigation()

	return (
	  <TouchableOpacity onPress={() => navigation.goBack()}>
		  <Image style={{ width: 25, height: 25 }} source={require("../../../assets/back.png")}></Image>
	  </TouchableOpacity>
	);
}

const styles = StyleSheet.create({
})

export default BackButton