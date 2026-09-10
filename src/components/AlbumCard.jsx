import { Link } from "react-router-dom";
import { FaPlay } from "react-icons/fa";
import { useMusicPlayer } from "../context/MusicPlayerContext";
import { songs } from "../data/songs";

const AlbumCard = ({ album }) => {
    const { playSong } = useMusicPlayer();
    const albumSongs = songs.filter((song) => song.album === album.title);
    const handlePlay = (e) => {
        e.preventDefault();
        if (albumSongs.length > 0) { playSong(albumSongs[0], albumSongs); }
    };
    return (
        <Link to={`/album/${album.id}`} className="album-card" >
            <div className="album-image-wrapper">
                <img src={album.cover} alt={`${album.title} album cover`} />
                <button className="album-play-button" onClick={handlePlay} aria-label={`Play ${album.title}`} >
                    <FaPlay /> </button>
            </div>
            <div className="album-info">
                <h3>{album.title}</h3> <p>{album.artist}</p> <span> {album.year} • {albumSongs.length} songs </span> </div>
        </Link>);
};
export default AlbumCard;