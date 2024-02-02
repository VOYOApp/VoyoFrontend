import React, { useEffect, useState } from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeScreen from "../screens/Sessions/HomeScreen"
import ConnectPhone from "../screens/Sessions/Connection/ConnectPhone"
import ConnectEmail from "../screens/Sessions/Connection/ConnectEmail"
import ConnectPWD from "../screens/Sessions/Connection/ConnectPWD"
import ForgotPassword from "../screens/Sessions/Connection/ForgotPassword"
import PasswordMailConfirmation from "../screens/Sessions/Connection/PasswordMailConfirmation"
import RegisterAdditionnalDetails from "../screens/Sessions/Inscription/RegisterAdditionnalDetails"
import RegisterMail from "../screens/Sessions/Inscription/RegisterMail"
import RegisterPhone from "../screens/Sessions/Inscription/RegisterPhone"
import MailConfirmation from "../screens/Sessions/Inscription/MailConfirmation"
import PhoneConfirmation from "../screens/Sessions/Inscription/PhoneConfirmation"
import ProspectHome from "../screens/Users/Prospect/ProspectHome"
import UserPage from "../screens/Users/UserPage"
import DetailsVisitor from "../screens/Users/Prospect/DetailsVisitor"
import NoInternet from "../screens/NoInternet"
import SearchMap from "../screens/Users/Common/SearchMap"
import Chat from "../screens/Users/Common/Chat"
import ChatChannel from "../screens/Users/Common/ChatChannel"

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebaseConfig';

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

// AUTH STACKS (Home, SignIn, SignUp)
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
	  <Stack.Navigator initialRouteName="ConnectPhone" screenOptions={{ headerShown: false }}>
		  <Stack.Screen name="ConnectPhone" component={ConnectPhone} />
		  <Stack.Screen name="ConnectEmail" component={ConnectEmail} />
		  <Stack.Screen name="ConnectPWD" component={ConnectPWD} />
		  <Stack.Screen name="PasswordMailConfirmation" component={PasswordMailConfirmation} />
		  <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
	  </Stack.Navigator>
	);
}

// PROSPECT STACKS (Home, Search, CustomListItem)
function HomeProspect() {
	return (
	  <Stack.Navigator initialRouteName="DetailsVisitor" screenOptions={{ headerShown: false }}>
		  <Stack.Screen name="ProspectHome" component={ProspectHome} />
		  <Stack.Screen name="UserPage" component={UserPage} />
		  <Stack.Screen name="DetailsVisitor" component={DetailsVisitor} />
		  {/* Ajoutez d'autres écrans liés à cet onglet si nécessaire */}
	  </Stack.Navigator>
	);
}
function SearchProspect() {
	return (
	  <Stack.Navigator initialRouteName="SearchMap" screenOptions={{ headerShown: false }}>
		  <Stack.Screen name="SearchMap" component={SearchMap} />
		  {/* Ajoutez d'autres écrans liés à cet onglet si nécessaire */}
	  </Stack.Navigator>
	);
}
// function ChatProspect() {
// 	return (
// 	  <Stack.Navigator initialRouteName="Chat">
// 		  {/*<Stack.Screen name="ChatChannel" component={ChatChannel} />*/}
// 		  <Stack.Screen name="Chat" component={Chat} />
// 		  {/* Ajoutez d'autres écrans liés à cet onglet si nécessaire */}
// 	  </Stack.Navigator>
// 	);
// }

function Common() {
	return (
	  <Stack.Navigator>
		  <Stack.Screen name="Chat" component={Chat} />
	  </Stack.Navigator>
	);
}

function Prospect() {
	return (
	  <Tab.Navigator initialRouteName="HomeProspect" screenOptions={{ tabBarShowLabel: false }}>
		  <Tab.Screen name="HomeProspect" component={HomeProspect} options={{
			  headerShown: false,
			  tabBarLabel: 'Home',
			  tabBarIcon: ({ color }) => (
			    <MaterialCommunityIcons name="home" color={color} size={26} />
			  ),
		  }}/>
		  <Tab.Screen name="SearchProspect" component={SearchProspect} options={{
			  headerShown: false,
			  tabBarLabel: 'Search',
			  tabBarIcon: ({ color }) => (
			    <MaterialCommunityIcons name="magnify" color={color} size={26} />
			  ),
		  }}/>
		  <Tab.Screen name="ChatChannel" component={ChatChannel} options={{
			  tabBarLabel: 'Chat',
			  tabBarIcon: ({ color }) => (
			    <MaterialCommunityIcons name="chat" color={color} size={26} />
			  ),
		  }}/>
		   {/*Ajoutez d'autres onglets si nécessaire*/}
	  </Tab.Navigator>
	);
}

// function Visitor() {
// 	return (
// 	  <Tab.Navigator initialRouteName="HomeVisitor" screenOptions={{ headerShown: false, tabBarShowLabel: false }}>
// 		  <Tab.Screen name="HomeVisitor" component={HomeVisitor} options={{
// 			  tabBarLabel: 'Home',
// 			  tabBarIcon: ({ color }) => (
// 				<MaterialCommunityIcons name="home" color={color} size={26} />
// 			  ),
// 		  }}/>
// 		  <Tab.Screen name="SearchVisitor" component={SearchVisitor} options={{
// 		    tabBarLabel: 'Search',
// 		    tabBarIcon: ({ color }) => (
// 		      <MaterialCommunityIcons name="magnify" color={color} size={26} />
// 		    ),
// 		  }}/>
// 		  <Tab.Screen name="ChatVisitor" component={ChatVisitor} options={{
// 		    tabBarLabel: 'CustomListItem',
// 		    tabBarIcon: ({ color }) => (
// 		      <MaterialCommunityIcons name="chat" color={color} size={26} />
// 		    ),
// 		  }}/>
// 		  {/* Ajoutez d'autres onglets si nécessaire */}
// 	  </Tab.Navigator>
// 	);
// }

function Navigation() {
	// const [isLoggedIn, setLoggedIn] = React.useState(false);
	//
	// const handleLogin = () => {
	// 	setLoggedIn(true);
	// };
	//
	// const handleLogout = () => {
	// 	setLoggedIn(false);
	// };


	return (
	  <NavigationContainer>
		  <Stack.Navigator initialRouteName={"HomeScreen"} screenOptions={{ headerShown: false }}>
			  {/*{isLoggedIn ? (*/}
			  {/*  // Screens for logged in users*/}
			  <Stack.Group>
				  <Stack.Screen name="Prospect" component={Prospect} />
				  <Stack.Screen name="Common" component={Common} />
			  </Stack.Group>
			  {/*) : (*/}
				{/*// Auth screens*/}
			  <Stack.Group>
				  <Stack.Screen name="HomeScreen" component={HomeScreen} />
				  <Stack.Screen name="SignUp" component={SignUp} />
				  <Stack.Screen name="SignIn" component={SignIn} />
			  </Stack.Group>
			  {/*)}*/}
			  {/* Common modal screens */}
			  <Stack.Screen name="NoInternet" component={NoInternet} />
		  </Stack.Navigator>
	  </NavigationContainer>
	);
}

export default Navigation