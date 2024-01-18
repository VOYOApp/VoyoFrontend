import React, {useState} from 'react';
import { View, Text, Image, StyleSheet, useWindowDimensions, TextInput } from "react-native"
import CodeConfirmation from "../../components/CodeConfirmation"
import CustomButton from "../../components/CustomButton";
import { useNavigation } from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

const MailConfirmation = () => {
    const {t} = useTranslation();
    const [phoneNumber, setPhoneNumber] = useState('')

    const {height} = useWindowDimensions()
    const navigation = useNavigation()

    const resentCode = () => {
        // TODO: resend phone number to API for get OTP code
    }

    const goToOtpVerification = () => {
        navigation.navigate('PhoneConfirmation')
        // TODO: send phone number to API for get OTP code
    }

    return (
      <View style={styles.root}>

          <View style={{width:'100%'}}>
              <Text style={styles.title}>{t('common.register_to_voyo')}</Text>
              <Text style={{marginBottom:20}}>{t('common.verification_mail_code_sent')}</Text>

              <CodeConfirmation placeHolder={t('common.cell_phone_number')}
                                value={phoneNumber}
                                setValue={setPhoneNumber}
              />
              <Text onPress={resentCode} style={styles.link}>{t('common.resend_code')}</Text>
          </View>

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
        marginTop:20
    },
    link: {
        color: '#FE881B',
        marginTop: 10,
    }
})

export default MailConfirmation;