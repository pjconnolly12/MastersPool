import React, {useState} from 'react';
import { NavButton } from './navbar/button';
import { Link } from 'react-router-dom'
import logo from '../images/logo.png'

export const NavBar = (): JSX.Element => {

  const [navbarOpen, setNavbarOpen] = useState<boolean>(false)

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
    <>
      <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 border-b-4 border-secondary">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between md:w-auto md:static md:block md:justify-start">
          <div className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-primary">
            <Link to="/"><img className="w-14" src={logo}/></Link>
          </div>
            <svg className=" h-10 mt-4 cursor-pointer leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block md:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div
            className={
              "md:flex flex-grow items-center" +
              (navbarOpen ? " flex" : " hidden")
            }
            id="example-navbar-danger"
          >
            <ul className="flex flex-col md:flex-row list-none md:ml-auto">
              <li className="nav-item">
                <NavButton {...entry} />
              </li>
              <li className="nav-item">
                <NavButton {...standings} />
              </li>
              <li className="nav-item">
                <NavButton {...picks} />
              </li>
              <li className="nav-item">
                <NavButton {...leaderboard} />
              </li>
              <li className="nav-item">
                <NavButton {...rules} />
              </li>
              <li className="nav-item">
                <NavButton {...chat} />
              </li>
              {/* <li className="nav-item">
                <NavButton {...admin} />
              </li> */}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}