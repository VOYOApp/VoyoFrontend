import React, {useState} from 'react';
import {View, Text, Image, StyleSheet, useWindowDimensions} from 'react-native';
import CustomButton from "../../components/CustomButton";
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {

  const {height} = useWindowDimensions()
  const navigation = useNavigation()
  const onSignInPressed = () => {
    // console.warn('Sign in pressed')
    navigation.navigate('SignInScreen')
  }

  const onRegisterPressed = () => {
    // console.warn('Forgot password pressed')
    navigation.navigate('RegisterAdditionnalDetails')
  }

  return (
    <View style={styles.root}>

      <Image source={require("../../../assets/logos/banner-voyo.png")} style={[styles.logo, {height: height}]} resizeMode="contain"/>
      <Text style={styles.title}>Bienvenue sur VOYO</Text>


      <View style={{width:'100%', display:'flex', alignItems:'center', flexDirection:'row', justifyContent:'space-around'}}>
        <CustomButton text="Connexion" onPress={onSignInPressed} bgColor={"black"} widthBtn={"40%"}/>
        <CustomButton text="Inscription" onPress={onRegisterPressed} bgColor={"orange"} widthBtn={"40%"}/>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  root: {
    padding: 20,
    alignItems: 'center',
  },
  logo: {
    width: '400%',
    maxWidth: 300,
    maxHeight: 400,
    marginBottom: 10,
  },
  title: {
    fontSize: 30,
    marginBottom: 10,
  }
})

export default HomeScreen;