import { useMusicPlayer } from "../context/MusicPlayerContext";

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

const ProgressBar = () => {
    const {
        currentTime,
        duration,
        seek,
    } = useMusicPlayer();

    return (
        <div className="progress-container">
            <span>{formatTime(currentTime)}</span>

            <input
                type="range"
                min="0"
                max={duration || 0}
                value={currentTime}
                onChange={(e) =>
                    seek(Number(e.target.value))
                }
                aria-label="Song progress"
            />

            <span>{formatTime(duration)}</span>
        </div>
    );
};

export default ProgressBar;