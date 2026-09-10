import {
    FaVolumeHigh,
    FaVolumeXmark,
} from "react-icons/fa6";

import { useMusicPlayer } from "../context/MusicPlayerContext";

const VolumeControl = () => {
    const {
        volume,
        isMuted,
        setVolume,
        toggleMute,
    } = useMusicPlayer();

    return (
        <div className="volume-control">
            <button
                onClick={toggleMute}
                aria-label={isMuted ? "Unmute" : "Mute"}
            >
                {isMuted ? (
                    <FaVolumeXmark />
                ) : (
                    <FaVolumeHigh />
                )}
            </button>

            <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={isMuted ? 0 : volume}
                onChange={(e) =>
                    setVolume(e.target.value)
                }
                aria-label="Volume"
            />
        </div>
    );
};

export default VolumeControl;