import { useMusicPlayer } from "../context/MusicPlayerContext";
import {
    FaPlay,
    FaPause,
    FaBackwardStep,
    FaForwardStep,
} from "react-icons/fa6";

const NowPlaying = () => {
    const {
        currentSong,
        isPlaying,
        currentTime,
        duration,
        togglePlay,
        nextSong,
        previousSong,
        seek,
    } = useMusicPlayer();

    const formatTime = (time) => {
        if (!time || Number.isNaN(time)) {
            return "0:00";
        }

        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);

        return `${minutes}:${seconds
            .toString()
            .padStart(2, "0")}`;
    };

    if (!currentSong) {
        return (
            <div className="empty-state">
                <h2>Nothing Playing 🎵</h2>
                <p>Select a song to start listening.</p>
            </div>
        );
    }

    return (
        <div className="now-playing-page">
            <div className="now-playing-card">

                <img
                    src={currentSong.cover}
                    alt={currentSong.title}
                    className="now-playing-cover"
                />

                <div className="now-playing-info">
                    <p>NOW PLAYING</p>

                    <h1>{currentSong.title}</h1>

                    <h3>{currentSong.artist}</h3>

                    <p>{currentSong.album}</p>
                </div>

                <div className="now-playing-progress">

                    <div className="progress-time">
                        <span>
                            {formatTime(currentTime)}
                        </span>

                        <span>
                            {formatTime(duration)}
                        </span>
                    </div>

                    <input
                        type="range"
                        min="0"
                        max={duration || 0}
                        value={currentTime}
                        onChange={(e) =>
                            seek(Number(e.target.value))
                        }
                    />
                </div>

                <div className="now-playing-controls">

                    <button
                        onClick={previousSong}
                        aria-label="Previous song"
                    >
                        <FaBackwardStep />
                    </button>

                    <button
                        className="main-play"
                        onClick={togglePlay}
                        aria-label={
                            isPlaying ? "Pause" : "Play"
                        }
                    >
                        {isPlaying ? (
                            <FaPause />
                        ) : (
                            <FaPlay />
                        )}
                    </button>

                    <button
                        onClick={nextSong}
                        aria-label="Next song"
                    >
                        <FaForwardStep />
                    </button>

                </div>
            </div>
        </div>
    );
};

export default NowPlaying;
