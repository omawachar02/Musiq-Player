import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";

import SongList from "../components/SongList";

const Favorites = () => {
    const [favorites, setFavorites] = useState([]);

    const loadFavorites = () => {
        const stored =
            JSON.parse(
                localStorage.getItem("favorites")
            ) || [];

        setFavorites(stored);
    };

    useEffect(() => {
        loadFavorites();

        window.addEventListener(
            "favoritesUpdated",
            loadFavorites
        );

        return () => {
            window.removeEventListener(
                "favoritesUpdated",
                loadFavorites
            );
        };
    }, []);

    return (
        <div className="favorites-page">
            <div className="page-header">
                <div>
                    <p className="library-label">
                        YOUR MUSIC
                    </p>

                    <h1>Favorites</h1>

                    <p>
                        Songs you've saved to your
                        favorite collection.
                    </p>
                </div>
            </div>

            {favorites.length > 0 ? (
                <section>
                    <div className="section-heading">
                        <div>
                            <h2>
                                <FaHeart />
                                {" "}Liked Songs
                            </h2>

                            <p>
                                {favorites.length}{" "}
                                {favorites.length === 1
                                    ? "song"
                                    : "songs"}{" "}
                                in your favorites
                            </p>
                        </div>
                    </div>

                    <SongList songs={favorites} />
                </section>
            ) : (
                <div className="empty-state">
                    <FaHeart />

                    <h2>
                        No Favorites Yet ❤️
                    </h2>

                    <p>
                        Tap the heart button on a song
                        to add it to your favorites.
                    </p>
                </div>
            )}
        </div>
    );
};

export default Favorites;