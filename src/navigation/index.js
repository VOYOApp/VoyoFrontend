import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeScreen from "../screens/Sessions/HomeScreen"
import SignInScreen from "../screens/Sessions/Connection/SignInScreen"
import RegisterAdditionnalDetails from "../screens/Sessions/Inscription/RegisterAdditionnalDetails"
import RegisterMail from "../screens/Sessions/Inscription/RegisterMail"
import RegisterPhone from "../screens/Sessions/Inscription/RegisterPhone"
import MailConfirmation from "../screens/Sessions/Inscription/MailConfirmation"
import PhoneConfirmation from "../screens/Sessions/Inscription/PhoneConfirmation"
import HomeProspect from "../screens/Users/Prospect/HomeProspect"
import UserPage from "../screens/Users/UserPage"
import NoInternet from "../screens/NoInternet"

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

function SignUp() {
	return (
	  <Stack.Navigator initialRouteName="RegisterPhone" screenOptions={{ headerShown: false }}>
		  <Stack.Screen name="RegisterPhone" component={RegisterPhone} />
		  <Stack.Screen name="PhoneConfirmation" component={PhoneConfirmation} />
		  <Stack.Screen name="RegisterMail" component={RegisterMail} />
		  <Stack.Screen name="MailConfirmation" component={MailConfirmation} />
		  <Stack.Screen name="RegisterAdditionnalDetails" component={RegisterAdditionnalDetails} />
	  </Stack.Navigator>
	);
}

function SignIn() {
	return (
	  <Stack.Navigator initialRouteName="SignInScreen" screenOptions={{ headerShown: false }}>
		  <Stack.Screen name="SignInScreen" component={SignInScreen} />
	  </Stack.Navigator>
	);
}

function Prospect() {
	return (
	  <Tab.Navigator initialRouteName="HomeProspect" screenOptions={{ headerShown: false }}>
		  <Tab.Screen name="HomeProspect" component={HomeProspect} options={{
			  tabBarLabel: 'Home',
			  tabBarIcon: ({ color }) => (
			    <MaterialCommunityIcons name="home" color={color} size={26} />
			  ),
		  }}/>
		  <Tab.Screen name="UserPage" component={UserPage} options={{
			  tabBarLabel: 'Profile',
			  tabBarIcon: ({ color }) => (
			    <MaterialCommunityIcons name="account" color={color} size={26} />
			  ),
		  }}/>
	  </Tab.Navigator>
	);
}

function Navigation() {
	const [isLoggedIn, setLoggedIn] = React.useState(false);

	const handleLogin = () => {
		setLoggedIn(true);
	};

	const handleLogout = () => {
		setLoggedIn(false);
	};

	return (
	  <NavigationContainer>
		  <Stack.Navigator screenOptions={{ headerShown: false }}>
			  {isLoggedIn ? (
			    // Screens for logged in users
			  <Stack.Group>
				  <Stack.Screen name="Prospect" component={Prospect} />
			  </Stack.Group>
			  ) : (
				// Auth screens
			  <Stack.Group>
				  <Stack.Screen name="HomeScreen" component={HomeScreen} />
				  <Stack.Screen name="SignUp" component={SignUp} />
				  <Stack.Screen name="SignIn" component={SignIn} />
			  </Stack.Group>
			  )}
			  {/* Common modal screens */}
			  <Stack.Screen name="NoInternet" component={NoInternet} />
		  </Stack.Navigator>
	  </NavigationContainer>
	);
}

export default Navigation