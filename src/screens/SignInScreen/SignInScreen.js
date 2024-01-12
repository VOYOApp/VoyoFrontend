import React, {useState} from 'react';
import {View, Text, Image, StyleSheet, useWindowDimensions} from 'react-native';
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { useNavigation } from '@react-navigation/native';

const SignInScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigation = useNavigation()
    const {height} = useWindowDimensions()

    const onSignInPressed = () => {
        navigation.navigate('UserPage')
    }

    const onForgotPasswordPressed = () => {
        console.warn('Forgot password pressed')
    }

    return (
        <View style={styles.root}>

          <View style={{width:'100%'}}>
          <Text style={[styles.title,{marginTop:20}]}>Connexion à VOYO</Text>

          <CustomInput placeHolder="Email"
                       value={email}
                       setValue={setEmail}
          />

          <CustomInput placeHolder="Mot de passe"
                       value={password}
                       setValue={setPassword}
                       secureTextEntry
          />

          <CustomButton text="Se connecter" onPress={onSignInPressed} bgColor={"black"}/>
          <CustomButton text="Mot de passe oublié" onPress={onForgotPasswordPressed} type="TERTIARY"/>
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

export default SignInScreen;