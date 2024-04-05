import React, { useEffect, useState } from "react"
import { Image } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { BASE_URL } from "@env"

import HomeScreen from "../screens/Sessions/HomeScreen"
import ConnectPhone from "../screens/Sessions/Connection/ConnectPhone"
import ConnectEmail from "../screens/Sessions/Connection/ConnectEmail"
import ConnectPWD from "../screens/Sessions/Connection/ConnectPWD"
import ForgotPassword from "../screens/Sessions/Connection/ForgotPassword"
import PasswordMailConfirmation from "../screens/Sessions/Connection/PasswordMailConfirmation"
import RegisterAdditionnalDetails from "../screens/Sessions/Inscription/RegisterAdditionnalDetails"
import AdditionalDetailsVisitor from "../screens/Sessions/Inscription/AdditionalDetailsVisitor"
import VisitorAvailability from "../screens/Sessions/Inscription/VisitorAvailability"
import TarificationVisitor from "../screens/Sessions/Inscription/TarificationVisitor"
import RegisterMail from "../screens/Sessions/Inscription/RegisterMail"
import RegisterPhone from "../screens/Sessions/Inscription/RegisterPhone"
import MailConfirmation from "../screens/Sessions/Inscription/MailConfirmation"
import PhoneConfirmation from "../screens/Sessions/Inscription/PhoneConfirmation"
import ProspectHome from "../screens/Users/Prospect/ProspectHome"
import UserPage from "../screens/Users/UserPage"
import DetailsVisitor from "../screens/Users/Prospect/DetailsVisitor"
import NoInternet from "../screens/NoInternet"
import PendingVoyo from "../screens/Sessions/PendingVoyo"
import BanVoyo from "../screens/Sessions/BanVoyo"
import SearchMap from "../screens/Users/Common/SearchMap"
import Chat from "../screens/Users/Common/Chat"
import ChatChannel from "../screens/Users/Common/ChatChannel"
import CriteriaScreen from "../screens/Users/Prospect/CriteresPage"
import RecapRequest from "../screens/Users/Prospect/RecapRequest"
import AdminHome from "../screens/Users/Admin/AdminHome"
import SearchUser from "../screens/Users/Admin/AdminHome/SearchUser"
import ValidateRequest from "../screens/Users/Admin/AdminHome/ValidateRequest"

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
		  <Stack.Screen name="AdditionalDetailsVisitor" component={AdditionalDetailsVisitor} />
		  <Stack.Screen name="VisitorAvailability" component={VisitorAvailability} />
		  <Stack.Screen name="TarificationVisitor" component={TarificationVisitor} />
	  </Stack.Navigator>
	)
}

function SignIn() {
	return (<Stack.Navigator initialRouteName="ConnectPhone" screenOptions={{ headerShown: false }}>
		<Stack.Screen name="ConnectPhone" component={ConnectPhone} />
		<Stack.Screen name="ConnectEmail" component={ConnectEmail} />
		<Stack.Screen name="ConnectPWD" component={ConnectPWD} />
		<Stack.Screen name="PasswordMailConfirmation" component={PasswordMailConfirmation} />
		<Stack.Screen name="ForgotPassword" component={ForgotPassword} />
	</Stack.Navigator>)
}

// PROSPECT STACKS (Home, Search, CustomListItem)
function HomeProspect() {
	return (<Stack.Navigator screenOptions={{ headerShown: false }}>
		<Stack.Screen name="ProspectHome" component={ProspectHome} />
		<Stack.Screen name="UserPage" component={UserPage} />
		<Stack.Screen name="DetailsVisitor" component={DetailsVisitor} />
		{/* Ajoutez d'autres écrans liés à cet onglet si nécessaire */}
	</Stack.Navigator>)
}

function SearchProspect() {
	return (<Stack.Navigator initialRouteName="SearchMap" screenOptions={{ headerShown: false }}>
		<Stack.Screen name="SearchMap" component={SearchMap} />
		<Stack.Screen name="Criteria" component={CriteriaScreen} />
		<Stack.Screen name="Recap" component={RecapRequest} />
		{/* Ajoutez d'autres écrans liés à cet onglet si nécessaire */}
	</Stack.Navigator>)
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
	return (<Stack.Navigator>
		<Stack.Screen name="Chat" component={Chat} />
	</Stack.Navigator>)
}


