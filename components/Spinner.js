import { ActivityIndicator, View } from 'react-native';
import { colors } from '../constants/colors';

const Spinner = () => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color={colors.quaternaryColor} />
        </View>
    );
}

const styles = {
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.backgroundColor, },
}

export default Spinner;
