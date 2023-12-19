import { ReactEventHandler, RefObject } from 'react'
import { Song } from '../..';
import styles from "./MusicPlayer.module.css";
import { MusicNote } from '../../assets';

type DisplaySongProps = {
    currentSong: Song,
    audioRef: RefObject<HTMLAudioElement> | undefined,
    setDuration: Function,
    progressBarRef: RefObject<HTMLInputElement>,
    handleNext: ReactEventHandler<HTMLAudioElement>
}

const DisplaySong = ({ currentSong, audioRef, setDuration, progressBarRef, handleNext }: DisplaySongProps) => {
    const onLoadedMetadata = () => {
        const seconds = audioRef!.current!.duration;
        setDuration(seconds);
        progressBarRef!.current!.max = seconds.toString();

    };

    return (
        <div className={styles["audio-cover"]}>
            <audio src={currentSong.audio} ref={audioRef}
                onLoadedMetadata={onLoadedMetadata} onEnded={handleNext} />
            <div className={styles["audio-image"]} >
                {currentSong.cover ? (
                    <img src={currentSong.cover} alt="audio avatar" />
                ) : (
                    <div className={styles["icon-wrapper"]}>
                        <span className={styles["audio-icon"]}>
                            <MusicNote width={130} height={130} />
                        </span>
                    </div>
                )}
            </div>
        </div>
    )
}

export default DisplaySong
