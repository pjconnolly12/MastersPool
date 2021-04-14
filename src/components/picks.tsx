import React, {useState, useEffect } from 'react';
import axios from 'axios';
import {ITeam} from './../tools/interfaces'



export const Picks = (): JSX.Element => {

  const [teams, setTeams] = useState<ITeam[]>([])

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
        <td className="text-center whitespace-nowrap">{team.teamname}</td>
        <td className="text-center whitespace-nowrap">{team.fullname}</td>
        <td className="text-center whitespace-nowrap">{team.golfer1}</td>
        <td className="text-center whitespace-nowrap">{team.golfer2}</td>
        <td className="text-center whitespace-nowrap">{team.golfer3}</td>
        <td className="text-center whitespace-nowrap">{team.golfer4}</td>
        <td className="text-center whitespace-nowrap">{team.golfer5}</td>
      </tr>
    )
  }) 

  return (
    <div className="flex m-4 overflow-auto">
      <table className="w-full text-xs md:text-base">
        <tbody>
        <tr className="border-b-4 border-primary">
          <th>Team Name</th>
          <th>User</th>
          <th>Golfer1</th>
          <th>Golfer2</th>
          <th>Golfer3</th>
          <th>Golfer4</th>
          <th>Golfer5</th>
        </tr>
        {teamData}
        </tbody>
      </table>
    </div>
  );
}