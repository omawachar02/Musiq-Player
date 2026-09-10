import { useEffect, useState } from "react";
import { FaPlus, FaCheck } from "react-icons/fa";

import PlaylistCard from "../components/PlaylistCard";
import { songs } from "../data/songs";

const Playlists = () => {
    const [playlists, setPlaylists] = useState([]);
    const [selectedPlaylist, setSelectedPlaylist] =
        useState(null);

    useEffect(() => {
        const stored =
            JSON.parse(
                localStorage.getItem("playlists")
            ) || [];

        setPlaylists(stored);
    }, []);

    const createPlaylist = () => {
        const name = prompt("Enter playlist name:");

        if (!name || !name.trim()) {
            return;
        }

        const newPlaylist = {
            id: Date.now(),
            name: name.trim(),
            songs: [],
        };

        const updated = [...playlists, newPlaylist];

        setPlaylists(updated);

        localStorage.setItem(
            "playlists",
            JSON.stringify(updated)
        );
    };

    const deletePlaylist = (id) => {
        const updated = playlists.filter(
            (playlist) => playlist.id !== id
        );

        setPlaylists(updated);

        localStorage.setItem(
            "playlists",
            JSON.stringify(updated)
        );

        if (selectedPlaylist?.id === id) {
            setSelectedPlaylist(null);
        }
    };

    const openAddSongs = (playlist) => {
        setSelectedPlaylist(playlist);
    };

    const closeAddSongs = () => {
        setSelectedPlaylist(null);
    };

    const addSongToPlaylist = (
        playlistId,
        songId
    ) => {
        const updated = playlists.map((playlist) => {
            if (playlist.id !== playlistId) {
                return playlist;
            }

            const alreadyAdded =
                playlist.songs.some(
                    (song) => song.id === songId
                );

            if (alreadyAdded) {
                return playlist;
            }

            const song = songs.find(
                (item) => item.id === songId
            );

            if (!song) {
                return playlist;
            }

            return {
                ...playlist,
                songs: [
                    ...playlist.songs,
                    song,
                ],
            };
        });

        setPlaylists(updated);

        localStorage.setItem(
            "playlists",
            JSON.stringify(updated)
        );

        const updatedSelectedPlaylist =
            updated.find(
                (playlist) =>
                    playlist.id === playlistId
            );

        setSelectedPlaylist(
            updatedSelectedPlaylist
        );
    };

    return (
        <div className="playlists-page">

            {/* HEADER */}
            <div className="page-header">
                <div>
                    <h1>Playlists</h1>

                    <p>
                        Create and manage your playlists.
                    </p>
                </div>

                <button
                    className="primary-button"
                    onClick={createPlaylist}
                >
                    <FaPlus />
                    Create Playlist
                </button>
            </div>

            {/* PLAYLISTS */}
            {playlists.length > 0 ? (
                <div className="playlist-grid">
                    {playlists.map((playlist) => (
                        <div
                            className="playlist-wrapper"
                            key={playlist.id}
                        >
                            <PlaylistCard
                                playlist={playlist}
                                onDelete={deletePlaylist}
                            />

                            <button
                                className="add-songs-button"
                                onClick={() =>
                                    openAddSongs(
                                        playlist
                                    )
                                }
                            >
                                <FaPlus />
                                Add Songs
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="empty-state">
                    <h2>No Playlists Yet 🎵</h2>

                    <p>
                        Create your first playlist and
                        start adding songs.
                    </p>

                    <button
                        className="primary-button"
                        onClick={createPlaylist}
                    >
                        <FaPlus />
                        Create Playlist
                    </button>
                </div>
            )}

            {/* ADD SONGS PANEL */}
            {selectedPlaylist && (
                <div className="add-songs-panel">

                    <div className="add-songs-header">
                        <div>
                            <h2>
                                Add Songs to{" "}
                                {selectedPlaylist.name}
                            </h2>

                            <p>
                                Select songs to add to
                                this playlist.
                            </p>
                        </div>

                        <button
                            className="close-button"
                            onClick={closeAddSongs}
                        >
                            ×
                        </button>
                    </div>

                    <div className="available-songs">

                        {songs.map((song) => {
                            const alreadyAdded =
                                selectedPlaylist.songs.some(
                                    (item) =>
                                        item.id ===
                                        song.id
                                );

                            return (
                                <div
                                    className="available-song"
                                    key={song.id}
                                >
                                    <img
                                        src={song.cover}
                                        alt={song.title}
                                    />

                                    <div className="available-song-info">
                                        <h3>
                                            {song.title}
                                        </h3>

                                        <p>
                                            {song.artist}
                                        </p>
                                    </div>

                                    <button
                                        className={
                                            alreadyAdded
                                                ? "song-added-button"
                                                : "add-song-button"
                                        }
                                        disabled={
                                            alreadyAdded
                                        }
                                        onClick={() =>
                                            addSongToPlaylist(
                                                selectedPlaylist.id,
                                                song.id
                                            )
                                        }
                                    >
                                        {alreadyAdded ? (
                                            <>
                                                <FaCheck />
                                                Added
                                            </>
                                        ) : (
                                            <>
                                                <FaPlus />
                                                Add
                                            </>
                                        )}
                                    </button>
                                </div>
                            );
                        })}

                    </div>
                </div>
            )}
        </div>
    );
};

export default Playlists;