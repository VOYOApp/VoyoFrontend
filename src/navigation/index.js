import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"

import HomeScreen from "../screens/HomeScreen"
import SignInScreen from "../screens/SignInScreen"
import RegisterAdditionnalDetails from "../screens/RegisterAdditionnalDetails"
import RegisterMail from "../screens/RegisterMail"
import RegisterPhone from "../screens/RegisterPhone"
import MailConfirmation from "../screens/MailConfirmation"
import PhoneConfirmation from "../screens/PhoneConfirmation"
import HomeProspect from "../screens/HomeProspect"
import UserPage from "../screens/UserPage"
import NoInternet from "../screens/NoInternet"

const Stack = createStackNavigator()
const Navigation = () => {
	return (
	  <NavigationContainer>
		  <Stack.Navigator screenOptions={{ headerShown: false }}>
			  <Stack.Screen name="HomeScreen" component={HomeScreen} />
			  <Stack.Screen name="SignInScreen" component={SignInScreen} />
			  <Stack.Screen name="RegisterAdditionnalDetails" component={RegisterAdditionnalDetails} />
			  <Stack.Screen name="RegisterMail" component={RegisterMail} />
			  <Stack.Screen name="RegisterPhone" component={RegisterPhone} />
			  <Stack.Screen name="MailConfirmation" component={MailConfirmation} />
			  <Stack.Screen name="PhoneConfirmation" component={PhoneConfirmation} />
			  <Stack.Screen name="HomeProspect" component={HomeProspect} />
			  <Stack.Screen name="UserPage" component={UserPage} />
			  <Stack.Screen name="NoInternet" component={NoInternet} />
		  </Stack.Navigator>
	  </NavigationContainer>
	)
}

export default Navigation