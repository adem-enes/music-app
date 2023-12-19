import { ReactEventHandler, RefObject } from 'react'
import { Song } from '../..';
import styles from "./AudioPlayer.module.css";
import { MusicNote } from '../../assets';

type DisplayTrackProps = {
  currentTrack: Song,
  audioRef: RefObject<HTMLAudioElement> | undefined,
  setDuration: Function,
  progressBarRef: RefObject<HTMLInputElement>,
  handleNext: ReactEventHandler<HTMLAudioElement>
}

const DisplayTrack = ({ currentTrack, audioRef, setDuration, progressBarRef, handleNext }: DisplayTrackProps) => {
  const onLoadedMetadata = () => {
    const seconds = audioRef!.current!.duration;
    setDuration(seconds);
    progressBarRef!.current!.max = seconds.toString();

  };

  return (
    <div>
      <audio src={currentTrack.audio} ref={audioRef}
        onLoadedMetadata={onLoadedMetadata} onEnded={handleNext} />

      <div className={styles["audio-info"]}>
        <div className={styles["audio-image"]}>
          {currentTrack.cover ? (
            <img src={currentTrack.cover} alt="audio avatar" />
          ) : (
            <div className={styles["icon-wrapper"]}>
              <span className={styles["audio-icon"]}>
                <MusicNote width={40} height={40} />
              </span>
            </div>
          )}
        </div>
        <div className={styles["text"]}>
          <p className={styles["title"]}>{currentTrack.name}</p>
          <p>{currentTrack.artist}</p>
        </div>
      </div>
    </div>
  )
}

export default DisplayTrack
