import { lazy } from 'react'

import makeRoute from './makeRoute'

import type { RouteInterface } from './types'

const Chat = lazy(() => import('@components/Chat'))
const Home = lazy(() => import('@components/Home'))
const Login = lazy(() => import('@components/Login'))
const Dashboard = lazy(() => import('@components/Dashboard'))

const routes: RouteInterface[] = [
  {
    path: '/',
    Component: Home
  },
  {
    path: '/chat',
    Component: Chat
  },
  {
    path: '/dashboard',
    Component: Dashboard,
    isProtected: true
  },
  {
    path: '/login',
    Component: Login
  }
]

export default routes.map(makeRoute)