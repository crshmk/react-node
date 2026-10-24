import React, { JSX, Suspense } from 'react'
import { Route } from 'react-router-dom'

import type { RouteInterface } from '../types'

import ProtectedRoute from './ProtectedRoute'

const makeRoute = ({ Component, path, isProtected }: RouteInterface): JSX.Element => (
  <Route path={path} key={path} element={
    <Suspense fallback={null}>
      {!isProtected ? <Component /> : (
        <ProtectedRoute>
          <Component />
        </ProtectedRoute>
      )}
    </Suspense>
    } 
  />
) 

export default makeRoute