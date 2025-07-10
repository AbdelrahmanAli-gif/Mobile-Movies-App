import { useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/firebase';
import { colors } from '../constants/colors';
import AuthForm from '../components/AuthForm';

const inputFields = [
    { placeholder: 'Email', keyboardType: 'email-address', secureTextEntry: false },
    { placeholder: 'Password', secureTextEntry: true },
];

export default function LoginScreen({ navigation }) {
    const [error, setError] = useState("");

    const handleLogin = async (email, password) => {
        if (!email || !password) {
            setError("Please fill in all fields.");
            return;
        }

        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigation.replace('App');
            setError("");
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <AuthForm inputFields={inputFields} onSubmit={handleLogin} buttonText="Login" error={error}>
            <Text style={styles.text}>
                Don't have an account? {" "}
                <Text onPress={() => navigation.navigate('Register')} style={styles.link}>Sign Up</Text>
            </Text>
        </AuthForm>
    );
}

const styles = StyleSheet.create({
    text: { color: 'white', textAlign: 'center', marginTop: 20, fontSize: 14, },
    link: { color: colors.quaternaryColor, textAlign: 'center', }
});