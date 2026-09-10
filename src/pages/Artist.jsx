import { useParams } from "react-router-dom";
import { artists } from "../data/artists";
import { songs } from "../data/songs";
import SongCard from "../components/SongCard";

const Artist = () => {
    const { id } = useParams();

    const artist = artists.find(
        (item) => String(item.id) === String(id)
    );

    if (!artist) {
        return (
            <div className="empty-state">
                <h2>Artist not found</h2>
                <p>The artist you're looking for doesn't exist.</p>
            </div>
        );
    }

    const artistSongs = songs.filter(
        (song) => song.artist === artist.name
    );

    return (
        <div className="artist-page">
            <div className="artist-header">
                <img
                    src={artist.image}
                    alt={artist.name}
                    className="artist-image"
                />

                <div className="artist-info">
                    <p>ARTIST</p>
                    <h1>{artist.name}</h1>

                    <p>
                        {artist.followers || "10K"} followers
                    </p>

                    <button
                        className="primary-button"
                        onClick={() => {
                            if (artistSongs.length > 0) {
                                window.dispatchEvent(
                                    new CustomEvent("playArtist", {
                                        detail: artistSongs,
                                    })
                                );
                            }
                        }}
                    >
                        ▶ Play
                    </button>
                </div>
            </div>

            <section>
                <h2>Popular Songs</h2>

                {artistSongs.length > 0 ? (
                    <div className="song-grid">
                        {artistSongs.map((song) => (
                            <SongCard
                                key={song.id}
                                song={song}
                                songs={artistSongs}
                            />
                        ))}
                    </div>
                ) : (
                    <p>No songs available for this artist.</p>
                )}
            </section>
        </div>
    );
};

export default Artist;