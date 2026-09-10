import { useState } from "react";
import { FaSearch } from "react-icons/fa";

import SongCard from "../components/SongCard";
import { songs as localSongs } from "../data/songs";
import { searchAudiusTracks } from "../api/audius";

const Search = () => {
    const [searchTerm, setSearchTerm] =
        useState("");

    const [onlineSongs, setOnlineSongs] =
        useState([]);

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");

    const search = searchTerm.trim().toLowerCase();

    const searchMusic = async (value) => {
        setSearchTerm(value);

        if (!value.trim()) {
            setOnlineSongs([]);
            setError("");
            return;
        }

        setLoading(true);
        setError("");

        const results =
            await searchAudiusTracks(value);

        if (results.length === 0) {
            setError(
                "No online songs found. Try another search."
            );
        }

        setOnlineSongs(results);

        setLoading(false);
    };

    const formattedOnlineSongs =
        onlineSongs
            .filter(
                (track) =>
                    track.isStreamable !== false
            )
            .map((track) => ({
                id: `audius-${track.id}`,

                title:
                    track.title ||
                    "Unknown Song",

                artist:
                    track.user?.name ||
                    "Unknown Artist",

                album:
                    track.albumTitle ||
                    "Audius",

                genre:
                    track.genre ||
                    "Music",

                cover:
                    track.artwork?.["480x480"] ||
                    track.artwork?.["150x150"] ||
                    track.artwork?.["1000x1000"] ||
                    "/default-cover.jpg",

                audio: `https://api.audius.co/v1/tracks/${track.id}/stream`,

                source: "audius",

                originalId: track.id,
            }));

    const localResults = localSongs.filter(
        (song) => {
            if (!search) {
                return false;
            }

            return (
                song.title
                    .toLowerCase()
                    .includes(search) ||
                song.artist
                    .toLowerCase()
                    .includes(search) ||
                song.album
                    .toLowerCase()
                    .includes(search) ||
                song.genre
                    .toLowerCase()
                    .includes(search)
            );
        }
    );

    const allResults = [
        ...localResults,
        ...formattedOnlineSongs,
    ];

    return (
        <div className="search-page">

            <h1>Search</h1>

            <p>
                Find songs from your library
                and online music.
            </p>

            <br />

            <div className="search-box">

                <input
                    type="text"
                    placeholder="Search songs, artists, albums..."
                    className="focus:ring-purple-500 rounded-lg px-4 pr-12"
                    value={searchTerm}
                    onChange={(e) =>
                        searchMusic(e.target.value)
                    }
                />

                <span className="search-icon">
                    <FaSearch />
                </span>

            </div>

            <br /> <br />
            {!search && (
                <div className="empty-state">

                    <h2>
                        What do you want to
                        listen to? 🎧
                    </h2>

                    <p>
                        Search for a song,
                        artist, album or genre.
                    </p>

                </div>
            )}

            {loading && (
                <div className="empty-state">

                    <h2>
                        Searching Audius... 🔎
                    </h2>

                    <p>
                        Finding online music
                        for you.
                    </p>

                </div>
            )}

            {search &&
                !loading &&
                allResults.length > 0 && (
                    <section>

                        <h2>
                            {allResults.length}{" "}
                            results
                        </h2>

                    <div className="song-grid overflow-hidden">

                            {allResults.map(
                                (song) => (
                                    <SongCard
                                        key={
                                            song.id
                                        }
                                        song={
                                            song
                                        }
                                        songs={
                                            allResults
                                        }
                                    />
                                )
                            )}

                        </div>

                    </section>
                )}

            {search &&
                !loading &&
                allResults.length === 0 && (
                    <div className="empty-state">

                        <h2>
                            {error ||
                                "No results found 🎵"}
                        </h2>

                        <p>
                            Try searching for
                            another song or artist.
                        </p>

                    </div>
                )}

        </div>
    );
};

export default Search;