//https://blog.logrocket.com/building-audio-player-react/
import { useRef, useState } from 'react';
import styles from "./AudioPlayer.module.css";
import DisplayTrack from './DisplayTrack';
import Controls from './Controls';
import ProgressBar from './ProgressBar';
import { Song } from '../..';

type AudioPlayerProps = {
    tracks: Array<Song>
}

const AudioPlayer = ({ tracks }: AudioPlayerProps) => {
    const [trackIndex, setTrackIndex] = useState(0);
    const [currentTrack, setCurrentTrack] = useState<Song>(tracks[trackIndex]);
    const [timeProgress, setTimeProgress] = useState<number>(0);
    const [duration, setDuration] = useState<number>(0);

    const audioRef = useRef<HTMLAudioElement>(null);
    const progressBarRef = useRef<HTMLInputElement>(null);

    const handleNext = () => {
        if (trackIndex >= tracks.length - 1) {
            setTrackIndex(0);
            setCurrentTrack(tracks[0]);
        } else {
            setTrackIndex((prev: number) => prev + 1);
            setCurrentTrack(tracks[trackIndex + 1]);
        }
    };

    return (
        <div className={styles["audio-player"]}>
            <div className={styles["inner"]}>
                <DisplayTrack {...{ currentTrack, audioRef, setDuration, progressBarRef, handleNext }} />
                <Controls {...{
                    audioRef, progressBarRef, duration, setTimeProgress, tracks,
                    trackIndex, setTrackIndex, setCurrentTrack, handleNext
                }} />
                <ProgressBar {...{ progressBarRef, audioRef, timeProgress, duration }} />
            </div>
        </div>
    )
}

export default AudioPlayer;