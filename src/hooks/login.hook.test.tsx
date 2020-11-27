import React, { ReactNode } from 'react';
import { renderHook, act } from '@testing-library/react-hooks'
import { SessionContextProvider, State as SessionState } from 'store/session/session.context';
import { API } from 'services/api.service';
import { LoginHook, useLogin } from './login.hook';
import { SessionActionTypes } from 'store/session/session.reducer';
import Config from 'config';

const mockGetUser = jest.fn()
const mockGetDispatch = jest.fn()

jest.mock('./user.hook', () => ({ useUser: () => ({ getUser: mockGetUser }) }))

jest.mock('react', () => ({
  ...jest.requireActual("react") as {},
  useContext: () => ({
    state: {
      isLoggedIn: false
    } as SessionState,
    dispatch: mockGetDispatch
  })
}))

const authenticationData = {email: 'lalal', password: 'lele'}

describe('useLogin Hook test', () => {
  API.post = jest.fn(() => Promise.resolve(true)) as any
  let mockHook: LoginHook

  beforeEach(() => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <SessionContextProvider>
        {children}
      </SessionContextProvider>
    )
    const { result } = renderHook(() => useLogin(), { wrapper })
    mockHook = result.current as LoginHook
  })

  it('Login call successful', async () => {
    await act(async () => {
      await mockHook.login(authenticationData)
    })

    expect(API.post).toHaveBeenCalledWith(Config.endpoints.LOGIN, {...authenticationData, platform_id: "1235"})
    expect(mockGetDispatch).toHaveBeenCalledWith({ type: SessionActionTypes.LOGIN_SUCCESS })
  })

  it('Login call error', async () => {
    API.post = jest.fn().mockImplementationOnce(() => Promise.reject('wrong credentials'))

    await act(async () => {
      await mockHook.login(authenticationData)
    })

    expect(API.post).toHaveBeenCalled()
    expect(mockGetDispatch).toHaveBeenCalledWith({ type: SessionActionTypes.LOGIN_FAILED })
  })

  it('Logout call', async () => {
    API.get = jest.fn()

    await act(async () => {
      await mockHook.logout()
    })

    expect(API.get).toHaveBeenCalled()
    expect(mockGetDispatch).toHaveBeenCalledWith({ type: SessionActionTypes.LOGOUT })
  })
})