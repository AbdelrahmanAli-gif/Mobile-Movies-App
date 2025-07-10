import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useFavorites } from '../contexts/FavoritesContext';
import { colors } from '../constants/colors';
import Spinner from '../components/Spinner';
import MovieCard from '../components/MovieCard';
import filmImage from '../assets/mdi_film-open-remove.png';

export default function FavoriteScreen() {
    const { favorites, toggleFavorite, loading } = useFavorites();

    if (loading)
        return <Spinner />

    if (favorites.length === 0)
        return (
            <View style={styles.noFavorites}>
                <Image source={filmImage} style={styles.noFavoritesImage} />
                <Text style={styles.noFavoritesText}>
                    No favorites yet!
                </Text>
            </View>
        );

    return (
        <ScrollView style={styles.container}>
            {favorites.map((movie) => <MovieCard key={movie.id} movie={movie} isFavorite={true} toggleFavorite={toggleFavorite} />)}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { backgroundColor: colors.backgroundColor, paddingTop: 10, },
    spinner: { flex: 1, justifyContent: 'center', alignItems: 'center', },
    noFavorites: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.backgroundColor },
    noFavoritesImage: { width: 200, height: 200 },
    noFavoritesText: { color: "white", fontSize: 20, marginTop: 10 },
});