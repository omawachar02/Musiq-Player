import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    FaArrowLeft,
    FaPlay,
    FaTrash,
    FaMusic,
} from "react-icons/fa";

import { useMusicPlayer } from "../context/MusicPlayerContext";

const PlaylistDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { playSong } = useMusicPlayer();

    const [playlist, setPlaylist] = useState(null);

    useEffect(() => {
        const stored =
            JSON.parse(
                localStorage.getItem("playlists")
            ) || [];

        const foundPlaylist = stored.find(
            (item) => String(item.id) === String(id)
        );

        setPlaylist(foundPlaylist || null);
    }, [id]);

    const removeSong = (songId) => {
        if (!playlist) {
            return;
        }

        const updatedSongs = playlist.songs.filter(
            (song) => song.id !== songId
        );

        const updatedPlaylist = {
            ...playlist,
            songs: updatedSongs,
        };

        setPlaylist(updatedPlaylist);

        const stored =
            JSON.parse(
                localStorage.getItem("playlists")
            ) || [];

        const updatedPlaylists = stored.map(
            (item) =>
                String(item.id) === String(id)
                    ? updatedPlaylist
                    : item
        );

        localStorage.setItem(
            "playlists",
            JSON.stringify(updatedPlaylists)
        );
    };

    const handlePlaySong = (song) => {
        playSong(song, playlist.songs);
    };

    if (!playlist) {
        return (
            <div className="empty-state">
                <h2>Playlist Not Found</h2>

                <p>
                    This playlist doesn't exist anymore.
                </p>

                <button
                    className="primary-button"
                    onClick={() => navigate("/playlists")}
                >
                    Back to Playlists
                </button>
            </div>
        );
    }

    return (
        <div className="playlist-details-page">
            <button
                className="back-button"
                onClick={() => navigate("/playlists")}
            >
                <FaArrowLeft />
                Back to Playlists
            </button>

            <div className="playlist-details-header">
                <div className="playlist-details-icon">
                    {playlist.songs.length > 0 &&
                        playlist.songs[0].cover ? (
                        <img
                            src={playlist.songs[0].cover}
                            alt={playlist.name}
                        />
                    ) : (
                        <FaMusic />
                    )}
                </div>

                <div>
                    <p>PLAYLIST</p>

                    <h1>{playlist.name}</h1>

                    <span>
                        {playlist.songs.length}{" "}
                        {playlist.songs.length === 1
                            ? "song"
                            : "songs"}
                    </span>
                </div>
            </div>

            {playlist.songs.length > 0 ? (
                <div className="playlist-song-list">
                    {playlist.songs.map((song, index) => (
                        <div
                            className="playlist-song"
                            key={song.id}
                        >
                            <span className="song-number">
                                {index + 1}
                            </span>

                            <img
                                src={song.cover}
                                alt={song.title}
                            />

                            <div className="playlist-song-info">
                                <h3>{song.title}</h3>
                                <p>{song.artist}</p>
                            </div>

                            <button
                                className="play-song-button"
                                onClick={() =>
                                    handlePlaySong(song)
                                }
                                aria-label={`Play ${song.title}`}
                            >
                                <FaPlay />
                            </button>

                            <button
                                className="remove-song-button"
                                onClick={() =>
                                    removeSong(song.id)
                                }
                                aria-label={`Remove ${song.title}`}
                            >
                                <FaTrash />
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="empty-state">
                    <h2>This playlist is empty 🎵</h2>

                    <p>
                        Go back to Playlists and add some
                        songs.
                    </p>
                </div>
            )}
        </div>
    );
};

export default PlaylistDetails;