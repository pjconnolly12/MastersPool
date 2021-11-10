import React, {useState, useEffect } from 'react';
import axios from 'axios';
import { useForm } from "react-hook-form";
import { ITeam, IGolfer } from '../../tools/interfaces'

type Inputs = {
  fullName: string,
}

export const UpdatePaid = (): JSX.Element => {

  const [teams, setTeams] = useState<ITeam[]>([])
  const { register, handleSubmit, errors } = useForm<Inputs>()

  useEffect(() =>  {
    axios
      .get<ITeam[]>("http://localhost:5000/entries-paid", {
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

  const names = teams.map(entry => {
    return (
    <option key={entry.entry_id} value={entry.fullname}>{entry.fullname}</option>
  )})

  const onSubmitPaid = (data: Inputs) => {
    console.log(data)
    axios
      .put(`http://localhost:5000/paid/${data.fullName}`)
      .then(function(response: Inputs | any) {
        console.log(response)
      })
      .catch(function (error) {
        console.log(error);
      });
}


  return (
  <div>
  <form onSubmit={handleSubmit(onSubmitPaid)}>
    <label className="mr-3 text-gray-700 font-medium">Mark Team as Paid</label>
    <select className="mr-3 border-2 border-primary cursor-pointer" name="fullName" ref={register({ required: true})}>
      {names}
    </select>
    <input className="bg-primary hover:bg-secondary text-white font-bold py-2 px-2 rounded cursor-pointer" type="submit" />
  </form>
</div>
  );
}