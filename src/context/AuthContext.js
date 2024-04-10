import AsyncStorage from '@react-native-async-storage/async-storage';

// Function to store JWT token
const storeToken = async (token) => {
	try {
		await AsyncStorage.setItem('token', token);
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

const storeGlobal = async (key, value) => {
	try {
		await AsyncStorage.setItem(key, value);
	} catch (error) {
		console.error('Error storing global:', error);
	}
}

const getGlobal = async (key) => {
	try {
		const value = await AsyncStorage.getItem(key);
		if (value !== null) {
			return JSON.parse(value);
		} else {
			console.log('Global not found');
			return null;
		}
	} catch {
		try {
			const value = await AsyncStorage.getItem(key);
			if (value !== null) {
				return value;
			} else {
				console.log('Global not found');
				return null;
			}
		} catch (error) {
			console.error('Error getting global:', error);
			return null;
		}
	}
}

const removeGlobal = async (key) => {
	try {
		await AsyncStorage.removeItem(key);
		console.log('Global removed successfully');
	} catch (error) {
		console.error('Error removing global:', error);
	}
}

export { storeToken, getToken, removeToken, storeGlobal, getGlobal, removeGlobal };
