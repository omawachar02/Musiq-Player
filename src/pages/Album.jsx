import { useParams } from "react-router-dom";
import { albums } from "../data/albums";
import { songs } from "../data/songs";
import SongCard from "../components/SongCard";

const Album = () => {
    const { id } = useParams();

    const album = albums.find(
        (item) => String(item.id) === String(id)
    );

    if (!album) {
        return (
            <div className="empty-state">
                <h2>Album not found</h2>
                <p>The album you're looking for doesn't exist.</p>
            </div>
        );
    }

    const albumSongs = songs.filter(
        (song) => song.album === album.title
    );

    return (
        <div className="album-page">
            <div className="album-header">
                <img
                    src={album.cover}
                    alt={album.title}
                />

                <div>
                    <p>ALBUM</p>
                    <h1>{album.title}</h1>
                    <h3>{album.artist}</h3>
                    <p>{album.year}</p>
                </div>
            </div>

            <section>
                <h2>Songs</h2>

                {albumSongs.length > 0 ? (
                    <div className="song-grid">
                        {albumSongs.map((song) => (
                            <SongCard
                                key={song.id}
                                song={song}
                                songs={albumSongs}
                            />
                        ))}
                    </div>
                ) : (
                    <p>No songs available for this album.</p>
                )}
            </section>
        </div>
    );
};

export default Album;