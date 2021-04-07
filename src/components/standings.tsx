import React, { useEffect, useState } from 'react';
import { IStanding } from './../tools/interfaces';
import axios from 'axios'

export const Standings = (): JSX.Element => {


  const [standings, setStandings] = useState<IStanding[]>([])

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

  const standingsData = standings.map(row => {
    return (
      <tr key={row.entry_id} >
        <td>{row.teamname}</td>
        <td>{row.rawtotal}</td>
        <td>{row.total - row.rawtotal}</td>
        <td>{row.total}</td>
      </tr>
    )
  }) 

  return (
    <div>
    <table>
      <tbody>
      <tr>
        <th>Team</th>
        <th>Raw Total</th>
        <th>Bonus</th>
        <th>Total</th>
      </tr>
      {standingsData}
      </tbody>
    </table>
  </div>
  );
}