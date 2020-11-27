import { useContext } from 'react';
import { ModalsContext } from 'store/modals/modals.context';
import { ModalsActionTypes } from 'store/modals/modals.reducer';

export type ModalsHook = {
  isLoginModalOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
}

export const useModals = () => {
  const { state, dispatch } = useContext(ModalsContext);

  const openLoginModal = () => {
    dispatch({ type: ModalsActionTypes.OPEN_LOGIN_MODAL })
  }

  const closeLoginModal = () => {
    dispatch({ type: ModalsActionTypes.CLOSE_LOGIN_MODAL })
  }

  return { isLoginModalOpen: state.modals.login, openLoginModal, closeLoginModal } as ModalsHook;
}