function Prospect() {
	return (<Tab.Navigator screenOptions={{
		tabBarShowLabel: false, tabBarStyle: { marginBottom: 0 },
	}}>
		<Tab.Screen name="HomeProspect" component={HomeProspect} options={{
			headerShown: false, tabBarLabel: "Home", tabBarIcon: ({ color, focused }) => (// <MaterialCommunityIcons name="home" color={color} size={26} />
			  <Image source={require("../../assets/home_locked.png")} color={color}
			         style={{ tintColor: focused ? "#F99342" : color, width: 22, height: 22 }} />),
		}} />
		<Tab.Screen name="SearchProspect" component={SearchProspect} options={{
			headerShown: false,
			tabBarLabel: "Search",
			tabBarIcon: ({ color, focused }) => (<Image source={require("../../assets/search_locked.png")} color={color}
			                                            style={{
				                                            tintColor: focused ? "#FC4F45" : color,
				                                            width: 22,
				                                            height: 22,
			                                            }} />),
		}} />
		<Tab.Screen name="ChatChannel" component={ChatChannel} options={{
			tabBarLabel: "Chat",
			tabBarIcon: ({ color, focused }) => (<Image source={require("../../assets/chat_locked.png")}
			                                            style={{
				                                            tintColor: focused ? "#B34BFF" : color,
				                                            width: 22,
				                                            height: 22,
			                                            }} />),
		}} />
		{/*Ajoutez d'autres onglets si nécessaire*/}
	</Tab.Navigator>)
}


// PROSPECT STACKS (Home, Search, CustomListItem)
function HomeAdmin() {
	return (<Stack.Navigator initialRouteName="AdminHome" screenOptions={{ headerShown: false }}>
		<Stack.Screen name="AdminHome" component={AdminHome} />
		<Stack.Screen name="ValidateRequest" component={ValidateRequest} />
		{/* Ajoutez d'autres écrans liés à cet onglet si nécessaire */}
	</Stack.Navigator>)
}



function Admin() {
	return (<Tab.Navigator screenOptions={{
		tabBarShowLabel: false, tabBarStyle: { marginBottom: 0 },
	}}>
		<Tab.Screen name="HomeAdmin" component={HomeAdmin} options={{
			headerShown: false, tabBarLabel: "Home", tabBarIcon: ({ color, focused }) => (// <MaterialCommunityIcons name="home" color={color} size={26} />
			  <Image source={require("../../assets/home_locked.png")} color={color}
			         style={{ tintColor: focused ? "#F99342" : color, width: 22, height: 22 }} />),
		}} />
		<Tab.Screen name="SearchUser" component={SearchUser} options={{
			headerShown: false, tabBarLabel: "Search", tabBarIcon: ({ color, focused }) => (// <MaterialCommunityIcons name="home" color={color} size={26} />
			<Image source={require("../../assets/search_locked.png")} color={color}
			style={{
				tintColor: focused ? "#FC4F45" : color,
				width: 22,
				height: 22,
			}} />),
		}} />
		{/*Ajoutez d'autres onglets si nécessaire*/}
	</Tab.Navigator>)
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

function Navigation({ isLoggedIn, status, role }) {

	return (<NavigationContainer>
		{ isLoggedIn && status === "VALIDATED" && role === "PROSPECT" ? (
		  <Stack.Navigator screenOptions={{ headerShown: false }}>
			  <Stack.Screen name="Prospect" component={Prospect} />
		      <Stack.Screen name="Common" component={Common} />
		  </Stack.Navigator>
		) : isLoggedIn && status === "VALIDATED" && role === "VISITOR" ? (
		  <Stack.Navigator screenOptions={{ headerShown: false }}>
			  <Stack.Screen name="Prospect" component={Prospect} />
			  <Stack.Screen name="Common" component={Common} />
		  </Stack.Navigator>
		) : isLoggedIn && status === "BANNED" ? (
		  <Stack.Navigator screenOptions={{ headerShown: false }}>
		    <Stack.Screen name="BanVoyo" component={BanVoyo} />
		  </Stack.Navigator>
		) : isLoggedIn && status === "PENDING_VALIDATION" ? (
		  <Stack.Navigator screenOptions={{ headerShown: false }}>
			  <Stack.Screen name="PendingVoyo" component={PendingVoyo} />
		  </Stack.Navigator>
		) : isLoggedIn && role === "ADMIN" && status === "VALIDATED" ? (
		  <Stack.Navigator screenOptions={{ headerShown: false }}>
			  <Stack.Screen name="Admin" component={Admin} />
		  </Stack.Navigator>
		) : (
			<Stack.Navigator screenOptions={{ headerShown: false }}>
				<Stack.Screen name="HomeScreen" component={HomeScreen} />
				<Stack.Screen name="SignUp" component={SignUp} />
				<Stack.Screen name="SignIn" component={SignIn} />
				<Stack.Screen name="PendingVoyo" component={PendingVoyo} />
				<Stack.Screen name="NoInternet" component={NoInternet} />
			</Stack.Navigator>
		)}
		  </NavigationContainer>)
		}

		export default Navigation