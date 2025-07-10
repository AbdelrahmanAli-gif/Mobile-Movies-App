import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
    apiKey: "AIzaSyCUQTCgvlkr2sfFsHfL1zds5py0jQSmZdI",
    authDomain: "movies-app-fccfe.firebaseapp.com",
    projectId: "movies-app-fccfe",
    storageBucket: "movies-app-fccfe.firebasestorage.app",
    messagingSenderId: "433448794182",
    appId: "1:433448794182:web:e83ceccd83f7b34fa97247"
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export const db = getFirestore(app);
