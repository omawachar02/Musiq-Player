
import { Link } from "react-router-dom";
import { FaPlay } from "react-icons/fa";
import { useMusicPlayer } from "../context/MusicPlayerContext";
import { songs } from "../data/songs";

const ArtistCard = ({ artist }) => {
    const { playSong } = useMusicPlayer();

    const artistSongs = songs.filter(
        (song) => song.artist === artist.name
    );

    const handlePlay = (e) => {
        e.preventDefault();

        if (artistSongs.length > 0) {
            playSong(artistSongs[0], artistSongs);
        }
    };

    return (
        <Link
            to={`/artist/${artist.id}`}
            className="artist-card"
        >
            <div className="artist-image-wrapper">
                <img
                    src={artist.image}
                    alt={artist.name}
                />

                <button
                    className="artist-play-button"
                    onClick={handlePlay}
                    aria-label={`Play ${ artist.name } `}
                >
                    <FaPlay />
                </button>
            </div>

            <div className="artist-info">
                <h3>{artist.name}</h3>

                <p>
                    {artist.followers || "10K"} followers
                </p>
            </div>
        </Link>
    );
};

export default ArtistCard;
