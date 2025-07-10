import { Image, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../constants/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';

const IMAGE_URL = process.env.EXPO_PUBLIC_IMAGE_URL;

const MovieCard = ({ movie, isFavorite, toggleFavorite }) => {
    const navigation = useNavigation();

    const handlePress = () => {
        navigation.navigate('MovieDetails', { movieId: movie.id });
    }

    const handleFavoriteToggle = async () => {
        try {
            await toggleFavorite(movie);
        } catch (error) {
            ToastAndroid.show(
                'Error updating favorites. Please try again later.',
                ToastAndroid.SHORT
            );
        }
    };

    return (
        <TouchableOpacity onPress={handlePress}>
            <View style={styles.container}>
                <TouchableOpacity style={styles.favoriteIcon} onPress={handleFavoriteToggle}>
                    <Icon name="favorite" size={30} color={isFavorite ? colors.quaternaryColor : "white"} />
                </TouchableOpacity>
                <Image source={{ uri: `${IMAGE_URL}/w500/${movie.poster_path}` }} style={styles.image} />
                <View style={styles.details}>
                    <Text style={styles.title}>
                        {movie.title}
                    </Text>
                    <View style={styles.flex}>
                        <Icon name="star-rate" size={20} color={colors.quaternaryColor} />
                        <Text style={styles.rating}>
                            {movie.vote_average}
                        </Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: { backgroundColor: colors.primaryColor, borderRadius: 10, margin: 10, alignItems: 'center', height: 250, justifyContent: "space-between" },
    favoriteIcon: { position: "absolute", top: 20, right: 20, zIndex: 1, backgroundColor: "rgba(0, 0, 0, 0.4)", borderRadius: 5, padding: 5 },
    image: { width: "100%", height: 200, borderTopLeftRadius: 10, borderTopRightRadius: 10 },
    details: { width: "100%", padding: 10, flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
    flex: { flexDirection: "row", alignItems: "center" },
    title: { color: "white", fontSize: 17, fontWeight: 'bold' },
    rating: { color: "white", fontSize: 17, fontWeight: 'bold' }
})

export default MovieCard;
