import { State } from './modals.context';

export enum ModalsActionTypes {
  OPEN_LOGIN_MODAL = 'OPEN_LOGIN_MODAL',
  CLOSE_LOGIN_MODAL = 'CLOSE_LOGIN_MODAL',
}

export type Actions =
  | {
      type: ModalsActionTypes.OPEN_LOGIN_MODAL;
    }
  | {
      type: ModalsActionTypes.CLOSE_LOGIN_MODAL;
    };

export const modalsReducer = (state: State, action: Actions) => {
  switch (action.type) {
    case ModalsActionTypes.OPEN_LOGIN_MODAL:
      state.modals.login = true;
      return { ...state };
    case ModalsActionTypes.CLOSE_LOGIN_MODAL:
      state.modals.login = false;
      return { ...state };
    default:
      return state;
  }
};
