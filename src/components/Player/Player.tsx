//https://dev.to/themodernweb/how-to-create-music-player-with-pure-html-css-js-c1j
import { useEffect, useRef } from 'react';
import styles from './Player.module.css'
import pre from '../../assets/images/pre.png';
import nxt from '../../assets/images/nxt.png';
import { Song } from '../..';

interface PlayerProps {
  songs: Array<Song>
}

const Player = ({ songs }: PlayerProps) => {
  let currentMusic: number = 0;

  const audioRef = useRef<HTMLAudioElement>(null);
  // const audioRef: HTMLAudioElement | null = document.querySelector('#audio');
  const seekBarRef = useRef<HTMLInputElement>(null);
  const songNameRef = useRef<HTMLHeadingElement>(null);
  const artistNameRef = useRef<HTMLParagraphElement>(null);
  const diskRef = useRef<HTMLDivElement>(null);

  const currentTimeRef = useRef<HTMLSpanElement>(null);
  const songDurationRef = useRef<HTMLSpanElement>(null);

  const playBtnRef = useRef<HTMLButtonElement>(null);
  const forwardBtnRef = useRef<HTMLButtonElement>(null);
  const backwardBtnRef = useRef<HTMLButtonElement>(null);
  // const [seekbar, setSeekbar] = useState<number>(0);

  const setMusic = (i: number) => {
    // setSeekbar(0); // set range slide value to 0;
    seekBarRef!.current!.value = '0';
    const song = songs[i];
    currentMusic = i;

    audioRef!.current!.src = song.audio;

    songNameRef!.current!.innerHTML = song.name;
    artistNameRef!.current!.innerHTML = song.artist ?? "";
    diskRef!.current!.style.backgroundImage = `url('${song.cover}')`;

    currentTimeRef!.current!.innerHTML = '00 : 00';
    setTimeout(() => {
      seekBarRef!.current!.max = audioRef!.current!.duration.toString();
      songDurationRef!.current!.innerHTML = formatTime(audioRef!.current!.duration);
    }, 300);
  }

  useEffect(() => {
    setMusic(0);

    playBtnRef.current?.addEventListener('click', () => {
      if (playBtnRef!.current!.className.includes('pause')) {
        audioRef!.current!.play();
      } else {
        audioRef!.current!.pause();
      }
      playBtnRef!.current!.classList.toggle('pause');
      diskRef!.current!.classList.toggle('play');
    });

    seekBarRef.current?.addEventListener('change', () => {
      console.log(audioRef!.current!.currentTime, seekBarRef.current?.value);

      audioRef!.current!.currentTime = Number(seekBarRef.current?.value);
    })

    // forward and backward button
    forwardBtnRef.current?.addEventListener('click', () => {
      if (currentMusic >= songs.length - 1) {
        currentMusic = 0;
      } else {
        currentMusic++;
      }
      setMusic(currentMusic);
      playMusic();
    })

    backwardBtnRef.current?.addEventListener('click', () => {
      if (currentMusic <= 0) {
        currentMusic = songs.length - 1;
      } else {
        currentMusic--;
      }
      setMusic(currentMusic);
      playMusic();
    });

    setInterval(() => {
      seekBarRef!.current!.value = audioRef!.current!.currentTime.toString();
      currentTimeRef.current!.innerHTML = formatTime(audioRef.current!.currentTime);

      if (Math.floor(audioRef.current!.currentTime) == Math.floor(Number(seekBarRef.current?.max))) {
        forwardBtnRef.current?.click();
      }
    }, 500);



  }, []);

  const playMusic = () => {
    audioRef.current?.play();
    playBtnRef.current?.classList.remove('pause');
    diskRef.current?.classList.add('play');
  }

  const formatTime = (time: number) => {
    const min = Math.floor(time / 60);
    const minStr = min < 10 ? `0${min}` : min.toString();

    const sec = Math.floor(time % 60);
    const secStr = sec < 10 ? `0${sec}` : sec.toString();

    return `${minStr} : ${secStr}`;
  }

  return (
    <div className={styles['player-container']}>
      <audio src="" id="audio" ref={audioRef}></audio>
      <h1 className={styles['music-name']} ref={songNameRef}>song one</h1>
      <p className={styles['artist-name']} ref={artistNameRef}>artist</p>
      <div className={styles['disk']} ref={diskRef}></div>
      <div className={styles['song-slider']}>
        <input type="range" ref={seekBarRef} className={styles['seek-bar']} />
        <span className={styles["current-time"]} ref={currentTimeRef}>00:00</span>
        <span className={styles["song-duration"]} ref={songDurationRef}>00:00</span>
      </div>

      <div className={styles["controls"]}>
        <button className={`${styles["btn"]} ${styles["backward-btn"]}`} ref={backwardBtnRef}><img src={pre} alt="" /></button>
        <button className={`${styles["play-btn"]} ${styles["pause"]}`} ref={playBtnRef}>
          <span></span>
          <span></span>
        </button>
        <button className={`${styles["btn"]} ${styles["forward-btn"]}`} ref={forwardBtnRef}><img src={nxt} alt="" /></button>
      </div>

    </div>
  )
}

export default Player;