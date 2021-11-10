import React, {useState, useEffect } from 'react';
import axios from 'axios';
import { useForm } from "react-hook-form";
import { ITeam, IGolfer } from '../../tools/interfaces'

type InputGolfer = {
  playerID: number,
}

export const UpdateBonus = (): JSX.Element => {

  const { register, handleSubmit, errors } = useForm<InputGolfer>()
  const [players, setPlayers] = useState<IGolfer[]>([])

  useEffect(() =>  {
    axios
      .get<IGolfer[]>("http://localhost:5000/golfers", {
        headers: {
          "Content-Type": "application/json"
        },
      })
      .then(response => {
        setPlayers(response.data);
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

  const golfers = players.map(player => {
    return (
      <option key={player.player_id} value={player.player_id}>{player.firstname} {player.lastname}</option>
    )
  })

  const onSubmitBonus = (data: InputGolfer) => {
    console.log(typeof(data.playerID))
    axios
      .put(`http://localhost:5000/bonus5/${data.playerID}`)
      .then(function(response: InputGolfer | any) {
        console.log(response)
      })
      .catch(function (error) {
        console.log(error);
      });
}


  return (
  <div>
  <form className="mt-3" onSubmit={handleSubmit(onSubmitBonus)}>
    <label className="mr-3 text-gray-700 font-medium">Add Ace or Albatross Bonus</label>
    <select className="mr-3 border-2 border-primary cursor-pointer" name="playerID" ref={register({ required: true})}>
      {golfers}
    </select>
    <input className="bg-primary hover:bg-secondary text-white font-bold py-2 px-2 rounded cursor-pointer" type="submit" />
  </form>
</div>
  );
}