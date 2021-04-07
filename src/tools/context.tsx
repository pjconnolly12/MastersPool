import React, { useReducer } from 'react';
import { IAction, IState } from './interfaces';

const initialState: IState = {
  data: []
}

export const Store = React.createContext<IState | any>(initialState);

function reducer(state: IState, action: IAction): IState {
  switch (action.type) {
    default: 
      return state
  }
}

export function StoreProvider(props: any): JSX.Element {
  const [state, dispatch] = useReducer(reducer, initialState)
  return <Store.Provider value={{state, dispatch}}>{props.children}</Store.Provider>
}