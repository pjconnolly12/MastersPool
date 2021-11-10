import React, {useState, useEffect } from 'react';
import axios from 'axios';
import { useForm } from "react-hook-form";
import { ITeam, IGolfer } from '../tools/interfaces'
import { UpdateBonus } from './adminComponents/updateBonus'
import { UpdatePaid } from './adminComponents/updatePaid'
import { ToggleUpdate} from './adminComponents/toggleUpdate'

export const Admin = (): JSX.Element => {

  return (
<div className="flex flex-col justify-start w-full mt-12 ml-10">
  <ToggleUpdate />
  <UpdatePaid />
  <UpdateBonus />
</div>
  );
}