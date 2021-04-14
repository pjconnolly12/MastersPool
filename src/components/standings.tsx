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
    return (
      <tr key={row.entry_id} className="border-b-2 border-primary" >
        <td>{row.teamname}</td>
        <td className="text-center lg:text-left">{score}</td>
        <td className="text-center lg:text-left">{row.total - row.rawtotal}</td>
        <td className="text-center lg:text-left">{total}</td>
      </tr>
    )
  }) 

  return (
    <div className="flex justify-center m-2 md:m-4">
    <table className="w-4/5 text-xs md:text-base md:w-3/4">
      <tbody>
      <tr className="border-b-4 border-primary lg:text-left">
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