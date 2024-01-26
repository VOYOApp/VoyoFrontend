import { initializeApp } from 'firebase/app';

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

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
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
