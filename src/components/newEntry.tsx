import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { ITopTen, IGolfer } from "./../tools/interfaces"
import axios from 'axios';

//Add useEffect to pull the topten and the entry list//
//Ensure that each one has the ID's included in the data so they can compare//

type Inputs = {
  fullName: string,
  email: string,
  teamName: string,
  golfer1: number, 
  golfer2: number, 
  golfer3: number, 
  golfer4: number,
  golfer5: number,
}

export const NewEntry = (): JSX.Element => {

  const [topTen, setTopTen] = useState<ITopTen[]>([])
  const [golfers, setGolfers] = useState<IGolfer[]>([])
  
  useEffect(() =>  {
    axios
      .get<ITopTen[]>("http://localhost:5000/topten", {
        headers: {
          "Content-Type": "application/json"
        },
      })
      .then(response => {
        setTopTen(response.data);
      })
      .catch(ex => {
        const error =
        ex.response.status === 404
          ? "Resource not found"
          : "An unexpected error has occurred";
          console.log(error)
      });
      axios
      .get<IGolfer[]>("http://localhost:5000/golfers", {
        headers: {
          "Content-Type": "application/json"
        },
      })
      .then(response => {
        setGolfers(response.data);
      })
      .catch(ex => {
        const error =
        ex.response.status === 404
          ? "Resource not found"
          : "An unexpected error has occurred";
          console.log(error)
      });
  }, [])

  

  const { register, handleSubmit, errors } = useForm<Inputs>();
  const onSubmit = (data: Inputs) => {
    if (checkTopTen(data) && !checkDuplicates(data) ){
      console.log(data)
      axios
        .post("http://localhost:5000/entries", {
          fullname: data.fullName,
          email: data.email,
          teamname: data.teamName,
          golfer1: data.golfer1, 
          golfer2: data.golfer2, 
          golfer3: data.golfer3, 
          golfer4: data.golfer4,
          golfer5: data.golfer5,
          paid: false
          })
        .then(function(response: Inputs | any) {
          console.log(response)
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      window.alert("Please check your team for duplicates or for being over the limit of 2 top ten players, thanks!")
    }
  }

  const checkDuplicates = (x: Inputs) => {
    const golferIds = [];
    golferIds.push(x.golfer1)
    golferIds.push(x.golfer2)
    golferIds.push(x.golfer3)
    golferIds.push(x.golfer4)
    golferIds.push(x.golfer5)
    return new Set(golferIds).size !== golferIds.length ? true : false 
  }

  const checkTopTen = (x: Inputs) => {
    let total = 0;
    topTen.forEach(player => (
      (Object.values(x).includes(player.player_id.toString())) ? total++ : null 
    ))
    if (total > 2){
      return false
    } else {
      return true
    }
  } 

  const picks = golfers.map(golfer => {
    return (
    <option key={golfer.player_id} value={golfer.player_id }>{golfer.firstname + ' ' + golfer.lastname}</option>)
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)}> 
      <label className="block text-sm font-medium text-gray-700">Full Name:</label>
      <input name="fullName" type="text" ref={register({ required: true})} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block shadow-sm sm:text-sm border-gray-300 rounded-md" />
      {errors.fullName && <span>This field is required</span>}
      <label className="block text-sm font-medium text-gray-700">Email:</label>      
      <input name="email" type="email" ref={register({ required: true, 
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "invalid email address"
            } 
      })} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block shadow-sm sm:text-sm border-gray-300 rounded-md" />
      {errors.email && <span>This field is required</span>}
      <label className="block text-sm font-medium text-gray-700">Team Name:</label>
      <input name="teamName" type="text" ref={register({ required: true, maxLength: 25 })} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block shadow-sm sm:text-sm border-gray-300 rounded-md" />
      {errors.teamName && <span>This field is required</span>}
      <label className="block text-sm font-medium text-gray-700">Golfer 1:</label>
      <select name="golfer1" ref={register({ required: true})}>
        {picks}
      </select>
      <select name="golfer2" ref={register({ required: true})}>
        {picks}
      </select>
      <select name="golfer3" ref={register({ required: true})}>
        {picks}
      </select>
      <select name="golfer4" ref={register({ required: true})}>
        {picks}
      </select>
      <select name="golfer5" ref={register({ required: true})}>
        {picks}
      </select>
      <input type="submit" />
    </form>
  )
}