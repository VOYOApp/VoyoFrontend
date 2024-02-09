import React, { useState } from "react"
import { Image, StyleSheet, Switch, Text, TextInput, useWindowDimensions, View } from "react-native"
import { useNavigation, useRoute } from "@react-navigation/native"
import CustomInput from "../../../../components/CustomInput"
import CustomButton from "../../../../components/CustomButton"
import BackButton from "../../../../components/BackButton"

import { auth } from '../../../../../firebaseConfig';
import { createUserWithEmailAndPassword, updateProfile, linkWithCredential, PhoneAuthProvider } from 'firebase/auth';

const RegisterAdditionnalDetails = () => {
	const route = useRoute()
	const user = route.params?.user

	const [avatar, setAvatar] = useState('');
	const [lastName, setLastName] = useState("")
	const [firstName, setFirstName] = useState("")
	const [bio, setBio] = useState("")
	const [phoneNumber, setPhoneNumber] = useState("+33 " + user.number || "")
	const [email, setEmail] = useState(user.email || "")
	const [password, setPassword] = useState("")
	const [passwordConfirmation, setPasswordConfirmation] = useState("")
	const [isEnabled, setIsEnabled] = useState(false)
	const [btnDisabled, setBtnDisabled] = useState(true)
	const [isPasswordValid, setIsPasswordValid] = useState(false);
	const [passwordMatch, setPasswordMatch] = useState(true);
	const [isLengthValid, setIsLengthValid] = useState(false);
	const [hasSpecialChar, setHasSpecialChar] = useState(false);
	const [hasNumber, setHasNumber] = useState(false);
	const [hasUpperCase, setHasUpperCase] = useState(false);
	// const [allCriteriaValid, setAllCriteriaValid] = useState(false);

	const { height } = useWindowDimensions()
	const navigation = useNavigation()

	// const allCriteriaIsValid = () => {
	// 	const isValid =
	// 	  isPasswordValid &&
	// 	  lastName !== '' &&
	// 	  firstName !== '' &&
	// 	  bio !== '' &&
	// 	  phoneNumber !== '';
	//
	// 	setAllCriteriaValid(isValid);
	// 	setBtnDisabled(!isValid);
	// };
	// const handleLastNameChange = (text) => {
	// 	setLastName(text)
	// }
	// const handleFirstNameChange = (text) => {
	// 	setFirstName(text)
	// }

	const handleBioChange = (text) => {
		setBio(text)
	}

	const handlePasswordChange = (text) => {
		setPassword(text);

		setIsLengthValid(text.length >= 8);
		setHasSpecialChar(/[!@#$%^&*()_+={}\[\]:;<>,.?/~`"'\-|\\]/.test(text));
		setHasNumber(/\d/.test(text));
		setHasUpperCase(/[A-Z]/.test(text));

		setIsPasswordValid(text === passwordConfirmation &&
		  text !== '' &&
		  isLengthValid &&
		  hasSpecialChar &&
		  hasNumber &&
		  hasUpperCase)

		setPasswordMatch(isPasswordValid);
		setBtnDisabled(!isPasswordValid);
	};

	const handlePasswordConfirmationChange = (text) => {
		setPasswordConfirmation(text)
		text === password && text !== '' ? setPasswordMatch(true) : setPasswordMatch(false)
		text === password && text !== '' ? setBtnDisabled(false) : setBtnDisabled(true)
	}

	const toggleSwitch = () => setIsEnabled(previousState => !previousState)

	const onRegisterPressed = () => {
		createUserWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
			// Registered
			const user = userCredential.user;

			// Mettez à jour le profil de l'utilisateur avec le nom et l'avatar
			updateProfile(user, {
				displayName: firstName + ' ' + lastName,
				photoURL: avatar ? avatar : 'https://gravatar.com/avatar/94d45dbdba988afacf30d916e7aaad69?s=200&d=mp&r=x',
			})
			.then(() => {
				// Enregistrement réussi, mettez à jour le numéro de téléphone
				user.phoneNumber = phoneNumber;

				// Mettez à jour l'objet utilisateur dans Firebase
				auth.updateCurrentUser(user)
				.then(() => {
					// Numéro de téléphone mis à jour avec succès
					console.log('Numéro de téléphone mis à jour avec succès :', user);
					alert('Registered, please login.');
					navigation.navigate('Prospect', { screen: 'HomeScreen' });
				})
				.catch((error) => {
					// Gérez les erreurs liées à la mise à jour du numéro de téléphone
					console.error(error);
					alert(error.message);
				});
			})
			.catch((error) => {
				// Gérez les erreurs liées à la mise à jour du profil
				console.error(error);
				alert(error.message);
			});
		})
		.catch((error) => {
			// Gérez les erreurs liées à la création de l'utilisateur avec e-mail et mot de passe
			const errorCode = error.code;
			const errorMessage = error.message;
			alert(errorMessage);
		});
	};



	const onNextPressed = () => {
		console.warn("Next")
		// navigation.navigate('HomeScreen')
	}

	const renderButton = () => {
		if (isEnabled) {
			return (
			  <CustomButton text="Suivant" onPress={onNextPressed} bgColor={"#FE881B"} deactivated={btnDisabled} />
			);
		} else {
			return (
			  <CustomButton text="S'inscrire" onPress={onRegisterPressed} bgColor={"black"} deactivated={btnDisabled} />
			);
		}
	};


	return (
	  <View style={styles.root}>

		  <BackButton />

		  <Text style={styles.title}>Inscription à VOYO</Text>
		  <Text style={{ fontSize: 12, fontWeight: "300" }}>fin de finaliser votre inscription, nous
			  avons besoin d’informations supplémentaires.</Text>

		  <View style={{ display: "flex", flexDirection: "row", width: "100%" }}>
			  <View style={{ display: "flex", justifyContent: "center", width: "30%" }}>
				  <Image source={require("../../../../../assets/avatar.png")}
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

		  <View style={{
			  borderBottomColor: "black",
			  borderBottomWidth: 1,
			  width: 40,
			  marginBottom: 5,
			  marginTop: 5,
			  alignSelf: "center",
		  }} />

		  <View>
			  <TextInput
				multiline={true}
				placeholder="Bio"
				value={bio}
				onChangeText={handleBioChange}
				maxLength={400}
				style={{
					backgroundColor: "#f0f0f0",
					height: 50,
					borderRadius: 18,
					padding: 10,
				}}
			  />

			  <View style={{
				  borderBottomColor: "black",
				  borderBottomWidth: 1,
				  width: 40,
				  marginBottom: 5,
				  marginTop: 5,
				  alignSelf: "center",
			  }} />

			  <CustomInput placeHolder="Phone Number"
			               value={phoneNumber}
			               setValue={setPhoneNumber}
			               editable={false}
			  />
			  <CustomInput placeHolder="Email"
			               value={email}
			               setValue={setEmail}
			               editable={false}
			  />

			  <View style={{
				  borderBottomColor: "black",
				  borderBottomWidth: 1,
				  width: 40,
				  marginBottom: 5,
				  marginTop: 5,
				  alignSelf: "center",
			  }} />

			  <View>
				  <CustomInput placeHolder="Mot de passe"
				               value={password}
				               setValue={handlePasswordChange}
				               secureTextEntry
				  />
				  <View style={{ display: "flex", flexDirection: "row", alignItems: "center", marginTop: 5 }}>
					  <Image
						source={require("../../../../../assets/check-mark-validate.png")}
						style={{ width: 12, height: 12, marginRight: 5, tintColor: isLengthValid ? "green" : "grey" }}
					  />
					  <Text style={{ color: isLengthValid ? "green" : "grey" }}>8 caractères ou plus</Text>
				  </View>
				  <View style={{ display: "flex", flexDirection: "row", alignItems: "center", marginTop: 5 }}>
					  <Image
						source={require("../../../../../assets/check-mark-validate.png")}
						style={{ width: 12, height: 12, marginRight: 5, tintColor: hasSpecialChar ? "green" : "grey" }}
					  />
					  <Text style={{ color: hasSpecialChar ? "green" : "grey" }}>Charactères spéciaux</Text>
				  </View>
				  <View style={{ display: "flex", flexDirection: "row", alignItems: "center", marginTop: 5 }}>
					  <Image
						source={require("../../../../../assets/check-mark-validate.png")}
						style={{ width: 12, height: 12, marginRight: 5, tintColor: hasNumber ? "green" : "grey" }}
					  />
					  <Text style={{ color: hasNumber ? "green" : "grey" }}>Chiffres</Text>
				  </View>
				  <View style={{ display: "flex", flexDirection: "row", alignItems: "center", marginTop: 5 }}>
					  <Image
						source={require("../../../../../assets/check-mark-validate.png")}
						style={{ width: 12, height: 12, marginRight: 5, tintColor: hasUpperCase ? "green" : "grey" }}
					  />
					  <Text style={{ color: hasUpperCase ? "green" : "grey" }}>Majuscules</Text>
				  </View>

				  <CustomInput placeHolder="Confirmer le mot de passe"
				               value={passwordConfirmation}
				               setValue={handlePasswordConfirmationChange}
				               secureTextEntry
				  />
			  </View>
		  </View>

		  <View style={{
			  borderBottomColor: "black",
			  borderBottomWidth: 1,
			  width: 40,
			  marginBottom: 5,
			  marginTop: 5,
			  alignSelf: "center",
		  }} />

		  <View style={{
			  display: "flex",
			  alignItems: "center",
			  justifyContent: "center",
			  flexDirection: "row",
			  marginBottom: 10,
			  width: "100%",
		  }}>
			  <Text style={{ textAlign: "center", width: "30%" }}>Je souhaite visiter des biens immobiliers</Text>
			  <Switch
				style={{ marginLeft: 10, marginRight: 10 }}
				trackColor={{ false: "#767577", true: "#FE881B" }}
				thumbColor={isEnabled ? "#D9D9D9" : "#f4f3f4"}
				ios_backgroundColor="#3e3e3e"
				onValueChange={toggleSwitch}
				value={isEnabled}
			  />
			  <Text style={{ textAlign: "center", width: "30%" }}>Je souhaite faire visiter des biens immobiliers</Text>
		  </View>

		  {renderButton()}
	  </View>
	)
}


const styles = StyleSheet.create({
	root: {
		backgroundColor: "white",
		padding: 30,
		marginTop: 10,
		width: "100%",
		height: "100%",
	},
	title: {
		fontSize: 28,
		// marginBottom: 10,
		// marginTop: 10,
	},
	passwordValidation: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
	},
})

export default RegisterAdditionnalDetails