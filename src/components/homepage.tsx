import React from 'react';

export const Homepage = (): JSX.Element => {


  return (
    <div className="flex flex-col place-content-center bg-small-home-image flex-grow md:bg-home-image bg-cover">
      <div className="flex flex-col place-content-center bg-gray-900 bg-opacity-50 h-full">
        <div className="font-benton italic m-2 text-secondary text-3xl text-center font-bold md:text-4xl ">Welcome, to a tradition unlike any other!<br /><br />The Philly Masters Pool</div>
        <br />
        <div className="m-2 text-secondary text-1xl text-center font-medium md:text-2xl">Create a team and compete with others<br />Check the rules page for more information</div>
      </div>
    </div>
  );
}