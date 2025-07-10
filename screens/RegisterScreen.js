import { useState } from 'react';
import { StyleSheet, Text, ToastAndroid } from 'react-native';
import { createUserWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { auth, db } from '../services/firebase';
import { colors } from '../constants/colors';
import AuthForm from '../components/AuthForm';
import { doc, setDoc } from 'firebase/firestore';

const inputFields = [
    { placeholder: 'Username', secureTextEntry: false },
    { placeholder: 'Email', keyboardType: 'email-address', secureTextEntry: false },
    { placeholder: 'Password', secureTextEntry: true },
];

export default function RegisterScreen({ navigation }) {
    const [error, setError] = useState("");

    const showToast = (message) => {
        ToastAndroid.show(message, ToastAndroid.SHORT);
    };

    const handleRegister = async (username, email, password) => {
        if (!username || !email || !password) {
            setError("Please fill in all fields.");
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await setDoc(doc(db, "users", userCredential.user.uid), { favorites: [] });
            updateProfile(auth.currentUser, {
                displayName: username
            });
            signOut(auth);
            showToast("Registration successful");
            navigation.navigate('Login');
            setError("");
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <AuthForm inputFields={inputFields} onSubmit={handleRegister} buttonText="Register" error={error}>
            <Text style={styles.text}>
                Already have an account? {" "}
                <Text onPress={() => navigation.navigate('Login')} style={styles.link}>Login</Text>
            </Text>
        </AuthForm>
    );
}

const styles = StyleSheet.create({
    text: { color: 'white', textAlign: 'center', marginTop: 20, fontSize: 14, },
    link: { color: colors.quaternaryColor, textAlign: 'center', }
});