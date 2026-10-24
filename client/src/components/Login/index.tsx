import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import './login.css'

import useUser from '@store/useUser'

import onKeyDownEnter from '@utils/onKeyDownEnter'
import useQueryParams from '@utils/useQueryParams'
import { isPresent } from 'ramjam'

const mockUser = { 
  id: 42, 
  name: 'jo', 
  email: 'jo@co.com'
}

const Login = () => {
  const { isFetchingUser, setUser, user } = useUser()
  const navigate = useNavigate()
  const { queryParams } = useQueryParams()

  useEffect(() => {
      if(isPresent(user)) {
        let route = isPresent(queryParams.continue) ? queryParams.continue as string : '/'
        navigate(route, { replace: true })
      }
    }, [user, isFetchingUser])

  const onSubmit = () => setUser(mockUser)
  
  return (
    <div>
      <div className="login-form">
        <button 
          tabIndex={0}
          onKeyDown={onKeyDownEnter(onSubmit)}
          onClick={onSubmit}
        >log in</button>
      </div>
    </div>

  )
}

export default Login

