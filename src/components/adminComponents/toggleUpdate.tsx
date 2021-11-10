import React from 'react';
import axios from 'axios';

export const ToggleUpdate = (): JSX.Element => {

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


  return (
  <div>
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
</div>
  );
}