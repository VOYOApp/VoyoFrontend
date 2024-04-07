import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getReactNativePersistence, initializeAuth } from "firebase/auth"
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage"

// Initialize Firebase
const firebaseConfig = {
	apiKey: process.env.API_KEY,
	authDomain: process.env.AUTH_DOMAIN,
	projectId: process.env.PROJECT_ID,
	storageBucket: process.env.STORAGE_BUCKET,
	messagingSenderId: process.env.MESSAGING_SENDER_ID,
	appId: process.env.APP_ID,
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// const auth = getAuth(app);
const auth = initializeAuth(app, {
	persistence: getReactNativePersistence(ReactNativeAsyncStorage),
})

const db = getFirestore(app)

// const db = initializeFirestore(app, {experimentalForceLongPolling: true});

export { db, auth }
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
