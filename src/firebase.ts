// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
	apiKey: "AIzaSyDTBtjLWgK0YMtcRAtTgLtd557KojG8fik",
	authDomain: "wk-planner.firebaseapp.com",
	projectId: "wk-planner",
	storageBucket: "wk-planner.appspot.com",
	messagingSenderId: "570936621444",
	appId: "1:570936621444:web:4f1ae2ab1b3bc0362845d1",
	measurementId: "G-EEMZZSQKFJ",
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const auth = getAuth()
