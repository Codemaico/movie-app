import { createContext, useState, useEffect, useContext, Children } from "react";

const MovieContext = createContext()

export const useMovieContext = () => useContext(MovieContext)

export const MovieProvider = ({children})=> {
    const [favorites, setFavorites] = useState([])

    useEffect(() => {
        const storedFavs = localStorage.getItem("favorites")
        if (storedFavs) {
            setFavorites (JSON.parse(storedFavs))
        }
    }, [])

    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites))
    }, [favorites])

    // add to favorites
    const addToFavorites = (movie) => {
        setFavorites(prev => [...prev, movie])
    }

    // remove from favorites
    const removeFromFavorites = (movieId) => {
        setFavorites(prev => prev.filter(movie => movie.id !== movieId))
    }

    const isFavorite = (movieId) => {
        return favorites.some(movie => movie.id === movieId)
    }
     const providerValue = {
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite
    };

    return <MovieContext.Provider value={providerValue}>
        {children}
    </MovieContext.Provider>
}
