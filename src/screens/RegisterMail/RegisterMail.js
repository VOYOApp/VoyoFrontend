import React, {useState} from 'react';
import { View, Text, Image, StyleSheet, useWindowDimensions, TextInput } from "react-native"
import { useNavigation } from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import CustomInput from "../../components/CustomInput"
import CustomButton from "../../components/CustomButton";

const RegisterMail = () => {
    const {t} = useTranslation();
    const [email, setEmail] = useState('')
    const [btnDisabled, setBtnDisabled] = useState(true)

    const {height} = useWindowDimensions()
    const navigation = useNavigation()

    const goToOtpVerification = (mail) => {
        navigation.navigate('MailConfirmation',{mail: mail})
        // TODO: send phone number to API for get OTP code
    }

    const handleMailChange = (mail) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{1,}$/;
        setEmail(mail);
        setBtnDisabled(prevState => !emailRegex.test(mail));
    };

    return (
      <View style={styles.root}>

          <View style={{width:'100%', marginBottom: 20}}>
              <Text style={[styles.title,{marginTop:20}]}>{t('common.register_to_voyo')}</Text>

              <CustomInput placeHolder={t('common.enter_your_email')}
                           value={email}
                           setValue={handleMailChange}
                           editabled={false}
                           inputype={"emailAddress"}
              />
          </View>

          <CustomButton text="Suivant" onPress={()=>goToOtpVerification(email)} bgColor={"black"} deactivated={btnDisabled}/>
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

export default RegisterMail;