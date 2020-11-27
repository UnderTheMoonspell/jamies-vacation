import React from 'react'
import { render, fireEvent, act, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom';
import NavBar from './NavBar'
import { Login } from 'containers/Login/Login';

it('Opens login modal after clicking Login button', async () => {
  await act(async () => {

    const { getByText, getByTestId } = render(
      <BrowserRouter>
        <NavBar />
        <Login />
      </BrowserRouter>
    )

    const loginButton = getByTestId('navbar-login-button')

    expect(loginButton).toBeInTheDocument()

    fireEvent.click(loginButton)

    await waitFor(() => getByTestId('login-modal'))
    
    expect(getByTestId('login-modal')).toBeInTheDocument()
    expect(getByText(/Log me in/i).closest('button')).toBeDisabled();
  })
})