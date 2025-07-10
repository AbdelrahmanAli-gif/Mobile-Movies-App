import { useRef, useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { colors } from '../constants/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function AuthForm({ inputFields, onSubmit, buttonText, error, children }) {
    const values = useRef({});
    const [visibility, setVisibility] = useState({});

    const handleValueChange = (field, value) => {
        values.current[field] = value.trim();
    };

    const toggleVisibility = (index) => {
        setVisibility((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };

    return (
        <View style={styles.container}>
            <View style={styles.logo}>
                <Icon name="movie-creation" size={50} color={colors.quaternaryColor} />
                <Text style={styles.title}>MoviesNest</Text>
            </View>

            <View style={styles.form}>
                {error ? <Text style={styles.error}>{error}</Text> : null}

                {inputFields.map((field, index) => {
                    const isPassword = field.secureTextEntry;

                    return (
                        <View key={index} style={styles.inputWrapper}>
                            <TextInput
                                style={styles.input}
                                placeholderTextColor="gray"
                                {...field}
                                secureTextEntry={isPassword && !visibility[index]}
                                onChangeText={(value) => handleValueChange(index, value)}
                            />
                            {isPassword && (
                                <TouchableOpacity
                                    onPress={() => toggleVisibility(index)}
                                    style={styles.eyeIcon}
                                >
                                    <Icon
                                        name={visibility[index] ? 'visibility' : 'visibility-off'}
                                        size={20}
                                        color="gray"
                                    />
                                </TouchableOpacity>
                            )}
                        </View>
                    );
                })}

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onSubmit(...Object.values(values.current))}
                >
                    <Text style={styles.buttonText}>{buttonText}</Text>
                </TouchableOpacity>
                {children}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: colors.backgroundColor, },
    logo: { marginBottom: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', },
    title: { color: 'white', fontSize: 24 },
    form: { width: '90%', padding: 20, },
    inputWrapper: { position: 'relative', marginBottom: 10, },
    input: { height: 40, borderColor: 'gray', borderWidth: 1, paddingHorizontal: 10, borderRadius: 5, color: 'white', paddingRight: 40, },
    eyeIcon: { position: 'absolute', right: 10, top: 10, },
    button: { backgroundColor: colors.tertiaryColor, padding: 10, borderRadius: 5, alignItems: 'center', },
    buttonText: { color: 'white', fontSize: 16, },
    error: { color: 'red', marginBottom: 10 },
});
