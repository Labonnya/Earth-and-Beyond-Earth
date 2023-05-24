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
import QuizPage from './Components/Quiz/QuizPage';
import UserLevelSpecificMCQ from './Components/Quiz/UserLevelSpecificMCQ';
import AddMCQ from './Components/Quiz/AddMCQ'
import DeleteMCQ from './Components/Quiz/DeleteMCQ'
import UpdateMCQ from './Components/Quiz/UpdateMCQ'
import GamePage from './Components/Game/GamePage';
import SpaceScene from './Components/Space/Space'
import Climate from './Components/Climate/Climate';
import Sports from './Components/Sports/Sports';
import Travel from './Components/Travel/Travel';
import Space from './Components/Space/Space';
import SpaceConcept from './Components/SpaceConcept.js/SpaceConcept';
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
      <Route path="/quizPage" element={<QuizPage />} />
      <Route path="/userLevelSpecificMCQ" element={<UserLevelSpecificMCQ />} />
      <Route path="/addMCQ" element={<AddMCQ />} />
      <Route path="/deleteMCQ" element={<DeleteMCQ />} />
      <Route path="/updateMCQ" element={<UpdateMCQ />} />
      <Route path="/gamePage" element={<GamePage />} />
      <Route path="/game" element={<Game />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<Register />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/chatsPage" element={<ChatsPage />} />
      <Route path="/download" element={<Download />} />
      <Route path="/space" element={<Space/>} />
      <Route path="/travel" element={<Travel/>} />
      <Route path="/climate" element={<Climate/>} />
      <Route path="/sports" element={<Sports/>} />
      <Route path="/union" element={<UnionMap/>} />
      <Route path="/SpaceConcept" element={<SpaceConcept/>} />
      <Route path="/spaceMenu" element={<SpaceMenu/>} />
    </Routes>
    </div>
  );
}

export default App;
