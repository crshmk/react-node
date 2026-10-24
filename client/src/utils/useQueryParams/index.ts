import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import qs from 'qs'
import { getQueryParams } from 'ramjam'

const useQueryParams = <T extends QueryParams>() => {
  const { pathname, search } = useLocation()
  const navigate = useNavigate()
  const [queryParams, setQueryParams] = useState<T>({} as T)

  useEffect(() => {
    const newQueryParams: T = getQueryParams<T>(window)
    setQueryParams(newQueryParams)
  }, [search])

  const updateParams = (updates: T) => {
    const queryString = qs.stringify({...queryParams, ...updates})  
    navigate(`${pathname}?${queryString}`)
  }

  return { queryParams, search, updateParams }
}

export default useQueryParams
