import { useEffect, useState } from "react";
import {
    FaHeart,
    FaPlay,
    FaPause,
} from "react-icons/fa";

import { useMusicPlayer } from "../context/MusicPlayerContext";

const SongCard = ({ song, songs }) => {
    const {
        currentSong,
        isPlaying,
        playSong,
        togglePlay,
    } = useMusicPlayer();

    const [isFavorite, setIsFavorite] = useState(false);

    const isCurrent = currentSong?.id === song.id;

    useEffect(() => {
        const storedFavorites =
            JSON.parse(
                localStorage.getItem("favorites")
            ) || [];

        const exists = storedFavorites.some(
            (item) => item.id === song.id
        );

        setIsFavorite(exists);
    }, [song.id]);

    const handlePlay = () => {
        if (isCurrent) {
            togglePlay();
        } else {
            playSong(song, songs);
        }
    };

    const toggleFavorite = () => {
        const storedFavorites =
            JSON.parse(
                localStorage.getItem("favorites")
            ) || [];

        if (isFavorite) {
            const updatedFavorites =
                storedFavorites.filter(
                    (item) => item.id !== song.id
                );

            localStorage.setItem(
                "favorites",
                JSON.stringify(updatedFavorites)
            );

            setIsFavorite(false);

            window.dispatchEvent(
                new Event("favoritesUpdated")
            );
        }
        else {
            const updatedFavorites = [
                ...storedFavorites,
                song,
            ];

            localStorage.setItem(
                "favorites",
                JSON.stringify(updatedFavorites)
            );

            setIsFavorite(true);

            window.dispatchEvent(
                new Event("favoritesUpdated")
            );
        }
    };

    return (
        <div className="song-card">
            <div className="song-image-wrapper">
                <img
                    src={song.cover}
                    alt={`${song.title} cover`}
                />

                <button
                    className="song-play place-items-center"
                    onClick={handlePlay}
                    aria-label={
                        isCurrent && isPlaying
                            ? `Pause ${song.title}`
                            : `Play ${song.title}`
                    }
                >
                    {isCurrent && isPlaying ? (
                        <FaPause />
                    ) : (
                        <FaPlay />
                    )}
                </button>
            </div>

            <div className="song-info">
                <h3>{song.title}</h3>
                <p>{song.artist}</p>
            </div>

            <button
                className={`favorite-button ${isFavorite ? "active" : ""
                    }`}
                onClick={toggleFavorite}
                aria-label={
                    isFavorite
                        ? `Remove ${song.title} from favorites`
                        : `Add ${song.title} to favorites`
                }
            >
                <FaHeart />
            </button>
        </div>
    );
};

export default SongCard;