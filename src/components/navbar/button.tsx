import React from 'react';
import { Link } from 'react-router-dom'
import { INavButtonProps } from '../../tools/interfaces'


export const NavButton: React.FC<INavButtonProps> = (props): JSX.Element => {
  return (
    <div className="bg-white text-primary hover:underline hover:text-secondary px-3 py-2 rounded-md text-sm font-medium">
      <Link to={props.redirect}>{props.pageTitle}</Link>
    </div>
  );
};