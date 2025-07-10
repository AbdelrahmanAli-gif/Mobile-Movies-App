import { StyleSheet, Text, View } from 'react-native';
import { auth } from '../services/firebase';
import { colors } from '../constants/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';

const NavigationBar = ({ navigation }) => {
    const handleLogout = () => {
        auth.signOut();
        navigation.replace('Login');
    };

    return (
        <View style={styles.appBar}>
            <View style={styles.flex}>
                <Icon name="movie-creation" size={30} color={colors.quaternaryColor} />
                <Text style={styles.title}>MoviesNest</Text>
            </View>
            <View style={styles.flex}>
                <Text style={styles.username}>{auth.currentUser?.displayName} {" "}</Text>
                <Icon name="logout" size={20} color={colors.quaternaryColor} onPress={handleLogout} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    appBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: colors.primaryColor, padding: 10, width: '100%', },
    flex: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 5 },
    title: { color: 'white', fontSize: 20, fontWeight: 'bold', },
    username: { color: 'white', fontSize: 14 },
})

export default NavigationBar;
