import React, { createContext, ReactNode, useReducer } from 'react';
import { modalsReducer } from './modals.reducer';

export type State = {
  modals:{
    login: boolean;
  }
}

const initialState: State = {
  modals: {
    login: false
  }
}

export const ModalsContext = createContext<{
  state: State;
  dispatch: React.Dispatch<any>;
}>({
  state: initialState,
  dispatch: () => null
});

export const ModalsContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(modalsReducer, initialState);

  return (
    <ModalsContext.Provider value={{ state, dispatch }}>
      {children}
    </ModalsContext.Provider>
  );
};