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
    return (
      <tr key={golfer.player_id} >
        <td>{golfer.firstname} {golfer.lastname}</td>
        <td>{golfer.score}</td>
        <td>{golfer.currentround}</td>
        <td>{golfer.holes_played}</td>
      </tr>
    )
  }) 

  return (
    <div>
    <table>
      <tbody>
      <tr>
        <th>Golfer</th>
        <th>Current Round</th>
        <th>Current Round</th>
        <th>Thru</th>
      </tr>
      {leaderboardData}
      </tbody>
    </table>
  </div>
  );
}