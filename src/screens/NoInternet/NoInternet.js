import React, {useState} from 'react';
import { View, Text, Image, StyleSheet, useWindowDimensions, Button, Switch, TextInput, Dimensions } from "react-native"
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import CustomHeader from "../../components/CustomHeader";
import CustomFooter from "../../components/CustomFooter";
import { useNavigation } from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

const NoInternet = () =>{

    const {t} = useTranslation();
    const [lastName, setLastName] = useState('')
    const [firstName, setFirstName] = useState('')
    const [bio, setBio] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [isEnabled, setIsEnabled] = useState(false);
    const [isValidated, setIsValidated] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    // const navigation = useNavigation()
  
    const {height} = useWindowDimensions()

    return(
        <View style={styles.root}>        
        <Image source={require("../../../assets/no_internet.png")} style={{position:"absolute",
        height:(720*Dimensions.get("window").width)/598, 
        top: Dimensions.get("window").height/4,
		    width: Dimensions.get("window").width}}></Image>
        <View style={styles.body}>
          <View style={{justifyContent:'center', alignItems:'center', marginTop: Dimensions.get("window").height/1.75}}>
            <Text style={{marginBottom:-5, color:"#FF7B34", fontSize:18}}>{t('common.please')}</Text>
            <Text style={{color:"#FF7B34",fontSize:18}}>{t("common.connect_to_internet")}</Text>
            <Text style={{color:"white", backgroundColor:"#6C3807", marginTop:10, paddingLeft:80,paddingRight:80, paddingTop:5, paddingBottom:5, borderRadius:20, fontSize:18}}>{t("common.retry")}</Text>
          </View>
        </View>
      </View>
    )
}

const styles = StyleSheet.create({
    root: {
      width: '100%',
      height: '100%',
      // backgroundColor: "#100902"
    },
    body:{
      padding:20
    },
    title: {
      fontSize: 28,
      // fontWeight: 'bold',
      marginBottom: 10,
    },
    passwordValidation: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    gradientBackground: {
    ...StyleSheet.absoluteFillObject,
    }
  })

export default NoInternet;