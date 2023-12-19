import { MouseEventHandler, RefObject, useCallback, useEffect, useRef } from 'react'
import styles from "./MusicPlayer.module.css";
import { Song } from '../..';
import {
    Pause, Play, RewindBackward, RewindForward,
    SkipNext, SkipPrev,
    // VolumeHigh, VolumeLow, VolumeOff
} from '../../assets';

type ControlsProps = {
    audioRef: RefObject<HTMLAudioElement>,
    progressBarRef: RefObject<HTMLInputElement>
    setTimeProgress: Function,
    duration: number,
    songs: Array<Song>,
    songIndex: number,
    setSongIndex: Function,
    setCurrentSong: Function,
    handleNext: MouseEventHandler<HTMLButtonElement>,
    isPlaying: boolean,
    setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>
}

const Controls = ({ audioRef, duration, progressBarRef, setTimeProgress,
    songs, songIndex, setSongIndex, setCurrentSong, handleNext, isPlaying, setIsPlaying }: ControlsProps) => {
    const playAnimationRef = useRef(0);
    // const [volume, setVolume] = useState<number>(60);
    // const [muteVolume, setMuteVolume] = useState(false);

    const repeat = useCallback(() => {
        const currentTime = audioRef!.current!.currentTime;
        setTimeProgress(currentTime);
        progressBarRef!.current!.value = currentTime.toString();
        progressBarRef!.current!.style.setProperty(
            '--range-progress',
            `${(Number(progressBarRef!.current!.value) / duration) * 100}%`
        );

        playAnimationRef.current = requestAnimationFrame(repeat);
    }, [audioRef, duration, progressBarRef, setTimeProgress]);

    useEffect(() => {
        if (isPlaying) {
            audioRef.current?.play();
            playAnimationRef!.current = requestAnimationFrame(repeat);
        } else {
            audioRef.current?.pause();
            cancelAnimationFrame(playAnimationRef!.current);
        }

        // if (audioRef) {
        //     audioRef!.current!.volume = volume / 100;
        //     audioRef!.current!.muted = muteVolume;
        // }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isPlaying, audioRef, /*volume, muteVolume*/]);

    const togglePlayPause = () => {
        setIsPlaying((prev) => !prev);
    };

    const skipForward = () => {
        audioRef!.current!.currentTime += 15;
    };

    const skipBackward = () => {
        audioRef!.current!.currentTime -= 15;
    };

    const handlePrevious = () => {
        if (songIndex === 0) {
            let lastSongIndex = songs.length - 1;
            setSongIndex(lastSongIndex);
            setCurrentSong(songs[lastSongIndex]);
        } else {
            setSongIndex((prev: number) => prev - 1);
            setCurrentSong(songs[songIndex - 1]);
        }
        setIsPlaying(false);
    };

    return (
        <div className={styles["controllers-container"]}>
            {/* <div className={`${styles["volume"]} col-12`}>
                <button className={styles['btn']} onClick={() => setMuteVolume((prev) => !prev)}>
                    {muteVolume || volume < 5 ? (
                        <VolumeOff />
                    ) : volume < 40 ? (
                        < VolumeLow />
                    ) : (
                        <VolumeHigh />
                    )}
                </button>
                <input type="range" min={0} max={100} value={volume}
                    onChange={(e) => setVolume(Number(e.target.value))} />
            </div> */}
            <div className={`${styles["controllers"]} col-12`}>
                <button onClick={handlePrevious}><SkipPrev /></button>
                <button onClick={skipBackward}><RewindBackward /></button>
                <button onClick={togglePlayPause}>
                    {isPlaying ? <Pause /> : <Play />}
                </button>
                <button onClick={skipForward}><RewindForward /></button>
                <button onClick={handleNext}><SkipNext /></button>
            </div>

        </div>)
}

export default Controls