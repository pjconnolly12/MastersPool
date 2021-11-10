import React from 'react';
import './App.css';
import { Homepage } from './components/homepage';
import { NavBar } from './components/navbar';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { Rules } from './components/rules';
import { NewEntry } from './components/newEntry';
import { Leaderboard } from './components/leaderboard';
import { Picks } from './components/picks';
import { Standings } from './components/standings';
// import { ChatComponent } from './components/chatPage';
import { Admin } from './components/admin';


function App() {
  return (
    <Router>
    <div className="flex flex-col h-screen">
    <NavBar />
    <Switch>
      <Route path='/rules'>
        <Rules />
      </Route>
      <Route path='/entry'>
        <NewEntry />
      </Route>
      <Route path='/leaderboard'>
        <Leaderboard />
      </Route>
      <Route path='/teams'>
        <Picks />
      </Route>
      <Route path='/standings'>
        <Standings />
      </Route>
      {/* <Route path='/chat'>
        <ChatComponent />
      </Route> */}
      <Route path='/admin'>
        <Admin />
      </Route>
      <Route path='/'>
        <Homepage />
      </Route>
    </Switch>
    </div>
  </Router>
  );
}

export default App;
