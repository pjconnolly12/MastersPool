import React from 'react';
import { NavButton } from './navbar/button';

export const NavBar = (): JSX.Element => {

  const homepage = {
    redirect: "/",
    pageTitle: "Home" 
  }
  const entry = {
    redirect: "/entry",
    pageTitle: "New Entry" 
  }
  const standings = {
    redirect: "/standings",
    pageTitle: "Standings" 
  }
  const picks = {
    redirect: "/teams",
    pageTitle: "Teams" 
  }
  const leaderboard = {
    redirect: "/leaderboard",
    pageTitle: "Masters Leaderboard" 
  }
  const rules = {
    redirect: "/rules",
    pageTitle: "Rules" 
  }
  const chat ={
    redirect: "/chat",
    pageTitle: "Chat"
  }
  const admin = {
    redirect: "/admin",
    pageTitle: "Admin"
  }


  return (
    // #006747 Change navbar to Masters green
    <div className="bg-white">
    <div className="flex justify-start items-start relative flex items-center justify-center h-16 z-10">
      <svg className="h-7 lg:hidden" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
      </svg>
      <div className="lg:relative flex items-center justify-between h-16 w-2/3 m-4 border-b-2 border-secondary">
        <NavButton {...homepage} />
        <NavButton {...entry} />
        <NavButton {...standings} />
        <NavButton {...picks} />
        <NavButton {...leaderboard} />
        <NavButton {...rules} />
        <NavButton {...chat} />
        <NavButton {...admin} />
      </div>
    </div>
  </div>
  );
}