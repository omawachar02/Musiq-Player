import { createContext, useContext, useEffect, useRef, useState } from "react";

const MusicPlayerContext = createContext();

export const MusicPlayerProvider = ({ children }) => {
  const audioRef = useRef(new Audio());

  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState("off");

  const [playlist, setPlaylist] = useState([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(-1);

  useEffect(() => {
    const audio = audioRef.current;

    const updateTime = () => {
      setCurrentTime(audio.currentTime);
    };

    const updateDuration = () => {
      setDuration(audio.duration || 0);
    };

    const handleEnded = () => {
      if (repeatMode === "one") {
        audio.currentTime = 0;
        audio.play();
      } else {
        nextSong();
      }
    };

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [repeatMode, playlist, currentSongIndex, isShuffle]);

  const playSong = (song, songs = playlist) => {
    const audio = audioRef.current;

    const newPlaylist = songs.length ? songs : [song];

    setPlaylist(newPlaylist);

    const index = newPlaylist.findIndex((item) => item.id === song.id);

    setCurrentSongIndex(index === -1 ? 0 : index);
    setCurrentSong(song);
    setCurrentTime(0);

    audio.src = song.audio;
    audio.volume = isMuted ? 0 : volume;

    audio
      .play()
      .then(() => {
        setIsPlaying(true);
      })
      .catch(() => {
        setIsPlaying(false);
      });

    saveRecentlyPlayed(song);
  };

  const pauseSong = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (!currentSong) return;

    if (isPlaying) {
      pauseSong();
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  };

  const nextSong = () => {
    if (!playlist.length) return;

    let nextIndex;

    if (isShuffle) {
      if (playlist.length === 1) {
        nextIndex = 0;
      } else {
        do {
          nextIndex = Math.floor(
            Math.random() * playlist.length
          );
        } while (nextIndex === currentSongIndex);
      }
    }
    else {
      nextIndex = currentSongIndex + 1;

      if (nextIndex >= playlist.length) {
        if (repeatMode === "all") {
          nextIndex = 0;
        } else {
          setIsPlaying(false);
          return;
        }
      }
    }

    const song = playlist[nextIndex];

    setCurrentSongIndex(nextIndex);
    setCurrentSong(song);
    setCurrentTime(0);

    audioRef.current.src = song.audio;
    audioRef.current.play();
    setIsPlaying(true);

    saveRecentlyPlayed(song);
  };

  const previousSong = () => {
    if (!playlist.length) return;

    let previousIndex = currentSongIndex - 1;

    if (previousIndex < 0) {
      previousIndex = playlist.length - 1;
    }

    const song = playlist[previousIndex];

    setCurrentSongIndex(previousIndex);
    setCurrentSong(song);
    setCurrentTime(0);

    audioRef.current.src = song.audio;
    audioRef.current.play();
    setIsPlaying(true);
  };

  const seek = (value) => {
    audioRef.current.currentTime = value;
    setCurrentTime(value);
  };

  const setVolume = (value) => {
    const newVolume = Number(value);

    setVolumeState(newVolume);
    audioRef.current.volume = newVolume;

    if (newVolume > 0) {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    const newMuted = !isMuted;

    setIsMuted(newMuted);
    audioRef.current.volume = newMuted ? 0 : volume;
  };

  const toggleShuffle = () => {
    setIsShuffle((previous) => !previous);
  };

  const toggleRepeat = () => {
    setRepeatMode((previous) => {
      if (previous === "off") {
        return "all";
      }

      if (previous === "all") {
        return "one";
      }

      return "off";
    });
  };

  const saveRecentlyPlayed = (song) => {
    const stored = JSON.parse(localStorage.getItem("recentlyPlayed")) || [];

    const filtered = stored.filter((item) => item.id !== song.id);

    const updated = [song, ...filtered].slice(0, 10);

    localStorage.setItem("recentlyPlayed", JSON.stringify(updated));
  };

  return (
    <MusicPlayerContext.Provider
      value={{
        currentSong,
        isPlaying,
        currentTime,
        duration,
        volume,
        isMuted,
        isShuffle,
        repeatMode,
        playlist,
        currentSongIndex,
        playSong,
        pauseSong,
        togglePlay,
        nextSong,
        previousSong,
        seek,
        setVolume,
        toggleMute,
        toggleShuffle,
        toggleRepeat,
      }}
    >
      {children}
    </MusicPlayerContext.Provider>
  );
};

export const useMusicPlayer = () => useContext(MusicPlayerContext);
