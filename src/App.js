import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
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
import SpaceScene from './Components/Space/Space';
import { AuthContext } from './Hooks/AuthContext';
import ForgetPassCodeSend from './Components/Auth/ForgetPassCodeSend';
import ResetPassword from './Components/Auth/ResetPassword';
import Climate from './Components/Climate/Climate';
import Sports from './Components/Sports/Sports';
import Travel from './Components/Travel/Travel';
import Space from './Components/Space/Space';
import SpaceConcept from './Components/SpaceConcept.js/SpaceConcept';
import SpaceMenu from './Components/SpaceMenu/SpaceMenu';
import SpaceMIssion from './Components/SpaceMission/SpaceMIssion';
import SpaceTravel from './Components/SpaceTravel/SpaceTravel';
import LeaderboardQuiz from './Components/Leaderboard/LeaderboardQuiz';
import GameMode from './Components/Game/GameMode';
import LeaderboardGame from './Components/Leaderboard/LeaderboardGame';
import Ocean from './Components/Ocean/Ocean';


function App() {

  const [token, setToken] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const authContext = useContext(AuthContext);

  // console.log(props.user.email)
  // console.log(props.user.secret)

  useEffect(() => {
    if (authContext.token) {
      console.log(authContext.email);
      setToken(authContext.token);
      setEmail(authContext.email);
      setPassword(authContext.password);
    }
  }, []);

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
      <Route path="/addMCQ" element={ <AddingMCQ> <AddMCQ /> </AddingMCQ> } />
      <Route path="/deleteMCQ" element={<DeletingMCQ> <DeleteMCQ /> </DeletingMCQ>} />
      <Route path="/updateMCQ" element={ <UpdatingMCQ> <UpdateMCQ /> </UpdatingMCQ>} />
      <Route path="/gamePage" element={<GamePage />} />
      <Route path="/game" element={<Game />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<Register />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/chatsPage" element={<ChatsPage />} />
      <Route path="/download" element={<Download />} />
      <Route path="/forgetPassCodeSend" element={<ForgetPassCodeSend />} />
      <Route path="/resetPassword" element={<ResetPassword />} />
      <Route path="*" element={<div><p className="text-light">Page Not Found!</p></div>} />
      <Route path="/space" element={<Space/>} />
      <Route path="/travel" element={<Travel/>} />
      <Route path="/climate" element={<Climate/>} />
      <Route path="/sports" element={<Sports/>} />
      <Route path="/union" element={<UnionMap/>} />
      <Route path="/SpaceConcept" element={<SpaceConcept/>} />
      <Route path="/spaceMenu" element={<SpaceMenu/>} />
      <Route path="/spaceMission" element={<SpaceMIssion/>} />
      <Route path="/spaceTravel" element={<SpaceTravel/>} />
      <Route path="/leaderboard-quiz" element={<LeaderboardQuiz/>} />
      <Route path="/gameMode" element={<GameMode/>} />
      <Route path="/gamepage" element={<GamePage/>} />
      <Route path="/leaderboard-game" element={<LeaderboardGame/>} />
      <Route path="/ocean" element={<Ocean />} />

    </Routes>
    </div>
  );
  
  //Role Management
  function AddingMCQ({children}){
    console.log(authContext.email);
    if(authContext.email === "a@a.com")

    if(authContext.email=== "a@a.com")
    {
      return <>{children}</>;
    } 
    else
    {
      return <div className="text-light">You do not have access to this page</div>;
    }
  }

  function DeletingMCQ({children}){

    if(authContext.email === "a@a.com")

    if(authContext.email=== "a@a.com")

    {
      return <>{children}</>;
    }
    else
    {
      return <div className="text-light">You do not have access to this page</div>;
    }
  }

  function UpdatingMCQ({children}){

    if( authContext.email === "a@a.com")

    if(authContext.email=== "a@a.com")

    {
      return <>{children}</>;
    }
    else
    {
      return <div className="text-light">You do not have access to this page</div>;
    }
  }

}

export default App;
