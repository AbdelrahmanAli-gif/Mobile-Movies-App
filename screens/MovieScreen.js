import { useEffect, useState } from 'react';
import { ScrollView, View, Text, Image, StyleSheet, FlatList } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { fetchMovieDetails } from '../utils/moviesUtils';
import { WebView } from 'react-native-webview';
import { colors } from '../constants/colors';
import Spinner from '../components/Spinner';
import Icon from 'react-native-vector-icons/MaterialIcons';

const IMAGE_URL = process.env.EXPO_PUBLIC_IMAGE_URL;

export default function MovieDetailsScreen() {
    const route = useRoute();
    const { movieId } = route.params;
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        async function loadMovie() {
            const data = await fetchMovieDetails(movieId);
            setMovie(data);
        }
        loadMovie();
    }, [movieId]);

    if (!movie) return <Spinner />;

    return (
        <ScrollView style={styles.container}>
            <Image
                source={{ uri: `${IMAGE_URL}/w500${movie.poster_path}` }}
                style={styles.poster}
            />

            <View style={styles.content}>
                <Text style={styles.title}>{movie.title}</Text>

                <View style={styles.ratingContainer}>
                    <Icon name="star" size={20} color="#f1c40f" />
                    <Text style={styles.rating}>{movie.vote_average.toFixed(1)} / 10</Text>
                </View>

                <Text style={styles.overview}>{movie.overview}</Text>

                <Text style={styles.sectionTitle}>Top Cast</Text>
                <FlatList
                    data={movie.topCast}
                    horizontal
                    keyExtractor={(item) => item.id}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <View style={styles.castItem}>
                            <Image
                                source={{ uri: item.profile_path ? `${IMAGE_URL}/w185${item.profile_path}` : 'https://static.vecteezy.com/system/resources/thumbnails/003/337/584/small_2x/default-avatar-photo-placeholder-profile-icon-vector.jpg' }}
                                style={styles.castImage}
                            />
                            <Text style={styles.castName} numberOfLines={1}>{item.name}</Text>
                        </View>
                    )}
                />

                {movie.trailerKey && (
                    <>
                        <Text style={styles.sectionTitle}>Trailer</Text>
                        <View style={styles.trailerContainer}>
                            <WebView
                                style={styles.webview}
                                javaScriptEnabled
                                source={{ uri: `https://www.youtube.com/embed/${movie.trailerKey}` }}
                            />
                        </View>
                    </>
                )}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.primaryColor },
    loading: { padding: 20, fontSize: 18, color: 'white' },
    poster: { width: '100%', height: 400 },
    content: { padding: 16 },
    title: { fontSize: 26, fontWeight: 'bold', color: 'white', marginBottom: 8 },
    ratingContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
    rating: { marginLeft: 6, fontSize: 16, color: 'white' },
    overview: { fontSize: 16, color: 'white', marginBottom: 16 },
    sectionTitle: { fontSize: 20, color: 'white', fontWeight: 'bold', marginTop: 16, marginBottom: 8 },
    castItem: { marginRight: 10, width: 80, alignItems: 'center' },
    castImage: { width: 70, height: 100, borderRadius: 8, marginBottom: 4 },
    castName: { fontSize: 12, color: 'white', textAlign: 'center' },
    trailerContainer: { height: 220, marginTop: 10, borderRadius: 10, overflow: 'hidden' },
    webview: { flex: 1 }
});
