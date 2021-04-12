import React from 'react';

export const Homepage = (): JSX.Element => {


  return (
    <div className="flex flex-col place-content-center flex-grow bg-home-image bg-cover">
      <div className="flex flex-col place-content-center bg-gray-900 bg-opacity-50 h-full">
        <div className="m-2 text-secondary text-4xl text-center font-bold ">Welcome, to a tradition unlike any other!<br /><br />The Philly Masters Pool</div>
        <br />
        <div className="m-2 text-secondary text-2xl text-center font-medium">Create a team and compete with others<br />Check the rules page for more information</div>
      </div>
    </div>
  );
}