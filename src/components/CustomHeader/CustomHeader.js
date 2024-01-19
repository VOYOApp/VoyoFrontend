import React from "react"
import { View, Text, TextInput, StyleSheet, Image, Dimensions, TouchableOpacity} from "react-native"
import { useNavigation } from "@react-navigation/native"
import BackButton from "../../components/BackButton";
import {useTranslation} from 'react-i18next';

const CustomHeader = () => {
	const {t} = useTranslation();
    const appWidth = Dimensions.get('window').width;
    const appHeight = Dimensions.get('window').height;
	const navigation = useNavigation()
	return (
	<View style={{display: "flex",
	flexDirection: "row",
	alignItems: "center",

	backgroundColor: "rgba(92, 56, 11, 0.71)",
	paddingLeft: 20,
	paddingRight: 20,
	paddingTop: 40,
	paddingBottom: 12,
	top:0,
	width:appWidth}}>
		<View style={{flexDirection: "row", alignItems: "center", width: appWidth/2}}>
		<BackButton/>
			<Text style={{ marginLeft: 25, fontFamily: "Roboto", fontSize: 15 }}>{t('common.my_account')}</Text>
		</View>
		<View style={{flexDirection: "row", alignItems: "center", position: "absolute", top: 0, paddingTop:40, left:appWidth-50}} >
			<TouchableOpacity onPress={() => navigation.navigate('SignInScreen')}>
				<Image style={{ width: 25, height: 25, right:0}} source={require("../../../assets/logout.png")}></Image>
	  		</TouchableOpacity>
		</View>
	</View>)
}

export default CustomHeader