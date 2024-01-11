import React, {useState} from 'react';
import { View, Text, Image, StyleSheet, useWindowDimensions, Button, Switch, TextInput } from "react-native"
import {LinearGradient} from 'expo-linear-gradient';
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { useNavigation } from '@react-navigation/native';

const RegisterAdditionnalDetails = () => {
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

  const {height} = useWindowDimensions()
  // const navigation = useNavigation()

  const onRegisterPressed = () => {
    console.warn('Sign up pressed')
    // navigation.navigate('HomeScreen')
  }

  const handleBioChange = (text) => {
    setBio(text);
  };

  return (
      <View style={styles.root}>
        <LinearGradient
          colors={['#FF9B3F','#FFA95A', '#FFC289',  'white', 'white', 'white', 'white', 'white', 'white']}
          start={{x: 0, y: 0.5}}
          end={{x: 1, y: 1}}
          style={styles.gradientBackground}
        />
        <Image style={{ width: 25, height: 25 }} source={require("../../../assets/logos/logo.png")} onProgress={() => console.warn("Back")}></Image>

        <Text style={styles.title}>Inscription à VOYO</Text>
        <Text style={{ fontSize: 12, fontWeight: "300" }}>fin de finaliser votre inscription, nous
          avons besoin d’informations supplémentaires.</Text>

        <View style={{ display: "flex", flexDirection: "row", width: '100%'}}>
          <View style={{ display: "flex", justifyContent: "center", width: '30%' }}>
            <Image source={require("../../../assets/avatar.png")}
                   style={{ width: 100, height: 100, marginRight: 20 }} />
          </View>
          <View style={{ width: "70%" }}>
            <CustomInput placeHolder="First Name"
                         value={firstName}
                         setValue={setFirstName}
            />
            <CustomInput placeHolder="Last Name"
                         value={lastName}
                         setValue={setLastName}
            />
          </View>
        </View>

        <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, width: 40, marginBottom: 5, marginTop: 5, alignSelf: 'center' }} />

        <View>
          <TextInput
            multiline={true}
            placeholder="Bio"
            value={bio}
            onChangeText={handleBioChange}
            maxLength={200}
            style={{
              backgroundColor: "#f0f0f0",
              height: 60,
              borderRadius: 18,
              padding: 10,
            }}
          />

          <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, width: 40, marginBottom: 5, marginTop: 5, alignSelf: 'center' }} />

          <CustomInput placeHolder="Phone Number"
                       value={phoneNumber}
                       setValue={setPhoneNumber}
                       editabled={false}
          />
          <CustomInput placeHolder="Email"
                       value={email}
                       setValue={setEmail}
                       editabled={false}
          />

          <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, width: 40, marginBottom: 5, marginTop: 5, alignSelf: 'center' }} />

          <View>
            <CustomInput placeHolder="Mot de passe"
                         value={password}
                         setValue={setPassword}
                         secureTextEntry
            />
            <View style={{ display: "flex", flexDirection: "row", alignItems: "center", marginTop: 5 }}>
              <Image source={require("../../../assets/check-mark-validate.png")}
                     style={{ width: 12, height: 12, marginRight: 5 }} />
              <Text style={{ color: "green" }}>8 caractères ou plus</Text>
            </View>
            <View style={{ display: "flex", flexDirection: "row", alignItems: "center", marginTop: 5 }}>
              <Image source={require("../../../assets/check-mark-validate.png")}
                     style={{ width: 12, height: 12, marginRight: 5 }} />
              <Text style={{ color: "green" }}>Charactères spéciaux</Text>
            </View>
            <View style={{ display: "flex", flexDirection: "row", alignItems: "center", marginTop: 5 }}>
              <Image source={require("../../../assets/check-mark-validate.png")}
                     style={{ width: 12, height: 12, marginRight: 5 }} />
              <Text style={{ color: "green" }}>Chiffres</Text>
            </View>
            <View style={{ display: "flex", flexDirection: "row", alignItems: "center", marginTop: 5 }}>
              <Image source={require("../../../assets/check-mark-validate.png")}
                     style={{ width: 12, height: 12, marginRight: 5 }} />
              <Text style={{ color: "green" }}>Majuscules</Text>
            </View>

            <CustomInput placeHolder="Confirmer le mot de passe"
                         value={passwordConfirmation}
                         setValue={setPasswordConfirmation}
                         secureTextEntry
            />
          </View>
        </View>

        <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, width: 40, marginBottom: 5, marginTop: 5, alignSelf: 'center' }} />

        <View style={{ display: "flex", alignItems: "center", justifyContent:'center', flexDirection: "row", marginBottom: 10, width:'100%' }}>
          <Text style={{textAlign:'center', width: '30%'}}>Je souhaite visiter des biens immobiliers</Text>
          <Switch
            style={{marginLeft: 10, marginRight: 10}}
            trackColor={{ false: "#767577", true: "#FE881B" }}
            thumbColor={isEnabled ? "#D9D9D9" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
          <Text style={{textAlign:'center', width: '30%'}}>Je souhaite faire visiter des biens immobiliers</Text>
        </View>

        <CustomButton text="S'inscrire" onPress={onRegisterPressed} bgColor={"black"} />
      </View>
  );
}


const styles = StyleSheet.create({
  root: {
    padding: 20,
    width: '100%',
    height: '100%',
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

export default RegisterAdditionnalDetails;