import React, {useState} from 'react';
import { View, Text, Image, StyleSheet, useWindowDimensions, TextInput } from "react-native"
import CustomPhoneNumber from "../../components/CustomPhoneNumber"
import CustomButton from "../../components/CustomButton";
import { useNavigation } from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

const RegisterPhone = () => {
  const {t} = useTranslation();
  const [phoneNumber, setPhoneNumber] = useState('')

  const {height} = useWindowDimensions()
  const navigation = useNavigation()

  const formattedPhoneNumber = (numero) => {
    const cleanedInput = numero.replace(/\D/g, '');
    let formattedNumber = cleanedInput.startsWith('0') ? cleanedInput.slice(1) : cleanedInput;
    formattedNumber = formattedNumber.replace(/(\d{1})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1 $2 $3 $4 $5');
    return formattedNumber;
  };

  const handleNumChange = (num) => {
    const numeroFormate = formattedPhoneNumber(num);
    setPhoneNumber(numeroFormate);
  };

  const alreadyHaveAnAccount = () => {
    navigation.navigate('SignInScreen')
  }

  const goToOtpVerification = () => {
    navigation.navigate('PhoneConfirmation')
    // TODO: send phone number to API for get OTP code
  }

  return (
    <View style={styles.root}>

      <View style={{width:'100%'}}>
        <Text style={[styles.title,{marginTop:20}]}>Inscription à VOYO</Text>

        <CustomPhoneNumber placeHolder={t('common.cell_phone_number')}
                           value={phoneNumber}
                           setValue={handleNumChange}
        />
        <Text onPress={alreadyHaveAnAccount} style={[styles.link, {marginBottom:10}]}>{t('common.already_have_an_account')}</Text>
      </View>

      <CustomButton text="Suivant" onPress={goToOtpVerification} bgColor={"black"}/>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: 'white',
    padding: 30,
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 30,
    marginBottom: 10,
  },
  link: {
    color: '#FE881B',
    marginTop: 10,
  }
})

export default RegisterPhone;