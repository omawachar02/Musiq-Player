import { Link } from "react-router-dom";
import { FaPlay, FaMusic, FaTrash } from "react-icons/fa";
import { useMusicPlayer } from "../context/MusicPlayerContext";

const PlaylistCard = ({ playlist, onDelete }) => {
    const { playSong } = useMusicPlayer();

    const playlistSongs = playlist.songs || [];

    const handlePlay = (e) => {
        e.preventDefault();

        if (playlistSongs.length > 0) {
            playSong(
                playlistSongs[0],
                playlistSongs
            );
        }
    };

    const handleDelete = (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (onDelete) {
            onDelete(playlist.id);
        }
    };

    return (
        <Link
            to={`/playlists/${playlist.id}`}
            className="playlist-card"
        >
            <div className="playlist-image-wrapper">
                {playlistSongs.length > 0 &&
                playlistSongs[0].cover ? (
                    <img
                        src={playlistSongs[0].cover}
                        alt={`${ playlist.name } playlist`}
                    />
                ) : (
                    <div className="playlist-placeholder">
                        <FaMusic />
                    </div>
                )}

                <button
                    className="playlist-play-button"
                    onClick={handlePlay}
                    aria-label={`Play ${ playlist.name } `}
                    disabled={playlistSongs.length === 0}
                >
                    <FaPlay />
                </button>
            </div>

            <div className="playlist-info">
                <h3>{playlist.name}</h3>

                <p>
                    {playlistSongs.length}{" "}
                    {playlistSongs.length === 1
                        ? "song"
                        : "songs"}
                </p>
            </div>

            {onDelete && (
                <button
                    className="playlist-delete-button"
                    onClick={handleDelete}
                    aria-label={`Delete ${ playlist.name } `}
                >
                    <FaTrash />
                </button>
            )}
        </Link>
    );
};

export default PlaylistCard;
