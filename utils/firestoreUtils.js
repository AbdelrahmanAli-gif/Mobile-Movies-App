import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../services/firebase";

export const fetchFavorites = async () => {
    const userRef = doc(db, 'users', auth.currentUser.uid);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) return userSnap.data().favorites;
}

export const toggleFavorite = async (movie) => {
    const userRef = doc(db, "users", auth.currentUser.uid);
    const userSnap = await getDoc(userRef);

    const favorites = userSnap.data().favorites;

    const exists = favorites.some((fav) => fav.id === movie.id);

    const updatedFavorites = exists ?
        favorites.filter((fav) => fav.id !== movie.id) :
        [...favorites, movie];

    await updateDoc(userRef, { favorites: updatedFavorites });

    return updatedFavorites;
};