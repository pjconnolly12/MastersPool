import React, { useEffect, useState } from 'react';
import { IStanding, ITeam } from './../tools/interfaces';
import {TeamModal} from './teamModal'
import axios from 'axios'

export const Standings = (): JSX.Element => {


  const [standings, setStandings] = useState<IStanding[]>([])
  const [teamModalVisible, toggleTeamModalVisible] = useState(false)
  const [entryID, updateEntryID] = useState<number>()
  const [teamView, updateTeamView] = useState<ITeam[]>([])

  useEffect(() =>  {
    axios
      .get<IStanding[]>("http://localhost:5000/standings", {
        headers: {
          "Content-Type": "application/json"
        },
      })
      .then(response => {
        setStandings(response.data);
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


  const selectTeam = async (id:number) => {
    toggleTeamModalVisible(true)
    await axios
      .get<ITeam[]>(`http://localhost:5000/entries/${id}`, {
        headers: {
          "Content-Type": "application/json"
        },
      })
      .then(response => {
        updateTeamView(response.data);
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

  const buttonClick = {
    toggleOff: toggleTeamModalVisible,
    toggle: teamModalVisible,
    team: teamView
  }

  const standingsData = standings.map(row => {
    let score;
    if (row.rawtotal > 0) {
      score = "+" + row.rawtotal
    } else if (row.rawtotal == 0) {
      score = "E"
    } else {
      score = row.rawtotal
    }
    let total;
    if (row.total > 0) {
      total = "+" + row.total
    } else if (row.total == 0) {
      total = "E"
    } else {
      total = row.total
    }
    let tie;
    if (parseInt(row.tiebreaker) > 0) {
      tie = "+" + row.tiebreaker
    } else if (parseInt(row.tiebreaker) === 0){
      tie = "E"
    } else {
      tie = row.tiebreaker
    }
    return (
      <>
      <tr key={row.entry_id} className="border-b-2 border-primary" >
        {/* Onclick event to update state - teamModal Visible - pass entry_id to child component */}
        <td className={"cursor-pointer"} onClick={() => {selectTeam(row.entry_id)}}>{row.teamname}</td>
        <td className="text-center lg:text-left">{score}</td>
        <td className="text-center lg:text-left">{row.total - row.rawtotal}</td>
        <td className="text-center lg:text-left">{total}</td>
        <td className="text-center lg:text-left">{tie}</td>
      </tr>
      </>
    )
  }) 

  return (
    <>
    <TeamModal {...buttonClick}/>
    <div className="flex justify-center m-2 md:m-4">
    <table className="w-4/5 text-xs md:text-base md:w-3/4">
      <tbody>
      <tr className="border-b-4 border-primary lg:text-left">
        <th>Team</th>
        <th>Raw Total</th>
        <th>Bonus</th>
        <th>Total</th>
        <th>Tiebreaker</th>
      </tr>
      {standingsData}
      </tbody>
    </table>
  </div>
  </>
  );
}