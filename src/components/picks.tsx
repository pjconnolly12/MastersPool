import React, {useState, useEffect } from 'react';
import axios from 'axios';
import {ITeam} from './../tools/interfaces';



export const Picks = (): JSX.Element => {

  const [teams, setTeams] = useState<ITeam[]>([])
  const [searchValue, updateSearchValue] = useState<string>("")

  useEffect(() =>  {
    axios
      .get<ITeam[]>("http://localhost:5000/entries", {
        headers: {
          "Content-Type": "application/json"
        },
      })
      .then(response => {
        setTeams(response.data);
        console.log(response.data)
      })
      .catch(ex => {
        const error =
        ex.response.status === 404
          ? "Resource not found"
          : "An unexpected error has occurred";
          console.log(error)
      });
  }, [])

  const teamData = teams.map(team => {
    return (
      <tr className={team.paid ? "border-b-2 border-primary" : "border-b-2 border-primary text-red-400"} key={team.teamname}>
        <td className="whitespace-nowrap">{team.teamname}</td>
        <td className="whitespace-nowrap">{team.fullname}</td>
        <td className="whitespace-nowrap">{team.golfer1}</td>
        <td className="text-center whitespace-nowrap">{team.golfer1score}</td>
        <td className="text-center whitespace-nowrap">{team.golfer1bonus}</td>
        <td className="whitespace-nowrap">{team.golfer2}</td>
        <td className="text-center whitespace-nowrap">{team.golfer2score}</td>
        <td className="text-center whitespace-nowrap">{team.golfer2bonus}</td>
        <td className="whitespace-nowrap">{team.golfer3}</td>
        <td className="text-center whitespace-nowrap">{team.golfer3score}</td>
        <td className="text-center whitespace-nowrap">{team.golfer3bonus}</td>
        <td className="whitespace-nowrap">{team.golfer4}</td>
        <td className="text-center whitespace-nowrap">{team.golfer4score}</td>
        <td className="text-center whitespace-nowrap">{team.golfer4bonus}</td>
        <td className="whitespace-nowrap">{team.golfer5}</td>
        <td className="text-center whitespace-nowrap">{team.golfer5score}</td>
        <td className="text-center whitespace-nowrap">{team.golfer5bonus}</td>
        <td className="text-center whitespace-nowrap">{team.tiebreaker}</td>
      </tr>
    )
  }) 

  const search = (value: string) => {
    if (searchValue.length > 0) {
      axios
      .get<ITeam[]>(`http://localhost:5000/entries/search/${value}`, {
        headers: {
          "Content-Type": "application/json"
        },
      })
      .then(response => {
        setTeams(response.data);
        console.log(response.data)
      })
      .catch(ex => {
        const error =
        ex.response.status === 404
          ? "Resource not found"
          : "An unexpected error has occurred";
          console.log(error)
      });
    } else {
      axios
      .get<ITeam[]>("http://localhost:5000/entries", {
        headers: {
          "Content-Type": "application/json"
        },
      })
      .then(response => {
        setTeams(response.data);
        console.log(response.data)
      })
      .catch(ex => {
        const error =
        ex.response.status === 404
          ? "Resource not found"
          : "An unexpected error has occurred";
          console.log(error)
      });
    }
  }

  const clear = () => {
    
    updateSearchValue("")
    axios
    .get<ITeam[]>("http://localhost:5000/entries", {
      headers: {
        "Content-Type": "application/json"
      },
    })
    .then(response => {
      setTeams(response.data);
      console.log(response.data)
    })
    .catch(ex => {
      const error =
      ex.response.status === 404
        ? "Resource not found"
        : "An unexpected error has occurred";
        console.log(error)
    });
  }

  return (
    <div className="flex flex-col m-4 overflow-auto">
      <div className="self-center mb-4">
        <input
          className="border-solid border-primary border-2 rounded mr-2 p-1"
          type="text"
          id="picks-search"
          placeholder="Search"
          name="s"
          onChange={(e) => updateSearchValue(e.target.value)}
          value={searchValue}
        />
        <button className="bg-secondary hover:bg-yellow-500 text-primary font-bold py-2 px-2 rounded mr-2 w-16" onClick={() => {search(searchValue)}}>Search</button>
        <button className="bg-secondary hover:bg-yellow-500 text-primary font-bold py-2 px-2 rounded w-16" onClick={() => {clear()}}>Clear</button>        
      </div>
      <table className="w-full text-xs md:text-base">
        <tbody>
        <tr className="border-b-4 border-primary">
          <th>Team Name</th>
          <th>User</th>
          <th>Golfer1</th>
          <th>Score</th>
          <th>Bonus</th>
          <th>Golfer2</th>
          <th>Score</th>
          <th>Bonus</th>
          <th>Golfer3</th>
          <th>Score</th>
          <th>Bonus</th>
          <th>Golfer4</th>
          <th>Score</th>
          <th>Bonus</th>
          <th>Golfer5</th>
          <th>Score</th>
          <th>Bonus</th>
          <th>Tiebreaker</th>
        </tr>
        {teamData}
        </tbody>
      </table>
    </div>
  );
}