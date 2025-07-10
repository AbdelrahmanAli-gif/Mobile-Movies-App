import { createContext, useContext, useEffect, useState } from "react";
import { fetchFavorites, toggleFavorite } from "../utils/firestoreUtils";
import { ToastAndroid } from "react-native";

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                const data = await fetchFavorites();
                setFavorites(data);
            } catch {
                ToastAndroid.show(
                    'Error fetching favorites. Please try again later.',
                    ToastAndroid.SHORT
                );
            }
            setLoading(false);
        })();
    }, []);

    const toggle = async (movie) => {
        const updated = await toggleFavorite(movie);
        setFavorites(updated);
    };

    return (
        <FavoritesContext.Provider value={{ favorites, setFavorites, toggleFavorite: toggle, loading }}>
            {children}
        </FavoritesContext.Provider>
    );
};

export const useFavorites = () => useContext(FavoritesContext);