import { apiConfig } from "../services/apiConfig";

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;
const API_OPTIONS = apiConfig();

export const fetchMovies = async (page = 1) => {
    const response = await fetch(`${BASE_URL}/discover/movie?page=${page}`, API_OPTIONS);
    const data = await response.json();
    return data;
}

export const searchMovies = async (query, page = 1) => {
    const response = await fetch(`${BASE_URL}/search/movie?query=${query}&page=${page}`, API_OPTIONS);
    const data = await response.json();
    return data;
}

export const fetchTrendingMovies = async (page = 1) => {
    const response = await fetch(`${BASE_URL}/movie/popular?page=${page}`, API_OPTIONS);
    const data = await response.json();
    return data;
}

export const fetchTopRatedMovies = async (page = 1) => {
    const response = await fetch(`${BASE_URL}/movie/top_rated?page=${page}`, API_OPTIONS);
    const data = await response.json();
    return data;
}

export const fetchMovieDetails = async (movieId) => {
    const [detailsRes, creditsRes, videosRes] = await Promise.all([
        fetch(`${BASE_URL}/movie/${movieId}`, API_OPTIONS),
        fetch(`${BASE_URL}/movie/${movieId}/credits`, API_OPTIONS),
        fetch(`${BASE_URL}/movie/${movieId}/videos`, API_OPTIONS),
    ]);

    const details = await detailsRes.json();
    const credits = await creditsRes.json();
    const videos = await videosRes.json();

    const topCast = credits.cast.slice(0, 10);
    const trailer = videos.results.find(v => v.type === 'Trailer' && v.site === 'YouTube');

    return {
        ...details,
        topCast,
        trailerKey: trailer ? trailer.key : null
    };
}