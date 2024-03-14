import AsyncStorage from '@react-native-async-storage/async-storage';

// Function to store JWT token
const storeToken = async (token) => {
	try {
		await AsyncStorage.setItem('token', token);
		console.log('Token stored successfully');
	} catch (error) {
		console.error('Error storing token:', error);
	}
}

// Function to retrieve JWT token
const getToken = async () => {
	try {
		const token = await AsyncStorage.getItem('token');
		if (token !== null) {
			return token;
		} else {
			console.log('Token not found');
			return null;
		}
	} catch (error) {
		console.error('Error getting token:', error);
		return null;
	}
}

// Function to remove JWT token
const removeToken = async () => {
	try {
		await AsyncStorage.removeItem('token');
		console.log('Token removed successfully');
	} catch (error) {
		console.error('Error removing token:', error);
	}
}

export { storeToken, getToken, removeToken };
