import React, {useState, useEffect } from 'react';
import axios from 'axios';
import {ITeam, ITeamModalClick} from './../tools/interfaces'

export const TeamModal = (props:ITeamModalClick): JSX.Element => {

  const teamData = props.team.map(team => {
    return (
      <>
      <tr className="h-auto">
        <td className="whitespace-normal md:whitespace-nowrap">{team.golfer1}</td>
        <td className="text-center whitespace-nowrap">{team.golfer1score}</td>
        <td className="text-center whitespace-nowrap">{team.golfer1bonus}</td>
      </tr>
      <tr className="h-auto">
        <td className="whitespace-normal md:whitespace-nowrap">{team.golfer2}</td>
        <td className="text-center whitespace-nowrap">{team.golfer2score}</td>
        <td className="text-center whitespace-nowrap">{team.golfer2bonus}</td>
      </tr>
      <tr>
        <td className="whitespace-normal md:whitespace-nowrap">{team.golfer3}</td>
        <td className="text-center whitespace-nowrap">{team.golfer3score}</td>
        <td className="text-center whitespace-nowrap">{team.golfer3bonus}</td>
      </tr>
      <tr>
        <td className="whitespace-normal md:whitespace-nowrap">{team.golfer4}</td>
        <td className="text-center whitespace-nowrap">{team.golfer4score}</td>
        <td className="text-center whitespace-nowrap">{team.golfer4bonus}</td>
      </tr>
      <tr>
        <td className="whitespace-normal md:whitespace-nowrap">{team.golfer5}</td>
        <td className="text-center whitespace-nowrap">{team.golfer5score}</td>
        <td className="text-center whitespace-nowrap">{team.golfer5bonus}</td>
      </tr>
      </>
    )
  }) 

  const closeWindow = () => {
    props.toggleOff(false)
  }

  return (
    <div className={"p-3 w-3/4 text-xs absolute inset-0 z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-secondary rounded md:w-1/2 " + (props.toggle ? "flex" : "hidden")}>
      <table className="w-full">
        <tbody>
        <tr className="border-b-4 border-primary">
          <th>Golfer</th>
          <th>Score</th>
          <th>Bonus</th>
        </tr>
        {teamData}
        </tbody>
      </table>
      <button className="fixed top-2 right-2" onClick={() => closeWindow()}>X</button>
    </div>
  );
}