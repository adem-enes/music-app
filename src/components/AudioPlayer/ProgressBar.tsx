import { RefObject } from 'react';
import styles from "./AudioPlayer.module.css";
import progressBarStyles from "./ProgressBar.module.css";

type ProgressBarProps = {
  progressBarRef: RefObject<HTMLInputElement> | undefined,
  audioRef: RefObject<HTMLAudioElement>,
  timeProgress: number,
  duration: number

}

const ProgressBar = ({ progressBarRef, audioRef, timeProgress, duration }: ProgressBarProps) => {

  const handleProgressChange = () => {
    audioRef!.current!.currentTime = Number(progressBarRef?.current?.value);
  };

  const formatTime = (time: number) => {
    if (time && !isNaN(time)) {
      const minutes = Math.floor(time / 60);
      const formatMinutes =
        minutes < 10 ? `0${minutes}` : `${minutes}`;
      const seconds = Math.floor(time % 60);
      const formatSeconds =
        seconds < 10 ? `0${seconds}` : `${seconds}`;
      return `${formatMinutes}:${formatSeconds}`;
    }
    return '00:00';
  };

  return (
    <div className={`${styles["progress"]} ${progressBarStyles["progress"]}`}>
      <span className={`${styles["time"]} ${styles["current"]}`}>{formatTime(timeProgress)}</span>
      <input type="range" ref={progressBarRef} defaultValue={0} onChange={handleProgressChange} />
      <span className={styles["time"]}>{formatTime(duration)}</span>
    </div>)
}

export default ProgressBar