import './App.css';
import { MusicPlayer } from './components';
import songs from './assets/songs.json';


function App() {
  return (
    <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap', width: '100%' }}>
      <MusicPlayer songs={songs} />
    </div>
  )
}

export default App
