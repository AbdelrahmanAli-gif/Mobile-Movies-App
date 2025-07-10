import { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Text, FlatList, ActivityIndicator, ToastAndroid } from 'react-native';
import { useFavorites } from '../contexts/FavoritesContext';
import { fetchMovies, fetchTopRatedMovies, fetchTrendingMovies, searchMovies } from '../utils/moviesUtils';
import { colors } from '../constants/colors';
import SearchBar from '../components/SearchBar';
import Filters from '../components/Filters';
import MovieCard from '../components/MovieCard';
import Spinner from '../components/Spinner';

const filtersData = ["None", "Trending", "Top Rated"];

export default function HomeScreen() {
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);
    const [searchText, setSearchText] = useState("");
    const [filter, setFilter] = useState("None");
    const debounceTimeout = useRef();
    const { favorites, toggleFavorite, loading: favoritesLoading } = useFavorites();

    const showToast = (message) => {
        ToastAndroid.show(message, ToastAndroid.SHORT);
    };

    const loadMovies = async (reset = false) => {
        if (loading) return;

        setLoading(true);
        try {
            let data;
            const targetPage = reset ? 1 : page;

            if (searchText.trim() !== "") data = await searchMovies(searchText, targetPage);
            else if (filter === "Trending") data = await fetchTrendingMovies(targetPage);
            else if (filter === "Top Rated") data = await fetchTopRatedMovies(targetPage);
            else data = await fetchMovies(targetPage);

            const newMovies = reset ? data.results : [...movies, ...data.results];
            setMovies(newMovies);
            setPage(targetPage + 1);
            setTotalPages(data.total_pages);
        } catch {
            showToast("Error loading movies. Please try again later.");
        }
        setLoading(false);
        if (initialLoading) setInitialLoading(false);
    };

    useEffect(() => {
        if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
        debounceTimeout.current = setTimeout(() => {
            setPage(1);
            loadMovies(true);
        }, 300);

        return () => clearTimeout(debounceTimeout.current);
    }, [searchText, filter]);

    const loadMore = () => {
        if (page <= totalPages && !loading && !initialLoading) {
            loadMovies();
        }
    };

    const renderFooter = () => {
        if (!loading) return null;
        return <ActivityIndicator style={{ marginBottom: 40 }} color={colors.quaternaryColor} />;
    };

    if (initialLoading || favoritesLoading) return <Spinner />;

    return (
        <View style={styles.container}>
            <View style={styles.flex}>
                <SearchBar searchText={searchText} setSearchText={setSearchText} />
                <Filters data={filtersData} onSelect={setFilter} />
            </View>
            <Text style={styles.title}>{filter === "None" ? "Explore" : filter}</Text>
            <FlatList
                data={movies}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <MovieCard
                        movie={item}
                        isFavorite={favorites.some((fav) => fav.id === item.id)}
                        toggleFavorite={toggleFavorite}
                    />
                )}
                onEndReached={loadMore}
                onEndReachedThreshold={0.1}
                ListFooterComponent={renderFooter}
                contentContainerStyle={{ paddingBottom: 30 }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { backgroundColor: colors.backgroundColor, flex: 1, paddingTop: 10 },
    spinner: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    flex: { padding: 10, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
    title: { fontSize: 22, fontWeight: 'bold', color: "white", borderBottomWidth: 1, borderBottomColor: "white", margin: 10 }
});
