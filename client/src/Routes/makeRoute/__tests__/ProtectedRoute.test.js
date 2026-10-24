// __tests__/ProtectedRoute.test.jsx
import React from 'react'
import { act, render, screen, fireEvent, waitFor } from '@testing-library/react'

import App from '../../../App'

const mockNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  useLocation: () => ({
    pathname: '/',
    search: '', 
  }),
}))

describe('ProtectedRoute', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('sets a redirect location in the query string when an unauthorized route is accessed', async () => {
    await act(async () => {
      render(<App />)
    })
  
    await act(async () => {
      fireEvent.click(screen.getByText('Dashboard'))
    })
  
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/login?continue=/&', { replace: true })
    })   
  })
  
})
