import React, {useState} from 'react';
import { View, Text, Image, StyleSheet, useWindowDimensions, TextInput } from "react-native"
import CustomPhoneNumber from "../../components/CustomPhoneNumber"
import CustomButton from "../../components/CustomButton";
import { useNavigation } from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

const RegisterPhone = () => {
  const {t} = useTranslation();
  const [phoneNumber, setPhoneNumber] = useState('')
  const [btnDisabled, setBtnDisabled] = useState(true)

  const {height} = useWindowDimensions()
  const navigation = useNavigation()

  const formattedPhoneNumber = (numero) => {
    const cleanedInput = numero.replace(/\D/g, '');
    let formattedNumber = cleanedInput.startsWith('0') ? cleanedInput.slice(1) : cleanedInput;
    formattedNumber = formattedNumber.replace(/(\d{1})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1 $2 $3 $4 $5');
    return formattedNumber;
  };

  const handleNumChange = (num) => {
    const phoneFormatRegex = /^[6|7]{1,2}\s\d{2}\s\d{2}\s\d{2}\s\d{2}$/;

    const numeroFormate = formattedPhoneNumber(num);
    setPhoneNumber(numeroFormate);

    setBtnDisabled(!phoneFormatRegex.test(numeroFormate) || numeroFormate.replace(/\s/g, '').length !== 9);
  };

  const alreadyHaveAnAccount = () => {
    navigation.navigate('SignInScreen')
  }

  const goToOtpVerification = (phoneNumber) => {
    navigation.navigate('PhoneConfirmation', {numberPhone: phoneNumber})
    // TODO: send phone number to API for get OTP code
  }

  return (
    <View style={styles.root}>

      <View style={{width:'100%'}}>
        <Text style={[styles.title,{marginTop:20}]}>{t('common.register_to_voyo')}</Text>

        <CustomPhoneNumber placeHolder={t('common.cell_phone_number')}
                           value={phoneNumber}
                           setValue={handleNumChange}
        />
        <Text onPress={alreadyHaveAnAccount} style={[styles.link, {marginBottom:10}]}>{t('common.already_have_an_account')}</Text>
      </View>

      <CustomButton text="Suivant" onPress={()=> goToOtpVerification(phoneNumber)} bgColor={"black"} deactivated={btnDisabled}/>
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