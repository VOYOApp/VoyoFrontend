import React, {useState} from 'react';
import {View, Text, Image, StyleSheet, useWindowDimensions} from 'react-native';
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";


const SignInScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const {height} = useWindowDimensions()

    const onSignInPressed = () => {
        console.warn('Sign in pressed')
    }

    const onForgotPasswordPressed = () => {
        console.warn('Forgot password pressed')
    }

    return (
        <View style={styles.root}>

          {/*<Image source={Logo} style={[styles.logo, {height: height * 0.3}]} resizeMode="contain"/>*/}
          <Text style={styles.title}>Connexion à VOYO</Text>

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
        // fontWeight: 'bold',
        marginBottom: 10,
    }
})

export default SignInScreen;