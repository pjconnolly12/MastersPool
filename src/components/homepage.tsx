import React from 'react';

export const Homepage = (): JSX.Element => {


  return (
    <div className="flex flex-col place-content-center flex-grow" style={{backgroundImage: 'linear-gradient(to right, rgba(0,103,71, 0.9), rgba(0,103,71, 0.7)), url("src/images/sm-masters-clubhouse.png")'}}>
      <div className="m-2 text-secondary text-4xl text-center font-bold ">Welcome, to a tradition unlike any other!<br /><br />The Philly Masters Pool</div>
      <br />
      <div className="m-2 text-secondary text-2xl text-center font-medium">Create a team and compete with others<br />Check the rules page for more information</div>
    </div>
  );
}