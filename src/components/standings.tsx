import React, { useEffect, useState } from 'react';
import { IStanding, ITeam, ITotalScore } from './../tools/interfaces';
import {TeamModal} from './teamModal'
import axios from 'axios'
import { getConfigFileParsingDiagnostics } from 'typescript';

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

    let golfer1 = {
      score: row.golfer1score + row.golfer1bonus,
      bonus: row.golfer1bonus
    }
    let golfer2 = {
      score: row.golfer2score + row.golfer2bonus,
      bonus: row.golfer2bonus
    }
    let golfer3 = {
      score: row.golfer3score + row.golfer3bonus,
      bonus: row.golfer3bonus
    }
    let golfer4 = {
      score: row.golfer4score + row.golfer4bonus,
      bonus: row.golfer4bonus
    }
    let golfer5 = {
      score: row.golfer5score + row.golfer5bonus,
      bonus: row.golfer5bonus
    }

    function compare(a: ITotalScore , b: ITotalScore) {
      const scoreA = a.score
      const scoreB = b.score
    
      let comparison = 0;
      if (scoreA > scoreB) {
        comparison = 1;
      } else if (scoreA < scoreB) {
        comparison = -1;
      }
      return comparison;
    }

    let golfers = [golfer1, golfer2, golfer3, golfer4, golfer5]
    golfers.sort(compare)
    golfers.pop()

    let bonusTotal = golfers.reduce(function(accumulator, currentValue) {
      return accumulator + currentValue.bonus;
    }, 0)

    return (
      <>
      <tr key={row.entry_id} className="border-b-2 border-primary" >
        {/* Onclick event to update state - teamModal Visible - pass entry_id to child component */}
        <td className={"cursor-pointer"} onClick={() => {selectTeam(row.entry_id)}}>{row.teamname}</td>
        <td className="text-center lg:text-left">{score}</td>
        <td className="text-center lg:text-left">{bonusTotal}</td>
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