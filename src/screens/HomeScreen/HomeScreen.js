import React, {useState} from 'react';
import {View, Text, Image, StyleSheet, useWindowDimensions} from 'react-native';
import CustomButton from "../../components/CustomButton";
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

const HomeScreen = () => {
    const {t} = useTranslation();


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

    const onHomeProspectPressed = () => {
        // console.warn('Forgot password pressed')
        navigation.navigate('HomeProspect')
    }

    return (
        <View style={styles.root}>

            <Image source={require("../../../assets/logos/banner-voyo.png")} style={[styles.logo, {height: height}]}
                   resizeMode="contain"/>
            <Text style={styles.title}>{t('common.greetings')}</Text>


            <View style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-around'
            }}>
                <CustomButton text={t('common.login')} onPress={onSignInPressed} bgColor={"black"} widthBtn={"40%"}/>
                <CustomButton text={t('common.register')} onPress={onRegisterPressed} bgColor={"orange"} widthBtn={"40%"}/>
            </View>
            <CustomButton text="HomeProspect" onPress={onHomeProspectPressed} bgColor={"magenta"} widthBtn={"40%"}/>
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