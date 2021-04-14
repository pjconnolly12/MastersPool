import React, {useState, useEffect} from 'react';
import { ILeaderboard } from '../tools/interfaces';
import axios from 'axios';

export const Leaderboard = (): JSX.Element => {

  const [leaderboard, setLeaderboard] = useState<ILeaderboard[]>([])

  useEffect(() =>  {
    axios
      .get<ILeaderboard[]>("http://localhost:5000/leaderboard", {
        headers: {
          "Content-Type": "application/json"
        },
      })
      .then(response => {
        setLeaderboard(response.data);
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

  const leaderboardData = leaderboard.map(golfer => {
    const first = golfer.firstname.slice(0,1);
    let score;
    if (golfer.score > 0) {
      score = "+" + golfer.score
    } else if (golfer.score === 0) {
      score = "E"
    } else {
      score = golfer.score
    }
    let currentRound;
    if (golfer.currentround > 0) {
      currentRound = "+" + golfer.currentround
    } else if (golfer.currentround === 0) {
      currentRound = "E"
    } else {
      currentRound = golfer.currentround
    }
    return (
      <tr key={golfer.player_id} className="border-b-2 border-primary" >
        <td>{first}. {golfer.lastname}</td>
        <td className="text-center lg:text-left">{score}</td>
        <td className="text-center lg:text-left">{currentRound}</td>
        <td className="text-center lg:text-left">{golfer.holes_played}</td>
      </tr>
    )
  }) 

  return (
    <div className="flex justify-center m-2 md:m-4">
    <table className="w-4/5 text-xs md:text-base md:w-3/4">
      <tbody>
      <tr className="border-b-4 border-primary lg:text-left">
        <th>Golfer</th>
        <th>Total Score</th>
        <th>Current Round</th>
        <th>Thru</th>
      </tr>
      {leaderboardData}
      </tbody>
    </table>
  </div>
  );
}