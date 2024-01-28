import { initializeApp, getApp } from 'firebase/app';
import { initializeFirestore, getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// Initialize Firebase
const firebaseConfig = {
	apiKey: "AIzaSyBG4rbsxL8hjkZpHDgHQC7Z3uvxvakIoQQ",
	authDomain: "voyo-chat.firebaseapp.com",
	projectId: "voyo-chat",
	storageBucket: "voyo-chat.appspot.com",
	messagingSenderId: "187219606635",
	appId: "1:187219606635:web:fa671f735962d61886452e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// const auth = getAuth(app);
const auth = initializeAuth(app, {
	persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

const db = getFirestore(app);

// const db = initializeFirestore(app, {experimentalForceLongPolling: true});

export { db, auth };
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
