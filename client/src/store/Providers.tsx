import React from 'react'

import { MessageProvider } from './useMessage'
import { UserProvider } from './useUser'

const Providers: React.FC<WithChildren> = ({ children }) => (
  <>
  <MessageProvider>
  <UserProvider>
  {children}
  </UserProvider>
  </MessageProvider>
  </>
)

export default Providers