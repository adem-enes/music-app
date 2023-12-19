import { MouseEventHandler, RefObject, useCallback, useEffect, useRef, useState } from 'react'
import styles from "./AudioPlayer.module.css";
import { Song } from '../..';
import {
  Pause, Play, RewindBackward, RewindForward,
  SkipNext, SkipPrev, VolumeHigh, VolumeLow, VolumeOff
} from '../../assets';
import { Input } from '../../my-ui-lib/components';

type ControlsProps = {
  audioRef: RefObject<HTMLAudioElement>,
  progressBarRef: RefObject<HTMLInputElement>
  setTimeProgress: Function,
  duration: number,
  tracks: Array<Song>,
  trackIndex: number,
  setTrackIndex: Function,
  setCurrentTrack: Function,
  handleNext: MouseEventHandler<HTMLButtonElement>
}

const Controls = ({ audioRef, duration, progressBarRef, setTimeProgress,
  tracks, trackIndex, setTrackIndex, setCurrentTrack, handleNext }: ControlsProps) => {
  const playAnimationRef = useRef(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState<number>(60);
  const [muteVolume, setMuteVolume] = useState(false);

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

    if (audioRef) {
      audioRef!.current!.volume = volume / 100;
      audioRef!.current!.muted = muteVolume;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying, audioRef, volume, muteVolume]);

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
    if (trackIndex === 0) {
      let lastTrackIndex = tracks.length - 1;
      setTrackIndex(lastTrackIndex);
      setCurrentTrack(tracks[lastTrackIndex]);
    } else {
      setTrackIndex((prev: number) => prev - 1);
      setCurrentTrack(tracks[trackIndex - 1]);
    }
  };

  return (
    <div className={styles["controls-wrapper"]}>
      <div className={styles["controls"]}>
        <button onClick={handlePrevious}><SkipPrev /></button>
        <button onClick={skipBackward}><RewindBackward /></button>
        <button className={styles['btn']} onClick={togglePlayPause}>
          {isPlaying ? <Pause /> : <Play />}
        </button>
        <button onClick={skipForward}><RewindForward /></button>
        <button onClick={handleNext}><SkipNext /></button>
      </div>
      <div className={styles["volume"]}>
        <button className={styles['btn']} onClick={() => setMuteVolume((prev) => !prev)}>
          {muteVolume || volume < 5 ? (
            <VolumeOff />
          ) : volume < 40 ? (
            < VolumeLow />
          ) : (
            <VolumeHigh />
          )}
        </button>
        <Input type="range" min={0} max={100} value={volume} variant='filled'
          onChange={(e) => setVolume(Number(e.target.value))} style={{margin: 0}}  />
        {/* <input type="range" min={0} max={100} value={volume}
          onChange={(e) => setVolume(Number(e.target.value))} /> */}
      </div>
    </div>)
}

export default Controls