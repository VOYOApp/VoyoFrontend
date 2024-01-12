import React, {useState} from 'react';
import { View, Text, Image, StyleSheet, useWindowDimensions, TextInput } from "react-native"
import CustomPhoneNumber from "../../components/CustomPhoneNumber"
import CustomButton from "../../components/CustomButton";
import { useNavigation } from '@react-navigation/native';

const RegisterPhone = () => {
  const [phoneNumber, setPhoneNumber] = useState('')

  const {height} = useWindowDimensions()
  const navigation = useNavigation()

  const goToOtpVerification = () => {
    navigation.navigate('PhoneConfirmation')
    // TODO: send phone number to API for get OTP code
  }

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


  return (
    <View style={styles.root}>

      <View style={{width:'100%'}}>
        <Text style={[styles.title,{marginTop:20}]}>Inscription à VOYO</Text>

        <CustomPhoneNumber placeHolder="N° de téléphone portable"
                           value={phoneNumber}
                           setValue={handleNumChange}
        />
        <Text>TEST</Text>
      </View>

      <CustomButton text="Suivant" onPress={goToOtpVerification} bgColor={"black"}/>
    </View>
  );
}


const styles = StyleSheet.create({
  root: {
    backgroundColor: '#FE881B',
    padding: 30,
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 30,
    // fontWeight: 'bold',
    marginBottom: 10,
  }
})

export default RegisterPhone;