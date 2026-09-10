import { useEffect, useState } from "react";
import { FaPlay, FaMusic } from "react-icons/fa";

import SongList from "../components/SongList";
import PlaylistCard from "../components/PlaylistCard";
import { songs } from "../data/songs";

const Library = () => {
    const [recentlyPlayed, setRecentlyPlayed] =
        useState([]);

    const [playlists, setPlaylists] =
        useState([]);

    useEffect(() => {
        const recent =
            JSON.parse(
                localStorage.getItem("recentlyPlayed")
            ) || [];

        const savedPlaylists =
            JSON.parse(
                localStorage.getItem("playlists")
            ) || [];

        setRecentlyPlayed(recent);
        setPlaylists(savedPlaylists);
    }, []);

    const playAllSongs = () => {
        if (songs.length === 0) return;

        // SongList handles individual songs.
        // This button is kept for the Library UI.
        window.dispatchEvent(
            new CustomEvent("play-library", {
                detail: songs,
            })
        );
    };

    return (
        <div className="library-page">

            {/* HEADER */}
            <section className="library-header">
                <div>
                    <p className="library-label">
                        YOUR COLLECTION
                    </p>

                    <h1>Your Library</h1>

                    <p>
                        Everything you love,
                        all in one place.
                    </p>
                </div>

                <button
                    className="primary-button bg-gray-700 outline rounded-lg w-25 flex gap-2 items-center justify-center hover:bg-transparent hover:transition-colors"
                    onClick={playAllSongs}
                >
                    Play All <span> <FaPlay /></span>
                </button>
            </section>

            {/* STATS */}
            <section className="library-stats">

                <div className="library-stat">
                    <span>🎵</span>
                    <div>
                        <strong>{songs.length}</strong>
                        <p>Available Songs</p>
                    </div>
                </div>

                <div className="library-stat">
                    <span>❤️</span>
                    <div>
                        <strong>
                            {JSON.parse(
                                localStorage.getItem(
                                    "favorites"
                                )
                            )?.length || 0}
                        </strong>
                        <p>Liked Songs</p>
                    </div>
                </div>

                <div className="library-stat">
                    <span>🎧</span>
                    <div>
                        <strong>
                            {recentlyPlayed.length}
                        </strong>
                        <p>Recently Played</p>
                    </div>
                </div>

                <div className="library-stat">
                    <span>📁</span>
                    <div>
                        <strong>
                            {playlists.length}
                        </strong>
                        <p>Playlists</p>
                    </div>
                </div>

            </section>

            {/* RECENTLY PLAYED */}
            {recentlyPlayed.length > 0 && (
                <section className="library-section">

                    <div className="section-heading">
                        <div>
                            <h2>Recently Played</h2>
                            <p>
                                Continue listening to
                                your recent tracks.
                            </p>
                        </div>
                    </div>

                    <SongList
                        songs={recentlyPlayed}
                    />

                </section>
            )}

            {/* PLAYLISTS */}
            <section className="library-section">

                <div className="section-heading">
                    <div>
                        <h2>Your Playlists</h2>
                        <p>
                            Your personal music
                            collections.
                        </p>
                    </div>
                </div>

                {playlists.length > 0 ? (
                    <div className="playlist-grid">

                        {playlists.map((playlist) => (
                            <PlaylistCard
                                key={playlist.id}
                                playlist={playlist}
                            />
                        ))}

                    </div>
                ) : (
                    <div className="library-empty">

                        <FaMusic />

                        <h3>
                            No playlists yet
                        </h3>

                        <p>
                            Create a playlist to
                            organize your favorite
                            music.
                        </p>

                    </div>
                )}

            </section>

            {/* ALL MUSIC */}
            <section className="library-section">

                <div className="section-heading">
                    <div>
                        <h2>All Music</h2>
                        <p>
                            Explore every song in
                            SoundWave.
                        </p>
                    </div>
                </div>

                <SongList songs={songs} />

            </section>

        </div>
    );
};

export default Library;