
import { initializeApp } from "firebase/app";

import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from "@firebase/firestore";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBWZYMDJy99000UR5xjUaCnn6gwg_HKPas",
  authDomain: "portfolio-34240.firebaseapp.com",
  projectId: "portfolio-34240",
  storageBucket: "portfolio-34240.appspot.com",
  messagingSenderId: "88216880793",
  appId: "1:88216880793:web:3e57d1ec694d8b0dd81a08",
  measurementId: "G-YDF5P0YQ0W"
};


const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
	persistence: getReactNativePersistence(AsyncStorage)
});


export const firestore = getFirestore(app);
export const storage = getStorage(app);
export const db=getFirestore(app);