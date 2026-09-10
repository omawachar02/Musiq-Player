import {
    FaPlay,
    FaPause,
    FaBackwardStep,
    FaForwardStep,
    FaVolumeHigh,
    FaVolumeXmark,
    FaShuffle,
    FaRepeat,
} from "react-icons/fa6";

import { useMusicPlayer } from "../context/MusicPlayerContext";
import ProgressBar from "./ProgressBar";
import VolumeControl from "./VolumeControl";

const formatTime = (time) => {
    if (!time || Number.isNaN(time)) return "0:00";

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${minutes}:${seconds
        .toString()
        .padStart(2, "0")}`;
};

const BottomPlayer = () => {
    const {
        currentSong,
        isPlaying,
        currentTime,
        duration,
        volume,
        isMuted,
        isShuffle,
        repeatMode,
        togglePlay,
        nextSong,
        previousSong,
        seek,
        setVolume,
        toggleMute,
        toggleShuffle,
        toggleRepeat,
    } = useMusicPlayer();

    if (!currentSong) {
        return (
            <div className="bottom-player empty-player">
                <p>Select a song to start listening 🎵</p>
            </div>
        );
    }

    return (
        <div className="bottom-player">
            <div className="player-song">
                <img
                    src={currentSong.cover}
                    alt={currentSong.title}
                />

                <div>
                    <h4>{currentSong.title}</h4>
                    <p>{currentSong.artist}</p>
                </div>
            </div>

            <div className="player-controls">
                <div className="control-buttons">
                    <button
                        className={isShuffle ? "active" : ""}
                        onClick={toggleShuffle}
                        aria-label="Toggle shuffle"
                    >
                        <FaShuffle />
                    </button>

                    <button
                        onClick={previousSong}
                        aria-label="Previous song"
                    >
                        <FaBackwardStep />
                    </button>

                    <button
                        className="main-play"
                        onClick={togglePlay}
                        aria-label={isPlaying ? "Pause" : "Play"}
                    >
                        {isPlaying ? <FaPause /> : <FaPlay />}
                    </button>

                    <button
                        onClick={nextSong}
                        aria-label="Next song"
                    >
                        <FaForwardStep />
                    </button>

                    <button
                        className={`repeat-button ${repeatMode !== "off" ? "active" : ""
                            }`}
                        onClick={toggleRepeat}
                        aria-label={
                            repeatMode === "off"
                                ? "Enable repeat"
                                : repeatMode === "all"
                                    ? "Repeat all"
                                    : "Repeat one"
                        }
                        title={
                            repeatMode === "off"
                                ? "Repeat Off"
                                : repeatMode === "all"
                                    ? "Repeat All"
                                    : "Repeat One"
                        }
                    >
                        <FaRepeat />

                        {repeatMode === "one" && (
                            <span className="repeat-one-badge">1</span>
                        )}
                    </button>
                </div>

                <ProgressBar />
            </div>

            <VolumeControl />
        </div>
    );
};

export default BottomPlayer;