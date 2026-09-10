import SongCard from "./SongCard";

const SongList = ({ songs }) => {
    if (!songs || songs.length === 0) {
        return (
            <div className="empty-state">
                <h2>No Songs Found 🎵</h2>
                <p>There are no songs to display.</p>
            </div>
        );
    }

    return (
        <div className="song-grid">
            {songs.map((song) => (
                <SongCard
                    key={song.id}
                    song={song}
                    songs={songs}
                />
            ))}
        </div>
    );
};

export default SongList;