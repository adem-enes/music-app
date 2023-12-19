import { useRef, useState } from 'react'
import { Song } from '../..';
import styles from "./MusicPlayer.module.css";
import Controls from './Controls';
import DisplaySong from './DisplaySong';
import ProgressBar from './ProgressBar';

type MusicPlayerProps = {
    songs: Array<Song>
}
const MusicPlayer = ({ songs }: MusicPlayerProps) => {
    const [songIndex, setSongIndex] = useState(0);
    const [currentSong, setCurrentSong] = useState<Song>(songs[songIndex]);
    const [timeProgress, setTimeProgress] = useState<number>(0);
    const [duration, setDuration] = useState<number>(0);
    const [isPlaying, setIsPlaying] = useState(false);

    const audioRef = useRef<HTMLAudioElement>(null);
    const progressBarRef = useRef<HTMLInputElement>(null);

    const handleNext = () => {
        if (songIndex >= songs.length - 1) {
            setSongIndex(0);
            setCurrentSong(songs[0]);
        } else {
            setSongIndex((prev: number) => prev + 1);
            setCurrentSong(songs[songIndex + 1]);
        }
        setIsPlaying(false);
    };

    return (
        <div className={styles["player-container"]}>
            <DisplaySong {...{ currentSong, audioRef, setDuration, progressBarRef, handleNext }} />
            <div className={styles["controller-part"]}>
                <div className={styles["auido-info"]}>
                    <h1 className={styles["music-name"]}>{currentSong.name}</h1>
                    <p className={styles["artist-name"]}>{currentSong.artist}</p>
                </div>
                <ProgressBar {...{ progressBarRef, audioRef, timeProgress, duration }} />
                <Controls {...{
                    audioRef, progressBarRef, duration, setTimeProgress, songs,
                    songIndex, setSongIndex, setCurrentSong, handleNext, isPlaying, setIsPlaying
                }} />
            </div>
        </div>
    )
}

export default MusicPlayer;