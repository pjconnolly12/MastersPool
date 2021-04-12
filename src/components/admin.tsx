import React, {useState, useEffect } from 'react';
import axios from 'axios';
import { useForm } from "react-hook-form";
import { ITeam } from '../tools/interfaces'

type Inputs = {
  fullName: string,
}


export const Admin = (): JSX.Element => {

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

  const toggleAutoUpdate = async (data: boolean) => {
    if(data) {
      await axios
        .put("http://localhost:5000/autoUpdate", {
          newStatus: true
        })
        .then(function(response) {
          console.log(response)
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      await axios
        .put("http://localhost:5000/autoUpdate", {
          newStatus: false
        })
        .then(function(response) {
          console.log(response)
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  const names = teams.map(entry => {
    return (
    <option key={entry.entry_id} value={entry.fullname}>{entry.fullname}</option>
  )})

  const onSubmit = (data: Inputs) => {
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
<div className="flex flex-col justify-start w-full mt-12 ml-10">
  <label htmlFor="toggleB" className="flex items-center cursor-pointer mb-5">
    <div className="mr-3 text-gray-700 font-medium">
      Auto Update
    </div>
    <div className="relative">
      <input type="checkbox" id="toggleB" className="sr-only" onChange={(e) => toggleAutoUpdate(e.target.checked)}/>
      <div className="block bg-gray-600 w-14 h-8 rounded-full"></div>
      <div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
    </div>
  </label>
  <form onSubmit={handleSubmit(onSubmit)}>
    <label className="mr-3 text-gray-700 font-medium">Mark Team as Paid</label>
    <select className="mr-3 border-2 border-primary cursor-pointer" name="fullName" ref={register({ required: true})}>
      {names}
    </select>
    <input className="bg-primary hover:bg-secondary text-white font-bold py-2 px-2 rounded cursor-pointer" type="submit" />
  </form>
</div>
  );
}