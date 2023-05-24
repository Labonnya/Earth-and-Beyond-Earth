import './App.css';
import { Routes, Route } from 'react-router-dom'
import Worldmap from './Components/WorldMap/Worldmap';
import Navigation from './Components/Navbar/Navbar';
import UnionMap from './Components/UnionMap/UnionMap';
import QuizCategory from './Components/Quiz/QuizCategory';
import Quiz from './Components/Quiz/Quiz';
import QuizMode from './Components/Quiz/QuizMode';
import Game from './Components/Game/Game';
import LoginForm from './Components/Auth/Login';
import Register from './Components/Auth/Register';
import Chat from './Components/Chat/Chat';
import ChatsPage from './Components/Chat/chatsPage';
import Download from './Components/DownloadInfo/Download';
import SpaceScene from './Components/Space/Space';
import SpaceMenu from './Components/SpaceMenu/SpaceMenu';

function App() {
  return (
    <div className="App">
    <Routes>
      <Route path="/" element={
        <Navigation />
        } />
      <Route path="/map" element={<Worldmap />} />
      <Route path="/union" element={<UnionMap />} />
      <Route path="/quizMode" element={<QuizMode />} />
      <Route path="/quiz" element={<Quiz />} />
      <Route path="/quizCategory" element={<QuizCategory />} />
      <Route path="/game" element={<Game />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<Register />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/chatsPage" element={<ChatsPage />} />
      <Route path="/download" element={<Download />} />
      <Route path="/space" element={<SpaceScene />} />
      <Route path="/space-menu" element={<SpaceMenu />} />
    </Routes>
    </div>
  );
}

export default App;
